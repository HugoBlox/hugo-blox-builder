# Analytics module

**A Hugo Blox module for website analytics and search engine verification.**

Are you using the `blox` module? The analytics module is already included, so you do not need to install it. For all other sites, refer to the installation guide below.

## Install

Get analytics and verification for your Hugo site by following the guide below:

1. Add the module to your `config/_default/hugo.yaml`:

   ```yaml
   module:
     imports:
       - path: github.com/HugoBlox/kit/modules/analytics
   ```

2. Load the module in your site's `<head>` with:

   ```go
   {{ partial "blox-analytics/index" . }}
   ```

## Usage

[View the documentation](https://docs.hugoblox.com/reference/analytics/)
