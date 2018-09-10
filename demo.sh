#!/usr/bin/env bash

cd exampleSite
hugo -t "hugo-academic-v3" --themesDir ../.. -p 1315 --i18n-warnings --ignoreCache server
