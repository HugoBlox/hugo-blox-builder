#!/usr/bin/env zsh

exitfn () {
    trap SIGINT
    cd "$INITIAL_DIR"
    exit
}

trap "exitfn" INT

usage() {
    echo "View a starter template with published production modules."
    echo ""
    echo "Usage: ./scripts/view-starter-prod.sh [<starter-name>]"
    echo "Example: ./scripts/view-starter-prod.sh blog"
    echo "Default starter: academic-cv (if no starter-name provided)"
    echo ""
    echo "This script uses:"
    echo "  • Published/released modules (no local overrides)"
    echo "  • Production environment (simulates end-user experience)"
    echo "  • Minimal configuration for testing published versions"
}

STARTER="${1:-academic-cv}"  # Default to academic-cv if no argument provided
INITIAL_DIR=$(pwd)

# Run Hugo from the starter directory so Tailwind v4 CLI is discoverable by Hugo
cd "templates/$STARTER"

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

# Use production environment with published modules (no local module replacements)
HUGO_ENVIRONMENT=production \
hugo server --panicOnWarning --renderStaticToDisk -F --port 8081 --bind 0.0.0.0

trap SIGINT
