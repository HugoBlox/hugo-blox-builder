#!/usr/bin/env python3

# Sync Language Packs
# Script to synchronize each language pack's items against Hugo Blox's master pack (English).
# https://hugoblox.com
#
# Prerequisites: pip3 install ruamel.yaml
# Note: we use Ruamel rather than PyYAML in order to preserve comments in language packs.

import copy
from pathlib import Path
from ruamel.yaml import YAML

I18N_PATH = Path(__file__).resolve().parents[1].joinpath(
    'modules', 'blox-tailwind', 'i18n')
MASTER_PACK = I18N_PATH.joinpath('en.yaml')

yaml = YAML()
yaml.width = 5000  # large column width to avoid line breaks

# Load master language pack (English).
master_map = yaml.load(MASTER_PACK)

# Iterate over each child language pack (excluding 'en.yaml').
files = set(I18N_PATH.glob("*.yaml")) - set([MASTER_PACK])
tot = len(files)

for cnt, filename in enumerate(files):
    i18n_file = I18N_PATH.joinpath(filename)
    print(f"[{cnt+1:02d}/{tot:02d}] Processing {i18n_file} ...")

    # Load a child language pack.
    child_map = yaml.load(i18n_file)

    # Synchronize the language pack's structure against the master language pack.
    # Make a temporary deep copy of the master map (list of objects).
    tmp_map = copy.deepcopy(master_map)

    for master_index, master_item in enumerate(master_map):
        translation = next((item['translation'] for item in child_map if item['id'] == master_item['id']),
                            master_item['translation'])
        tmp_map[master_index]['translation'] = translation

    # Write the synced language pack to file.
    yaml.dump(tmp_map, i18n_file)

# Print results.
print(f"{tot} child language packs successfully synchronized!")
