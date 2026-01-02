---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false

# Summary for SEO
summary: ""

# Mark this as an FAQ page to enable FAQPage structured data
faq_page: true

# Categories and tags
categories: []
tags: []

# Pagefind search metadata (automatically indexed)
# type: faq (auto-added by layout)
# category: first category from categories array above

# Option 1: Define FAQs inline
faqs:
  - question: "What is your question here?"
    answer: "Your answer here. Can use **Markdown** formatting."
  
  - question: "Another question?"
    answer: "Another answer with more details."
  
  # Add more Q&As as needed

# Option 2: Alternatively, create child pages under this FAQ section
# and they will automatically be included

# SEO settings
seo:
  title: ""
  description: ""

# Show breadcrumb navigation
show_breadcrumb: true
---

Add an introductory text here that will appear before the FAQ accordion.

This is a great place to provide context about the FAQ section.

