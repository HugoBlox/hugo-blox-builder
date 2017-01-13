# Hugo Academic

A highly flexible personal website theme for [Hugo](https://gohugo.io).

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/screenshot.png)](https://github.com/gcushen/hugo-academic/)

Key features:

- Designed for academic staff, students, or general personal use
- Configurable widgets available for Biography, Publications, Projects, News/Blog, Talks, Contact, and Custom
- Write in [Markdown](http://gcushen.github.io/hugo-academic-demo/post/writing-markdown-latex/) for easy formatting and code highlighting, with [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) for mathematical expressions
- Academic linking (Scholar etc.), [Google Analytics](https://analytics.google.com), and [Disqus](https://disqus.com) comments
- Responsive and mobile friendly
- Simple and refreshing one page design
- Easy to customize

Latest demo: [gcushen.github.io/hugo-academic-demo/](http://gcushen.github.io/hugo-academic-demo/)

## Getting Started

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

5. [Customize your website](http://gcushen.github.io/hugo-academic-demo/post/getting-started/#getting-started) and [add your content](http://gcushen.github.io/hugo-academic-demo/post/managing-content/) by referring to the Academic theme documentation

6. Build your site by running the `hugo` command. Then [host it for free using Github Pages](https://georgecushen.com/create-your-website-with-hugo/). Or alternatively, copy the generated `public/` directory (by FTP, Rsync, etc.) to your production web server (such as your university's hosting service).

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

[![Analytics](https://ga-beacon.appspot.com/UA-78646709-2/hugo-academic/readme?pixel)](https://github.com/igrigorik/ga-beacon)
