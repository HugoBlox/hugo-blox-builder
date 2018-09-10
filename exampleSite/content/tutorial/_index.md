+++
title = "Overview"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

# Add menu entry to sidebar.
[menu.tutorial]
  name = "Overview"
  weight = 1

# Featured image.
# Uncomment below lines to use.
# [header]
# image = "headers/getting-started.png"
# caption = "Image credit: [**Academic**](https://github.com/gcushen/hugo-academic/)"
+++

This feature can be used for publishing content such as:

* **Project or software documentation**
* **Online courses**
* **Tutorials**

The parent folder may be renamed, for example, to `docs` for project documentation or `course` for creating an online course.

To disable this feature, either delete the parent folder, or set `draft = true` in the front matter of all its pages. 

After renaming or deleting the parent folder, you may wish to update any `[[menu.main]]` menu links to it in the `config.toml`. 
