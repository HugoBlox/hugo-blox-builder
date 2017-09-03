+++
date = 2014-03-10
draft = false
tags = ["jekyll"]
title = "Migrate from Jekyll to Hugo"
summary = """
Learn how to migrate an existing website from Jekyll to Hugo.
"""
math = false
+++

Here are a few tips for migrating an existing website from Jekyll to Hugo. These tips can be applied in conjunction with following Hugo Academic's [getting started guide]({{< ref "post/getting-started.md" >}}).

## Move static content to `static`
Jekyll has a rule that any directory not starting with `_` will be copied as-is to the `_site` output. Hugo keeps all static content under `static`. You should therefore move it all there.
With Jekyll, something that looked like

    ▾ <root>/
        ▾ images/
            logo.png

should become

    ▾ <root>/
        ▾ static/
            ▾ images/
                logo.png

Additionally, you'll want any files that should reside at the root (such as `CNAME`) to be moved to `static`.

## Fix content
Depending on the amount of customization that was done for each post in Jekyll, this step will require more or less effort. There are no hard and fast rules here except that `hugo server --watch` and the Hugo Academic example site are your friends. Test your changes and fix errors as needed.

## Publish
The default is for Jekyll to publish the website to a `_site` directory, whereas Hugo publishes to a `public` directory.

## A practical example
Alexandre Normand migrated his website from Jekyll to Hugo in less than a day. You can see all his changes by looking at this GitHub [diff](https://github.com/alexandre-normand/alexandre-normand/compare/869d69435bd2665c3fbf5b5c78d4c22759d7613a...b7f6605b1265e83b4b81495423294208cc74d610). However, bear in mind that this example is **not specific to the Academic theme nor does it use the latest version of Hugo**.
