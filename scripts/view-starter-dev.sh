#!/usr/bin/env bash

exitfn () {
    trap SIGINT              # Restore signal handling for SIGINT
    cd ../..
    exit                     #   then exit script.
}

trap "exitfn" INT            # Set up SIGINT trap to call function.

# export HUGO_STATS_PATH="./starters/$1/hugo_stats.json"
# printf 'HUGO_STATS_PATH: %s\n' "$HUGO_STATS_PATH"

# `--source "starters/$1"` won't work for Tailwind Module
# due to Hugo limitation requiring Hugo to be run from site dir
cd "starters/$1"

export WC_DEMO=true \
export HUGO_ENVIRONMENT=development \
export HUGOxPARAMSxDECAP_CMSxLOCAL_BACKEND=true \
export HUGO_MODULE_REPLACEMENTS="github.com/HugoBlox/hugo-blox-builder/modules/blox-bootstrap/v5 -> ../../../modules/blox-bootstrap,
github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-netlify -> ../../../modules/blox-plugin-netlify,
github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-reveal -> ../../../modules/blox-plugin-reveal,
github.com/HugoBlox/hugo-blox-builder/modules/blox-tailwind -> ../../../modules/blox-tailwind,
github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-decap-cms -> ../../../modules/blox-plugin-decap-cms,
github.com/HugoBlox/hugo-blox-builder/modules/blox-core -> ../../../modules/blox-core,
github.com/HugoBlox/hugo-blox-builder/modules/blox-seo -> ../../../modules/blox-seo" \
hugo && \
npm_config_yes=true npx pagefind --site "public" --output-subdir ../static/pagefind && \
hugo server --panicOnWarning --renderStaticToDisk -F --port 8081 --bind 0.0.0.0

trap SIGINT                  # Restore signal handling to previous before exit.
