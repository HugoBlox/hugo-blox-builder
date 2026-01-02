#!/usr/bin/env python3

import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIR = ROOT / "scripts"
if str(SCRIPTS_DIR) not in sys.path:
  sys.path.insert(0, str(SCRIPTS_DIR))

try:
  import requests  # type: ignore
except ModuleNotFoundError:
  import types

  class _DummyResponse:
    status_code = 0

    def json(self):
      return {}

  requests = types.SimpleNamespace(get=lambda *args, **kwargs: _DummyResponse())
  sys.modules["requests"] = requests

try:
  import tomlkit  # type: ignore
except ModuleNotFoundError:
  import types

  def _noop_parse(content: str):
    return {}

  def _noop_dumps(data):
    return ""

  tomlkit = types.SimpleNamespace(parse=_noop_parse, dumps=_noop_dumps)
  sys.modules["tomlkit"] = tomlkit

try:
  from ruamel.yaml import YAML  # type: ignore
  from ruamel.yaml.scalarstring import SingleQuotedScalarString  # type: ignore
except ModuleNotFoundError:
  import types

  class _DummyYAML:
    preserve_quotes = False

    def load(self, stream):
      return {}

    def dump(self, data, stream=None):
      if stream and hasattr(stream, "write"):
        stream.write("")
      return ""

  class _DummyScalarString(str):
    pass

  ruamel_module = types.ModuleType("ruamel")
  ruamel_yaml_module = types.ModuleType("ruamel.yaml")
  ruamel_yaml_scalar_module = types.ModuleType("ruamel.yaml.scalarstring")
  ruamel_yaml_module.YAML = _DummyYAML
  ruamel_yaml_scalar_module.SingleQuotedScalarString = _DummyScalarString
  ruamel_module.yaml = ruamel_yaml_module
  sys.modules["ruamel"] = ruamel_module
  sys.modules["ruamel.yaml"] = ruamel_yaml_module
  sys.modules["ruamel.yaml.scalarstring"] = ruamel_yaml_scalar_module
  YAML = _DummyYAML
  SingleQuotedScalarString = _DummyScalarString

import release_modules


class UpdateCitationReleaseInfoTests(unittest.TestCase):
  def setUp(self) -> None:
    self.original_repo_root = release_modules.REPO_ROOT
    self.original_datetime = release_modules.datetime

  def tearDown(self) -> None:
    release_modules.REPO_ROOT = self.original_repo_root
    release_modules.datetime = self.original_datetime

  def _patch_repo_root_with_citation(self, content: str) -> Path:
    tmp_dir = tempfile.TemporaryDirectory()
    self.addCleanup(tmp_dir.cleanup)
    repo_root = Path(tmp_dir.name)
    (repo_root / "CITATION.cff").write_text(content, encoding="utf-8")
    release_modules.REPO_ROOT = repo_root
    return repo_root

  def test_updates_version_and_date_for_blox(self) -> None:
    repo_root = self._patch_repo_root_with_citation(
      'version: "0.10.0"\ndate-released: 2024-01-01\n',
    )

    original_datetime = release_modules.datetime

    class FixedDatetime(original_datetime):
      @classmethod
      def now(cls, tz=None):
        return cls(2024, 2, 3, tzinfo=tz)

    release_modules.datetime = FixedDatetime

    module = release_modules.Module(
      name="blox",
      rel_dir=Path("modules/blox"),
      module_path="modules/blox",
      major=0,
    )

    updated_paths = release_modules.update_citation_release_info(module, "1.2.3")
    self.assertEqual(updated_paths, [repo_root / "CITATION.cff"])

    contents = (repo_root / "CITATION.cff").read_text(encoding="utf-8")
    self.assertIn('version: "1.2.3"', contents)
    self.assertIn("date-released: 2024-02-03", contents)

  def test_noop_for_non_blox_tailwind_module(self) -> None:
    repo_root = self._patch_repo_root_with_citation('version: "0.10.0"\n')

    module = release_modules.Module(
      name="other-module",
      rel_dir=Path("modules/other-module"),
      module_path="modules/other-module",
      major=0,
    )

    result = release_modules.update_citation_release_info(module, "9.9.9")
    self.assertEqual(result, [])

    contents = (repo_root / "CITATION.cff").read_text(encoding="utf-8")
    self.assertEqual(contents, 'version: "0.10.0"\n')


if __name__ == "__main__":
  unittest.main()
