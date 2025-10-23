---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false

# The question (can also use title)
question: "{{ replace .Name "-" " " | title }}"

# Short answer (optional - can also use content below)
answer: ""

# Summary for SEO and previews
summary: ""

# Difficulty level (optional)
difficulty: ""  # e.g., "Beginner", "Intermediate", "Advanced"

# Categories and tags for organization
categories: []
tags: []

# Pagefind search metadata (automatically indexed)
# type: questions (auto-added by layout)
# category: first category from categories array above
# difficulty: value from difficulty field below

# Vote counts (optional - for display and structured data)
upvote_count: 0
downvote_count: 0

# Additional/suggested answers (optional)
# suggested_answer:
#   - text: "Alternative answer text here..."
#     author: "Author Name"
#     date: 2024-01-15
#     upvote_count: 5

# Related questions (optional - can also be auto-generated)
# related:
#   - link-to-related-question

# SEO settings
seo:
  title: ""
  description: ""

# Show breadcrumb navigation
show_breadcrumb: true
---

Write your detailed answer here using Markdown.

You can include:
- Code blocks
- Images
- Lists
- Links
- And more!

## Additional Details

Add sections as needed to provide comprehensive information.
