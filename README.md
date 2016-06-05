# Hugo Academic

A personal academic website theme for [Hugo](https://gohugo.io).

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/screenshot.png)](https://github.com/gcushen/hugo-academic/)

Key features:

- Designed for academic staff, students, or general personal use
- Includes Biography, Publications, Projects, News/Blog, Teaching, and Contact sections
- Write in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for easy formatting and code highlighting, with [LaTeX](https://en.wikibooks.org/wiki/LaTeX/Mathematics) for mathematical expressions
- Academic linking (Scholar etc.), Google Analytics, and Disqus comments
- Responsive and mobile friendly
- Simple and refreshing one page design
- Easy to customize

Latest demo: [gcushen.github.io/hugo-academic-demo/](http://gcushen.github.io/hugo-academic-demo/)

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

Refer to the [documentation](http://gcushen.github.io/hugo-academic-demo/#posts) under the *Posts* section of the latest Academic theme demo.

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
