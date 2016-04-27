# Hugo Academic

A personal academic website theme for [Hugo](https://gohugo.io).

[![Screenshot](https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/screenshot.png)](https://github.com/gcushen/hugo-academic/)

Key features:
- Suitable for academic staff, students, or general personal use
- Sections for Biography, Publications, Blog/News, Teaching, and Contact
- Responsive and mobile friendly
- Simple one page design
- Clean and refreshing theme
- Easy to customize

## Quick start

1. Install [Hugo](https://gohugo.io/overview/installing/) and create a new website:

        hugo new site my_website
        cd my_website

2. Install Academic theme with `git`:

        git clone git@github.com:gcushen/hugo-academic.git themes/hugo-academic

 Or alternatively, install by downloading from [Github](https://github.com/gcushen/hugo-academic/) into a `themes/hugo-academic` folder within your Hugo website.

3. If you are creating a new website, copy the contents of the `exampleSite` folder to your website root folder, overwriting existing files if necessary. The `exampleSite` folder contains an example config file and content to help you get started.

4. Start the Hugo server from your website root folder:

        hugo server --watch

 Now you can go to [localhost:1313](http://localhost:1313) and your new Academic themed website should appear.

5. Customize your website (see next section), build it by running `hugo`, and deploy it by copying the `public/` directory (by FTP, Rsync, git push, etc.) to your production web server.

## Customization

The configuration file `config.toml` contains the core parameters for the website. For deployment, the `baseURL` variable can be changed to match your website URL such as `baseURL = "http://yoursite.org/"`.

To change the biography text, edit `content/home/about.md` and/or the `param` variables in `config.toml`.

To create a new publication:

    hugo new publications/my-paper-name.md

Then edit the default variables at the top of `publications/my-paper-name.md` to include the details of your publication. Note that the `date` variable for publications is the publish date in the format `2016-01-01`.

To create a blog/news article:

    hugo new blog/my-article-name.md

To remove content, simply delete the relevant file from your `content/blog` or `content/publications` folder. If you wish to remove the Teaching section from the home page, simply delete the `content/home/teaching.md` file. Then rebuild and view the updated website with the `hugo` and `hugo server --watch` commands.

To enable Google Analytics, add your tracking code to `config.toml` similarly to `googleAnalytics = "UA-12345678-9"`.

## Upgrading

Improvements to the theme will be recorded in the Github releases changelog. Feel free to star the project on [Github](https://github.com/gcushen/hugo-academic/) and monitor the progress for updates.

Created by [George Cushen](http://www.cushen.me).
