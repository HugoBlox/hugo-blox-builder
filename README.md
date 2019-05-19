<p align="center"><a href="https://sourcethemes.com/academic/" target="_blank" rel="noopener"><img src="https://sourcethemes.com/academic/img/logo_200px.png" alt="Academic logo"></a></p>

# [Academic](https://sourcethemes.com/academic/): the website builder for [Hugo](https://gohugo.io)

### The Page Builder to Easily Create Professional Websites :pencil2: :newspaper: :rocket:

**Create a free website with Academic using Markdown, Jupyter, or RStudio. Choose a beautiful color theme and build anything with the Page Builder - over 40 _widgets_, _themes_, and _language packs_ included!**

[Check out the latest **demo**](https://academic-demo.netlify.com/) of what you'll get in less than 10 minutes, or [view the **showcase**](https://sourcethemes.com/academic/#expo) of personal, project, and business sites.

- [**Setup Academic**](#install)
- [**Get Started**](https://sourcethemes.com/academic/docs/get-started/)
- [View the documentation](https://sourcethemes.com/academic/docs/)
- [Ask a question](http://discuss.gohugo.io/)
- [Request a feature or report a bug](https://github.com/gcushen/hugo-academic/issues)
- Updating? View the [Update Guide](https://sourcethemes.com/academic/docs/update/) and [Release Notes](https://sourcethemes.com/academic/updates/)
- Support development of Academic:
  - [Donate a coffee](https://paypal.me/cushen)
  - [Become a backer on Patreon](https://www.patreon.com/cushen)
  - [Decorate your laptop or journal with an Academic sticker](https://www.redbubble.com/people/neutreno/works/34387919-academic)
  - [Wear the T-shirt](https://academic.threadless.com/)

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/academic.png)](https://github.com/gcushen/hugo-academic/)

**Key features:**

- **Page builder** - Create *anything* with [**widgets**](https://sourcethemes.com/academic/docs/page-builder/) and [**elements**](https://sourcethemes.com/academic/docs/writing-markdown-latex/)
- **Edit any type of content** - Blog posts, publications, talks, slides, projects, and more!
- **Create content** in [**Markdown**](https://sourcethemes.com/academic/docs/writing-markdown-latex/), [**Jupyter**](https://sourcethemes.com/academic/docs/jupyter/), or [**RStudio**](https://sourcethemes.com/academic/docs/install/#install-with-rstudio)
- **Plugin System** - Fully customizable [**color** and **font themes**](https://sourcethemes.com/academic/themes/)
- **Display Code and Math** - Code highlighting and [LaTeX math](https://en.wikibooks.org/wiki/LaTeX/Mathematics) supported
- **Integrations** - [Google Analytics](https://analytics.google.com), [Disqus commenting](https://disqus.com), Maps, Contact Forms, and more!
- **Beautiful Site** - Simple and refreshing one page design
- **Industry-Leading SEO** - Help get your website found on search engines and social media
- **Media Galleries** - Display your images and videos with captions in a customizable gallery
- **Mobile Friendly** - Look amazing on every screen with a mobile friendly version of your site
- **Multi-language** - 15+ language packs including English, 中文, and Português
- **Multi-user** - Each author gets their own profile page
- **Privacy Pack** - Assists with GDPR
- **Stand Out** - Bring your site to life with animation, parallax backgrounds, and scroll effects
- **One-Click Deployment** - No servers. No databases. Only files.

## Color Themes

Academic comes with **day (light) and night (dark) mode** built-in. Click the sun/moon icon in the top right of the [Demo](https://academic-demo.netlify.com/) to see it in action!

Choose a stunning color and font theme for your site. Themes are fully customizable and include:

| `default` | `ocean` | `forest` | `dark` |
| --- | --- | --- | --- |
| ![default theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-default.png) | ![ocean theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-ocean.png) | ![forest theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-forest.png) | ![dark theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-dark.png) |

| `apogee` | `1950s` | `coffee` | `cupcake` |
| --- | --- | --- | --- |
| ![apogee theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-apogee.png) | ![1950s theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-1950s.png) | ![coffee theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-coffee-playfair.png) | ![cupcake theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-cupcake.png) |

[Browse more themes...](https://sourcethemes.com/academic/themes/)

## Ecosystem

* **[Academic Admin](https://github.com/sourcethemes/academic-admin):** An admin tool to import publications from BibTeX or import assets for an offline site
* **[Academic Scripts](https://github.com/sourcethemes/academic-scripts):** Scripts to help migrate content to new versions of Academic

## Install

You can choose from one of the following four methods to install:

* **one-click install using your web browser (recommended)**
* install on your computer using Git with the Command Prompt/Terminal app
* install on your computer by downloading the ZIP files
* install on your computer with RStudio

### Install with web browser

[Install Academic with Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/sourcethemes/academic-kickstart)
  * One-click install of Academic creates an `academic-kickstart` repository in your GitHub or GitLab account
  * Netlify will provide you with a customizable URL to access your new site, [or get your own domain](https://sourcethemes.com/academic/docs/domain/)
  * Shortly after editing content in your repository, your site will automatically update
  * Optionally, to edit your site in a [Markdown editor](https://www.typora.io) on your computer, perform the steps in the [*Install with Git*](#install-with-git) section below

### Install with Git

Prerequisites:

* [Download and install Git](https://git-scm.com/downloads)
* [Download and install Hugo Extended v0.55.6+](https://gohugo.io/getting-started/installing/#quick-install)

Install:

1. [Fork](https://github.com/sourcethemes/academic-kickstart#fork-destination-box) the *Academic Kickstart* repository to create a new website
   * If you already created your site with **Netlify**, then skip this step
2. Clone your fork to your computer with Git, replacing `sourcethemes` in the command below with your GitHub username: 

    ```bash
    git clone https://github.com/sourcethemes/academic-kickstart.git My_Website
    ```
    
3. Initialize the theme:

    ```bash
    cd My_Website
    git submodule update --init --recursive
    ```

### Install with ZIP

Prerequisites:

* [Download and install Hugo Extended v0.55.6+](https://gohugo.io/getting-started/installing/#quick-install)

Install:

1. [Download](https://github.com/sourcethemes/academic-kickstart/archive/master.zip) and extract *Academic Kickstart*
2. [Download](https://github.com/gcushen/hugo-academic/archive/master.zip) and extract the *Academic theme* files from the `hugo-academic-master` folder to the `themes/academic/` folder in *Academic Kickstart*

### Install with RStudio

[Install Academic with RStudio](https://sourcethemes.com/academic/docs/install/#install-with-rstudio)

## Demo content

For inspiration, refer to the [Markdown content](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) which powers the [Demo](https://academic-demo.netlify.com/).

If you wish to initialise your site with the demo content, copy the contents of the `themes/academic/exampleSite/` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started. The following command can be used to accomplish this:

```bash
cp -av themes/academic/exampleSite/* .
```

## Get Started

[View the guide to Personalize and Deploy your new site](https://sourcethemes.com/academic/docs/get-started/).

## Updating

[View the Update Guide](https://sourcethemes.com/academic/docs/update/).

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) to help keep track of [updates](https://sourcethemes.com/academic/updates).

## License

Copyright 2016-present [George Cushen](https://georgecushen.com).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.

[![Analytics](https://ga-beacon.appspot.com/UA-78646709-2/hugo-academic/readme?pixel)](https://github.com/igrigorik/ga-beacon)
