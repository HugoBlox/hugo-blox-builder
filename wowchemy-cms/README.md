# Wowchemy CMS

A Content Management System (CMS) for the [Wowchemy](https://wowchemy.com) website builder.

Built upon the open source [Netlify CMS](https://www.netlifycms.org/) and [Netlify Identity](https://docs.netlify.com/visitor-access/identity/#enable-identity-in-the-ui) projects.

## Install

1. Edit `config/_default/config.toml` to install the `wowchemy-cms` Hugo Module so that you have something like:

   ```toml
   [module]
     # Any existing modules here...
     [[module.imports]]
       path = "github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms"
     [[module.imports]]
       path = "github.com/wowchemy/wowchemy-hugo-modules/wowchemy"
   ```

2. Create a `content/admin/index.md` file containing:

   ```yaml
   ---
   type: wowchemycms
   outputs:
     - wowchemycms_config
     - HTML
   ---

   ```

3. (Optional) If your Git repository's branch is **not** `main`, define it in `config/_default/params.toml`:

   ```toml
   [cms]
     branch = "master"
   ```
