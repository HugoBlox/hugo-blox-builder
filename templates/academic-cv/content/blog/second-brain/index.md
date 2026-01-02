---
title: 🧠 Sharpen your thinking with a second brain
summary: Create a personal knowledge base and share your knowledge with your peers.
date: 2023-10-26
authors:
  - me
tags:
  - Second Brain
  - Markdown
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com)'
cover:
  image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2560"
  position:
    x: 50
    y: 40
  overlay:
    enabled: true
    type: "gradient"
    opacity: 0.4
    gradient: "bottom"
  fade:
    enabled: true
    height: "80px"
  icon:
    name: "✨"
---

Create a personal knowledge base and share your knowledge with your peers.

Hugo Blox web framework empowers you with one of the most flexible note-taking capabilities out there.

Create a powerful knowledge base that works on top of a local folder of plain text Markdown files.

Use it as your second brain, either publicly sharing your knowledge with your peers via your website, or via a private GitHub repository and password-protected site just for yourself.

## Mindmaps

Hugo Blox supports a Markdown extension for mindmaps.

With this open format, can even edit your mindmaps in other popular tools such as Obsidian.

Simply insert a Markdown code block labelled as `markmap` and optionally set the height of the mindmap as shown in the example below.

Mindmaps can be created by simply writing the items as a Markdown list within the `markmap` code block, indenting each item to create as many sub-levels as you need:

<div class="highlight">
<pre class="chroma">
<code>
```markmap {height="200px"}
- Hugo Modules
  - Hugo Blox
  - netlify
  - netlify-cms
  - slides
```
</code>
</pre>
</div>

renders as

```markmap {height="200px"}
- Hugo Modules
  - Hugo Blox
  - netlify
  - netlify-cms
  - slides
```

Anh here's a more advanced mindmap with formatting, code blocks, and math:

<div class="highlight">
<pre class="chroma">
<code>
```markmap
- Mindmaps
  - Links
    - [Hugo Blox Docs](https://docs.hugoblox.com/)
    - [Discord Community](https://discord.gg/z8wNYzb)
    - [GitHub](https://github.com/HugoBlox/kit)
  - Features
    - Markdown formatting
    - **inline** ~~text~~ *styles*
    - multiline
      text
    - `inline code`
    - Math: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
```
</code>
</pre>
</div>

renders as

```markmap
- Mindmaps
  - Links
    - [Hugo Blox Docs](https://docs.hugoblox.com/)
    - [Discord Community](https://discord.gg/z8wNYzb)
    - [GitHub](https://github.com/HugoBlox/kit)
  - Features
    - Markdown formatting
    - **inline** ~~text~~ *styles*
    - multiline
      text
    - `inline code`
    - Math: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
```

## Highlighting

<mark>Highlight</mark> important text with `mark`:

```html
<mark>Highlighted text</mark>
```

## Callouts

Use [callouts](https://docs.hugoblox.com/reference/markdown/#callouts) (aka _asides_, _hints_, or _alerts_) to draw attention to notes, tips, and warnings.

Use the `> [!NOTE]` syntax to create a callout.

```markdown
> [!NOTE]
> A Markdown aside is useful for displaying notices, hints, or definitions to your readers.
```

renders as

> [!NOTE]
> A Markdown aside is useful for displaying notices, hints, or definitions to your readers.

Or use the `warning` callout type so your readers don't miss critical details:

> [!WARNING]
> A Markdown aside is useful for displaying notices, hints, or definitions to your readers.

## Did you find this page helpful? Consider sharing it 🙌
