+++
date = 2016-04-18
draft = false
tags = ["academic", "hugo"]
title = "Managing content"
math = false
+++

This is a brief guide to managing content with the Academic framework. Content can include publications, projects, talks, news/blog articles, and widget pages. After you have read this guide about creating and managing content, you may also be interested to learn about [writing content with Markdown, LaTeX, and Shortcodes]({{< ref "post/writing-markdown-latex.md" >}}).<!--more-->

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

{{% toc%}}

## Create a publication

To create a new publication:

    hugo new publication/my-paper-name.md

Then edit the default variables at the top of `content/publication/my-paper-name.md` to include the details of your publication. The `url_` variables are used to generate links associated with your publication, such as for viewing PDFs of papers. Here is an example:

```
+++
title = "A publication title, such as title of a paper"

# Date first published.
date = "2013-07-01"

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["First author's name", "Second author's name"]

# Publication type.
# Legend:
# 0 = Uncategorized
# 1 = Conference proceedings
# 2 = Journal
# 3 = Work in progress
# 4 = Technical report
# 5 = Book
# 6 = Book chapter
publication_types = ["1"]

# Publication name and optional abbreviated version.
publication = "In *International Conference on Academic*. You may use *Markdown* for italics etc."
publication_short = "In *ICA*"

# Abstract and optional shortened version.
abstract = "The abstract. Markdown and math can be used (note that math may require escaping as detailed in the red alert box below)."
abstract_short = "A short version of the abstract."

# Featured image thumbnail (optional)
image_preview = ""

# Is this a selected publication? (true/false)
selected = true

# Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter the filename (excluding '.md') of your project file in `content/project/`.
#   E.g. `projects = ["deep-learning"]` references `content/project/deep-learning.md`.
projects = []

# Links (optional).
url_pdf = "pdf/my-paper-name.pdf"
url_preprint = ""
url_code = ""
url_dataset = ""
url_project = ""
url_slides = ""
url_video = ""
url_poster = ""
url_source = ""

# Custom links (optional).
#   Uncomment line below to enable. For multiple links, use the form `[{...}, {...}, {...}]`.
# url_custom = [{name = "Custom Link", url = "http://example.org"}]

# Does the content use math formatting?
math = true

# Does the content use source code highlighting?
highlight = true

# Featured image
# Place your image in the `static/img/` folder and reference its filename below, e.g. `image = "example.jpg"`.
[header]
image = "headers/bubbles-wide.jpg"
caption = "My caption :smile:"

+++

Further details on your publication can be written here using *Markdown* for formatting. This text will be displayed on the Publication Detail page.
```

The `url_` links can either point to local or web content. Associated local publication content, such as PDFs, may be copied to a `static/pdf/` folder and referenced like `url_pdf = "pdf/my-paper-name.pdf"`.

You can also associate custom link buttons with the publication by adding the following block within the variable preamble above, which is denoted by `+++`:

```
url_custom = [{name = "Custom Link 1", url = "http://example.org"},
              {name = "Custom Link 2", url = "http://example.org"}]
```

If you set `list_format=2` to enable a detailed listing of publications in the Publication Widget (`home/publications.md`) or Publication Archive (`publication/_index.md`), then there are a few more optional variables that you can include in the publication page preamble. You may use `abstract_short = "friendly summary of abstract"` and `publication_short = "abbreviated publication details"` to display a friendly summary of the abstract and abbreviate the publication details, respectively. Furthermore, there is the option to display a different image on the homepage to the publication detail page by setting `image_preview = "my-image.jpg"`. This can be useful if you wish to scale down the image for the homepage or simply if you just wish to show a different image for the preview.

{{% alert warning %}}
Any double quotes (`"`) or backslashes (e.g. LaTeX `\times`) occurring within the value of any frontmatter parameter (such as the *abstract*) should be escaped with a backslash (`\`). For example, the symbol `"` and LaTeX text `\times` become `\"` and `\\times`, respectively. Refer to the [TOML documentation](https://github.com/toml-lang/toml#user-content-string) for more info.
{{% /alert %}}

## Create a blog post

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

## Create a widget page

So you would like to create a page which utilizes Academic's widget system, similar to the homepage?

Create a new folder in your `content` folder, naming it with your new page name. In this example, we will create a *courses* page by creating a `content/courses/` folder.

Within your new `content/courses/` folder, create a file named `_index.md` containing the following parameters:

```
+++
title = "Courses"
date = 2017-01-01
widgets = true
+++
```

Install widgets into your `content/courses/` folder. To achieve this, widgets can be copied from your `content/home/` folder or downloaded from [Github](https://github.com/gcushen/hugo-academic/tree/master/exampleSite/content/home).

## Create other pages (e.g. CV)

For other types of content, it is possible to create your own custom pages. For example, let's create a `cv.md` page for your Curriculum Vitae in your `content` folder. Copy across the frontmatter from the top of one of your post files, adapting it as necessary, and editing your Markdown content below. You can then link to your new page by adding the code `[My CV]{{</* ref "cv.md" */>}}` to any of your existing content.

Alternatively, for the above example, we could use a PDF of your Curriculum Vitae. For this purpose, create a folder called `files` within your `static` folder and move a PDF file named `cv.pdf` to that location, so we have a `static/files/cv.pdf` file path. The PDF can then be linked to from any content by using the code: `{{%/* staticref "files/cv.pdf" */%}}Download my CV{{%/* /staticref */%}}`.

## Manage archive pages

The archive (or *node index*) pages (e.g. `/post/`) are the special pages which list all of your content. They can exist for blog posts, publications, and talks. The homepage widgets will automatically link to the archive pages when you have more items of content than can be displayed in the widget. Therefore, if you don't have much content, you may not see the automatic links yet - but you can also manually link to them using a normal Markdown formatted link in your content.

You can edit the title and add your own content, such as an introduction, by copying the following content `_index.md` files from the example site to the same structure within your `content/` folder:

    /themes/academic/exampleSite/content/post/_index.md
    /themes/academic/exampleSite/content/publication/_index.md
    /themes/academic/exampleSite/content/talk/_index.md
    
Then edit the `title` parameter in each `_index.md` as desired and add any content after the `+++` preamble/frontmatter ends. You will notice that the `_index.md` files differ slightly, with some having special options available for the associated content type. For example, `publication/_index.md` contains an option for setting the citation style of the listings which appear on the publication archive page.

## Removing content

Generally, to remove content, simply delete the relevant file from your `content/post`, `content/publication`, `content/project`, or `content/talk` folder.

## View your updated site

After you have made changes to your site, you can view it by running the `hugo server` command and then opening [localhost:1313](http://localhost:1313) in your web browser.

## Deploy your site

Finally, you can build the static website to a `public/` folder ready for deployment using the `hugo` command.

You may then deploy your site by copying the `public/` directory (by FTP, SFTP, WebDAV, Rsync, git push, etc.) to your production web server.

Note that running `hugo` does not remove any previously generated files before building. Therefore, it's best practice to delete your `public/` directory prior to running `hugo` to ensure no old or interim files are deployed to your server.
