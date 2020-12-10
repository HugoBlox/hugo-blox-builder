---
title: Slides
summary: An introduction to using Academic's Slides feature.
authors: []
tags: []
categories: []
date: "2019-02-05T00:00:00Z"
slides:
  # Choose a theme from https://github.com/hakimel/reveal.js#theming
  theme: black
  # Choose a code highlighting style (if highlighting enabled in `params.toml`)
  #   Light style: github. Dark style: dracula (default).
  #   Available highlight themes listed in: https://highlightjs.org/static/demo/
  #   Use lower case names and replace space with hyphen '-'
  highlight_style: monokai

  controls: true
  progress: true
  slideNumber: c/t # true | false | h.v | h/v | c | c/t
  center: true
  rtl: false
  mouseWheel: true
  transition: zoom #  none/fade/slide/convex/concave/zoom
  transitionSpeed: slow  # default/fast/slow
  backgroundTransition: fade # none/fade/slide/convex/concave/zoom
  menu: true
  chalkboard: true
  touch: true
  loop: false
  diagram: true
  diagram_theme: "dark" # default/base/dark/neutral/forest

---
## iframes (work)

<iframe src="https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics_es.html" width="100%" height="500" scrolling="no" allowfullscreen></iframe>

---
## Youtube shortcode (works)

{{< youtube w7Ft2ymGmfc >}}

---

## other shortcodes

- Efficiently write slides in Markdown
- cta button {{< cta cta_text="Do something" cta_link="/" cta_new_tab="true" >}} (DOES NOT WORK)

---

## more shortcodes

- figure {{< figure src="icon.png" title="A caption" numbered="true" >}}
- icons {{< icon name="terminal" pack="fas" >}} Terminal 

---

## callout (does not work)

{{% callout warning %}}
Here's some important information...y
{{% /callout %}}


---

## diagram works!

{{% diagram %}}
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
{{% /diagram %}}

---
## diagram 

```merkdown
```mermaid doesnt work
use {{% diagram %}} instead
```
```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

---
## chart shortcode (does not work)

chart start

{{< chart data="chart" >}}

chart end

---
## Controls

- Next: `Right Arrow` or `Space`
- Previous: `Left Arrow`
- Start: `Home`
- Finish: `End`
- Overview: `Esc`
- Speaker notes: `S`
- Fullscreen: `F`
- Zoom: `Alt + Click`
- [PDF Export](https://github.com/hakimel/reveal.js#pdf-export): `E`

---

## Code Highlighting

Inline code: `variable`

Code block:
```python
porridge = "blueberry"
if porridge == "blueberry":
    print("Eating...")
```

---

## Math

In-line math: $f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n$

Block math:

$$
f\left( x \right) = \;\frac{{2\left( {x + 4} \right)\left( {x - 4} \right)}}{{\left( {x + 4} \right)\left( {x + 1} \right)}}
$$

---

## Fragments

Make content appear incrementally

```
{{%/* fragment */%}} One {{%/* /fragment */%}}
{{%/* fragment */%}} **Two** {{%/* /fragment */%}}
{{%/* fragment */%}} Three {{%/* /fragment */%}}
```

Press `Space` to play!

{{% fragment %}} One {{% /fragment %}}
{{% fragment %}} **Two** {{% /fragment %}}
{{% fragment %}} Three {{% /fragment %}}

---

A fragment can accept two optional parameters:

- `class`: use a custom style (requires definition in custom CSS)
- `weight`: sets the order in which a fragment appears

---

## Speaker Notes

Add speaker notes to your presentation

```markdown
{{%/* speaker_note */%}}
- Only the speaker can read these notes
- Press `S` key to view
{{%/* /speaker_note */%}}
```

Press the `S` key to view the speaker notes!

{{< speaker_note >}}
- Only the speaker can read these notes
- Press `S` key to view
{{< /speaker_note >}}

---

## Themes

- black: Black background, white text, blue links (default)
- white: White background, black text, blue links
- league: Gray background, white text, blue links
- beige: Beige background, dark text, brown links
- sky: Blue background, thin dark text, blue links

---

- night: Black background, thick white text, orange links
- serif: Cappuccino background, gray text, brown links
- simple: White background, black text, blue links
- solarized: Cream-colored background, dark green text, blue links

---
{{< slide background-image="./boards.jpg" >}}

## Custom Slide

Customize the slide style and background

```markdown
{{</* slide background-image="/media/boards.jpg" */>}}
{{</* slide background-color="#0000FF" */>}}
{{</* slide class="my-style" */>}}
```

---

## Custom CSS Example

Let's make headers navy colored.

Create `assets/css/reveal_custom.css` with:

```css
.reveal section h1,
.reveal section h2,
.reveal section h3 {
  color: navy;
}
```

---

# Questions?

[Ask](https://spectrum.chat/academic)

[Documentation](https://sourcethemes.com/academic/docs/managing-content/#create-slides)
