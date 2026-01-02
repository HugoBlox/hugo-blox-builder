# Contributing to Hugo Blox 🚀

> **Welcome, researchers and academics!** Whether you're a professor sharing your publications, a PhD student building your first portfolio, or an AI researcher showcasing your work — this guide will help you contribute to the tool that powers 100,000s of researcher and lab websites worldwide.

[![All Access](https://img.shields.io/badge/Support-All%20Access-2ea44f?logo=heart)](https://hugoblox.com/all-access)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub%20Sponsors-ea4aaa?logo=github)](https://github.com/sponsors/gcushen)
[![Star us](https://img.shields.io/github/stars/HugoBlox/kit?style=social)](https://github.com/HugoBlox/kit)
[![Discord](https://img.shields.io/discord/722225264733716590?logo=discord)](https://discord.gg/z8wNYzb)

## ❤️ Love Hugo Blox? Help keep it thriving.

> If Hugo Blox has saved you hours, taught you something, or helped you share your work, please take 2 minutes to give back. Most people won't — but if a small part of the community pitches in today, we can ship faster, fix more bugs, and keep the project healthy for everyone.

We want contributing to Hugo Blox to be fun, enjoyable, and educational for anyone and everyone. All contributions are welcome, including new plugins (such as new widgets, shortcodes, theme packs, and language packs), templates, features, documentation as well as updates and tweaks, blog posts, YouTube tutorials, live streaming customizations, meetups, and more.

## 🎯 Why Contribute?

### For Your Career

- **📝 Add to your CV**: Open source contributions demonstrate technical skills and collaboration
- **🌍 Build your reputation**: Your contributions are publicly visible and credited
- **🤝 Network with peers**: Connect with researchers and developers worldwide
- **📚 Learn modern web tech**: Gain experience with Hugo, Tailwind CSS, and modern web development

### For the Community

- **🔬 Shape the tool you use**: Directly influence features that matter to academics
- **⚡ Get fixes faster**: Contributing means your needs get addressed sooner
- **🌱 Support open research**: Keep academic tools free and accessible to all
- **🏆 Join 9k+ stars**: Be part of a thriving academic community

## 🚀 Quick Wins (Pick One!)

### ⏱️ 30 Seconds

- **⭐ Star the repository**: [github.com/HugoBlox/kit](https://github.com/HugoBlox/kit)
- **👍 Vote on issues**: Shape the roadmap by [upvoting features](https://github.com/HugoBlox/kit/issues) you need
- **💡 Suggest an enhancement**: Have an idea? [Create a GitHub Issue](https://github.com/HugoBlox/kit/issues) for the community to vote on
- **📢 Share your site**: Post your Hugo Blox site on X/LinkedIn/Reddit with #HugoBlox

### 🕐 5-10 Minutes

- **📸 Share a screenshot**: Show your beautiful site in [Discussions](https://github.com/HugoBlox/kit/discussions)
- **🐛 Report issues clearly**: Found a bug? Help us fix it with clear steps to reproduce
- **💬 Help in Discord**: Answer a question in our [Discord community](https://discord.gg/z8wNYzb)
- **✏️ Fix documentation typos**: Spot an error? Fix it directly on GitHub (no setup needed!)

### 🕓 ~1 Hour

- **🔧 Implement a small issue**: See [help-wanted issues](https://github.com/HugoBlox/kit/labels/help%20wanted)
- **📚 Write documentation**: Help keep the documentation complete and up-to-date

### 🕘 A Few Hours

- **🧩 Take a larger issue**: Contribute a significant feature or improvement
- **🎥 Create tutorials**: Record a YouTube video or write a detailed blog post

## Where to Start

Join the **Contributing** channel on the **[community Discord](https://discord.gg/z8wNYzb)**.

## General ways to help

Whether or not you're a developer, there are plenty of non-technical ways that you can help. We always need help with:

- Helping the Hugo Blox community via the live [chat](https://discord.gg/z8wNYzb) and [forum](https://github.com/HugoBlox/kit/discussions)
- Investigating and reviewing open [Issues](https://github.com/HugoBlox/kit/issues) and [Pull Requests](https://github.com/HugoBlox/kit/pulls)
  - Influence the roadmap! Give a thumbs up 👍 to upvote a feature request you would like to use
- Improving the [documentation](https://docs.hugoblox.com/) and writing tutorials
  - Just click the _Edit_ button at the bottom of pages or open an issue with your proposed improvement
- Testing and quality assurance, such as checking the latest version of the templates work as you expect and fixing any dead-links etc.
- Translating the Hugo Blox templates or the Hugo Blox documentation
- Hosting local Hugo Blox themed events or meetups
- Promoting Hugo Blox to others by blogging, vlogging, code streaming, talking etc.

### For technical contributions

## 🛠️ Development Setup

> **No Go experience needed!** Most contributions only require basic HTML/CSS knowledge.

### Prerequisites

1. **Install Node.js** (for Tailwind CSS v4)

   ```bash
   # macOS/Linux (using Homebrew)
   brew install node

   # Windows (download from nodejs.org)
   # Or use WSL2 for a Linux environment
   ```

2. **Install pnpm** (our package manager)

   ```bash
   npm install -g pnpm
   ```

3. **Install Hugo Extended** (latest version)

   ```bash
   # macOS
   brew install hugo

   # Windows (using Chocolatey)
   choco install hugo-extended

   # Linux
   snap install hugo --channel=extended
   ```

### Getting Started

1. **Fork & Clone**

   ```bash
   # Fork on GitHub first, then:
   git clone https://github.com/YOUR-USERNAME/kit.git
   cd kit
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **View a Starter Site**

   ```bash
   # View the academic-cv starter (most popular)
   ./scripts/view-starter-dev.sh academic-cv

   # Site opens at http://localhost:8081
   ```

That's it! You're ready to contribute. 🎉

### Repository structure

```
kit/
├── modules/
│   └── blox/               # Main theme module
│       ├── layouts/        # HTML templates (easy to edit!)
│       ├── assets/css/     # Tailwind CSS v4 styles
│       └── i18n/           # Translations (help translate!)
├── templates/
│   ├── academic-cv/        # CV/Resume template
│   ├── blog/               # Blog template
│   └── documentation/      # Docs template
└── scripts/                # Helper scripts
```

**Note**: To contribute an improvement to a template, make your changes to the relevant template within the `templates/` folder. **Do not submit PRs to the dedicated template repositories as they are read-only (changes are automatically propagated there from this mono-repository).**

#### What are some good issues to contribute to?

If you're a developer looking to contribute, but you're not sure where to begin, check out the [help wanted](https://github.com/HugoBlox/kit/labels/help%20wanted) label on Github, which contains issues which need some love.

#### How can I propose an improvement?

If you have a straightforward bug fix or improvement, feel free to contribute it in a [Pull Request](https://github.com/HugoBlox/kit/pulls) for the community to review.

If you have an idea for a new feature, please start by [searching the issues](https://github.com/HugoBlox/kit/issues) to check that the feature has not already been suggested and then suggest it by [opening a new issue](https://github.com/HugoBlox/kit/issues/new/choose), as adding new features to Hugo Blox first requires some analysis around the design and spec.

Please be mindful of the project [scope](#scope).

### Contribute Blox

[Create and publish your own blox](https://github.com/HugoBlox/create-blox)

### Contribute a shortcode

[Create and publish your own shortcode](https://github.com/HugoBlox/create-shortcode)

### Contribute a language pack

To contribute a **new language pack** or an improvement to a language pack, refer to the [language pack guide](https://docs.hugoblox.com/reference/language/#create-or-modify-a-language-pack). Once created, [fork HugoBlox Kit](https://github.com/HugoBlox/kit), place your language pack in `modules/blox/i18n/`, add the language metadata to `modules/blox/data/languages.yaml`, and open a Pull Request on Github with these two files.

### Contribute a theme pack

[View the guide](https://docs.hugoblox.com/getting-started/customize/#appearance) to contributing a color and font theme pack.

### Contribute a template

Consider duplicating a bare-bones template, such as the [Link In Bio](https://github.com/HugoBlox/kit/tree/main/templates/link-in-bio) folder, and building up your own template using the Hugo Blox. Reach out on the **Contributing** channel in Discord to submit your template.

### Contribute to the Publication importer

To contribute to **Hugo Academic CLI**, the automatic publication and blog post importer, refer to [its dedicated Github repository](https://github.com/GetRD/academic-file-converter) and Issue queue.

## 🤝 Getting Help

### Where to Ask Questions

- **🗣️ Discord**: Real-time chat in [#contributing channel](https://discord.gg/z8wNYzb)
- **💬 Discussions**: Async help in [GitHub Discussions](https://github.com/HugoBlox/kit/discussions)
- **🐛 Issues**: Bug reports and feature requests

### Tips for Getting Quick Help

1. **Share your environment**: Hugo version, HugoBlox version in `go.mod`, OS, browser
2. **Provide minimal reproduction**: Smallest example showing the issue
3. **Check existing issues**: Your question might be answered
4. **Be specific**: "Publications not showing" → "BibTeX import fails with DOI links"

## 🏆 Recognition & Rewards

### How We Thank Contributors

- **🎖️ Credits**: Named in release notes
- **🏷️ Contributor badge**: On your GitHub profile
- **📣 Social shoutouts**: Featured on our social media
- **🎯 Direct impact**: Your needs prioritized
- **🤝 Network access**: Connect with core team

### Hall of Fame

Check our [Contributors page](https://github.com/HugoBlox/kit/graphs/contributors) to see everyone who's helped!

## 💚 Can't Contribute Code? Support the Project!

### Other Ways to Help

- **💰 Sponsor**:
  - [All Access](https://hugoblox.com/all-access) - One-time payment for exclusive Pro templates and blocks
  - [GitHub Sponsors](https://github.com/sponsors/gcushen) - Monthly donation to support open source development
  - ☕️ [Donate a coffee](https://github.com/sponsors/gcushen?frequency=one-time)
- **📢 Spread the Word**: Share your Hugo Blox site and experience
- **📝 Write Tutorials**: Blog about your Hugo Blox setup
- **🎥 Create Videos**: YouTube tutorials help many researchers
- **🌍 Translate**: Help make Hugo Blox accessible globally

## Best practices

To create a consistent experience for all contributors and help prevent bugs, we have some best practices.

### Conventional Commits Specification

Please follow the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/).

For example:

- new feature: `feat: add the X parameter`
- bug fix: `fix: typo in implementation of X parameter`
- performance: `perf: speed up init by pre-warming only pages`
- refactor: `refactor: simplify citation logic`
- docs: `docs: document the X parameter`
- style: `style: change font color from black to blue`
- build-related: `chore: rebuild JS assets`

### Linting and formatting

```sh
pnpm install
pnpm run lint
pnpm run format
```

## Scope

Please be _mindful_ that although we encourage feature requests, we cannot expand the scope of the project in every possible direction. There will be feature requests that don't make the roadmap.

Every feature requires effort not just to analyse the requirements, design it, implement it, test it, document it, merge it, write release notes for it, and release it, but also to continuously support users with it and maintain it (fixing and refactoring the feature as the project and its dependencies evolve).

The more regular active volunteers (rather than one-off contributors) we have supporting users and maintaining the project, the more feasible it becomes to expand the scope of the project.

The project's scope also has to be constrained so that it doesn't get too complex and unwieldy, from an architectural perspective, a testing perspective, and from a usability perspective.

Plugins (widgets, shortcodes, theme packs, language packs, and third-party JavaScript integrations) as well as templates allow the community to add major features without needing to contribute to Hugo Blox itself.

## 📋 Contribution Checklist

Before submitting a PR:

- [ ] **Test locally**: Run `./scripts/view-starter-dev.sh academic-cv`
- [ ] **Check formatting**: Run `pnpm run lint:js` (if you edited JS)
- [ ] **Update docs**: If adding features, document them in the code and in the PR
- [ ] **Add examples**: Show how to use new features
- [ ] **Write clear commit messages**: Help future contributors understand changes

## 🙏 Thank You!

Every contribution matters — whether it's fixing a typo, adding a translation, or building a new feature. You're helping thousands of researchers share their work with the world.

**Welcome to the Hugo Blox community!** 🎉

---

_Questions? Join our [Discord](https://discord.gg/z8wNYzb) or start a [Discussion](https://github.com/HugoBlox/kit/discussions)._ 

_This project follows the [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md)._ 

## ⚖️ Our Contributor License Agreement (CLA)

### Why We Have a CLA

A Contributor License Agreement (CLA) is a standard best practice in professional open-source. It's a simple agreement that protects you (our contributor), our users, and the Hugo Blox project itself.

- It protects you: the CLA clarifies that you are entitled to contribute the code and that your contribution is provided "as is," without any warranty.
- It protects the project: it grants us the permanent legal rights needed to use your contribution as part of the project and defend the project from legal challenges.
- It enables our future: having a proper CLA allows us to confidently continue to enhance and support the Hugo Blox ecosystem.

This agreement doesn't change your ownership of your code; it simply grants us a clear license to use it as part of Hugo Blox.

### Your Agreement

By submitting a Pull Request to this repository, you agree to our [Contributor License Agreement (CLA)](.github/CLA.md). Please ensure you have read and understood it.
