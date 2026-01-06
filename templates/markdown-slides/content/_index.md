---
title: ''
summary: ''
date: 2025-01-01
type: landing

design:
  spacing: '4rem'

sections:
  # Hero Section
  - block: hero
    content:
      title: Markdown Slides
      text: |-
        **Open-source slide decks.**  
        Write in Markdown, present anywhere, share with anyone.
      primary_action:
        text: Browse Decks
        url: '/slides/'
        icon: play
      secondary_action:
        text: Create Your Own
        url: https://hugoblox.com/templates/markdown-slides/start?utm_source=hugoblox&utm_medium=demo
    design:
      spacing:
        padding: ['5rem', '0', '4rem', '0']
      css_class: 'dark:bg-zinc-900'

  - block: features
    content:
      title: Why Markdown Slides
      text: 'Best for: lab meetings, course lectures, paper reading groups, and startup demos.'
      items:
        - name: Version-controlled research
          description: Write decks like code, track diffs, and cite stable versions.
          icon: hero/code-bracket
        - name: Research-native media
          description: Math, citations, syntax highlighting, and diagrams out of the box.
          icon: hero/document-text
        - name: Future-proof format
          description: Most future-proof format - Markdown is LLM-native for human-first, AI-assisted workflows.
          icon: hero/bolt

  # Featured Decks Row
  - block: collection
    id: decks
    content:
      title: Featured Decks
      text: ''
      filters:
        folders:
          - slides
        featured_only: true
      sort_by: Date
      sort_ascending: false
      count: 3
    design:
      view: slides-gallery
      columns: 2

  - block: collection
    id: recent
    content:
      title: Recent Decks
      text: ''
      filters:
        folders:
          - slides
        exclude_featured: true
      sort_by: Date
      sort_ascending: false
      count: 0
    design:
      view: slides-gallery
      columns: 2
---
