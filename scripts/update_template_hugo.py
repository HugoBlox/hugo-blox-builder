#!/usr/bin/env python3
import argparse
import re
import json
import sys
from pathlib import Path

def update_file_regex(path, pattern, replacement):
    file_path = Path(path)
    if not file_path.exists():
        print(f"Warning: {path} not found.")
        return False
    
    content = file_path.read_text()
    if re.search(pattern, content):
        new_content = re.sub(pattern, replacement, content)
        file_path.write_text(new_content)
        print(f"Updated {path}")
        return True
    else:
        print(f"Warning: Pattern not found in {path}")
        return False

def update_devcontainer(path, new_version):
    file_path = Path(path)
    if not file_path.exists():
        print(f"Warning: {path} not found.")
        return False
        
    try:
        content = json.loads(file_path.read_text())
        # Update Hugo feature version
        features = content.get("features", {})
        hugo_feature = features.get("ghcr.io/devcontainers/features/hugo:1")
        if hugo_feature:
            hugo_feature["version"] = new_version
            file_path.write_text(json.dumps(content, indent=2) + "\n") # standard json formatting
            print(f"Updated {path}")
            return True
        else:
            print(f"Warning: Hugo feature not found in {path}")
            return False
    except Exception as e:
        print(f"Error updating {path}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Update Hugo version in template files")
    parser.add_argument("version", help="New Hugo version (e.g., 0.152.2)")
    args = parser.parse_args()
    
    version = args.version
    
    # List of templates to update
    templates = [
        "academic-cv",
        "blog",
        "documentation",
        "landing-page",
        "link-in-bio",
        "resume"
    ]
    
    for template in templates:
        print(f"\nProcessing template: {template}")
        template_dir = Path(f"templates/{template}")
        
        # 1. Update hugoblox.yaml
        update_file_regex(
            template_dir / "hugoblox.yaml",
            r"hugo_version: .*",
            f"hugo_version: '{version}'"
        )
        
        # 2. Update netlify.toml
        update_file_regex(
            template_dir / "netlify.toml",
            r'HUGO_VERSION = ".*"',
            f'HUGO_VERSION = "{version}"'
        )
        
        # 3. Update devcontainer.json
        update_devcontainer(
            template_dir / ".devcontainer/devcontainer.json",
            version
        )

    print(f"\nSuccessfully updated all templates to Hugo v{version}")
    print("Note: .github/workflows/deploy.yml is configured to read the version dynamically from hugoblox.yaml.")

if __name__ == "__main__":
    main()
