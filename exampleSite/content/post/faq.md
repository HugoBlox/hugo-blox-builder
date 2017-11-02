+++
date = 2016-04-10
# lastmod = 2017-09-03
draft = false
tags = ["academic", "hugo"]
title = "Frequently Asked Questions (FAQ)"
summary = """Troubleshoot common issues."""
+++

Common questions and answers will be listed here.

**I cloned/downloaded Academic but Hugo produces errors when using it with my existing Hugo site**

Academic is a website *framework* rather than just a *theme*. Therefore, you must follow the full installation guide found on the Demo/Documentation website or in the Github Readme. If you still have problems, first try running Hugo on the Academic Example Site found in the `themes/academic/exampleSite` folder and then compare the configuration parameters in the Example Site's `config.toml` and content files with the files in your existing site.

**Hosting your site with Netlify or Cloudflare and experience strange behavior such as filters not working?**

Disable post-processing steps such as *minification* in your Netlify/Cloudflare admin panel.

**Publications and other content are not sorted by newest first**

Hugo/TOML require that the value for the `date` field should be in [TOML format](https://github.com/toml-lang/toml#local-date-time), as per frontmatter of the `content/publication/` files in the example site. If you want to use a partial date, such as year, you should still complete a full date to make a valid TOML date format.

**Issue parsing LaTeX in publication abstract**

Let's consider the following LaTeX which fails to parse correctly:

    abstract = "${O(d_{\max})}$"

This is a side effect of Academic and Hugo attempting to parse TOML, Markdown and LaTeX content in the abstract. The solution is to:

- escape each LaTeX backslash (`\`) with an extra backslash, yielding `\\`
- escape each LaTeX underscore (`_`) with two backslashes, yielding `\\_`.

Hence, editing the above example, we get:

    abstract = "${O(d\\_{\\max})}$"

**Cannot achieve line break in multiline equation (LaTeX/Mathjax)**

`\\` usually achieves a line break in a multiline LaTeX/Mathjax equation, but due to Hugo's Markdown parser it doesn't.

Solution: use 6 backslashes for a line break, for example:

```
$$\begin{eqnarray} 
y &=& 1+1   \\\\\\
&=& 2
\end{eqnarray}$$
```
