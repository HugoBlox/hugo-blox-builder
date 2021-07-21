#!/usr/bin/env bash

# Install node_modules manually so that users don't need to use Yarn.

cd ..

cp node_modules/jquery/dist/jquery.min.js wowchemy/assets/js/_vendor/
cp node_modules/instant.page/instantpage.js wowchemy/assets/js/_vendor/
cp -r 'node_modules/@fortawesome/fontawesome-free/webfonts' wowchemy/static/
cp -r 'node_modules/@fortawesome/fontawesome-free/css/all.min.css' wowchemy/assets/css/libs/fontawesome
