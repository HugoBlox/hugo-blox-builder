+++
# Custom widget.
widget = "custom"
active = true
date = {{ .Date }}

# Note: a full width section format can be enabled by commenting out the `title` and `subtitle` with a `#`.
title = "{{ replace .TranslationBaseName "-" " " | title }}"
subtitle = ""

# Order that this section will appear in.
weight = 100
+++
