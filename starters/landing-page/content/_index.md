---
title: 'Home'
date: 2023-10-24
type: landing

sections:
  - block: hero
    content:
      title: Build Your Landing Pages with Hugo Blox
      text: 🧱 EASY. FREE (OPEN SOURCE). NO-CODE  🧱
      primary_action:
        text: Get Started
        url: https://hugoblox.com/templates/
        icon: sparkles
      secondary_action:
        text: Read the docs
        url: https://docs.hugoblox.com
      announcement:
        text: Announcing the release of version 1.
        link:
          text: Read more
          url: https://hugoblox.com/blog/
    design:
      css_class: dark
      background:
        image:
          # Add your image background to `assets/media/`.
          filename: bg-triangles.svg
          filters:
            brightness: 0.5
  - block: features
    id: features
    content:
      title: Features
      text: Build your site with blocks 🧱
      items:
        - name: Optimized SEO
          icon: magnifying-glass
          description: Automatic sitemaps, RSS feeds, and rich metadata take the pain out of SEO and syndication.
        - name: Fast
          icon: bolt
          description: Super fast page load with Tailwind CSS and super fast site building with Hugo.
        - name: Easy
          icon: sparkles
          description: Connecting with your friends and family as well as discovering new ones is easy with features like Groups.
        - name: No-Code
          icon: code-bracket
          description: Edit and design your site just using rich text (Markdown) and configurable YAML parameters.
        - name: Highly Rated
          icon: star
          description: Rated 5-stars by the community.
        - name: Swappable Blocks
          icon: rectangle-group
          description: Build your pages with blocks - no coding required!
  - block: cta-image-paragraph
    id: solutions
    content:
      items:
        - title: Build your future-proof website
          text: As easy as 1, 2, 3!
          # Upload image to `assets/media/` and reference the filename here
          image: build-website.png
          button:
            text: Get Started
            url: https://hugoblox.com/templates/
        - title: Large Community
          text: Join our large community - ask questions and share your Hugo knowledge with others.
          # Upload image to `assets/media/` and reference the filename here
          image: coffee.jpg
          button:
            text: Join Discord
            url: https://discord.gg/z8wNYzb
  - block: cta-card
    content:
      title: Build your future-proof website
      text: As easy as 1, 2, 3!
      button:
        text: Get Started
        url: https://hugoblox.com/templates/
---
