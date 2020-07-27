<p align="center"><a href="https://sourcethemes.com/academic/" target="_blank" rel="noopener"><img src="https://sourcethemes.com/academic/img/logo_200px.png" alt="Academic logo"></a></p>

# [Academic](https://sourcethemes.com/academic/): the website builder for [Hugo](https://gohugo.io)

### The Page Builder to Easily Create Professional Websites :pencil2: :newspaper: :rocket:

**Create _any_ kind of website for free with Academic using Markdown, Jupyter, or RStudio. Choose a beautiful color theme and build anything with the Page Builder - over 50 _widgets_, _themes_, and _language packs_ included!**

[Check out the latest **demo**](https://academic-demo.netlify.app) of what you'll get in less than 10 minutes, or [view the **showcase**](https://sourcethemes.com/academic/user-stories/) of personal, project, and business sites.

- 👉 [**Get Started**](https://sourcethemes.com/academic/docs/install/)
- 📚 [View the **documentation**](https://sourcethemes.com/academic/docs/)
- 💬 [Chat with the **Academic community**](https://spectrum.chat/academic) or [**Hugo community**](https://discourse.gohugo.io)
- :heart: **Support development** of Academic:
  - :heart: [**Become a backer** on GitHub or Patreon to **unlock rewards and extra features**](https://sourcethemes.com/academic/plans/)
  - ☕️ [**Donate a coffee**](https://paypal.me/cushen)
  - :woman_technologist: [**Contribute**](https://sourcethemes.com/academic/docs/contribute/)
- 🐦 Twitter: [@source_themes](https://twitter.com/source_themes) [@GeorgeCushen](https://twitter.com/GeorgeCushen) [#MadeWithAcademic](https://twitter.com/search?q=%23MadeWithAcademic&src=typd)
- 💡 [Request a **feature** or report a **bug**](https://github.com/gcushen/hugo-academic/issues)
- ⬆️ **Updating?** View the [Update Guide](https://sourcethemes.com/academic/docs/update/) and [Release Notes](https://sourcethemes.com/academic/updates/)

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

## Themes

Academic comes with **automatic day (light) and night (dark) mode** built-in. Alternatively, click the sun/moon icon in the top right of the [Demo](https://academic-demo.netlify.app) to set your preferred mode!

Choose a stunning theme for your site and [customize it](https://sourcethemes.com/academic/docs/customization/#custom-theme) to your liking:

[![Themes](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/themes.png)](https://sourcethemes.com/academic/themes/)

[Browse more themes...](https://sourcethemes.com/academic/themes/)

## The Future of Technical Content Writing

[![Writing technical content](https://sourcethemes.com/academic/img/docs/writing-technical-content.gif)](https://academic-demo.netlify.apppost/writing-technical-content/)

## Ecosystem

* **[Academic Admin](https://github.com/sourcethemes/academic-admin):** An admin tool to import publications from BibTeX or import assets for an offline site
* **[Academic Scripts](https://github.com/sourcethemes/academic-scripts):** Scripts to help migrate content to new versions of Academic

## Create your site

You can choose from one of the following four methods to install:

* **one-minute Github/Gitlab install using your web browser (recommended)**
* install on your computer using Git with the Command Prompt/Terminal app
* install on your computer by downloading the ZIP files
* install on your computer with RStudio

### Create your site with GitHub

[**Create your site now with GitHub** :rocket:](https://sourcethemes.com/academic/docs/install/)

### Create your site on your computer with Git

Prerequisites:

* [Download and install Git](https://git-scm.com/downloads)
* [Download and install Hugo Extended v0.73-v0.74](https://gohugo.io/getting-started/installing/#quick-install)

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

### Create your site on your computer _without_ Git

Prerequisites:

* [Download and install Hugo Extended v0.73-v0.74](https://gohugo.io/getting-started/installing/#quick-install)

Install:

1. [Download](https://github.com/sourcethemes/academic-kickstart/archive/master.zip) and extract *Academic Kickstart*
2. [Download](https://github.com/gcushen/hugo-academic/archive/master.zip) and extract the *Academic theme* files from the `hugo-academic-master` folder to the `themes/academic/` folder in *Academic Kickstart*

### Create your site with RStudio

[Install Academic with RStudio](http://localhost:59000/academic/docs/install-locally/#install-with-rstudio)

## Demo content

For inspiration, refer to the [Markdown content](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) which powers the [Demo](https://academic-demo.netlify.app).

If you wish to initialise your site with the demo content, copy the contents of the `themes/academic/exampleSite/` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started. The following command can be used to accomplish this:

```bash
cp -av themes/academic/exampleSite/* .
```

## Get Started

[View the guide to Personalize and Deploy your new site](https://sourcethemes.com/academic/docs/get-started/).

## Updating

[View the Update Guide](https://sourcethemes.com/academic/docs/update/).

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) and follow [@source_themes](https://twitter.com/source_themes) on Twitter to help keep track of [updates](https://sourcethemes.com/academic/updates).

## License

Copyright 2016-present [George Cushen](https://georgecushen.com).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.

[![Analytics](https://ga-beacon.appspot.com/UA-78646709-2/hugo-academic/readme?pixel)](https://github.com/igrigorik/ga-beacon)
