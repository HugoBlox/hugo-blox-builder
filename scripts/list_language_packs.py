#!/usr/bin/env python3

# List Available Language Packs
# Used for updating the Languages page of the documentation.
# https://hugoblox.com
#
# Prerequisites: pip3 install PyYAML

import yaml
from pathlib import Path

LANG_PATH = Path(__file__).resolve().parent.parent.joinpath('blox-tailwind').joinpath('data').joinpath('i18n')
LANG_YAML = LANG_PATH.joinpath('languages.yaml')


# Iterate over languages.
with open(LANG_YAML) as f:
  master_map = yaml.safe_load(f)

  # Print languages as a plaintext list.
  # lang_list = [master_map[master_item] for master_item in master_map]
  # print(', '.join(lang_list))

  # Print languages as a Markdown list.
  i = 0
  for master_item in master_map:
    print(f'- **{master_map[master_item]}** ({master_item})')
    i += 1

print("\n")
print(f"{i} language packs found!")
