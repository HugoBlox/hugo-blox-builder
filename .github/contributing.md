# Contributing to Wowchemy

Thanks for being interested in contributing! We’re so glad you want to help!

We want contributing to Wowchemy to be fun, enjoyable, and educational for anyone and everyone. All contributions are welcome, including new plugins (such as new widgets, shortcodes, theme packs, and language packs), templates, features, documentation as well as updates and tweaks, blog posts, YouTube tutorials, live streaming customizations, meetups, and more.

## Where to Start

Join the **Contributing** channel on the **[community Discord](https://discord.gg/z8wNYzb)**.

### For technical contributions

Learn [how to contribute code on Github](https://codeburst.io/a-step-by-step-guide-to-making-your-first-github-contribution-5302260a2940).

If you're a developer looking to contribute, but you're not sure where to begin, check out the [good first issue](https://github.com/wowchemy/wowchemy-hugo-modules/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) label on Github, which contains small tasks that have been specifically flagged as being friendly to new contributors.

After that, if you're looking for something a little more challenging to sink your teeth into, there's a broader [help wanted](https://github.com/wowchemy/wowchemy-hugo-modules/labels/help%20wanted) label encompassing issues which need some love.

If you have a straightforward bug fix or improvement, feel free to contribute it in a [Pull Request](https://github.com/wowchemy/wowchemy-hugo-modules/pulls) for the community to review.

If you have an idea for a new feature, please start by [searching the issues](https://github.com/wowchemy/wowchemy-hugo-modules/issues) to check that the feature has not already been suggested and then suggest it by [opening a new issue](https://github.com/wowchemy/wowchemy-hugo-modules/issues/new/choose), as adding new features to Wowchemy first requires some analysis around the design and spec.

Code linting and formatting form part of the Continuous Integration process to help catch bugs and code issues in contributions.

Contributors can also run the flow on their fork of the  "Wowchemy Hugo Modules" repo when making contributions (you'll need Node and Yarn to run):
```sh
cd wowchemy
yarn install
yarn run lint:js
yarn run lint:style
yarn run format
```

### Contribute a widget

[Create and publish your own widget](https://github.com/wowchemy/wowchemy-widget-starter)

### Contribute a shortcode

[Create and publish your own shortcode](https://github.com/wowchemy/wowchemy-shortcode-starter)

### Contribute a language pack 

To contribute a **new language pack** or an improvement to a language pack, refer to the [language pack guide](https://wowchemy.com/docs/language/#create-or-modify-a-language-pack). Once created, [fork Wowchemy Hugo Modules](https://github.com/wowchemy/wowchemy-hugo-modules), place your language pack in `wowchemy/i18n/`, add the name of the language to `wowchemy/data/i18n/language.yaml`, and open a Pull Request on Github with these two files.

### Contribute a theme pack

[View the guide](https://wowchemy.com/docs/customization/#share-your-theme) to contributing a color and font theme pack.

### Contribute a template

Consider forking a bare-bones template such as [Hello Starter](https://github.com/wowchemy/starter-hello-world) on GitHub and building up your own template using the Wowchemy Hugo Module. Reach out on the **Contributing** channel in Discord to submit your template.

### Contribute to the Publication importer

To contribute to **Hugo Academic CLI**, the automatic publication importer, refer to [its dedicated Github repository](https://github.com/wowchemy/hugo-academic-cli) and Issue queue.

## Become a backer

To help us develop this free software sustainably under the open source license, we ask all individuals and businesses that use it to help support its ongoing maintenance and development via sponsorship:

  - ☕️ [**Donate a coffee**](https://paypal.me/cushen)
  - ❤️ [**Become a sponsor and unlock awesome rewards**](https://wowchemy.com/plans/)

## Other ways to help

If you're not a developer there are still plenty of ways that you can help. We always need help with:

- Helping the Wowchemy community on the [chat](https://discord.gg/z8wNYzb) and [forum](https://github.com/wowchemy/wowchemy-hugo-modules/discussions)
- Investigating and reviewing open [Issues](https://github.com/wowchemy/wowchemy-hugo-modules/issues) and [Pull Requests](https://github.com/wowchemy/wowchemy-hugo-modules/pulls)
  - Give a thumbs up 👍 to upvote a feature request you would like to use
- Improving the [documentation](https://wowchemy.com/docs/) and writing tutorials
  - Just click the _Edit_ button at the bottom of pages or open an issue with your proposed improvement
- Testing and quality assurance
- Hosting local Wowchemy themed events or meetups
- Promoting Wowchemy to others by blogging, vlogging, code streaming, talking etc.

## Scope

Please be _mindful_ that although we encourage feature requests, we cannot expand the scope of the project in every possible direction. There will be feature requests that don't make the roadmap.

Every feature requires effort not just to analyse the requirements, design it, implement it, test it, document it, merge it, write release notes for it, and release it, but also to continuously support users with it and maintain it (fixing and refactoring the feature as the project and its dependencies evolve).

The more regular active volunteers (rather than one-off contributors) we have supporting users and maintaining the project, the more feasible it becomes to expand the scope of the project.

The project's scope also has to be constrained so that it doesn't get too complex and unwieldy, from an architectural perspective, a testing perspective, and from a usability perspective.

Plugins (widgets, shortcodes, theme packs, language packs, and third-party JavaScript integrations) as well as templates allow the community to add major features without needing to contribute to Wowchemy itself.
