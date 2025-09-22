---
title: Learn Python
summary: Easily learn Python in 10 minutes!
date: 2023-10-24
type: docs
math: false
tags:
  - Python
image:
  caption: 'Embed rich media such as videos and LaTeX math'
content_meta:
  content_type: 'Course'
  difficulty: 'Intermediate'
  prerequisites: ['SQL']
  trending: false
---

[Hugo Blox Builder](https://hugoblox.com) is designed to give technical content creators a seamless experience. You can focus on the content and the Hugo Blox Builder which this template is built upon handles the rest.

**Embed videos, podcasts, code, LaTeX math, and even test students!**

On this page, you'll find some examples of the types of technical content that can be rendered with Hugo Blox.

## Video

Teach your course by sharing videos with your students. Choose from one of the following approaches:

{{< youtube D2vj0WcvH5c >}}

**Youtube**:

    {{</* youtube w7Ft2ymGmfc */>}}

**Bilibili**:

    {{</* bilibili id="BV1WV4y1r7DF" */>}}

**Video file**

Videos may be added to a page by either placing them in your `assets/media/` media library or in your [page's folder](https://gohugo.io/content-management/page-bundles/), and then embedding them with the _video_ shortcode:

    {{</* video src="my_video.mp4" controls="yes" */>}}

## Podcast

You can add a podcast or music to a page by placing the MP3 file in the page's folder or the media library folder and then embedding the audio on your page with the _audio_ shortcode:

    {{</* audio src="ambient-piano.mp3" */>}}

Try it out:

{{< audio src="ambient-piano.mp3" >}}

## Test students

Provide a simple yet fun self-assessment by revealing the solutions to challenges with the `spoiler` shortcode:

```markdown
{{</* spoiler text="👉 Click to view the solution" */>}}
You found me!
{{</* /spoiler */>}}
```

renders as

{{< spoiler text="👉 Click to view the solution" >}} You found me 🎉 {{< /spoiler >}}

## Math

Hugo Blox Builder supports a Markdown extension for $\LaTeX$ math. You can enable this feature by toggling the `math` option in your `config/_default/params.yaml` file.

To render _inline_ or _block_ math, wrap your LaTeX math with `{{</* math */>}}$...${{</* /math */>}}` or `{{</* math */>}}$$...$${{</* /math */>}}`, respectively.

> [!NOTE]
> We wrap the LaTeX math in the Hugo Blox _math_ shortcode to prevent Hugo rendering our math as Markdown. This callout now uses the standard Markdown alert syntax!

Example **math block**:

```latex
{{</* math */>}}
$$
\gamma_{n} = \frac{ \left | \left (\mathbf x_{n} - \mathbf x_{n-1} \right )^T \left [\nabla F (\mathbf x_{n}) - \nabla F (\mathbf x_{n-1}) \right ] \right |}{\left \|\nabla F(\mathbf{x}_{n}) - \nabla F(\mathbf{x}_{n-1}) \right \|^2}
$$
{{</* /math */>}}
```

renders as

{{< math >}}
$$\gamma_{n} = \frac{ \left | \left (\mathbf x_{n} - \mathbf x_{n-1} \right )^T \left [\nabla F (\mathbf x_{n}) - \nabla F (\mathbf x_{n-1}) \right ] \right |}{\left \|\nabla F(\mathbf{x}_{n}) - \nabla F(\mathbf{x}_{n-1}) \right \|^2}$$
{{< /math >}}

Example **inline math** `{{</* math */>}}$\nabla F(\mathbf{x}_{n})${{</* /math */>}}` renders as {{< math >}}$\nabla F(\mathbf{x}_{n})${{< /math >}}.

Example **multi-line math** using the math linebreak (`\\`):

```latex
{{</* math */>}}
$$f(k;p_{0}^{*}) = \begin{cases}p_{0}^{*} & \text{if }k=1, \\
1-p_{0}^{*} & \text{if }k=0.\end{cases}$$
{{</* /math */>}}
```

renders as

{{< math >}}

$$
f(k;p_{0}^{*}) = \begin{cases}p_{0}^{*} & \text{if }k=1, \\
1-p_{0}^{*} & \text{if }k=0.\end{cases}
$$

{{< /math >}}

## Code

Hugo Blox Builder utilises Hugo's Markdown extension for highlighting code syntax. The code theme can be selected in the `config/_default/params.yaml` file.

    ```python
    import pandas as pd
    data = pd.read_csv("data.csv")
    data.head()
    ```

renders as

```python
import pandas as pd
data = pd.read_csv("data.csv")
data.head()
```

## Inline Images

```go
{{</* icon name="python" */>}} Python
```

renders as

{{< icon name="python" >}} Python

## Callouts & Alerts

Hugo Blox Builder now supports GitHub and Obsidian-style Markdown alerts for better content portability! These replace the old `callout` shortcode.

### Basic Callout Types

**Note** - For general information:

```markdown
> [!NOTE]
> This is a note callout with important information that users should know.
```

> [!NOTE] 
> This is a note callout with important information that users should know.

**Tip** - For helpful advice:

```markdown
> [!TIP]
> Here's a helpful tip to make your workflow more efficient!
```

> [!TIP]
> Here's a helpful tip to make your workflow more efficient!

**Important** - For critical information:

```markdown  
> [!IMPORTANT]
> This is critical information that users must understand to proceed.
```

> [!IMPORTANT]
> This is critical information that users must understand to proceed.

**Warning** - For potential issues:

```markdown
> [!WARNING]
> Be careful! This action might have unexpected consequences.
```

> [!WARNING]
> Be careful! This action might have unexpected consequences.

**Caution** - For dangerous actions:

```markdown
> [!CAUTION]  
> Danger! This operation is irreversible and could cause data loss.
```

> [!CAUTION]
> Danger! This operation is irreversible and could cause data loss.

### Custom Titles

You can customize the title of any callout:

```markdown
> [!WARNING]+ Custom Warning Title
> This warning has a custom title instead of just "Warning".
```

> [!WARNING]+ Custom Warning Title  
> This warning has a custom title instead of just "Warning".

### Legacy Syntax (Deprecated)

The old shortcode syntax still works but shows a deprecation warning:

```markdown
{{</* callout note */>}}
This still works but is deprecated. Use the Markdown syntax above!
{{</* /callout */>}}
```

{{% callout note %}}
This still works but is deprecated. Use the Markdown syntax above!
{{% /callout %}}

### Benefits of the New Syntax

- **Portable**: Works with GitHub, Obsidian, and other Markdown processors
- **Standard**: Uses widely-adopted Markdown alert syntax
- **Clean**: No Hugo-specific shortcodes needed
- **Future-proof**: Supported by the latest Hugo versions (0.132.0+)
- **Multilingual**: Callout titles are automatically translated based on your site's language
  - English: "Note", "Tip", "Important", "Warning", "Caution"
  - Spanish: "Nota", "Consejo", "Importante", "Advertencia", "Precaución"
  - French: "Note", "Conseil", "Important", "Attention", "Prudence"
  - German: "Hinweis", "Tipp", "Wichtig", "Warnung", "Vorsicht"
  - Chinese: "注意", "提示", "重要", "警告", "小心"

## Did you find this page helpful? Consider sharing it 🙌
