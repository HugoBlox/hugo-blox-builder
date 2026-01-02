#!/usr/bin/env python3

"""
Release management for HugoBlox modules.

Features:
 - Detects changes per module since last path-prefixed tag (e.g., modules/blox/v0.4.3)
 - Determines next semantic version per module (conventional commits heuristics, default to patch)
 - Updates special module metadata (blox data/hugoblox.yaml version)
 - Updates dependent modules' go.mod "require" versions when a dependency is released
 - Tags changed modules with annotated tags and pushes tags
 - Updates templates' go.mod to latest released module versions and bumps Hugo version in template configs (hugoblox.yaml, Netlify, devcontainer)

Usage examples:
  poetry run python scripts/release_modules.py --dry-run --log-level INFO
  poetry run python scripts/release_modules.py --yes --no-propagate --log-level DEBUG

Notes:
- Tags must be created with the subdirectory path prefix per Go's submodule tagging rules.
- For modules with major version path suffix (e.g., /v5), versions must start with that major (e.g., v5.2.3).
- This script assumes you have a clean working tree before running with --yes.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
import logging
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

import requests
import tomlkit
from ruamel.yaml import YAML
from ruamel.yaml.scalarstring import SingleQuotedScalarString


REPO_ROOT = Path(__file__).resolve().parents[1]
MODULES_DIR = REPO_ROOT / "modules"
STARTERS_DIR = REPO_ROOT / "templates"
EXCLUDED_MODULE_DIRS = {"blox-bootstrap"}


def run_cmd(args: List[str], cwd: Optional[Path] = None, check: bool = True) -> subprocess.CompletedProcess:
  workdir = str(cwd) if cwd else None
  logging.debug("run: %s [cwd=%s]", " ".join(args), workdir or str(REPO_ROOT))
  process = subprocess.run(args, cwd=workdir, text=True, capture_output=True)
  if process.stdout:
    logging.debug("stdout:\n%s", process.stdout.strip())
  if process.stderr:
    logging.debug("stderr:\n%s", process.stderr.strip())
  if check and process.returncode != 0:
    logging.error("command failed (%s): %s", process.returncode, " ".join(args))
    raise RuntimeError(f"Command failed: {' '.join(args)}\nSTDOUT:\n{process.stdout}\nSTDERR:\n{process.stderr}")
  return process


def get_latest_hugo_version() -> Optional[str]:
  url = "https://api.github.com/repos/gohugoio/hugo/releases/latest"
  try:
    resp = requests.get(url, timeout=15)
    if resp.status_code == 200:
      tag = resp.json().get("tag_name", "").lstrip("v").strip()
      return tag or None
  except Exception:
    pass
  return None


def get_module_latest_commit_info(module: Module) -> Optional[Tuple[str, datetime]]:
  """Get the latest commit hash and timestamp for a module."""
  try:
    # Get latest commit hash for the module directory
    res = run_cmd(["git", "log", "-1", "--format=%H %ct", "--", str(module.rel_dir)], cwd=REPO_ROOT)
    if not res.stdout.strip():
      return None
    
    parts = res.stdout.strip().split()
    if len(parts) != 2:
      return None
    
    commit_hash = parts[0]
    # Use UTC timestamp as required by Go module versioning
    timestamp = datetime.fromtimestamp(int(parts[1]), tz=timezone.utc)
    return commit_hash, timestamp
  except Exception as e:
    logging.warning("Failed to get commit info for %s: %s", module.name, e)
    return None


def format_pseudo_version(commit_hash: str, timestamp: datetime, base_version: str = "v0.0.0") -> str:
  """Format a commit hash and timestamp as a Go pseudo-version."""
  # Format: v0.0.0-20060102150405-abcdefabcdef
  # Ensure timestamp is in UTC as required by Go module versioning
  if timestamp.tzinfo is None:
    timestamp = timestamp.replace(tzinfo=timezone.utc)
  time_str = timestamp.strftime("%Y%m%d%H%M%S")
  short_hash = commit_hash[:12]
  return f"{base_version}-{time_str}-{short_hash}"


def update_go_mod_require_pseudo_version(go_mod_text: str, dep_module_path: str, pseudo_version: str) -> str:
  """Replace exact require line with pseudo-version format."""
  # This handles both versioned requires (v1.2.3) and existing pseudo-versions
  pattern_line = rf"(?m)^(\s*{re.escape(dep_module_path)}\s+)(?:v\d+[^\s]*|v\d+\.\d+\.\d+-\d+-[a-f0-9]+)$"
  replacement_line = rf"\g<1>{pseudo_version}"
  return re.sub(pattern_line, replacement_line, go_mod_text)


def _bump_hugo_image_tag(image: str, latest_hugo: str) -> Optional[str]:
  """
  Replace the hugo version segment in an image tag formatted like:
  ghcr.io/org/hugo-blox-dev:hugo0.152.2[-suffix]
  """
  pattern = re.compile(r"^(?P<prefix>.+/hugo-blox-dev:hugo)(?P<version>\d+\.\d+\.\d+)(?P<rest>.*)$")
  match = pattern.match(image)
  if not match:
    return None
  current = match.group("version")
  if current == latest_hugo:
    return None
  return f"{match.group('prefix')}{latest_hugo}{match.group('rest')}"


def update_devcontainer_hugo(starter_dir: Path, latest_hugo: Optional[str], updated_paths: List[Path]) -> None:
  """Update devcontainer Hugo version pinned via image tag (preferred) or legacy feature."""
  if not latest_hugo:
    return
  devcontainer = starter_dir / ".devcontainer" / "devcontainer.json"
  if not devcontainer.exists():
    return
  try:
    data = json.loads(devcontainer.read_text(encoding="utf-8"))
  except Exception as exc:  # pragma: no cover - defensive
    logging.warning("starter %s: failed to parse devcontainer.json (%s)", starter_dir.name, exc)
    return

  updated = False

  # Preferred: bump Hugo version embedded in the image tag.
  image = data.get("image")
  if isinstance(image, str):
    new_image = _bump_hugo_image_tag(image, latest_hugo)
    if new_image:
      data["image"] = new_image
      updated = True
      logging.info("starter %s: devcontainer image -> %s", starter_dir.name, new_image)

  # Legacy fallback: devcontainer Hugo feature pin.
  if not updated:
    features = data.get("features", {})
    hugo_feature = features.get("ghcr.io/devcontainers/features/hugo:1")
    if isinstance(hugo_feature, dict):
      current = hugo_feature.get("version")
      if current != latest_hugo:
        hugo_feature["version"] = latest_hugo
        features["ghcr.io/devcontainers/features/hugo:1"] = hugo_feature
        data["features"] = features
        updated = True
        logging.info("starter %s: devcontainer Hugo feature -> %s", starter_dir.name, latest_hugo)

  if updated:
    devcontainer.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    updated_paths.append(devcontainer)


@dataclass
class Module:
    name: str  # e.g., blox
    rel_dir: Path  # e.g., modules/blox
    module_path: str
    major: int  # 0,1,2,... (derived from module_path suffix /vN if any)
    requires: Set[str] = field(default_factory=set)  # module paths this module requires
    dependents: Set[str] = field(default_factory=set)  # reverse edge, filled later

    def tag_prefix(self) -> str:
        # tags must be like: modules/blox/vX.Y.Z
        return f"{self.rel_dir.as_posix()}/v"

    def current_version_tag(self) -> Optional[str]:
        # Find last tag for this module, prefixed by module rel path
        # Sorted by semantic version descending
        # For modules with major >= 2, the version series must start with v{major}.
        pattern = f"{self.rel_dir.as_posix()}/v{self.major if self.major >= 2 else ''}*"
        # Clean potential double 'v' for major 0/1
        pattern = pattern.replace("v*v", "v*")
        res = run_cmd(
            ["git", "tag", "--list", pattern, "--sort=-v:refname"], cwd=REPO_ROOT
        )
        tags = [t.strip() for t in res.stdout.splitlines() if t.strip()]
        return tags[0] if tags else None

    def last_version(self) -> Optional[str]:
        tag = self.current_version_tag()
        if not tag:
            return None
        m = re.search(r"/v(\d+\.\d+\.\d+)$", tag)
        return m.group(1) if m else None


def _extract_requires_from_go_mod(content: str) -> Set[str]:
  requires: Set[str] = set()
  # Single-line require
  for m in re.findall(r"(?m)^\s*require\s+([^\s]+)\s+v[0-9][^\s]*$", content):
    requires.add(m.strip())

  # Block require
  for block in re.findall(r"(?ms)^require\s*\(\s*(.*?)\s*\)", content):
    for line in block.splitlines():
      m = re.search(r"^\s*([^\s]+)\s+v[0-9][^\s]*$", line)
      if m:
        requires.add(m.group(1).strip())
  return requires


def discover_modules() -> Dict[str, Module]:
  modules: Dict[str, Module] = {}
  for go_mod in MODULES_DIR.glob("**/go.mod"):
    rel_dir = go_mod.parent.relative_to(REPO_ROOT)
    if rel_dir.name in EXCLUDED_MODULE_DIRS:
      continue
    content = go_mod.read_text(encoding="utf-8")
    m = re.search(r"^module\s+(.+)$", content, re.MULTILINE)
    if not m:
      continue
    module_path = m.group(1).strip()
    name = rel_dir.name
    major = 0
    major_suffix = re.search(r"/v(\d+)$", module_path)
    if major_suffix:
      major = int(major_suffix.group(1))
    else:
      # default major version is 0 or 1. We keep 0 to preserve existing series.
      # We don't force elevation to 1 automatically.
      major = 0

    requires: Set[str] = _extract_requires_from_go_mod(content)

    modules[module_path] = Module(
      name=name,
      rel_dir=rel_dir,
      module_path=module_path,
      major=major,
      requires=requires,
    )
    logging.debug("discovered module: %s (dir=%s, major=%s, requires=%s)", module_path, rel_dir, major, sorted(list(requires)))

  # Fill dependents
  for mod in modules.values():
    for req in list(mod.requires):
      if req in modules:
        modules[req].dependents.add(mod.module_path)
  logging.info("discovered %d modules", len(modules))
  return modules


def get_commits_since_tag(module: Module, tag: Optional[str]) -> List[str]:
  if not tag:
    # All history counts as changes for initial release
    res = run_cmd(["git", "log", "--pretty=%s", "--", str(module.rel_dir)], cwd=REPO_ROOT)
  else:
    res = run_cmd(["git", "log", f"{tag}..HEAD", "--pretty=%s", "--", str(module.rel_dir)], cwd=REPO_ROOT)
  msgs = [l.strip() for l in res.stdout.splitlines() if l.strip()]
  logging.debug("%s commits since %s: %d", module.name, tag or "<none>", len(msgs))
  return msgs


def has_changes_since_tag(module: Module, tag: Optional[str]) -> bool:
  if not tag:
    return True
  res = run_cmd(["git", "diff", "--name-only", tag, "--", str(module.rel_dir)], cwd=REPO_ROOT)
  changed = any(l.strip() for l in res.stdout.splitlines())
  logging.debug("changed since tag? %s: %s", module.name, changed)
  return changed


def determine_bump_from_commits(commits: List[str]) -> str:
  # conventional commits heuristic
  # returns one of: "major" | "minor" | "patch"
  bump = "patch"
  for msg in commits:
    lower = msg.lower()
    if "breaking change" in lower or re.search(r"^\w+(\(.+\))?!:", lower):
      return "major"
    if lower.startswith("feat:") or lower.startswith("feat("):
      bump = "minor"
  return bump


def bump_semver(version: Optional[str], bump: str, enforced_major: Optional[int]) -> str:
  """
  Calculate next version. For modules with v2+ path (enforced_major >= 2), do NOT auto-bump
  the major number here; a true major requires a new module path (/vN+1). We clamp the major to
  enforced_major and treat a requested "major" bump as "minor".
  For modules without a vN suffix, v0->v1 is allowed, but v1->v2 is NOT (would require /v2 path),
  so a requested "major" bump at v1 is treated as "minor".
  """
  if version is None:
    # initial release default
    if enforced_major and enforced_major >= 2:
      return f"{enforced_major}.0.0"
    return "0.1.0"

  major, minor, patch = [int(x) for x in version.split(".")]

  if enforced_major and enforced_major >= 2:
    # clamp major and downgrade a requested major bump to minor
    major = enforced_major
    effective_bump = "minor" if bump == "major" else bump
  else:
    # No suffix: v0->v1 is OK, but v1->v2 requires path change we don't automate here
    if bump == "major" and major >= 1:
      effective_bump = "minor"
    else:
      effective_bump = bump

  if effective_bump == "major":
    major += 1
    minor = 0
    patch = 0
  elif effective_bump == "minor":
    minor += 1
    patch = 0
  else:
    patch += 1

  return f"{major}.{minor}.{patch}"


def write_blox_tailwind_theme_version(module: Module, version: str) -> List[Path]:
  updated: List[Path] = []
  # Update modules/blox/data/hugoblox.yaml version: "X.Y.Z"
  if module.name != "blox":
    return updated
  data_file = module.rel_dir / "data" / "hugoblox.yaml"
  if not data_file.exists():
    return updated
  yaml = YAML()
  yaml.preserve_quotes = True
  with data_file.open("r", encoding="utf-8") as f:
    data = yaml.load(f) or {}
  data["version"] = SingleQuotedScalarString(version)
  with data_file.open("w", encoding="utf-8") as f:
    yaml.dump(data, f)
  updated.append(data_file)
  logging.info("bumped theme version in %s to %s", data_file, version)
  return updated


def update_citation_release_info(module: Module, version: str) -> List[Path]:
  """Update the public citation metadata to the latest blox release."""
  if module.name != "blox":
    return []

  citation = REPO_ROOT / "CITATION.cff"
  if not citation.exists():
    return []

  original = citation.read_text(encoding="utf-8")
  release_date = datetime.now(timezone.utc).date().isoformat()

  updated = original
  version_pattern = r'(?m)^(version:\s*)"[^"]+"'
  if re.search(version_pattern, updated):
    updated = re.sub(version_pattern, rf'\g<1>"{version}"', updated)
  else:
    updated = f'{updated.rstrip()}\nversion: "{version}"\n'

  date_pattern = r'(?m)^(date-released:\s*)(.+)$'
  if re.search(date_pattern, updated):
    updated = re.sub(date_pattern, rf"\g<1>{release_date}", updated)
  else:
    updated = f"{updated.rstrip()}\ndate-released: {release_date}\n"

  if updated != original:
    citation.write_text(updated, encoding="utf-8")
    logging.info("updated CITATION.cff -> version %s, date %s", version, release_date)
    return [citation]
  return []


def update_go_mod_require_version(go_mod_text: str, dep_module_path: str, new_version: str) -> str:
  # Replace exact require line if present
  # Handles both single-line require and block form
  pattern_line = rf"(?m)^(\s*{re.escape(dep_module_path)}\s+)v\d+[^\s]*$"
  replacement_line = rf"\g<1>v{new_version}"

  def replace_in_block(text: str) -> str:
    # single-line replacement will naturally work for block content too
    return re.sub(pattern_line, replacement_line, text)

  # First try block section-specific replace
  new_text = replace_in_block(go_mod_text)
  return new_text


def update_module_requirements_to_latest(
  module: Module,
  modules: Dict[str, Module],
  known_latest_versions: Dict[str, str],
) -> Optional[Path]:
  """
  Ensure module's go.mod requires the latest tag for all internal dependencies.
  Uses known_latest_versions (from earlier releases in this run) or the dependency's last tag.
  Returns the go.mod path if changed.
  """
  go_mod_file = module.rel_dir / "go.mod"
  if not go_mod_file.exists() or not module.requires:
    return None

  original = go_mod_file.read_text(encoding="utf-8")
  updated = original

  for dep_path in sorted(module.requires):
    if dep_path not in modules:
      continue  # external dep
    version = known_latest_versions.get(dep_path) or modules[dep_path].last_version()
    if not version:
      continue
    updated = update_go_mod_require_version(updated, dep_path, version)

  if updated != original:
    go_mod_file.write_text(updated, encoding="utf-8")
    logging.info("%s: synced go.mod internal deps to latest tags", module.name)
    return go_mod_file
  return None


def stage_and_maybe_commit(paths: List[Path], message: str, commit: bool, push: bool) -> None:
  if not paths:
    return
  str_paths: List[str] = []
  for p in paths:
    if p.is_absolute():
      try:
        rel = p.relative_to(REPO_ROOT)
        str_paths.append(str(rel))
      except Exception:
        # Fallback to OS relpath if not within repo root
        rel = os.path.relpath(str(p), str(REPO_ROOT))
        str_paths.append(rel)
    else:
      # Use as-is relative to repo root since git cwd is REPO_ROOT
      str_paths.append(str(p))
  logging.info("git add: %s", ", ".join(str_paths))
  run_cmd(["git", "add", *str_paths], cwd=REPO_ROOT)
  if commit:
    logging.info("git commit -m '%s'", message)
    run_cmd(["git", "commit", "-m", message], cwd=REPO_ROOT)
    if push:
      logging.info("git push origin main")
      run_cmd(["git", "push", "origin", "main"], cwd=REPO_ROOT)


def create_and_push_tag(module: Module, version: str, yes: bool) -> None:
  tag = f"{module.rel_dir.as_posix()}/v{version}"
  annotate_msg = f"{module.name}: v{version}"
  if yes:
    logging.info("create tag %s", tag)
    run_cmd(["git", "tag", "-a", tag, "-m", annotate_msg], cwd=REPO_ROOT)
    logging.info("push tag %s", tag)
    run_cmd(["git", "push", "origin", tag], cwd=REPO_ROOT)


def topological_order(modules: Dict[str, Module]) -> List[Module]:
  # Kahn's algorithm
  in_degree: Dict[str, int] = {mp: 0 for mp in modules}
  for m in modules.values():
    for req in m.requires:
      if req in modules:
        in_degree[m.module_path] += 1

  queue: List[str] = [mp for mp, deg in in_degree.items() if deg == 0]
  ordered: List[Module] = []
  while queue:
    mp = queue.pop(0)
    ordered.append(modules[mp])
    for dep in modules[mp].dependents:
      in_degree[dep] -= 1
      if in_degree[dep] == 0:
        queue.append(dep)
  # If cycle (shouldn't happen), just return arbitrary order
  if len(ordered) != len(modules):
    return list(modules.values())
  logging.info("release order: %s", ", ".join(m.module_path for m in ordered))
  return ordered


def update_dependents_for_release(
  modules: Dict[str, Module],
  released_module: Module,
  released_version: str,
  commit: bool,
  push: bool,
) -> List[Module]:
  """
  For each dependent module, update go.mod to require the released_module at released_version.
  Returns the list of modules that were touched (and thus should be considered changed for this run).
  """
  touched: List[Module] = []
  for dependent_path in sorted(released_module.dependents):
    dep_mod = modules.get(dependent_path)
    if not dep_mod:
      continue
    go_mod_file = dep_mod.rel_dir / "go.mod"
    if not go_mod_file.exists():
      continue
    original = go_mod_file.read_text(encoding="utf-8")
    updated = update_go_mod_require_version(original, released_module.module_path, released_version)
    if updated != original:
      go_mod_file.write_text(updated, encoding="utf-8")
      stage_and_maybe_commit([go_mod_file], f"chore({dep_mod.name}): require {released_module.name} v{released_version}", commit, push)
      logging.info("updated dependent %s go.mod -> %s %s", dep_mod.name, released_module.name, released_version)
      touched.append(dep_mod)
  return touched


def update_starters(modules: Dict[str, Module], commit: bool, push: bool) -> None:
  updated_paths: List[Path] = []
  latest_hugo = get_latest_hugo_version()
  yaml = YAML()
  yaml.preserve_quotes = True

  for starter_dir in sorted([p for p in STARTERS_DIR.glob("*") if p.is_dir()]):
    # skip non-starters explicitly (none yet) and respect ignore list
    go_mod = starter_dir / "go.mod"
    if go_mod.exists():
      text = go_mod.read_text(encoding="utf-8")
      new_text = text
      # For any internal module referenced, replace with its latest tag version
      referenced = _extract_requires_from_go_mod(text)
      for module_path in referenced:
        if module_path in modules:
          latest = modules[module_path].last_version()
          if latest:
            new_text = update_go_mod_require_version(new_text, module_path, latest)
      if new_text != text:
        go_mod.write_text(new_text, encoding="utf-8")
        updated_paths.append(go_mod)
        logging.info("starter %s: updated go.mod module versions", starter_dir.name)

    # bump hugo version in hugoblox.yaml
    hb_yaml = starter_dir / "hugoblox.yaml"
    if latest_hugo and hb_yaml.exists():
      with hb_yaml.open("r", encoding="utf-8") as f:
        data = yaml.load(f) or {}
      if "build" not in data:
        data["build"] = {}
      if data["build"].get("hugo_version") != latest_hugo:
        data["build"]["hugo_version"] = SingleQuotedScalarString(latest_hugo)
        with hb_yaml.open("w", encoding="utf-8") as f:
          yaml.dump(data, f)
        updated_paths.append(hb_yaml)
        logging.info("starter %s: hugoblox.yaml hugo_version -> %s", starter_dir.name, latest_hugo)

    # bump netlify.toml HUGO_VERSION
    netlify = starter_dir / "netlify.toml"
    if latest_hugo and netlify.exists():
      parsed = tomlkit.parse(netlify.read_text(encoding="utf-8"))
      if "build" in parsed and "environment" in parsed["build"]:
        env = parsed["build"]["environment"]
        if env.get("HUGO_VERSION") != latest_hugo:
          env["HUGO_VERSION"] = latest_hugo
          netlify.write_text(tomlkit.dumps(parsed), encoding="utf-8")
          updated_paths.append(netlify)
          logging.info("starter %s: netlify.toml HUGO_VERSION -> %s", starter_dir.name, latest_hugo)

    # bump devcontainer Hugo version (new location for Hugo pin)
    update_devcontainer_hugo(starter_dir, latest_hugo, updated_paths)

  if updated_paths:
    stage_and_maybe_commit(updated_paths, "chore(templates): bump modules and Hugo", commit, push)


def update_starters_to_commits(modules: Dict[str, Module], commit: bool, push: bool) -> None:
  """Update starters to use latest commit hashes of modules instead of tagged versions."""
  updated_paths: List[Path] = []
  latest_hugo = get_latest_hugo_version()
  yaml = YAML()
  yaml.preserve_quotes = True

  # Get commit info for all modules first
  module_commit_info: Dict[str, Tuple[str, str]] = {}  # module_path -> (pseudo_version, short_description)
  for module in modules.values():
    commit_info = get_module_latest_commit_info(module)
    if commit_info:
      commit_hash, timestamp = commit_info
      pseudo_version = format_pseudo_version(commit_hash, timestamp)
      short_desc = f"{commit_hash[:7]} ({timestamp.strftime('%Y-%m-%d %H:%M:%S')})"
      module_commit_info[module.module_path] = (pseudo_version, short_desc)
      logging.info("module %s -> %s (%s)", module.name, pseudo_version, short_desc)

  for starter_dir in sorted([p for p in STARTERS_DIR.glob("*") if p.is_dir()]):
    # Update go.mod with commit-based pseudo-versions
    go_mod = starter_dir / "go.mod"
    if go_mod.exists():
      text = go_mod.read_text(encoding="utf-8")
      new_text = text
      referenced = _extract_requires_from_go_mod(text)
      
      for module_path in referenced:
        if module_path in modules and module_path in module_commit_info:
          pseudo_version, short_desc = module_commit_info[module_path]
          new_text = update_go_mod_require_pseudo_version(new_text, module_path, pseudo_version)
          logging.info("starter %s: %s -> %s", starter_dir.name, modules[module_path].name, short_desc)
      
      if new_text != text:
        go_mod.write_text(new_text, encoding="utf-8")
        updated_paths.append(go_mod)
        logging.info("starter %s: updated go.mod to use commit versions", starter_dir.name)

    # bump hugo version in hugoblox.yaml (same as regular update_starters)
    hb_yaml = starter_dir / "hugoblox.yaml"
    if latest_hugo and hb_yaml.exists():
      with hb_yaml.open("r", encoding="utf-8") as f:
        data = yaml.load(f) or {}
      if "build" not in data:
        data["build"] = {}
      if data["build"].get("hugo_version") != latest_hugo:
        data["build"]["hugo_version"] = SingleQuotedScalarString(latest_hugo)
        with hb_yaml.open("w", encoding="utf-8") as f:
          yaml.dump(data, f)
        updated_paths.append(hb_yaml)
        logging.info("starter %s: hugoblox.yaml hugo_version -> %s", starter_dir.name, latest_hugo)

    # bump netlify.toml HUGO_VERSION (same as regular update_starters)
    netlify = starter_dir / "netlify.toml"
    if latest_hugo and netlify.exists():
      parsed = tomlkit.parse(netlify.read_text(encoding="utf-8"))
      if "build" in parsed and "environment" in parsed["build"]:
        env = parsed["build"]["environment"]
        if env.get("HUGO_VERSION") != latest_hugo:
          env["HUGO_VERSION"] = latest_hugo
          netlify.write_text(tomlkit.dumps(parsed), encoding="utf-8")
          updated_paths.append(netlify)
          logging.info("starter %s: netlify.toml HUGO_VERSION -> %s", starter_dir.name, latest_hugo)

    # bump devcontainer Hugo version (same as regular update_starters)
    update_devcontainer_hugo(starter_dir, latest_hugo, updated_paths)

  if updated_paths:
    stage_and_maybe_commit(updated_paths, "chore(templates): update modules to latest commits", commit, push)
    logging.info("Updated %d template files to use latest module commits", len(updated_paths))


def ensure_clean_worktree() -> None:
  res = run_cmd(["git", "status", "--porcelain"], cwd=REPO_ROOT)
  dirty = [l for l in res.stdout.splitlines() if l.strip()]
  if dirty:
    raise RuntimeError("Working tree is dirty. Commit or stash changes before running with --yes. Use --dry-run to preview.")
  logging.info("working tree is clean")


def main() -> None:
  parser = argparse.ArgumentParser(description="Release HugoBlox modules.")
  parser.add_argument("--yes", action="store_true", help="Execute changes (commits, tags, pushes). Without this, it's a dry run.")
  parser.add_argument("--dry-run", action="store_true", help="Alias for not passing --yes; forces no-op execution.")
  parser.add_argument("--propagate", action="store_true", default=True, help="Propagate dependency updates to dependents (default true).")
  parser.add_argument("--no-propagate", dest="propagate", action="store_false", help="Do not bump dependents purely for dependency updates.")
  parser.add_argument("--allow-major", action="store_true", help="Allow major version bumps when inferred from commits. By default majors are downgraded to minor to avoid Go module path changes.")
  parser.add_argument("--print-plan", action="store_true", help="Print the planned releases as JSON.")
  parser.add_argument("--update-starters-to-commits", action="store_true", help="Update starters to use latest module commits instead of releasing new tags. This is a standalone operation that doesn't create releases.")
  parser.add_argument("--log-level", default=os.getenv("LOG_LEVEL", "INFO"), help="Logging level: DEBUG, INFO, WARNING, ERROR")
  args = parser.parse_args()

  # Configure logging
  level = getattr(logging, str(args.log_level).upper(), logging.INFO)
  logging.basicConfig(level=level, format="%(asctime)s %(levelname)s %(message)s")

  yes = bool(args.yes) and not bool(args.dry_run)
  commit = yes
  push = yes

  modules = discover_modules()
  order = topological_order(modules)

  # Handle the standalone --update-starters-to-commits option
  if args.update_starters_to_commits:
    if yes:
      ensure_clean_worktree()
    logging.info("Updating templates to use latest module commits...")
    update_starters_to_commits(modules, commit=yes, push=yes)
    logging.info("Template update to commits complete")
    return

  if yes:
    ensure_clean_worktree()

  # Detect changes and planned bumps
  planned: Dict[str, Dict[str, str]] = {}
  will_release: Set[str] = set()
  changed_since_tag: Dict[str, bool] = {}

  for m in order:
    tag = m.current_version_tag()
    changed = has_changes_since_tag(m, tag)
    changed_since_tag[m.module_path] = changed
    if not changed:
      continue
    commits = get_commits_since_tag(m, tag)
    bump = determine_bump_from_commits(commits)
    effective_bump = "minor" if (bump == "major" and not args.allow_major) else bump
    next_version = bump_semver(m.last_version(), effective_bump, m.major if m.major >= 2 else None)
    planned[m.module_path] = {
      "name": m.name,
      "path": m.rel_dir.as_posix(),
      "last": m.last_version() or "<none>",
      "next": next_version,
      "bump": bump,
      "effective_bump": effective_bump,
    }
    will_release.add(m.module_path)
    logging.info("plan: %s -> %s (bump=%s, effective=%s)", m.name, next_version, bump, effective_bump)

  # If propagate is enabled, any dependent of a releasing module is considered for release later (due to go.mod update)
  if args.propagate:
    frontier = list(will_release)
    while frontier:
      mp = frontier.pop()
      for dep in modules[mp].dependents:
        if dep not in will_release:
          # For dependents that weren't changed otherwise, default to patch bump
          base_version = modules[dep].last_version()
          next_version = bump_semver(base_version, "patch", modules[dep].major if modules[dep].major >= 2 else None)
          planned[dep] = planned.get(dep, {
            "name": modules[dep].name,
            "path": modules[dep].rel_dir.as_posix(),
            "last": base_version or "<none>",
            "next": next_version,
            "bump": "patch",
          })
          will_release.add(dep)
          frontier.append(dep)

  if args.print_plan or not yes:
    print(json.dumps({
      "planned_releases": planned,
      "order": [m.module_path for m in order],
    }, indent=2))

  if not yes:
    return

  # 1) Release in dependency order: sync module go.mod deps, update metadata, commit, tag, push, then update dependents' go.mod
  latest_versions: Dict[str, str] = {}
  for m in order:
    if m.module_path not in will_release:
      continue
    next_version = planned[m.module_path]["next"]

    touched_files: List[Path] = []
    # Sync internal deps in this module's go.mod to latest known tags before tagging
    go_mod_synced = update_module_requirements_to_latest(m, modules, latest_versions)
    if go_mod_synced:
      touched_files.append(go_mod_synced)
    # Special-case blox theme version bump and citation metadata
    touched_files.extend(write_blox_tailwind_theme_version(m, next_version))
    touched_files.extend(update_citation_release_info(m, next_version))

    # Stage and commit any pre-release file changes
    if touched_files:
      stage_and_maybe_commit(touched_files, f"chore({m.name}): prepare v{next_version}", commit=True, push=True)

    # Tag and push
    create_and_push_tag(m, next_version, yes=True)
    latest_versions[m.module_path] = next_version
    logging.info("released %s v%s", m.name, next_version)

    # Update dependents to require this new version (causes their go.mod to change)
    touched_dependents = update_dependents_for_release(modules, m, next_version, commit=True, push=True)
    # Note: those dependents will be tagged in their respective iteration when reached in order

  # 2) After all module tags are created and dependents were updated, ensure every planned module has been tagged
  # It's possible a dependent with no other changes still needs a tag due to go.mod update above
  for m in order:
    if m.module_path not in will_release:
      continue
    # If it wasn't directly tagged earlier (it was), this loop is just a safeguard
    next_version = planned[m.module_path]["next"]
    # Verify tag exists; if not, create it
    tag = f"{m.rel_dir.as_posix()}/v{next_version}"
    res = run_cmd(["git", "tag", "--list", tag], cwd=REPO_ROOT)
    if not res.stdout.strip():
      create_and_push_tag(m, next_version, yes=True)

  # 3) Update Templates
  update_starters(modules, commit=True, push=True)

  logging.info("release complete")


if __name__ == "__main__":
  try:
    main()
  except Exception as e:
    logging.exception("release failed: %s", e)
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
