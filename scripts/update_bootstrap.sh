#!/usr/bin/env bash
# Script to copy Bootstrap files into project after running `yarn` to download Bootstrap.
# Use:
# 1. run from project root: zsh ./scripts/update_bootstrap.sh
# 2. rename bootstrap/vendor -> _vendor
# 3. update renamed dir in _mixins.scss to `@import "_vendor/rfs";`
# 4. update jQuery and Popper CDN dependencies

ASSETS_JS_DIR="blox-bootstrap/assets/js/_vendor/"
ASSETS_SCSS_DIR="blox-bootstrap/assets/scss/_vendor/"

mkdir -p $ASSETS_SCSS_DIR/bootstrap/

cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js $ASSETS_JS_DIR
cp -r node_modules/bootstrap/scss/* $ASSETS_SCSS_DIR/bootstrap/

# cp node_modules/jquery/dist/jquery.min.js $ASSETS_JS_DIR
# cp node_modules/popper.js/dist/umd/popper.min.js $ASSETS_JS_DIR
