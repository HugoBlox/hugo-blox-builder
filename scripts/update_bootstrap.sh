#!/usr/bin/env bash
# Script to copy Bootstrap files into project after running `yarn` to download Bootstrap.
# Use:
# 1. run from project root: zsh ./scripts/update_bootstrap.sh
# 2. update the needed Bootstrap SCSS components in main.scss

ASSETS_JS_DIR="wowchemy/assets/js/_vendor/"
ASSETS_SCSS_DIR="wowchemy/assets/scss/_vendor/"

mkdir -p $ASSETS_SCSS_DIR/bootstrap/

cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js $ASSETS_JS_DIR
cp -r node_modules/bootstrap/scss/* $ASSETS_SCSS_DIR/bootstrap/
