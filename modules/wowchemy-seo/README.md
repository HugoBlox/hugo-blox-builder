# wowchemy-seo

A Wowchemy/Hugo plugin for [Search Engine Optimisation (SEO)](https://wowchemy.com/docs/hugo-tutorials/seo/), site verification, and [analytics](https://wowchemy.com/docs/hugo-tutorials/analytics/).

## Install

The main `wowchemy` module will automatically include the SEO module in your site so you don't have to.

Otherwise, if you are not using the main `wowchemy` module, you can get SEO features for your Hugo site by following the guide below:

1. Add the module to your `config/_default/config.yaml`:

   ```yaml
   module:
     imports:
       - path: github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-seo
   ```

2. If you're not using the main `wowchemy` module, load the SEO module in your site's `<head>` with:

   ```go
   {{ partial "wowchemy_seo" . }}
   ```

## Usage

[View the documentation](https://wowchemy.com/docs/hugo-tutorials/seo/)
