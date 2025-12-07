---
title: ⚡️ Turn Jupyter Notebooks into Blog Posts
summary: Publish your data science and research directly from Jupyter Notebooks. No screenshots required.
date: 2024-07-15
authors:
  - me
tags:
  - Hugo Blox
  - Jupyter
  - Open Science
  - Tutorials
cover:
  # image: cover.jpg  # Auto-detected from cover image in this folder
  icon:
    name: "📔"
image:
  caption: "Image credit: [HugoBlox](https://hugoblox.com)"
  focal_point: Center
  placement: 1
content_meta:
  trending: true
---

As a researcher or data scientist, your work often lives in Jupyter Notebooks. But sharing those insights effectively usually means taking screenshots, messy copy-pasting, or exporting to PDF.

Hugo Blox changes that. With the `{{</* notebook */>}}` shortcode, you can render your actual `.ipynb` files directly as beautiful, interactive blog posts or project pages. Keep your code, outputs, and narrative in one place.

{{< toc mobile_only=true is_open=true >}}

## Why publish notebooks?

> [!TIP]
> **Reproducible Research**: By publishing the actual notebook, you allow others to download and run your code, verifying your results and building upon your work.

- **No more screenshots** – Render crisp code and vector plots directly from your source.
- **Theme consistent** – Notebooks automatically adapt to your site's theme (including dark mode).
- **Flexible sourcing** – Display notebooks from your `assets/` folder, page bundles, or even directly from a remote GitHub URL.
- **Interactive** – Users can copy code blocks or download the full notebook to run locally.

## Example: Data Science Workflow

Below is a live example of a notebook rendered right here in this post. Notice how the markdown, code, and outputs (text, HTML, and JSON) are all preserved and styled.

{{< notebook
    src="hugoblox-onboarding.ipynb"
    title="Launch Readiness Analysis"
    show_metadata=true
    line_numbers=true
    dense=false
    download_label="Download notebook"
    show_outputs=true
>}}

## How to add a notebook

1. **Save your notebook.** Place your `.ipynb` file in `assets/notebooks/` (for global access) or inside a page bundle (like `content/blog/my-post/analysis.ipynb`).
2. **Add the shortcode.** In any Markdown page, simply use:
   `{{</* notebook src="analysis.ipynb" */>}}`
3. **Customize.** You can hide code cells for non-technical audiences (`show_code=false`) or just show the output (`show_outputs=true`).

> [!IMPORTANT]
> Hugo Blox respects your privacy. Notebook rendering happens statically at build time—no third-party services required.

## Next steps

- **Try it out:** Drop one of your existing notebooks into this site and see how it looks.
- **Link your papers:** Use the Embed shortcode to link your notebook to your latest arXiv preprint or GitHub repository.
- **Get help:** Join the community on [Discord](https://discord.gg/z8wNYzb) or check the [documentation](https://docs.hugoblox.com).

Happy researching! 🚀
