#!/usr/bin/env bash

exitfn () {
    trap SIGINT              # Restore signal handling for SIGINT
    cd ../..
    exit                     #   then exit script.
}

trap "exitfn" INT            # Set up SIGINT trap to call function.

# Check if starter name is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/view-starter-dev.sh <starter-name>"
    echo "Example: ./scripts/view-starter-dev.sh blog"
    exit 1
fi

# Install Tailwind v4 dependencies if blox-tailwind module is present
if [ -d "modules/blox-tailwind" ]; then
    echo "📦 Installing Tailwind v4 dependencies in module..."
    cd modules/blox-tailwind
    if command -v pnpm &> /dev/null; then
        pnpm install
    else
        npm install
    fi
    cd ../..
fi

# export HUGO_STATS_PATH="./starters/$1/hugo_stats.json"
# printf 'HUGO_STATS_PATH: %s\n' "$HUGO_STATS_PATH"

# `--source "starters/$1"` won't work for Tailwind Module
# due to Hugo limitation requiring Hugo to be run from site dir
cd "starters/$1"

# Install Tailwind CLI in starter directory if package.json exists
# Hugo's css.TailwindCSS function needs to find the CLI from where Hugo runs
if [ -f "package.json" ]; then
    echo "📦 Installing Tailwind CLI in starter directory for Hugo..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    else
        npm install
    fi
fi

export HUGO_BLOX_DEMO=true \
export HUGO_BLOX_DEBUG=true \
export HUGO_ENVIRONMENT=development \
export HUGOxPARAMSxDECAP_CMSxLOCAL_BACKEND=true \
export HUGO_MODULE_REPLACEMENTS="github.com/HugoBlox/hugo-blox-builder/modules/blox-bootstrap/v5 -> ../../../modules/blox-bootstrap,
github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-netlify -> ../../../modules/blox-plugin-netlify,
github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-reveal -> ../../../modules/blox-plugin-reveal,
github.com/HugoBlox/hugo-blox-builder/modules/blox-tailwind -> ../../../modules/blox-tailwind,
github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-decap-cms -> ../../../modules/blox-plugin-decap-cms,
github.com/HugoBlox/hugo-blox-builder/modules/blox-core -> ../../../modules/blox-core,
github.com/HugoBlox/hugo-blox-builder/modules/blox-seo -> ../../../modules/blox-seo,
github.com/HugoBlox/hugo-blox-builder/modules/blox-analytics -> ../../../modules/blox-analytics" \
# START PAGEFIND
hugo && \
npm_config_yes=true npx pagefind --site "public" --output-subdir ../static/pagefind && \
# END PAGEFIND
# --renderStaticToDisk  --printUnusedTemplates  --panicOnWarning
# --templateMetrics --templateMetricsHints --ignoreCache --noHTTPCache
hugo server --disableFastRender --printI18nWarnings --printPathWarnings --gc --port 8081 --bind 0.0.0.0 --logLevel debug

trap SIGINT                  # Restore signal handling to previous before exit.
