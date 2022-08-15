#!/usr/bin/env zsh

HUGOxPARAMSxCMSxLOCAL_BACKEND=true \
HUGO_MODULE_REPLACEMENTS="github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy/v5 -> ../../../modules/wowchemy,
github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify -> ../../../modules/wowchemy-plugin-netlify,
github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-reveal -> ../../../modules/wowchemy-plugin-reveal,
github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify-cms -> ../../../modules/wowchemy-plugin-netlify-cms" \
hugo server --panicOnWarning --renderStaticToDisk -F --port 8081 --bind 0.0.0.0 \
--source "starters/$1"
