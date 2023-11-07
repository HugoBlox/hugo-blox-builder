#!/usr/bin/env zsh

# Generate preprocessed resources for demo site whilst also removing disused resources.
# Run this script from the root Hugo Blox dir.
HUGO_THEME=hugo-blox-builder hugo --source exampleSite --themesDir ../../ --gc
