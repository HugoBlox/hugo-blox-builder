+++
date = "2016-04-20T11:00:00"
draft = false
tags = ["academic", "hugo"]
title = "Managing content"
math = false
+++

This is a brief guide to managing content with the Academic framework. Content can include publications, projects, talks, and news/blog articles. After you have read this guide about creating and managing content, you may also be interested to learn about [writing content with Markdown, LaTeX, and Shortcodes]({{< ref "post/writing-markdown-latex.md" >}}).<!--more-->

To enable LaTeX math rendering for a page, you should include `math = true` in the page's `+++` preamble, as demonstrated in the included example site. Otherwise, to enable math on the homepage or for all pages, you must globally set `math = true` in `config.toml`.

To disable source code highlighting by default for all pages, set `highlight = false` in `config.toml`. You can then enable source code highlighting only on pages that need it by setting `highlight = true` in that page's preamble. See the [code-highlighting docs]({{< ref "post/writing-markdown-latex.md#code-highlighting" >}}) for more details.

To display a featured image in content page headers, the parameters below can be inserted towards the end of a page's `+++` preamble. It is assumed that the image is located in your `static/img/` folder, so the full path in the example below will be `static/img/headers/getting-started.png`. The `caption` parameter can be used to write an image caption or credit. 

```toml
[header]
image = "headers/getting-started.png"
caption = "Image credit: [**Academic**](https://github.com/gcushen/hugo-academic/)"

```

{{% alert note %}}
If you wish to prevent a featured image automatically being used for a post's thumbnail on the homepage, the `preview = false` parameter can be added to `[header]`.
{{% /alert %}}

## Create a publication

To create a new publication:

    hugo new publication/my-paper-name.md

Then edit the default variables at the top of `content/publication/my-paper-name.md` to include the details of your publication. The `url_` variables are used to generate links associated with your publication, such as for viewing PDFs of papers. Here is an example:

```
+++
abstract = "An abstract..."
authors = ["First author's name", "Second author's name"]
date = "2013-07-01"
image = ""
image_preview = ""
math = false
publication = "The publishing part of the citation goes here. You may use *Markdown* for italics etc."
title = "A publication title, such as title of a paper"
url_code = ""
url_dataset = ""
url_pdf = "pdf/my-paper-name.pdf"
url_project = ""
url_slides = ""
url_video = ""
+++

Further details on your publication can be written here using *Markdown* for formatting. This text will be displayed on the Publication Detail page.
```

The `url_` links can either point to local or web content. Associated local publication content, such as PDFs, may be copied to a `static/pdf/` folder and referenced like `url_pdf = "pdf/my-paper-name.pdf"`.

You can also associate custom link buttons with the publication by adding the following block(s) within the variable preamble above, which is denoted by `+++`:

```
[[url_custom]]
    name = "Custom Link"
    url = "http://www.example.org"
```

If you enabled `detailed_list` for publications in `config.toml`, then there are a few more optional variables that you can include in the publication page preamble. You may use `abstract_short = "friendly summary of abstract"` and `publication_short = "abbreviated publication details"` to display a friendly summary of the abstract and abbreviate the publication details, respectively. Furthermore, there is the option to display a different image on the homepage to the publication detail page by setting `image_preview = "my-image.jpg"`. This can be useful if you wish to scale down the image for the homepage or simply if you just wish to show a different image for the preview.

{{% alert warning %}}
Any double quotes (`"`) or backslashes (e.g. LaTeX `\times`) occurring within the value of any frontmatter parameter (such as the *abstract*) should be escaped with a backslash (`\`). For example, the symbol `"` and LaTeX text `\times` become `\"` and `\\times`, respectively. Refer to the [TOML documentation](https://github.com/toml-lang/toml#user-content-string) for more info.
{{% /alert %}}

## Post an article

To create a blog/news article:

    hugo new post/my-article-name.md

Then edit the newly created file `content/post/my-article-name.md` with your full title and content.

Hugo will automatically generate summaries of posts that appear on the homepage. If you are dissatisfied with an automated summary, you can either limit the summary length by appropriately placing <code>&#60;&#33;&#45;&#45;more&#45;&#45;&#62;</code> in the article body, or completely override the automated summary by adding a `summary` parameter to the `+++` preamble such that:

    summary = "Summary of my post."

To disable commenting for a specific post, you can add `disable_comments = true` to the post `+++` preamble. Or to disable commenting for all posts, you can either set `disqusShortname = ""` or `disable_comments = true` in `config.toml`.

## Create a project

To create a project:

    hugo new project/my-project-name.md

Then edit the newly created file `content/project/my-project-name.md`. Either you can link the project to an external project website by setting the `external_link = "http://external-project.com"` variable at the top of the file, or you can add content (below the final `+++`) in order to render a project page on your website.

## Create a talk

To create a talk:

    hugo new talk/my-talk-name.md

Then edit the newly created file `content/talk/my-talk-name.md` with your full talk title and details. Note that many of the talk parameters are similar to the publication parameters.

## Manage node index pages

The node index pages (e.g. `/post/`) are the special pages which list all of your content. They can exist for blog posts, publications, and talks. The homepage widgets will automatically link to the node index pages when you have more items of content than can be displayed in the widget. Therefore, if you don't have much content, you may not see the automatic links yet - but you can also manually link to them using a normal Markdown formatted link in your content.

You can edit the title and add your own content, such as an introduction, by creating and editing the following content files for the node indexes:

    hugo new post/_index.md
    hugo new publication/_index.md
    hugo new talk/_index.md
    
Then remove all parameters except for `title`, `math`, `highlight`, and `date`. Edit the `title` parameter as desired and add any content after the `+++` preamble/frontmatter ends. For example, you should have something similar to:

```toml
+++
title = "List of my posts"
date = "2017-01-01T00:00:00Z"
math = false
highlight = false
+++

Below is an automatically generated list of all my blog posts!

```

## Removing content

Generally, to remove content, simply delete the relevant file from your `content/post`, `content/publication`, `content/project`, or `content/talk` folder.

## View your updated site

After you have made changes to your site, you can view it by running the `hugo server --watch` command and then opening [localhost:1313](http://localhost:1313) in your web browser.

## Deploy your site

Finally, you can build the static website to a `public/` folder ready for deployment using the `hugo` command.

You may then deploy your site by copying the `public/` directory (by FTP, SFTP, WebDAV, Rsync, git push, etc.) to your production web server.

Note that running `hugo` does not remove any previously generated files before building. Therefore, it's best practice to delete your `public/` directory prior to running `hugo` to ensure no old or interim files are deployed to your server.
