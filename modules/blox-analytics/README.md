# blox-analytics

**A Hugo module (plugin) for website analytics and search engine verification.**

Are you using the `blox-tailwind` module? The analytics module is already included, so you do not need to install it. For all other sites, refer to the installation guide below.

## Install

Get analytics and verification for your Hugo site by following the guide below:

1. Add the module to your `config/_default/hugo.yaml`:

   ```yaml
   module:
     imports:
       - path: github.com/HugoBlox/hugo-blox-builder/modules/blox-analytics
   ```

2. Load the module in your site's `<head>` with:

   ```go
   {{ partial "blox-analytics/index" . }}
   ```

## Usage

[View the documentation](https://docs.hugoblox.com/reference/analytics/)
