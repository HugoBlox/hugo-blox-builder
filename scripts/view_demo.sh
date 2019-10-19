#!/usr/bin/env zsh

HUGO_THEME=academic hugo --source exampleSite --themesDir ../../ --i18n-warnings --bind=0.0.0.0 -p 1315 --baseURL=http://0.0.0.0:1315 server
