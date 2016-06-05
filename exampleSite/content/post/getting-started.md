+++
date = "2016-04-20T12:00:00"
draft = false
image = "banners/getting-started.png"
tags = ["academic", "hugo"]
title = "Getting started with the Academic theme for Hugo"
math = true
+++

The Academic theme enables you to easily create a personal academic website using the [Hugo](https://gohugo.io) static site generator.

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

2. Install Academic theme with [git](https://help.github.com/articles/set-up-git/):

        git clone https://github.com/gcushen/hugo-academic.git themes/academic

    Or alternatively, [download Academic](https://github.com/gcushen/hugo-academic/archive/master.zip) and extract it into a `themes/academic` folder within your Hugo website.

3. If you are creating a new website, copy the contents of the `exampleSite` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started.

        cp -av themes/academic/exampleSite/* .

4. Start the Hugo server from your website root folder:

        hugo server --watch

    Now you can go to [localhost:1313](http://localhost:1313) and your new Academic themed website should appear.

5. Customize your website (see next section), build it by running `hugo`, and deploy it by copying the `public/` directory (by FTP, Rsync, git push, etc.) to your production web server.


## Getting Started

Assuming you created a new website with the example content following the installation steps above, this section explores just a few more steps in order to customize it.

The core parameters for the website can be edited in the `config.toml` configuration file.

As can be seen in the example `config.toml`, the social/academic networking icons and education qualifications are defined as multiples of `[[params.social]]` and `[[params.about.education]]` respectively. They can be duplicated or deleted as necessary.

By default, publications will be displayed in a simple list. If you prefer a more detailed list with abstract and image, you can enable the detailed publication list on the homepage by setting `detailed_list = true` under `[params.publications]`.

For deployment, the `baseURL` variable should be changed to match your website URL such as `baseURL = "http://your-site.org/"`. The example Disqus commenting variable should be cleared (e.g. `disqusShortname = ""`) or set to your own Disqus shortname to enable commenting. To enable Google Analytics, add your tracking code in `config.toml` similarly to `googleAnalytics = "UA-12345678-9"`.

Next, you may be interested to read the guide about [managing content]({{< ref "post/managing-content.md" >}}), or continue reading below for advanced customization tips and instructions for keeping the theme up-to-date with any improvements that become available.


## Advanced customization

It is possible to carry out many customizations without touching any files in `themes/academic`, making it easier to upgrade the theme in the future.

### Custom theme color (CSS) or JavaScript (JS)

You can link custom CSS and JS assets (relative to your root `static/css` and `static/js` respectively) from your `config.toml` using `custom_css = ["custom.css"]` or `custom_js  = ["custom.js"]`.

For example, lets make a green theme. First, define `custom_css = ["green.css"]` in `config.toml`. Then we can download the example [green theme](https://gist.github.com/gcushen/d5525a4506b9ccf83f2bce592a895495) and save it as `static/css/green.css`, relative to your website root (i.e. **not** in the `themes` directory).

### Permalinks

*Permalinks*, or *permanent links*, are URLs to individual pages and posts on your website. They are permanent web addresses which can be used to link to your content. Using Hugo's *permalinks* option these can be easily customized. For example, the blog post URL can be changed to the form *yourURL/2016/05/01/my-post-slug* by adding the following near the top of your `config.toml` (before `[params]` settings):

    [permalinks]
        post = "/:year/:month/:day/:slug"

Where `:slug` defaults to the filename of the post, excluding the file extension. However, slug may be overridden on a per post basis if desired, simply by setting `slug = "my-short-post-title"` in your post preamble.


## Upgrading

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) and monitor the commits for updates.

Before upgrading the theme, it is recommended to make a backup of your entire website directory, or at least your `themes/academic` directory. You can also read about the [most recent milestones](https://github.com/gcushen/hugo-academic/releases) (but this doesn't necessarily reflect the latest *master* release).

Before upgrading for the first time, the remote *origin* repository should be renamed to *upstream*:

    $ cd themes/academic
    $ git remote rename origin upstream

To list available updates:

    $ cd themes/academic
    $ git fetch upstream
    $ git log --pretty=oneline --abbrev-commit --decorate HEAD..upstream/master

Upgrade by running:

    $ cd themes/academic
    $ git pull upstream

If you have modified files in `themes/academic`, git will attempt to auto-merge changes. If conflicts are reported, you will need to manually edit the files with conflicts and add them back (`git add <filename>`).

If there are any issues after upgrading, you may wish to compare your site with the latest [example site](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) to check if any settings changed.


## Contributing

Please use the [issue tracker](https://github.com/gcushen/hugo-academic/issues) to let me know about any bugs or feature requests, or alternatively make a pull request.


## License

Copyright 2016 [George Cushen](https://georgecushen.com).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.
