#!/usr/bin/env zsh

HUGOxPARAMSxCMSxLOCAL_BACKEND=true \
hugo server --panicOnWarning --renderStaticToDisk -F --port 8081 --bind 0.0.0.0 \
--source "starters/$1"
