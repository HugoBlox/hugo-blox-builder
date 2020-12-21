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
  highlight_style: dracula

  diagram: true # configure js or not
  diagram_options: # see mermaid documentation for other options
    theme: base # default/base/dark/neutral/forest
    securityLevel: loose

  # Remember to use snake case for options under reveal_options instead of camel case
  # all snake case will be converted into came case for reveal 

  reveal_options: # see reveal documentation for other options
    controls: true
    progress: true
    slide_number: c/t # true | false | h.v | h/v | c | c/t
    center: true
    rtl: false
    mouse_wheel: true
    transition: fade #  none/fade/slide/convex/concave/zoom
    # transitionSpeed: slow  # default/fast/slow
    background_transition: slide # none/fade/slide/convex/concave/zoom
    touch: true
    loop: false

  #   menu_enabled: true # configure js or not

  #   # same item as name used for setting plugin configuration
  #   menu: # see menu plugin documentation for other options
  #     numbers: false  # numbers in menu slides
  #     transitions: false  # transition selection in menu

  #   chalkboard_enabled: true


---

# Title

Author Name

---

## Slide 2

...
