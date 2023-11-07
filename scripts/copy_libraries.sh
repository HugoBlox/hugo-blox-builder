#!/usr/bin/env bash

# Install node_modules manually so that users don't need to use Yarn.

cd ..

cp node_modules/jquery/dist/jquery.min.js blox-bootstrap/assets/js/_vendor/
cp node_modules/instant.page/instantpage.js blox-bootstrap/assets/js/_vendor/
cp -r 'node_modules/@fortawesome/fontawesome-free/webfonts' blox-bootstrap/static/
cp -r 'node_modules/@fortawesome/fontawesome-free/css/all.min.css' blox-bootstrap/assets/css/libs/fontawesome
