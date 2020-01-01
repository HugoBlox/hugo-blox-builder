#!/usr/bin/env zsh

# View the demo site on any local devices by binding the local IP on port 1315.
# Run this script from the root Academic dir.
HUGO_THEME=academic hugo --source exampleSite --themesDir ../../ --i18n-warnings --bind=0.0.0.0 -p 1315 --baseURL=http://0.0.0.0:1315 server
