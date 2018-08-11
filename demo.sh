#!/usr/bin/env bash

cd exampleSite
hugo -t academic --themesDir ../.. -p 1315 --i18n-warnings server
