# Decap CMS

A Content Management System (CMS) for the [Wowchemy](https://wowchemy.com) website builder.

Built upon the open source [Decap CMS](https://decapcms.org/) and [Netlify Identity](https://docs.netlify.com/visitor-access/identity/#enable-identity-in-the-ui) projects.

## Install

1. Edit `config/_default/config.yaml` to install the `wowchemy-plugin-decap-cms` module:

   ```yaml
   module:
     imports:
       - path: github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-decap-cms
   ```

2. Create a `content/admin/index.md` file containing:

   ```yaml
   ---
   type: decap_cms
   private: true
   outputs:
     - decap_cms_config
     - HTML
   ---

   ```

3. (Optional) If your Git repository's branch is **not** `main`, define it in `config/_default/params.yaml`:

   ```yaml
   extensions:
     decap_cms:
       branch: master
       # Uncomment for editorial workflow:
       # publish_mode: editorial_workflow
   ```
