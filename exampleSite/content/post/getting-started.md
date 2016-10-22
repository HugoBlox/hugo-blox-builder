+++
date = "2016-04-20T12:00:00"
draft = false
image = "banners/getting-started.png"
tags = ["academic", "hugo"]
title = "Getting started with the Academic theme for Hugo"
math = true
summary = """
Create a beautifully simple academic or personal website in under 10 minutes. 
"""
+++

The Academic theme enables you to easily create a beautifully simple academic or personal website using the [Hugo](https://gohugo.io) static site generator.

Key features:

- Designed for personal and academic staff/student use
- Customizable Biography, Publications, Projects, News/Blog, Teaching, and Contact widgets
- Write in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for easy formatting and code highlighting, with [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) for mathematical expressions
- Academic linking (Scholar etc.), [Google Analytics](https://analytics.google.com), and [Disqus](https://disqus.com) comments
- Responsive and mobile friendly
- Simple and refreshing one page design

## Installation

1. [Install Hugo](https://georgecushen.com/create-your-website-with-hugo/#installing-hugo) and create a new website by typing the following commands in your *Terminal* or *Command Prompt* app:

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

5. Customize your website - refer to the *Getting Started* section below

6. Build your site by running the `hugo` command. Then [host it for free using Github Pages](https://georgecushen.com/create-your-website-with-hugo/). Or alternatively, copy the generated `public/` directory (by FTP, Rsync, etc.) to your production web server (such as your university's hosting service).


## Getting Started

Assuming you created a new website with the example content following the installation steps above, this section explores just a few more steps in order to customize it.

### Core parameters

The core parameters for the website can be edited in the `config.toml` configuration file:

- Set `baseurl` to your website URL (we recommend [GitHub Pages](https://georgecushen.com/create-your-website-with-hugo/) for free hosting)
- Set `title` to your desired website title such as your name
- The example Disqus commenting variable should be cleared (e.g. `disqusShortname = ""`) or set to your own [Disqus](https://disqus.com/) shortname to enable commenting
- Edit your details under `[params]`; these will be displayed mainly in the homepage *about* and *contact* widgets (if used). To disable a contact field, simply clear the value to `""`. 
- Place a square cropped portrait photo named `portrait.jpg` into the `static/img/` folder, overwriting any defaults. Alternatively, you can edit the `avatar` filepath to point to a different image name or clear the value to disable the avatar feature.
- To enable LaTeX math for your site, set `math = true`
- Social/academic networking links are defined as multiples of `[[params.social]]`. They can be created or deleted as necessary.

### Introduce yourself

Edit your biography in the *about* widget `content/home/about.md` that you copied across from the `themes/academic/exampleSite/` folder. The research interests and qualifications are stored as `interests` and `education` variables. The academic qualifications are defined as multiples of `[[education.courses]]` and can be created or deleted as necessary. It's possible to completely hide the interests and education lists by deleting their respective variables.

### Customize homepage widgets

Each widget is responsible for a section on the homepage and contains further parameters that can be edited as desired. The parameters can be found in the preamble/frontmatter (between the pair of `+++`) for each widget located in the `content/home/` folder.

{{% alert note %}}
By default, publications will be displayed in a simple list. If you prefer a more detailed list with abstract and image, you can enable the detailed publication list on the homepage by setting `detailed_list = true` in `content/home/publications.md`.
{{% /alert %}}

### Add your content

Refer to our guide on [managing content]({{< ref "post/managing-content.md" >}}) to create your own homepage sections, publications, blog posts, and projects.

### Remove unused widgets and pages

[How to remove unused widgets and content pages]({{< ref "post/managing-content.md#removing-content" >}}).

### Customization & Upgrading

Continue reading below for advanced customization tips and instructions for keeping the theme up-to-date with any improvements that become available.


## Advanced customization

It is possible to carry out many customizations without touching any files in `themes/academic`, making it easier to upgrade the theme in the future.

### Navigation menu

The `[[menu.main]]` entries towards the bottom of `config.toml` define the navigation links at the top of the website. They can be added or removed as desired.

### Website icon

Save your main icon and mobile icon as square PNG images named `icon.png` and `apple-touch-icon.png`, respectively. Place them in your root `static/img/` folder.

### Theme color (CSS)

You can link custom CSS assets (relative to your root `static/css`) from your `config.toml` using `custom_css = ["custom.css"]`.

For example, lets make a green theme. First, define `custom_css = ["green.css"]` in `config.toml`. Then we can download the example [green theme](https://gist.github.com/gcushen/d5525a4506b9ccf83f2bce592a895495) and save it as `static/css/green.css`, relative to your website root (i.e. **not** in the `themes` directory).

### Analytics

To enable [Google Analytics](http://www.google.com/analytics), add your tracking code in `config.toml` similarly to `googleAnalytics = "UA-12345678-9"`.

### Third party and local scripts (JS)

To add a third party script, create a file named `head_custom.html` in a `layouts/partials/` folder at the root of your website (not in the `themes` folder). Any HTML code added to this file will be included within your website's `<head>`. Therefore, it's suitable for adding custom metadata or third party scripts specified with the *async* attribute.

Whereas for your own local scripts, you can link your local JS assets (relative to your root `static/js`) from your `config.toml` using `custom_js  = ["custom.js"]`.

### Permalinks

*Permalinks*, or *permanent links*, are URLs to individual pages and posts on your website. They are permanent web addresses which can be used to link to your content. Using Hugo's *permalinks* option these can be easily customized. For example, the blog post URL can be changed to the form *yourURL/2016/05/01/my-post-slug* by adding the following near the top of your `config.toml` (before `[params]` settings):

    [permalinks]
        post = "/:year/:month/:day/:slug"

Where `:slug` defaults to the filename of the post, excluding the file extension. However, slug may be overridden on a per post basis if desired, simply by setting `slug = "my-short-post-title"` in your post preamble.


## Upgrading

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) and monitor the [commits](https://github.com/gcushen/hugo-academic/commits/master) for updates.

Before upgrading the theme, it is recommended to make a backup of your entire website directory, or at least your `themes/academic` directory. You can also read about the [most recent milestones](https://github.com/gcushen/hugo-academic/releases) (but this doesn't necessarily reflect the latest *master* release).

Before upgrading for the first time, the remote *origin* repository should be renamed to *upstream*:

    $ cd themes/academic
    $ git remote rename origin upstream

To list available updates:

    $ cd themes/academic
    $ git fetch upstream
    $ git log --pretty=oneline --abbrev-commit --decorate HEAD..upstream/master

Then, upgrade by running:

    $ git pull upstream

If you have modified files in `themes/academic`, git will attempt to auto-merge changes. If conflicts are reported, you will need to manually edit the files with conflicts and add them back (`git add <filename>`).

If there are any issues after upgrading, you may wish to compare your site with the latest [example site](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) to check if any settings changed.


## Feedback & Contributing

Please use the [issue tracker](https://github.com/gcushen/hugo-academic/issues) to let me know about any bugs or feature requests, or alternatively make a pull request.

For general questions about Hugo, there is a [Hugo discussion forum](http://discuss.gohugo.io).


## License

Copyright 2016 [George Cushen](https://georgecushen.com).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.
