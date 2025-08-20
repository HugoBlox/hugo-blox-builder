#!/usr/bin/env zsh

exitfn () {
    trap SIGINT
    cd "$INITIAL_DIR"
    exit
}

trap "exitfn" INT

if [ -z "$1" ]; then
    echo "Usage: ./scripts/view-starter.sh <starter-name>"
    echo "Example: ./scripts/view-starter.sh blog"
    exit 1
fi

INITIAL_DIR=$(pwd)

# Run Hugo from the starter directory so Tailwind v4 CLI is discoverable by Hugo
cd "starters/$1"

# Ensure Tailwind CLI is available for Hugo
if [ -f "package.json" ]; then
    if [ ! -x "node_modules/.bin/tailwindcss" ]; then
        echo "📦 Installing Tailwind CLI in starter directory for Hugo..."
        if command -v pnpm >/dev/null 2>&1; then
            pnpm install
        else
            npm install
        fi
    fi
fi

HUGO_ENVIRONMENT=development \
HUGOxPARAMSxDECAP_CMSxLOCAL_BACKEND=true \
hugo server --panicOnWarning --renderStaticToDisk -F --port 8081 --bind 0.0.0.0

trap SIGINT
