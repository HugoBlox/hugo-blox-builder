# Hugo Plugin for Netlify

A build plugin to integrate your Hugo site seamlessly with Netlify.

The plugin automatically generates a `_headers` and `_redirects` file at the root of the public folder to configure [HTTP headers](https://www.netlify.com/docs/headers-and-basic-auth/) and [redirects](https://www.netlify.com/docs/redirects/) on Netlify.

By default, the plugin will help secure your site with some common security headers. You can easily add or replace headers through the plugin config.

## Install

1. Edit `config/_default/config.yaml` to install the `blox-plugin-netlify` module:

   ```yaml
   module:
     imports:
       - path: github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-netlify
   ```

2. Tell Hugo to generate the Netlify `headers` and `redirects` files by adding them to Hugo's `outputs` config. For example,

   ```yaml
   outputs:
     home: [..., headers, redirects]
   ```

## Configure

- 📚 [View the **documentation**](https://docs.hugoblox.com/hugo-tutorials/security/)
