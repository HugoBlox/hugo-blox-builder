---
title: 'Home'
date: 2023-10-24
type: landing

design:
  background:
    image:
      # Add your image background to `assets/media/`.
      filename: bg-hue.svg

sections:
  - block: about.avatar
    content:
      # The user's folder name in content/authors/
      username: admin
  - block: buttons
    content:
      # Need a custom icon?
      # Add an SVG image to the `assets/media/icons/` folder and reference it in the `icon` field below
      buttons:
        - title: Read my latest paper on LLMs
          icon: arxiv
          url: https://arxiv.org/abs/2304.01852
        - title: Watch my new YouTube video to achieve 20x productivity
          icon: youtube
          url: https://youtube.com
        - title: Connect with me on LinkedIn
          icon: linkedin
          url: https://linkedin.com
---
