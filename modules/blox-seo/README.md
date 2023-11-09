# blox-seo

A Hugo plugin for [Search Engine Optimisation (SEO)](https://docs.hugoblox.com/hugo-tutorials/seo/), site verification, and [analytics](https://docs.hugoblox.com/hugo-tutorials/analytics/).

## Install

The `blox-bootstrap` module will automatically include the SEO module in your site so you don't have to.

Otherwise, if you are not using the `blox-bootstrap` module, you can get SEO features for your Hugo site by following the guide below:

1. Add the module to your `config/_default/config.yaml`:

   ```yaml
   module:
     imports:
       - path: github.com/HugoBlox/hugo-blox-builder/modules/blox-seo
   ```

2. If you're not using the `blox-bootstrap` module, load the SEO module in your site's `<head>` with:

   ```go
   {{ partial "blox_seo" . }}
   ```

## Usage

[View the documentation](https://docs.hugoblox.com/hugo-tutorials/seo/)
