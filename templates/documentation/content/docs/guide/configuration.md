---
title: Configuration
weight: 2
---

The configuration of your site can be found in `config/_default/`.

<!--more-->

## Full Documentation

See https://docs.hugoblox.com/getting-started/customize/

## Navigation

### Menu

See https://docs.hugoblox.com/getting-started/customize/#menu-items

## Left Sidebar

Links are automatically generated from the structure of your content directory. Simply add a folder to nest a page.

### Extra Links

Additional links can be added under the `sidebar` section of your `config/_default/menus.yaml`:

```yaml
menu:
  sidebar:
    - name: "Need help?"
      params:
        type: separator
      weight: 1
    - name: "A page"
      pageRef: "/page-filename-here"
      weight: 2
    - name: "An external link ↗"
      url: "https://hugoblox.com"
      weight: 3
```

## Right Sidebar

A table of contents is automatically generated from the headings your Markdown file.

It can optionally be disabled by setting `toc: false` in the front matter of a page:

```yaml
---
title: My Page
toc: false
---
```
