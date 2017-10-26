+++
date = 2016-04-20
lastmod = 2017-09-03
draft = false
tags = ["academic", "hugo"]
title = "Getting started with the Academic framework for Hugo"
math = true
summary = """
Create a beautifully simple personal or academic website in under 10 minutes. 
"""

[header]
image = "headers/getting-started.png"
caption = "Image credit: [**Academic**](https://github.com/gcushen/hugo-academic/)"

+++

The Academic framework enables you to easily create a beautifully simple personal or academic website using the [Hugo](https://gohugo.io) static site generator.

Key features:

- Easily manage your homepage, blog posts, publications, talks, and projects
- Configurable widgets available for Biography, Publications, Projects, News/Blog, Talks, and Contact
- Need a different section? Just use the Custom widget!
- Write in [Markdown]({{< ref "post/writing-markdown-latex.md" >}}) for easy formatting and code highlighting, with [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) for mathematical expressions
- Social/academic network linking, [Google Analytics](https://analytics.google.com), and [Disqus](https://disqus.com) comments
- Responsive and mobile friendly
- Simple and refreshing one page design
- Multilingual and easy to customize

{{% toc %}}

## Installation

1. [Install Hugo](https://georgecushen.com/create-your-website-with-hugo/#installing-hugo) and create a new website by typing the following commands in your *Terminal* or *Command Prompt* app:

        hugo new site my_website
        cd my_website

2. Install Academic with [git](https://help.github.com/articles/set-up-git/):

        git clone https://github.com/gcushen/hugo-academic.git themes/academic

    Or alternatively, [download Academic](https://github.com/gcushen/hugo-academic/archive/master.zip) and extract it into a `themes/academic` folder within your Hugo website.

3. If you are creating a new website, copy the contents of the `exampleSite` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started.

        cp -av themes/academic/exampleSite/* .

4. Start the Hugo server from your website root folder:

        hugo server

    Now you can go to [localhost:1313](http://localhost:1313) and your new Academic powered website should appear.

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
- Place a square cropped portrait photo named `portrait.jpg` into the `static/img/` folder, overwriting any defaults. Note that you can edit the `avatar` filepath to point to a different image name or clear the value to disable the avatar feature. Alternatively, set `gravatar` to `true` to use the Gravatar/Wordpress avatar associated with your `email` address.
- To enable LaTeX math for your site, set `math = true`
- Social/academic networking links are defined as multiples of `[[params.social]]`. They can be created or deleted as necessary.

### Introduce yourself

Edit your biography in the *about* widget `content/home/about.md` that you copied across from the `themes/academic/exampleSite/` folder. The research interests and qualifications are stored as `interests` and `education` variables. The academic qualifications are defined as multiples of `[[education.courses]]` and can be created or deleted as necessary. It's possible to completely hide the interests and education lists by deleting their respective variables.

### Customize the homepage

Refer to our guide on using [widgets]({{< ref "post/widgets.md" >}}) to customize your homepage.

### Add your content

Refer to our guide on [managing content]({{< ref "post/managing-content.md" >}}) to create your own publications, blog posts, talks, and projects.

### Remove unused widgets and pages

[How to remove unused widgets and content pages]({{< ref "post/managing-content.md#removing-content" >}}).

### Themes

The following color themes are available and can be set by the `color_theme` option in `config.toml`:

| `default` | `ocean` |
| --- | --- |
| ![default theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-default.png)| ![ocean theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-ocean.png) |

| `forest` | `coffee`  + `playfair` font |
| --- | --- |
| ![forest theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-forest.png) | ![coffee theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-coffee-playfair.png) |


The following font styles are available and can be set by the `font` option in `config.toml`:

- default (modern)
- classic (original Academic v1 style)
- playfair (serif)


### Customization & updating

Continue reading below for advanced customization tips and instructions for keeping the framework up-to-date with any improvements that become available.


## Advanced customization

It is possible to carry out many customizations without touching any files in `themes/academic`, making it easier to update the framework in the future.

### Navigation menu

The `[[menu.main]]` entries towards the bottom of `config.toml` define the navigation links at the top of the website. They can be added or removed as desired.

To create a dropdown sub-menu, add `identifier = "something"` to the parent item and `parent = "something"` to the child item.

### Website icon

Save your main icon and mobile icon as square PNG images named `icon.png` and `apple-touch-icon.png`, respectively. Place them in your root `static/img/` folder.

### Analytics

To enable [Google Analytics](http://www.google.com/analytics), add your tracking code in `config.toml` similarly to `googleAnalytics = "UA-12345678-9"`.

### Third party and local scripts (JS)

To add a third party script, create a file named `head_custom.html` in a `layouts/partials/` folder at the root of your website (not in the `themes` folder). Any HTML code added to this file will be included within your website's `<head>`. Therefore, it's suitable for adding custom metadata or third party scripts specified with the *async* attribute.

Whereas for your own local scripts, you can link your local JS assets (relative to your root `static/js`) from your `config.toml` using `custom_js  = ["custom.js"]`.

### Language and translation

The interface text (e.g. buttons) is stored in language files which are collected from Academic's `themes/academic/i18n/` folder, as well as an `i18n/` folder at the root of your project.

To edit the interface text, copy `themes/academic/i18n/en.yaml` to `i18n/en.yaml` (relative to the root of your website). Open the new file and make any desired changes to the text appearing after `translation:`. Note that the language files are formatted in YAML syntax.

To translate the interface text to another language, follow the above instructions, but name the new file in the form `i18n/X.yaml` where `X` is the appropriate [ISO/RFC5646 language identifier](http://www.w3schools.com/tags/ref_language_codes.asp) for the translation. Then follow the brief instructions in the *Language* section at the bottom of your `config.toml`. To change the default language used by Academic, set `defaultContentLanguage` to the desired language identifier in your configuration file.

To translate the navigation bar, you can edit the default `[[menu.main]]` instances in `config.toml`. However, for a multilingual site, you will need to duplicate all of the `[[menu.main]]` instances and rename the new instances from `[[menu.main]]` to `[[Languages.X.menu.main]]`, where `X` is the language identifier (e.g. `[[Languages.zh.menu.main]]` for Simplified Chinese). Thus, the navigation bar can be displayed in multiple languages.

To translate a content file in your `content/` folder into another language, copy the file to `filename.X.md` where `filename` is your existing filename and `X` is the appropriate [ISO/RFC5646 language identifier](http://www.w3schools.com/tags/ref_language_codes.asp) for the translation. Then translate the content in the new file to the specified language.

For further details on Hugo's internationalization and multilingual features, refer to the [associated Hugo documentation](https://gohugo.io/content/multilingual/).

### Permalinks

*Permalinks*, or *permanent links*, are URLs to individual pages and posts on your website. They are permanent web addresses which can be used to link to your content. Using Hugo's *permalinks* option these can be easily customized. For example, the blog post URL can be changed to the form *yourURL/2016/05/01/my-post-slug* by adding the following near the top of your `config.toml` (before `[params]` settings):

    [permalinks]
        post = "/:year/:month/:day/:slug"

Where `:slug` defaults to the filename of the post, excluding the file extension. However, slug may be overridden on a per post basis if desired, simply by setting `slug = "my-short-post-title"` in your post preamble.

**Example 2:** let's consider changing the URL path of posts from `post/` to `blog/`. First, add the following parameters right above the `[params]` section of your `config.toml`:
```
[permalinks]
    post = "/blog/:slug"
```
Then add `aliases = ["/blog/"]` to your post archive page `post/_index.md` so that it can be accessed from the */blog/* URL.

### Advanced style customization (CSS)

For advanced customization of the style, you can link custom CSS assets (relative to your root `static/css`) from your `config.toml` using `custom_css = ["custom.css"]`.

For example, let's override some of Academic's default styles. First, define `custom_css = ["override.css"]` in `config.toml`. Then we can create the file `static/css/override.css`, relative to your website root (i.e. **not** in the `themes` directory). Add your custom CSS to this file.


## Updating

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) to help keep track of updates and check out the [release notes](https://sourcethemes.com/academic/tags/updates) prior to updating your site.

Before updating the framework, it is recommended to make a backup of your entire website directory, or at least your `themes/academic` directory.

Before updating for the first time, the remote *origin* repository should be renamed to *upstream*:

    $ cd themes/academic
    $ git remote rename origin upstream

To list available updates:

    $ cd themes/academic
    $ git fetch upstream
    $ git log --pretty=oneline --abbrev-commit --decorate HEAD..upstream/master

Then, update by running:

    $ git pull upstream

If you have modified files in `themes/academic`, git will attempt to auto-merge changes. If conflicts are reported, you will need to manually edit the files with conflicts and add them back (`git add <filename>`).

If there are any issues after updating, you may wish to compare your site with the latest [example site](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) to check if any settings changed in `config.toml` or the `+++` frontmatter of content files.


## Feedback & Contributing

Please use the [issue tracker](https://github.com/gcushen/hugo-academic/issues) to let me know about any bugs or feature requests, or alternatively make a pull request.

For general questions about Hugo, there is a [Hugo discussion forum](http://discuss.gohugo.io).


## License

Copyright 2017 [George Cushen](https://georgecushen.com).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.
