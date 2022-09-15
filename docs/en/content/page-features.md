---
title: 🏷 Page Features
date: 2016-04-18
lastmod: 2022-09-03
weight: 20
summary: Learn how to add featured images, attach files, and use metadata to control page features such as author profile cards, comments, and math.
---

Wowchemy empowers you create a wide variety of different content types. Content can include widget pages, blog posts, publications, online courses, podcasts, videos, Markdown slides, notebooks, documentation, projects, events/talks, and much more.

{{< toc hide_on="xl" >}}

You may also be interested to learn about the diverse range of [**page elements**]({{< relref "writing-markdown-latex.md" >}}), such as image galleries, math, or diagrams, that can be added to any page.

## Introduction

The following common metadata can be added to the [front matter]({{< relref "front-matter.md" >}}) of most types of page in Wowchemy.

**Core metadata:**

- **title**: the title of your page
- **summary**: a one-sentence summary of the content on your page. The summary can be shown on the homepage and can also benefit your search engine ranking.
- **date**: the [RFC 3339 date](https://github.com/toml-lang/toml#local-date-time) that the page was published. A future date will schedule the page to be published in the future. If you use the `hugo new ...` commands described on this page, the date will be filled automatically when you create a page. Also see **lastmod** and **publishDate**.
- **authors**: display the authors of the page and link to their user profiles if they exist. To link to a user profile, [create a user]({{< relref "get-started.md#introduce-yourself" >}}) based on the [*admin* template](https://github.com/wowchemy/starter-academic/tree/master/exampleSite/content/authors) and reference their username (the name of a user in your `authors` folder) in the `authors` field, e.g. `authors: ["admin"]`. To format a name in bold, see the relevant section below.
- **author_notes**: display author contributions, affiliations, and other details as a tooltip next to the author's name (see section below)
- **tags**: tagging your content helps users to discover similar content on your site. Tags can improve search relevancy and are displayed after the page content and also in the [Tag Cloud widget]({{< relref "page-builder.md" >}}). E.g. `tags: ["Electronics", "Diodes"]`.

**Popular metadata:**

- **subtitle**: an optional subtitle that will be displayed under the title
- **featured**: by setting `featured: true`, a page can be displayed in the [Featured widget]({{< relref "page-builder.md" >}}). This is useful for *sticky, announcement blog posts* or *selected publications* etc.
- **categories**: categorizing your content helps users to discover similar content on your site. Categories can improve search relevancy and display at the top of a page alongside a page's metadata. E.g. `categories: ["Art"]`.
- **lastmod**: the [RFC 3339 date](https://github.com/toml-lang/toml#local-date-time) that the page was last modified.
  - By default, there's no need to specify `lastmod` as the **page modification date is automatically updated** from Git according to the `HUGO_ENABLEGITINFO` option in `netlify.toml` (or the equivalent `enableGitInfo` option in `config.yaml`)
  - **To hide the automatic last modified date**, change `HUGO_ENABLEGITINFO` to `"false"` in `netlify.toml`
- **publishDate**: the [RFC 3339 date](https://github.com/toml-lang/toml#local-date-time) that the page was published. You only need to specify this option if you wish to set **date** in the future but publish the page *now*, as is the case for publishing a journal article that is to appear in a journal etc.
- **draft**: by setting `draft: true`, only you will see your page when you preview your site  locally on your computer
- **private**: hide page in search results
- **feedback**: by setting `feedback: false`, you can remove the feedback widget from the Book layout

A complete list of standard options can be found on the corresponding [Hugo docs page](https://gohugo.io/content-management/front-matter/#predefined).

## Cover image

To display a **cover image** (aka _featured_ image) in content pages, simply drag an image named `featured.*` (e.g. `featured.jpg`) into your page's folder.

{{% callout note %}}
If your page does not have its own folder ([*page bundle*](https://gohugo.io/content-management/page-bundles/)) within its section folder, you can refactor a page named `NAME.md` to `NAME/index.md`, creating the folder `NAME`. There is a [tool to help automate this process](https://github.com/wowchemy/awesome-hugo).
{{% /callout %}}

Want to caption the image or set a focal point to influence how the image is cropped?

The parameters below can be added to the bottom of your page front matter to customize the appearance of the image. The caption supports Markdown and can be used to write an image caption or credit. The focal point ensures that the image subject is in view when the image is resized.

```yaml
# Cover image
# To use, place an image named `featured.jpg/png` in your page's folder.
# Otherwise, specify the `filename` option to load an image from your `assets/media/` folder.
# Placement options: 1 = Full column width, 2 = Out-set, 3 = Screen-width
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
# Set `preview_only` to `true` to just use the image for thumbnails.
image:
  placement: 1
  caption: "Photo by [Geo](https://github.com/gcushen/)"
  focal_point: "Center"
  preview_only: false
  alt_text: An optional description of the image for screen readers.
  # filename: my-image.jpg  # Uncomment to load an image from `assets/media/` instead.
```

For the Book layout (i.e. docs pages), just the filename, caption, and alt_text options apply.

## Page resources (attachments and links)

Buttons can be generated in the page header to link to associated resources.

The example below shows how to create a Twitter link for a project and how to create a link to a post that was originally published on Medium:

```yaml
links:
  - icon_pack: fab
    icon: twitter
    name: Follow
    url: 'https://twitter.com/Twitter'
  - icon_pack: fab
    icon: medium
    name: Originally published on Medium
    url: 'https://medium.com'

```

The only required option is `url`, giving you the option to show a *text button*, an *icon button*, or a *combination of both*. [Learn more about icons]({{< relref "page-builder.md#icons" >}}).

To generate a **PDF button**, add a PDF file with the same name as your page's own folder to your page's folder and a PDF link will be automatically generated. For example, if your page is located at `publication/photons/index.md`, place a PDF at `publication/photons/photons.pdf`. This can be useful for talks and publications.

There are also several special built-in buttons that can be setup using `url_...` options in the front matter of some content types.

## Page features

The following parameters can be added to the front matter of a page (such as a blog post) to control its features:

```yaml
# Show the page's date?
show_date: true

# Show estimated reading time?
reading_time: true

# Show social sharing links?
share: true

# Show author profile (photo and bio) under the content?
# Edit your author profiles in the `content/authors/` folder
# Then reference their folder names with the `authors` front matter option above
profile: true

# Allow users to comment on the page?
# Requires commenting to be configured in `params.yaml`
commentable: true

# Allow visitors to make improvements to the page?
# Requires a repository to be configured in `params.yaml`
editable: true

# Show a link to the next article in the series?
pager: true

# Show recommendations for related content?
show_related: true

# Show breadcrumb navigation?
show_breadcrumb: true

# Hide the navigation bar?
# Often used together with `show_breadcrumb`
header:
  navbar:
    enable: false
```

### Highlight authors in author lists

Specific author names can be highlighted in bold in author lists, for example if you wish to highlight yourself or your colleagues.

If you wish to highlight an author name in bold, add `highlight_name: true` to their author profile. The default user profile can be found at `content/authors/admin/_index.md` ([view example](https://raw.githubusercontent.com/wowchemy/starter-academic/main/content/authors/admin/_index.md)).

### Add author notes for affiliations and contributions

**Author notes** can be added to a page's front matter in the form:

    authors:
    - "Someone"
    - "Someone else"
    - "Dr No"
    author_notes:
    - "Equal contribution"
    - "Equal contribution"
    - "Stanford University"

where the index of each author note corresponds with an author in the `authors` list.

An author note is rendered as a tooltip next to an author's name:

{{< figure src="docs/author-notes.png" title="Add author notes for affiliations and contributions." >}}

### How to configure a page collection?

Control page features for an **entire collection of pages** by using [Hugo cascades](https://gohugo.io/getting-started/configuration/#cascade) in `config.yaml`.

For example, to configure blog posts in `config.yaml`:

```yaml
cascade:
  # Configure blog posts
  - _target:
      path: /post/**
    pager: true
    editable: true
    reading_time: true
    commentable: true
    show_related: true
    show_breadcrumb: true
    share: true
    header:
      navbar:
        enable: false
```

### LaTeX math

If your site uses LaTeX math (equations), you can choose between enabling math for all pages (recommended) or just on specific pages.

To enable **LaTeX math** rendering for a specific page, include `math: true` in the page's front matter.

Otherwise, to enable math for all pages, set the math option in the site configuration at `config/_default/params.yaml`:

```yaml
features:
  math:
    enable: true
```

Also, refer to the [math guide]({{< relref "writing-markdown-latex.md" >}}) for further details.

## Banner image

To display a full width **banner image**, the parameters below can be inserted towards the end of a page's [front matter]({{< relref "front-matter.md" >}}). It is assumed that the image is located in your `assets/media/` media library, so the full path in the example below will be `assets/media/header.png`. The `caption` parameter supports Markdown and can be used to write an image caption or credit. This option can be particularly useful for adding to an archive page's `_index.md` (e.g. to display at `YOUR_URL/post/` for the blog post archive).

```yaml
banner:
  image: "header.png"
  caption: "Image credit: [**Geo**](https://github.com/gcushen/)"
```

## Unpublish pages

To temporarily unpublish content, set `draft: true` at the top of a page's front matter.

To remove content permanently, simply delete the relevant page file/folder within your `content/` folder.

## Private pages

Want to try to share a page with only a few specific people?

Add the following to the page front matter before publishing it, to prevent it appearing in any page collections:

```yaml
_build:
  render: always
  list: never
```

## Password protect pages

By nature, static pages are viewable by anyone who visits their URLs.

Some content delivery networks, such as [Netlify](https://docs.netlify.com/visitor-access/password-protection/), offer a service allowing you to restrict access.
