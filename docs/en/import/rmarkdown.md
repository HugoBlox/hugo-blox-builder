---
title: Import RMarkdown
linktitle: From RMarkdown
date: 2021-01-10
summary: Learn how to write and import RMarkdown content from RStudio.
---

RMarkdown is a popular format with statisticians. It is often edited with RStudio and used to write technical blog posts or documentation that include snippets of the R statistical programming language.

So how can we include R content in our Wowchemy site?

# Prerequisites

[Follow the guide to setup Wowchemy and Hugo on your computer]({{< relref "/docs/getting-started/install-locally" >}}).

# Publishing content with RStudio

First check that you have installed the prerequisites in the previous section.

It's recommended to convert RMarkdown files directly to Markdown **without Blogdown** by using `render("input.Rmd", md_document())` or adding `output: md_document` to the file's front matter.

Once the RMarkdown has been converted to Markdown (or HTML), Wowchemy and Hugo can then be used directly, as usual, such as with the command `hugo server`.

# Alternatively: Using the Blogdown wrapper

The RStudio team released Blogdown, a wrapper around Hugo for the RStudio IDE. However, users report that **Blogdown doesn't fully support modern Hugo versions**, with the RStudio team confirming these bug reports on GitHub. Therefore, it's not currently recommended to use Blogdown. Also, as Blogdown is an extra tool in the workflow, it can add unnecessary additional complexity to projects.

1. Open [RStudio](https://www.rstudio.com/products/rstudio/) and install *Blogdown*:

        remotes::install_github('rstudio/blogdown')

1. Open `academic.Rproj` from your site's folder, [downloading it if necessary](https://github.com/wowchemy/starter-academic/blob/main/academic.Rproj)

1. Blogdown will automatically move your site's `config/_default/config.yaml` file to the site folder as [Blogdown does not support Hugo's config folder](https://github.com/rstudio/blogdown/issues/359)

1. In the RStudio menu bar, choose **Addins > Serve Site** (clicking this button will call `blogdown:::serve_site()`)
  - Paste the local URL which RStudio provides (e.g. http://127.0.0.1:4321) into your web browser to preview your new site
  - Avoid using the integrated RStudio web browser as it can be outdated and buggy

## RMarkdown vs Rmd

It's recommended to save R content as Markdown with the **`.Rmarkdown` file extension** rather than as HTML with the `.Rmd` extension.

Why is RMarkdown recommended?

Hugo is used to convert Markdown content into an HTML website powered by a Wowchemy template and Wowchemy's page building components. Hence, by providing Rmd's HTML rather than processed RMarkdown as the input to Hugo and Wowchemy, you may experience conflicts as the Rmd ecosystem performs similar actions to Hugo yet has little awareness of Hugo and Wowchemy templates.
