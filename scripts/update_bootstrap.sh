#!/usr/bin/env bash
# Script to copy Bootstrap files into project after running `npm install` to download Bootstrap.
# Use: run from project root dir.

ASSETS_JS_DIR="assets/js/vendor/"
ASSETS_SCSS_DIR="assets/scss/vendor/"

mkdir -p $ASSETS_SCSS_DIR/bootstrap/

cp node_modules/bootstrap/dist/js/bootstrap.min.js $ASSETS_JS_DIR
cp -r node_modules/bootstrap/scss/* $ASSETS_SCSS_DIR/bootstrap/

# cp node_modules/jquery/dist/jquery.min.js $ASSETS_JS_DIR
# cp node_modules/popper.js/dist/umd/popper.min.js $ASSETS_JS_DIR
