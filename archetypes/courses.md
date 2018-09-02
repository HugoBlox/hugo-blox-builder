+++
title = "{{ replace .TranslationBaseName "-" " " | title }}"
date = {{ .Date }}  # Schedule page publish date.
draft = false

# Course start and end times.
#   End time can optionally be hidden by prefixing the line with `#`.
time_start = {{ .Date }}
time_end = {{ .Date }}


# Institution
institution_course = ""

# Course Type
type_course = ""

# Tags (optional).
#   Set `tags = []` for no tags, or use the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = []

# Links (optional).
url_pdf = ""
url_slides = ""
url_video = ""
url_code = ""

# Does the content use math formatting?
math = false

# Does the content use source code highlighting?
highlight = true

# Featured image
# Place your image in the `static/img/` folder and reference its filename below, e.g. `image = "example.jpg"`.
[header]
image = ""
caption = ""

+++
