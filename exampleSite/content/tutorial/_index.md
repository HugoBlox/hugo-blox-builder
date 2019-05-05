+++
title = "Overview"

date = 2018-09-09T00:00:00  # Date published
# lastmod = 2018-09-09T00:00:00  # Date modified

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

# Add menu entry to sidebar.
[menu.tutorial]
  name = "Overview"  # Declare this menu item as a parent with ID `name`.
  weight = 1  # Position of link in menu.
+++

## Flexibility

This feature can be used for publishing content such as:

* **Project or software documentation**
* **Online courses**
* **Tutorials**

The `tutorial` folder may be renamed. For example, we can rename it to `docs` for software/project documentation or `course` for creating an online course.

## Delete tutorials

**To remove these pages, delete the `tutorial` folder and see below to delete the associated menu link.**

## Update site menu

After renaming or deleting the `tutorial` folder, you may wish to update any `[[main]]` menu links to it by editing your menu configuration at `config/_default/menus.toml`.

For example, if you delete this folder, you can remove the following from your menu configuration:

```toml
[[main]]
  name = "Tutorials"
  url = "tutorial/"
  weight = 50
```

Or, if you are creating an online course, you can rename the `tutorial` folder to `course` and update the associated *Tutorials* menu configuration to:

```toml
[[main]]
  name = "My Course"
  url = "course/"
  weight = 50
```
