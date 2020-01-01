#!/usr/bin/env zsh

# Generate preprocessed resources for demo site whilst also removing disused resources.
# Run this script from the root Academic dir.
HUGO_THEME=academic hugo --source exampleSite --themesDir ../../ --gc
