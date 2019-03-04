<p align="center"><a href="https://sourcethemes.com/academic/" target="_blank" rel="noopener"><img src="https://sourcethemes.com/academic/img/logo_200px.png" alt="Academic logo"></a></p>

# Academic: the website designer for [Hugo](https://gohugo.io)

**Academic** makes it easy to create a beautiful website for free using Markdown. Customize anything on your site with widgets, themes, and language packs.

Follow our easy [step by step guide](https://sourcethemes.com/academic/docs/install/) to learn how to build your own free website with Academic. [Check out the personal demo](https://academic-demo.netlify.com/) or the [business demo](https://sourcethemes.com/academic/) of what you'll get in less than 10 minutes.

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

## Color Themes

Academic is available in different color themes and font themes.

| `default` | `ocean` | `forest` | `dark` |
| --- | --- | --- | --- |
| ![default theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-default.png) | ![ocean theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-ocean.png) | ![forest theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-forest.png) | ![dark theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-dark.png) |

| `apogee` | `1950s` | `coffee` | `cupcake` |
| --- | --- | --- | --- |
| ![apogee theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-apogee.png) | ![1950s theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-1950s.png) | ![coffee theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-coffee-playfair.png) | ![cupcake theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-cupcake.png) |

## Ecosystem

* **[Academic Admin](https://github.com/sourcethemes/academic-admin):** An admin tool to import publications from BibTeX or import assets for an offline site
* **[Academic Scripts](https://github.com/sourcethemes/academic-scripts):** Scripts to help migrate content to new versions of Academic

## Install

You can choose from one of the following four methods to install:

* one-click install using your web browser (recommended)
* install on your computer using Git with the Command Prompt/Terminal app
* install on your computer by downloading the ZIP files
* install on your computer with RStudio

### Quick install using your web browser

1. [Install Academic with Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/sourcethemes/academic-kickstart)
    * Netlify will provide you with a customizable URL to access your new site
2. On GitHub, go to your newly created `academic-kickstart` repository and edit `config.toml` to personalize your site. Shortly after saving the file, your site will automatically update
3. Read the [Quick Start Guide](https://sourcethemes.com/academic/docs/) to learn how to add Markdown content. For inspiration, refer to the [Markdown content](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) which powers the [Demo](https://academic-demo.netlify.com/)

### Install with Git

Prerequisites:

* [Download and install Git](https://git-scm.com/downloads)
* [Download and install Hugo](https://gohugo.io/getting-started/installing/#quick-install)

1. [Fork](https://github.com/sourcethemes/academic-kickstart#fork-destination-box) the *Academic Kickstart* repository and clone your fork with Git: 

       git clone https://github.com/sourcethemes/academic-kickstart.git My_Website
    
    *Note that if you forked Academic Kickstart, the above command should be edited to clone your fork, i.e. replace `sourcethemes` with your GitHub username.*

2. Initialize the theme:

       cd My_Website
       git submodule update --init --recursive

### Install with ZIP

1. [Download](https://github.com/sourcethemes/academic-kickstart/archive/master.zip) and extract *Academic Kickstart*
2. [Download](https://github.com/gcushen/hugo-academic/archive/master.zip) and extract the *Academic theme* to the `themes/academic/` folder from the above step

### Install with RStudio

[View the guide to installing Academic with RStudio](https://sourcethemes.com/academic/docs/install/#install-with-rstudio)

## Quick start

1. If you installed on your computer, view your new website by running the following command:
      
       hugo server

    Now visit [localhost:1313](http://localhost:1313) and your new Academic powered website will appear. Otherwise, if using Netlify, they will provide you with your URL.
           
2. Read the [Quick Start Guide](https://sourcethemes.com/academic/docs/) to learn how to add Markdown content, customize your site, and deploy it. For inspiration, refer to the [Markdown content](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) which powers the [Demo](https://academic-demo.netlify.com/)

3. Build your site by running the `hugo` command. Then [host it for free using Github Pages](https://georgecushen.com/create-your-website-with-hugo/) or Netlify (refer to the first installation method). Alternatively, copy the generated `public/` directory (by FTP, Rsync, etc.) to your production web server (such as a university's hosting service).

## Updating

[View the Update Guide](https://sourcethemes.com/academic/docs/update/).

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) to help keep track of [updates](https://sourcethemes.com/academic/updates).

## Feedback & Contributing

Please use the [issue tracker](https://github.com/gcushen/hugo-academic/issues) to let me know about any bugs or feature requests, or alternatively make a pull request.

For support, head over to the [Hugo discussion forum](http://discuss.gohugo.io).

## License

Copyright 2016-present [George Cushen](https://georgecushen.com).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.

[![Analytics](https://ga-beacon.appspot.com/UA-78646709-2/hugo-academic/readme?pixel)](https://github.com/igrigorik/ga-beacon)
