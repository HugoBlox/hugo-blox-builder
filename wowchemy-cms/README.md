# Wowchemy CMS

A Content Management System (CMS) for the [Wowchemy](https://wowchemy.com) website builder.

Built upon the open source [Netlify CMS](https://www.netlifycms.org/) and [Netlify Identity](https://docs.netlify.com/visitor-access/identity/#enable-identity-in-the-ui) projects.

## Install

1. Edit `config/_default/config.yaml` to install the `wowchemy-cms` Hugo Module so that you have something like:

   ```yaml
   module:
     imports:
       - path: github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5
       - path: github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5
   ```

2. Create a `content/admin/index.md` file containing:

   ```yaml
   ---
   type: wowchemycms
   private: true
   outputs:
     - wowchemycms_config
     - HTML
   ---

   ```

3. (Optional) If your Git repository's branch is **not** `main`, define it in `config/_default/params.yaml`:

   ```yaml
   extensions:
     cms:
       branch: master
   ```
