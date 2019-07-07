#!/usr/bin/env python3

# Sync Language Packs
# Script to synchronize each language pack's items against Academic's master pack (English).
# https://sourcethemes.com/academic/
#
# Prerequisites: pip3 install PyYAML
#
# TODO: Switch from PyYAML to Ruamel in order to load/dump comments -
#  see https://stackoverflow.com/questions/47382227/python-yaml-update-preserving-order-and-comments

import copy
from pathlib import Path
import yaml

I18N_PATH = Path(__file__).resolve().parent.parent.joinpath('i18n')
MASTER_PACK = I18N_PATH.joinpath('en.yaml')


# Load master language pack (English).
with open(MASTER_PACK) as f:
  master_map = yaml.safe_load(f)
  # if (DEBUG)
  #   print(master_map)

# Iterate over each child language pack.
cnt = 0
for filename in Path(I18N_PATH).glob("*.yaml"):
  if filename.stem != 'en':
    i18n_file = I18N_PATH.joinpath(filename)
    print(f"Processing {i18n_file} ...")

    # Load a child language pack.
    with open(i18n_file) as f:
      child_map = yaml.safe_load(f)

    # Synchronize the language pack's structure against the master language pack.
    tmp_map = copy.deepcopy(master_map)  # Make a temporary deep copy of the master map (list of objects).
    master_index = 0
    for master_item in master_map:
      translation = next((item['translation'] for item in child_map if item['id'] == master_item['id']),
                         master_item['translation'])
      tmp_map[master_index]['translation'] = translation
      master_index += 1

    # Write the synced language pack to file.
    with open(i18n_file, 'w') as f:
      yaml.dump(tmp_map, f, allow_unicode=True, width=float("inf"))  # PyYAML will break lines unless a large column width is set.
    cnt += 1

# Print results.
print(f"{cnt} child language packs successfully synchronized!")
