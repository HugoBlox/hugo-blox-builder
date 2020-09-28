#!/usr/bin/env zsh

# View the demo site on any local devices by binding the local IP on port 1315.
# Run this script from the root Wowchemy dir.
HUGO_THEME=wowchemy-hugo-modules hugo \
--source exampleSite --themesDir ../../ \
--bind=0.0.0.0 -p 1315 --baseURL=http://0.0.0.0:1315 \
--i18n-warnings --minify -e "development" \
server

#HUGO_THEME=wowchemy-hugo hugo convert toYAML --unsafe --themesDir ../../
