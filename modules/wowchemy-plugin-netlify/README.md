# Wowchemy Plugin for Netlify

A build plugin to integrate your Hugo site seamlessly with Netlify.

The plugin automatically generates a `_headers` and `_redirects` file at the root of the public folder to configure [HTTP headers](https://www.netlify.com/docs/headers-and-basic-auth/) and [redirects](https://www.netlify.com/docs/redirects/) on Netlify.

By default, the plugin will help secure your site with some common security headers. You can easily add or replace headers through the plugin config.

## Install

1. Edit `config/_default/config.yaml` to install the `wowchemy-plugin-netlify` module:

   ```yaml
   module:
     imports:
       - path: github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify
   ```

## Configure

- 📚 [View the **documentation**](https://wowchemy.com/docs/hugo-tutorials/security/)
