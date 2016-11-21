+++
date = "2016-04-20T10:00:00"
draft = false
tags = []
title = "Writing content with Markdown, LaTeX, and Shortcodes"
math = true
+++

Content can be written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), [LaTeX math](https://en.wikibooks.org/wiki/LaTeX/Mathematics), and [Hugo Shortcodes](http://gohugo.io/extras/shortcodes/). Additionally, HTML may be used for advanced formatting.<!--more--> This article gives an overview of the most common formatting options.

## Sub-headings

    ## Heading 2
    ### Heading 3
    #### Heading 4
    ##### Heading 5
    ###### Heading 6

## Emphasis

    Italics with *asterisks* or _underscores_.

    Bold with **asterisks** or __underscores__.

    Combined emphasis with **asterisks and _underscores_**.

    Strikethrough with ~~two tildes~~.

## Ordered lists

    1. First item
    2. Another item

## Unordered lists

    * First item
    * Another item

## Images

Images may be added to a page by placing them in your `static/img/` folder and referencing them using one of the following two notations:

A general image:

    ![alternative text for search engines](/img/screenshot.png)

A numbered figure with caption:

    {{</* figure src="/img/screenshot.png" title="Figure Caption" */>}}

## Links

    [I'm a link](https://www.google.com)
    [A post]({{</* ref "post/hi.md" */>}})
    [A publication]({{</* ref "publication/hi.md" */>}})
    [A project]({{</* ref "project/hi.md" */>}})
    [Another section]({{</* relref "hi.md#who" */>}})

## Emojis

See the [Emoji cheat sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/) for available emoticons. The following serves as an example, but you should remove the spaces between each emoji name and pair of semicolons:

    I : heart : Academic : smile :
    
I :heart: Academic :smile:

## Blockquote

    > This is a blockquote.

> This is a blockquote.

## Footnotes

    I have more [^1] to say.
    
    [^1]: Footnote example.

I have more [^1] to say.
[^1]: Footnote example.

## Code highlighting

Pass the *language* of the code, such as `python`, as a parameter after three backticks:

    ```python
    # Example of code highlighting
    input_string_var = input("Enter some data: ")
    print("You entered: {}".format(input_string_var))
    ```
Result:

```python
# Example of code highlighting
input_string_var = input("Enter some data: ")
print("You entered: {}".format(input_string_var))
```

## Twitter tweet

To include a single tweet, pass the tweet’s ID from the tweet's URL as parameter to the shortcode:

    {{</* tweet 666616452582129664 */>}}

## Youtube

    {{</* youtube w7Ft2ymGmfc */>}}

## Vimeo

    {{</* vimeo 146022717 */>}}

## GitHub gist

    {{</* gist USERNAME GIST-ID  */>}}

## Speaker Deck

    {{</* speakerdeck 4e8126e72d853c0060001f97 */>}}

## $\rm \LaTeX$ math

```TeX
$$\left [ – \frac{\hbar^2}{2 m} \frac{\partial^2}{\partial x^2} + V \right ] \Psi = i \hbar \frac{\partial}{\partial t} \Psi$$
```

$$\left [ – \frac{\hbar^2}{2 m} \frac{\partial^2}{\partial x^2} + V \right ] \Psi = i \hbar \frac{\partial}{\partial t} \Psi$$

Alternatively, inline math can be written by wrapping the formula with only a single `$`:

    This is inline: $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \boldsymbol\varepsilon$

This is inline: $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \boldsymbol\varepsilon$

## Table

Code:

```Markdown
| Command           | Description                    |
| ------------------| ------------------------------ |
| `hugo`            | Build your website.            |
| `hugo serve -w`   | View your website.             |
```

Result:

| Command           | Description                    |
| ------------------| ------------------------------ |
| `hugo`            | Build your website.            |
| `hugo serve -w`   | View your website.             |


## Alerts

Alerts are a useful feature that add side content such as tips, notes, or warnings to your articles. They are especially handy when writing educational tutorial-style articles. Use the corresponding shortcodes to enable alerts inside your content:

    {{%/* alert note */%}}
    Here's a tip or note...
    {{%/* /alert */%}}

This will display the following *note* block:

{{% alert note %}}
Here's a tip or note...
{{% /alert %}}

    {{%/* alert warning */%}}
    Here's some important information...
    {{%/* /alert */%}}

This will display the following *warning* block:

{{% alert warning %}}
Here's some important information...
{{% /alert %}}
