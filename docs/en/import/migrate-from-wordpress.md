---
title: Migrate from Wordpress
linktitle: From Wordpress
date: 2017-12-03
summary: Learn how to migrate your site from Wordpress to the Wowchemy website building framework for Hugo.
---

To migrate your website from Wordpress to Wowchemy is a two phase process:

## Phase One

First, install the [WordPress to Jekyll Exporter](https://wordpress.org/plugins/jekyll-exporter/) plugin into your Wordpress installation by following these steps:

1. Place the [WordPress to Jekyll Exporter](https://wordpress.org/plugins/jekyll-exporter/) plugin in `/wp-content/plugins/` folder
2. Activate plugin in WordPress dashboard
3. Select `Export to Jekyll` from the `Tools` menu

The WordPress plugin converts all posts, pages, taxonomies, metadata, and settings to Markdown and YAML with just a single click. A zip file will be generated, containing `_config.yml`, pages, and `_posts` folder containing `.md` Markdown files for each post.

## Phase Two

Given the Jekyll formatted contents of your generated zip file in the step above, proceed to follow the guide on [importing a Jekyll site into Wowchemy]({{< relref "migrate-from-jekyll.md" >}}).
