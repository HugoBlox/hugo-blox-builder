#!/usr/bin/env zsh

# Generate preprocessed resources for demo site whilst also removing disused resources.
# Run this script from the root Wowchemy dir.
HUGO_THEME=wowchemy-hugo-modules hugo --source exampleSite --themesDir ../../ --gc
