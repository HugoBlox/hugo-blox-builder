# Contributing to Hugo Blox Builder

Thanks for being interested in contributing! We’re so glad you want to help!

We want contributing to Hugo Blox to be fun, enjoyable, and educational for anyone and everyone. All contributions are welcome, including new plugins (such as new widgets, shortcodes, theme packs, and language packs), templates, features, documentation as well as updates and tweaks, blog posts, YouTube tutorials, live streaming customizations, meetups, and more.

## Where to Start

Join the **Contributing** channel on the **[community Discord](https://discord.gg/z8wNYzb)**.

## General ways to help

Whether or not you're a developer, there are plenty of non-technical ways that you can help. We always need help with:

- Helping the Hugo Blox community via the live [chat](https://discord.gg/z8wNYzb) and [forum](https://github.com/HugoBlox/hugo-blox-builder/discussions)
- Investigating and reviewing open [Issues](https://github.com/HugoBlox/hugo-blox-builder/issues) and [Pull Requests](https://github.com/HugoBlox/hugo-blox-builder/pulls)
  - Influence the roadmap! Give a thumbs up 👍 to upvote a feature request you would like to use
- Improving the [documentation](https://docs.hugoblox.com/) and writing tutorials
  - Just click the _Edit_ button at the bottom of pages or open an issue with your proposed improvement
- Testing and quality assurance, such as checking the latest version of the templates work as you expect and fixing any dead-links etc.
- Translating the Hugo Blox templates or the Hugo Blox documentation
- Hosting local Hugo Blox themed events or meetups
- Promoting Hugo Blox to others by blogging, vlogging, code streaming, talking etc.

### For technical contributions

Repository structure:

- modules
  - The components and layouts which form the Hugo Blox page building framework that the templates depend on
- scripts
  - A collection of scripts for helping maintain the repository
- starters
  - The collection of starter templates (aka Hugo themes)
  - To contribute an improvement to a starter template, make your changes to the relevant template within this folder. **Do not submit PRs to the dedicated template repositories as they are read-only.**
- test
  - a minimal site that is built by the CI on every commit to help test PRs

#### What are some good issues to contribute to?

If you're a developer looking to contribute, but you're not sure where to begin, check out the [help wanted](https://github.com/HugoBlox/hugo-blox-builder/labels/help%20wanted) label on Github, which contains issues which need some love.

#### How can I propose an improvement?

If you have a straightforward bug fix or improvement, feel free to contribute it in a [Pull Request](https://github.com/HugoBlox/hugo-blox-builder/pulls) for the community to review.

If you have an idea for a new feature, please start by [searching the issues](https://github.com/HugoBlox/hugo-blox-builder/issues) to check that the feature has not already been suggested and then suggest it by [opening a new issue](https://github.com/HugoBlox/hugo-blox-builder/issues/new/choose), as adding new features to Hugo Blox first requires some analysis around the design and spec.

Please be mindful of the project [scope](#scope).

#### How can I contribute an improvement?

Learn [how to contribute code on Github](https://codeburst.io/a-step-by-step-guide-to-making-your-first-github-contribution-5302260a2940).

**⚡️ To make quick and easy contributions, you can browse the repository on GitHub and edit your changes in GitHub's online editor. GitHub will then open a Pull Request (PR) for your changes to be reviewed by the community. ⚡️**

Otherwise, for larger changes, you can edit locally on your computer in your favorite editor, such as VSCode:

**Download the repo**

Fork (copy) the repo on GitHub and then clone (download) your fork to your computer:

```sh
git clone https://github.com/<YOUR_USERNAME>/hugo-blox-builder.git
```

**View a template**

[Install Yarn](https://yarnpkg.com/), the project's build system if necessary.

Then choose the starter template you wish to view, such as _minimal_:

```sh
yarn view:local academic-cv
```

Note that Hugo Server can occasionally stop working after changes are made (sometimes showing unrelated errors). If this happens, stop Hugo (Control-C) and restart it with the `yarn view:local ...` command above.

**Implement your improvements**

Implement you changes and then check for any linting or formatting issues.

Code linting and formatting form part of the Continuous Integration process to help catch bugs and code issues in contributions.

Contributors can also run the flow on their fork of the "Hugo Blox Builder" repo when making contributions (you'll need Node and Yarn to run):

```sh
yarn install
yarn run lint
yarn run format
```

**Open a Pull Request with your changes**

Use git to push (upload) your changes to GitHub and then open a Pull Request (PR) at https://github.com/HugoBlox/hugo-blox-builder/pulls

Please be mindful of the project [scope](#scope).

### Contribute Blox

[Create and publish your own blox](https://github.com/HugoBlox/create-blox)

### Contribute a shortcode

[Create and publish your own shortcode](https://github.com/HugoBlox/create-shortcode)

### Contribute a language pack

To contribute a **new language pack** or an improvement to a language pack, refer to the [language pack guide](https://docs.hugoblox.com/reference/language/#create-or-modify-a-language-pack). Once created, [fork Hugo Blox Builder](https://github.com/HugoBlox/hugo-blox-builder), place your language pack in `blox-tailwind/i18n/`, add the name of the language to `blox-tailwind/data/i18n/language.yaml`, and open a Pull Request on Github with these two files.

### Contribute a theme pack

[View the guide](https://docs.hugoblox.com/getting-started/customize/#appearance) to contributing a color and font theme pack.

### Contribute a template

Consider duplicating a bare-bones template, such as the [Link In Bio](https://github.com/HugoBlox/hugo-blox-builder/tree/main/starters/link-in-bio) folder, and building up your own template using the Hugo Blox. Reach out on the **Contributing** channel in Discord to submit your template.

### Contribute to the Publication importer

To contribute to **Hugo Academic CLI**, the automatic publication and blog post importer, refer to [its dedicated Github repository](https://github.com/GetRD/academic-file-converter) and Issue queue.

## Become a backer

To help us develop this free software sustainably under the open source license, we ask all individuals and businesses that use it to help support its ongoing maintenance and development via sponsorship:

- ☕️ [**Donate a coffee**](https://github.com/sponsors/gcushen?frequency=one-time)
- ❤️ [**Become a sponsor and unlock awesome rewards**](https://hugoblox.com/sponsor/)

## Best practices

To create a consistent experience for all contributors and help prevent bugs, we have some best practices.

### Conventional Commits Specification

Please follow the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/).

For example:

- new feature: `feat: add the X parameter`
- bug fix: `fix: typo in implementation of X parameter`
- docs: `docs: document the X parameter`
- style: `style: change font color from black to blue`
- build-related: `chore: rebuild JS assets`

### Linting and formatting

```sh
yarn install
yarn run lint
yarn run format
```

## Scope

Please be _mindful_ that although we encourage feature requests, we cannot expand the scope of the project in every possible direction. There will be feature requests that don't make the roadmap.

Every feature requires effort not just to analyse the requirements, design it, implement it, test it, document it, merge it, write release notes for it, and release it, but also to continuously support users with it and maintain it (fixing and refactoring the feature as the project and its dependencies evolve).

The more regular active volunteers (rather than one-off contributors) we have supporting users and maintaining the project, the more feasible it becomes to expand the scope of the project.

The project's scope also has to be constrained so that it doesn't get too complex and unwieldy, from an architectural perspective, a testing perspective, and from a usability perspective.

Plugins (widgets, shortcodes, theme packs, language packs, and third-party JavaScript integrations) as well as templates allow the community to add major features without needing to contribute to Hugo Blox itself.
