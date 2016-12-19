+++
date = "2016-04-20T11:00:00"
draft = false
tags = ["academic", "hugo"]
title = "Customizing the homepage with widgets"
math = false
summary = """
Enable/disable and configure widgets to customize your homepage.
"""
+++

Homepage widgets display as sections on the homepage. They can be enabled/disabled and configured as desired. Academic has the following widgets available to use:

- About/biography
- Selected publications
- Recent publications
- Recent news/blog posts
- Projects
- Selected talks
- Recent talks
- Contact
- Custom widget (demonstrated with the *teaching* example)

The example site that you copied to create your site uses all the different types of widget (except talks), so you can generally just delete the widgets you don't need and customize the parameters of the widgets you wish to keep.

The parameters for each widget vary. They can be found in the preamble/frontmatter (between the pair of `+++`) for each widget installed in the `content/home/` folder.

{{% alert note %}}
By default, publications will be displayed in a simple list. If you prefer a more detailed list with abstract and image, you can enable the detailed publication list on the homepage by setting `detailed_list = true` in `content/home/publications.md`.
{{% /alert %}}

## Add a widget to the homepage

To add a widget manually, copy the relevant widget from `themes/academic/exampleSite/content/home/` to your `content/home/` folder. 

Widget identifiers are set to their respective filenames, so a `content/home/about.md` widget can be linked from the navigation bar by setting the relevant URL as `"#about"` in `config.toml`.

This means that if you want to use multiple instances of a widget, each widget will be assigned a unique ID based on the filename that you set. You can then use that ID for linking, like in the above example.

## Using the custom widget

You can use the custom widget to create your own home page sections.

Simply duplicate (copy/paste) and rename the example *teaching* file at `content/home/teaching.md`. Then edit the section title, weight (refer to *Ordering sections* below), and content as desired.

You may also wish to add a navigation link to the top of the page that points to the new section. This can be achieved by adding something similar to the following lines to your `config.toml`, where the URL will consist of the first title word in lowercase:

    [[menu.main]]
        name = "Research"
        url = "#research"
        weight = 10

## Remove a widget from the homepage

If you do not require a particular widget, you can simply delete any associated files from the `content/home/` folder.

To remove a navigation link from the top of the page, remove the associated `[[menu.main]]` entry in `config.toml`.

## Ordering widgets

The order that the homepage widgets are displayed in is defined by the `weight` parameter in each of the files in the `content/home/` directory. The widgets are displayed in ascending order of their `weight`, so you can simply edit the `weight` parameters as desired.
