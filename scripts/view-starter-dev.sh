#!/usr/bin/env bash

set -euo pipefail

INITIAL_DIR="$(pwd)"

cleanup() {
    cd "$INITIAL_DIR" || true
}
trap cleanup EXIT INT TERM

usage() {
    echo "View a starter template with local development modules and debug features."
    echo ""
    echo "Usage: ./scripts/view-starter-dev.sh [<starter-name>] [--debug] [--no-pagefind]"
    echo "Example: ./scripts/view-starter-dev.sh blog --debug"
    echo "Default starter: academic-cv (if no starter-name provided)"
    echo ""
    echo "This script uses:"
    echo "  • Local development modules (via HUGO_MODULE_REPLACEMENTS)"
    echo "  • Development environment with demo/debug flags enabled"
    echo "  • Optional Pagefind search indexing and enhanced debugging"
}

STARTER="academic-cv"  # Default starter if none provided
DEBUG_MODE=false
PAGEFIND=true

while [ $# -gt 0 ]; do
    case "$1" in
        --debug)
            DEBUG_MODE=true
            shift
            ;;
        --no-pagefind)
            PAGEFIND=false
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -*)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
        *)
            STARTER="$1"
            shift
            ;;
    esac
done


# Run Hugo from the site dir so Tailwind CLI is discoverable
cd "templates/$STARTER"

# Ensure Tailwind CLI and Pagefind exist in starter (required for Hugo css.TailwindCSS and search indexing)
if [ -f "package.json" ] && { [ ! -x "node_modules/.bin/tailwindcss" ] || [ ! -x "node_modules/.bin/pagefind" ]; }; then
    echo "📦 Installing starter dependencies for Hugo..."
    if command -v pnpm >/dev/null 2>&1; then
        pnpm install
    else
        npm install
    fi
fi

# Core environment for local dev linking modules and enabling demo/debug flags
export HUGO_BLOX_DEMO=true
export HUGO_BLOX_DEBUG=true
export HUGO_ENVIRONMENT=development
export HUGO_BLOX_MONOREPO=true

# Link local modules for development (Hugo module replacements)
export HUGO_MODULE_REPLACEMENTS="\
github.com/HugoBlox/kit/modules/blox -> ../../../modules/blox,\
github.com/HugoBlox/kit/modules/analytics -> ../../../modules/analytics,\
github.com/HugoBlox/kit/modules/integrations/netlify -> ../../../modules/integrations/netlify,\
github.com/HugoBlox/kit/modules/slides -> ../../../modules/slides"

# Optionally pre-build and generate Pagefind index for local search
if [ "$PAGEFIND" = true ]; then
    hugo
    if command -v pnpm >/dev/null 2>&1; then
        pnpm exec pagefind --site "public" --output-subdir ../static/pagefind
    else
        npm_config_yes=true npx pagefind --site "public" --output-subdir ../static/pagefind
    fi
fi

# Compose Hugo server args
HUGO_ARGS=(
    server
    --disableFastRender
    --printI18nWarnings
    --printPathWarnings
    --gc
    -F
    --port 8081
    --bind 0.0.0.0
)

if [ "$DEBUG_MODE" = true ]; then
    HUGO_ARGS+=(
        --panicOnWarning
        --logLevel debug
        --templateMetrics
        --templateMetricsHints
        --ignoreCache
        --noHTTPCache
        --renderStaticToDisk
        -D
        -E
    )
fi

hugo "${HUGO_ARGS[@]}"
