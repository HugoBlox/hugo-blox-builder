# Academic: the personal website framework for [Hugo](https://gohugo.io)

**Academic** is a framework to help you create a beautiful website quickly. Perfect for personal, student, or academic websites. [Check out the latest demo](https://sourcethemes.com/academic/) of what you'll get in less than 10 minutes.

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/academic.png)](https://github.com/gcushen/hugo-academic/)

Key features:

- Easily manage your homepage, blog posts, publications, talks, and projects
- Configurable widgets available for Biography, Publications, Projects, News/Blog, Talks, and Contact
- Need a different section? Just use the Custom widget!
- Write in [Markdown](https://sourcethemes.com/academic/docs/writing-markdown-latex/) for easy formatting and code highlighting, with [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) for mathematical expressions
- Social/academic network linking, [Google Analytics](https://analytics.google.com), and [Disqus](https://disqus.com) comments
- Responsive and mobile friendly
- Simple and refreshing one page design
- Multilingual and easy to customize

## Color Themes

Academic is available in different color themes and font themes.

| `default` | `ocean` | `dark` |
| --- | --- | --- |
| ![default theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-default.png) | ![ocean theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-ocean.png) | ![dark theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-dark.png) |

| `forest` | `coffee` + `playfair` font | `1950s` |
| --- | --- | --- |
| ![forest theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-forest.png) | ![coffee theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-coffee-playfair.png) | ![1950s theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-1950s.png) |

## Getting Started

The following two methods describe how to install in the cloud using your web browser and how to install on your PC using the Command Prompt/Terminal app.

### Quick install using your web browser

1. [Install Academic with Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/sourcethemes/academic-kickstart)
    * Netlify will provide you with a customizable URL to access your new site
2. On GitHub, go to your newly created `academic-kickstart` repository and edit `config.toml` to personalize your site. Shortly after saving the file, your site will automatically update
3. Read the [Quick Start Guide](https://sourcethemes.com/academic/docs/) to learn how to add Markdown content. For inspiration, refer to the [Markdown content](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) which powers the [Demo](https://themes.gohugo.io/theme/academic/)

### Install on your PC

Prerequisites:

* [Download and install Git](https://git-scm.com/downloads)
* [Download and install Hugo](https://gohugo.io/getting-started/installing/#quick-install)

1. Clone (or [Fork](https://github.com/sourcethemes/academic-kickstart#fork-destination-box) or [download](https://github.com/sourcethemes/academic-kickstart/archive/master.zip)) the *Academic Kickstart* repository with Git: 

       git clone https://github.com/sourcethemes/academic-kickstart.git My_Website
    
    *Note that if you forked Academic Kickstart, the above command should be edited to clone your fork.*

2. Initialize the theme:

       cd My_Website
       git submodule update --init --recursive

3. View your new website:
      
       hugo server

    Now you can go to [localhost:1313](http://localhost:1313) and your new Academic powered website should appear.
           
4. Read the [Quick Start Guide](https://sourcethemes.com/academic/docs/) to learn how to add Markdown content, customize your site, and deploy it. For inspiration, refer to the [Markdown content](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) which powers the [Demo](https://themes.gohugo.io/theme/academic/)

5. Build your site by running the `hugo` command. Then [host it for free using Github Pages](https://georgecushen.com/create-your-website-with-hugo/) or Netlify (refer to above section). Alternatively, copy the generated `public/` directory (by FTP, Rsync, etc.) to your production web server (such as your university's hosting service).

## Updating

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) to help keep track of updates and check out the [release notes](https://sourcethemes.com/academic/tags/updates) prior to updating your site.

Before updating Academic, it is recommended to make a backup of your entire website directory, or at least your `themes/academic` directory.

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

[![Analytics](https://ga-beacon.appspot.com/UA-78646709-2/hugo-academic/readme?pixel)](https://github.com/igrigorik/ga-beacon)
