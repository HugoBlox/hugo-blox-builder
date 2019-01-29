#!/usr/bin/env bash

cd exampleSite
HUGO_THEME=academic hugo --themesDir ../../ -p 1315 --i18n-warnings server
