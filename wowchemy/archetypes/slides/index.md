---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "{{ replace .Name "-" " " | title }}"
summary: ""
authors: []
tags: []
categories: []
date: {{ .Date }}
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
  
---

# Title

Author Name

---

## Slide 2

...
