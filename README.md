# Hugo Academic

A personal academic website theme for [Hugo](https://gohugo.io).

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/screenshot.png)](https://github.com/gcushen/hugo-academic/)

Key features:

- Designed for academic staff, students, or general personal use
- Includes Biography, Publications, Projects, News/Blog, Teaching, and Contact sections
- Write in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for easy formatting and code highlighting, with [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) for mathematical expressions
- Academic linking (Scholar etc.), Google Analytics, and Disqus comments
- Responsive and mobile friendly
- Simple and refreshing one page design
- Easy to customize

## Installation

1. Install [Hugo](https://gohugo.io/overview/installing/) and create a new website:

        hugo new site my_website
        cd my_website

2. Install Academic theme with `git`:

        git clone git@github.com:gcushen/hugo-academic.git themes/academic

    Or alternatively, install by downloading from [Github](https://github.com/gcushen/hugo-academic/) into a `themes/academic` folder within your Hugo website.

3. If you are creating a new website, copy the contents of the `exampleSite` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started.

4. Start the Hugo server from your website root folder:

        hugo server --watch

    Now you can go to [localhost:1313](http://localhost:1313) and your new Academic themed website should appear.

5. Customize your website (see next section), build it by running `hugo`, and deploy it by copying the `public/` directory (by FTP, Rsync, git push, etc.) to your production web server.

## Getting Started

Assuming you created a new website with the example content following the installation steps above, this section explores just a few more steps in order to customize it.

### Configuration

The core parameters for the website can be edited in the `config.toml` configuration file.

As can be seen in the example `config.toml`, the social/academic networking icons and education qualifications are defined as multiples of `[[params.social]]` and `[[params.education]]` respectively. They can be duplicated or deleted as necessary.

For deployment, the `baseURL` variable can be changed to match your website URL such as `baseURL = "http://yoursite.org/"`. The example Disqus commenting variable should be cleared (e.g. `disqusShortname = ""`) or set to your own Disqus shortname to enable commenting. To enable Google Analytics, add your tracking code in `config.toml` similarly to `googleAnalytics = "UA-12345678-9"`.

### Introduce yourself with a biography

Place a cropped portrait photo named `portrait.jpg` into the `static/img/` folder, overwriting any defaults.

Edit your biography in the example `content/home/about.md` file. The research interests and qualifications are stored separately as `param` variables in `config.toml`, as can be seen in the example config.

### Create a publication

To create a new publication:

    hugo new publication/my-paper-name.md

Then edit the default variables at the top of `content/publication/my-paper-name.md` to include the details of your publication. The `url_` variables (except `url_image`) are used to generate links associated with your publication, such as for viewing PDFs of papers. Here is an example:

```
+++
abstract = "An abstract..."
authors = ["First author's name", "Second author's name"]
date = "2013-07-01"
math = false
publication = "The publishing part of the citation goes here. You may use *Markdown* for italics etc."
title = "A publication title, such as title of a paper"
url_code = ""
url_dataset = ""
url_image = ""
url_pdf = "/pdf/my-paper-name.pdf"
url_project = ""
url_slides = ""
url_video = ""
+++

Further details on your publication can be written here using *Markdown* for formatting. This text will be displayed on the Publication Detail page.
```

The `url_` links can either point to local or web content. Associated local publication content, such as PDFs, may be copied to a `/static/pdf/` folder and referenced like `url_pdf = "/pdf/my-paper-name.pdf"`.

You can also associate custom link buttons with the publication by adding the following block(s) within the variable preamble above, which is denoted by `+++`:

```
[[url_custom]]
    name = "Custom Link"
    url = "http://www.example.org"
```

Note that the `url_image` variable is a placeholder that may be used if you wish to modify the publication list to show thumbnails either from images in your `static/img/` folder (which is deployed as `http://your-URL.com/img/`), or URLs of web images.

### Post an article

To create a blog/news article:

    hugo new post/my-article-name.md

Then edit the newly created file `content/post/my-article-name.md` with your full title and content.

You may use [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to format the content. Furthermore, code highlighting and LaTeX math rendering are supported. To enable LaTeX math rendering for a page, you should include `math = true` in the preamble, as demonstrated in the included example site.

Images may be added to a post by placing them in your `static/img/` folder and referencing them in Markdown such as with `![alt text](/img/my-image.jpg)`.

### Create a project

To create a project:

    hugo new project/my-project-name.md

Then edit the newly created file `content/project/my-project-name.md`. Either you can link the project to an external project website by setting the `external_link = "http://external-project.com"` variable at the top of the file, or you can add content (below the final `+++`) in order to render a project page on your website.

### Add a section to home page

To add a new section to the home page:

    hugo new home/my-section-name.md

Then edit the newly created file `content/home/my-section-name.md` with your section title and content. In the `+++` preamble, you should also increment the `section_id` to ensure it's unique amongst the other sections in `content/home` and you can adjust `weight` variable to change the order within the custom section of the home page.

You may also wish to add a navigation link to the new section. This can be achieved by adding something similar to the following lines to your `config.toml`, where the URL will consist of the first title word in lowercase:

    [[menu.main]]
        name = "Research"
        url = "/#research"
        weight = 10

### Removing content

Generally, to remove content, simply delete the relevant file from your `content/post`, `content/publication`, `content/project`, or `content/home` folder.

Then you can re-build and view the updated website with the `hugo` and `hugo server --watch` commands, respectively.

## Upgrading

Feel free to star the project on [Github](https://github.com/gcushen/hugo-academic/) and monitor the commits for updates.

## Contributing

Please use the [issue tracker](https://github.com/gcushen/hugo-academic/issues) to let me know about any bugs or feature requests, or alternatively make a pull request.

## License

Copyright 2016 [George Cushen](http://www.cushen.me).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.
