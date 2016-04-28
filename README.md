# Hugo Academic

A personal academic website theme for [Hugo](https://gohugo.io).

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/screenshot.png)](https://github.com/gcushen/hugo-academic/)

Key features:
- Suitable for academic staff, students, or general personal use
- Sections for Biography, Publications, Projects, News, Teaching, and Contact
- Render LaTeX mathematical expressions and highlight code
- Responsive and mobile friendly
- Simple one page design
- Clean and refreshing theme
- Easy to customize

## Installation

1. Install [Hugo](https://gohugo.io/overview/installing/) and create a new website:

        hugo new site my_website
        cd my_website

2. Install Academic theme with `git`:

        git clone git@github.com:gcushen/hugo-academic.git themes/hugo-academic

 Or alternatively, install by downloading from [Github](https://github.com/gcushen/hugo-academic/) into a `themes/hugo-academic` folder within your Hugo website.

3. If you are creating a new website, copy the contents of the `exampleSite` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started.

4. Start the Hugo server from your website root folder:

        hugo server --watch

 Now you can go to [localhost:1313](http://localhost:1313) and your new Academic themed website should appear.

5. Customize your website (see next section), build it by running `hugo`, and deploy it by copying the `public/` directory (by FTP, Rsync, git push, etc.) to your production web server.

## Getting Started

Assuming you created a new website following the installation steps above, this section explores just a few more steps in order to customize it.

### Configuration

The core parameters for the website can be edited in the `config.toml` configuration file.

As can be seen in the example `config.toml`, the social/academic networking icons and education qualifications are defined as multiples of `[[params.contact.social]]` and `[[params.education]]` respectively. They can be duplicated or deleted as necessary.

For deployment, the `baseURL` variable can be changed to match your website URL such as `baseURL = "http://yoursite.org/"`. To enable Google Analytics, add your tracking code to `config.toml` similarly to `googleAnalytics = "UA-12345678-9"`.

### Biography

Upload a cropped portrait photo to `static/img/portrait.jpg`, overwriting the default if necessary.

To change the biography text, edit `content/home/about.md` and/or the `param` variables in `config.toml`.

### Create a publication

To create a new publication:

    hugo new publications/my-paper-name.md

Then edit the default variables at the top of `publications/my-paper-name.md` to include the details of your publication. The `url_` variables (except `url_image`) are used to generate links associated with your publication, such as for viewing PDFs of papers. Here is an example:

```
+++
abstract = "An abstract..."
authors = ["First author's name", "Second author's name"]
date = "2013-07-01"
publication = "The publishing part of the citation goes here. You may use *Markdown* for italics etc."
title = "A publication title, such as title of a paper"
url_code = ""
url_dataset = ""
url_image = ""
url_pdf = "/pdf/my-paper-name.pdf"
url_project = ""
+++

If you wish, further details on your publication can be written here in plain text using *Markdown*. This text will be displayed on the Publication Detail page.
```

The `url_` links can either point to local or web content. Associated local publication content, such as PDFs, may be copied to a `/static/pdf/` folder and referenced like `url_pdf = "/pdf/my-paper-name.pdf"`.

You can also associate custom link buttons with the publication by adding the following block(s) within the variable section above, which is denoted by `+++`:

```
[[url_custom]]
    name = "Custom Link"
    url = "http://www.example.org"
```

Note that the `url_image` variable is a placeholder that may be used if you wish to modify the publication list to show thumbnails either from images in your `/static/img/` folder (which is deployed as `http://your-URL.com/img/`), or URLs of web images.

### Post a news article

To create a blog/news article:

    hugo new blog/my-article-name.md

Then edit the newly created file `blog/my-article-name.md` with your full title and content.

You may use Markdown to format the content. Furthermore, code highlighting is allowed in case your news articles are related to discussing programming or computer science. An example can be seen in `themes/hugo-academic/exampleSite/example-post.md`. Note that post tagging is not currently used, but is a placeholder for a future update.

### Create a project

To create a project:

    hugo new projects/my-project-name.md

Then edit the newly created file `projects/my-project-name.md`. Either you can link the project to an external project website by setting the `external_link = "http://external-project.com"` variable at the top of the file, or you can add content (below the final `+++`) in order to render a project page on your website.

### Removing content

Generally, to remove content, simply delete the relevant file from your `content/blog`, `content/publications`, or `content/projects` folder.

Otherwise, to remove the Teaching section from the home page, simply delete the `content/home/teaching.md` file. Alternatively, you may re-purpose the section by editing the heading and contents within the file.

Once content is removed, you can rebuild and view the updated website with the `hugo` and `hugo server --watch` commands.

## Upgrading

Feel free to star the project on [Github](https://github.com/gcushen/hugo-academic/) and monitor the commits for updates.

## Contributing

Please use the [issue tracker](https://github.com/gcushen/hugo-academic/issues) to let me know about any bugs or feature requests, or alternatively make a pull request.

Created by [George Cushen](http://www.cushen.me).
