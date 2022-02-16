#!/usr/bin/env zsh

HUGOxPARAMSxCMSxLOCAL_BACKEND=true \
HUGO_MODULE_REPLACEMENTS="github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 -> ../../../wowchemy,github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 -> ../../../wowchemy-cms" \
hugo server -F --port 80 --bind 0.0.0.0 \
--source "starters/$1"
