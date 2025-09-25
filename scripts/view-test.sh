#!/usr/bin/env bash

set -euo pipefail

INITIAL_DIR="$(pwd)"

cleanup() {
    cd "$INITIAL_DIR" || true
}
trap cleanup EXIT INT TERM

usage() {
    echo "View the test site with local development modules."
    echo ""
    echo "Usage: ./scripts/view-test.sh [--debug]"
    echo "Example: ./scripts/view-test.sh --debug"
    echo ""
    echo "This script uses:"
    echo "  • Local development modules (via go.mod replace directives)"
    echo "  • Development environment for testing"
}

DEBUG_MODE=false

while [ $# -gt 0 ]; do
    case "$1" in
        --)
            # Skip the -- separator from pnpm
            shift
            ;;
        --debug)
            DEBUG_MODE=true
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
            echo "Unexpected argument: $1"
            usage
            exit 1
            ;;
    esac
done

# Run Hugo from the test dir
cd "test"

# Ensure dependencies are installed if needed
if [ -f "package.json" ] && [ ! -x "node_modules/.bin/tailwindcss" ]; then
    echo "📦 Installing dependencies in test directory..."
    if command -v pnpm >/dev/null 2>&1; then
        pnpm install
    else
        npm install
    fi
fi

# Core environment for local dev
export HUGO_ENVIRONMENT=development
export HUGO_BLOX_MONOREPO=true
export HUGO_BLOX_TEST_SITE=true

# Note: The test/go.mod already has replace directives for local modules,
# so we don't need HUGO_MODULE_REPLACEMENTS here

# Compose Hugo server args
HUGO_ARGS=(
    server
    --disableFastRender
    --printI18nWarnings
    --printPathWarnings
    --gc
    -F
    --port 8082
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

echo "🚀 Starting test site on http://localhost:8082"
hugo "${HUGO_ARGS[@]}"
