# Academic: the personal website framework for [Hugo](https://gohugo.io)

**Academic** is a framework to help you create a beautiful website quickly. Perfect for personal, student, or academic websites. [Check out the latest demo](https://sourcethemes.com/academic/) of what you'll get in less than 10 minutes.

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/academic.png)](https://github.com/gcushen/hugo-academic/)

Key features:

- Easily manage your homepage, blog posts, publications, talks, and projects
- Configurable widgets available for Biography, Publications, Projects, News/Blog, Talks, and Contact
- Need a different section? Just use the Custom widget!
- Write in [Markdown](https://sourcethemes.com/academic/post/writing-markdown-latex/) for easy formatting and code highlighting, with [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) for mathematical expressions
- Social/academic network linking, [Google Analytics](https://analytics.google.com), and [Disqus](https://disqus.com) comments
- Responsive and mobile friendly
- Simple and refreshing one page design
- Multilingual and easy to customize

## Color Themes

Academic is available in different color themes and font themes.

| `default` | `ocean` |
| --- | --- |
| ![default theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-default.png) | ![ocean theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-ocean.png) |

| `forest` | `coffee` + `playfair` font |
| --- | --- |
| ![forest theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-forest.png) | ![coffee theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-coffee-playfair.png) |

| `dark` |
| --- |
| ![dark theme](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-dark.png) |

## Getting Started

1. [Install Hugo](https://georgecushen.com/create-your-website-with-hugo/#installing-hugo) and create a new website by typing the following commands in your *Terminal* or *Command Prompt* app:

        hugo new site my_website
        cd my_website

2. Install Academic with [git](https://help.github.com/articles/set-up-git/):

        git submodule add https://github.com/gcushen/hugo-academic themes/academic 

3. If you are creating a new website, copy the contents of the `exampleSite` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started.

        cp -av themes/academic/exampleSite/* .

4. Start the Hugo server from your website root folder:

        hugo server

    Now you can go to [localhost:1313](http://localhost:1313) and your new Academic powered website should appear.

5. [Customize your website](https://sourcethemes.com/academic/post/getting-started/#getting-started) and [add your content](https://sourcethemes.com/academic/post/managing-content/) by referring to the Academic documentation

6. Build your site by running the `hugo` command. Then [host it for free using Github Pages](https://georgecushen.com/create-your-website-with-hugo/). Or alternatively, copy the generated `public/` directory (by FTP, Rsync, etc.) to your production web server (such as your university's hosting service).

## Updating

Feel free to *star* the project on [Github](https://github.com/gcushen/hugo-academic/) to help keep track of updates and check out the [release notes](https://sourcethemes.com/academic/tags/updates) prior to updating your site.

Before updating Academic, it is recommended to make a backup of your entire website directory, or at least your `themes/academic` directory. If you added `hugo-academic` as a `git submodule` simply do

    git submodule update --remote --merge

If you have modified files in `themes/academic`, git will attempt to auto-merge changes. If conflicts are reported, you will need to manually edit the files with conflicts and add them back (`git add <filename>`).

If there are any issues after updating, you may wish to compare your site with the latest [example site](https://github.com/gcushen/hugo-academic/tree/master/exampleSite) to check if any settings changed in `config.toml` or the `+++` frontmatter of content files.

## Feedback & Contributing

Please use the [issue tracker](https://github.com/gcushen/hugo-academic/issues) to let me know about any bugs or feature requests, or alternatively make a pull request.

For general questions about Hugo, there is a [Hugo discussion forum](http://discuss.gohugo.io).

## License

Copyright 2017 [George Cushen](https://georgecushen.com).

Released under the [MIT](https://github.com/gcushen/hugo-academic/blob/master/LICENSE.md) license.

[![Analytics](https://ga-beacon.appspot.com/UA-78646709-2/hugo-academic/readme?pixel)](https://github.com/igrigorik/ga-beacon)
