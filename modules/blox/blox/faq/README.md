# FAQ Block

Display frequently asked questions in an interactive accordion format with automatic FAQPage structured data for SEO.

## Features

- ✅ Interactive accordion with Alpine.js
- ✅ FAQPage Schema.org structured data for Google rich results
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support
- ✅ Markdown support in answers

## Usage

Add to your page's front matter:

```yaml
sections:
  - block: faq
    content:
      title: Frequently Asked Questions
      subtitle: Find answers to common questions
      text: Can't find what you're looking for? [Contact us](/contact)
      items:
        - question: What is HugoBlox Kit?
          answer: HugoBlox Kit is a no-code website builder framework powered by Hugo and Tailwind CSS.
        
        - question: Is it free to use?
          answer: Yes! HugoBlox Kit is open source and free to use under the MIT license.
        
        - question: How do I get started?
          answer: |
            Getting started is easy:
            1. Choose a template
            2. Click "Use Template"
            3. Customize your content
            4. Deploy to GitHub Pages or Netlify
      
      button:
        text: View All FAQs
        url: /faq/
        icon: arrow-right
    design:
      spacing:
        padding: ["6rem", "0", "6rem", "0"]
```

## Structured Data

This block automatically generates FAQPage structured data for better SEO and eligibility for Google's FAQ rich results.

## Customization

- **Accordion behavior**: One item open at a time (default)
- **Colors**: Automatically adapts to your theme
- **Spacing**: Customizable via `design.spacing`
- **Background**: Customizable via `design.background.color`
