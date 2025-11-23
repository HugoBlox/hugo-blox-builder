# Team Showcase Block

Display your team members with a beautiful, responsive grid layout featuring rich profiles, social links, and customizable grouping.

## Features

- **Responsive Grid Layout**: Automatically adjusts from 1-4 columns based on screen size
- **User Groups**: Organize team members by role (e.g., Principal Investigators, PhD Students)
- **Rich Profiles**: Display avatar, name, role, bio, interests, and social links
- **Customizable Display**: Toggle visibility of role, organization, interests, and social links
- **Sorting**: Sort team members by last name or custom field
- **Hover Effects**: Smooth image zoom and shadow effects on hover
- **Call to Action**: Optional button to recruitment or team page

## Usage

```yaml
sections:
  - block: team-showcase
    content:
      title: Meet Our Team
      subtitle: World-class researchers advancing science
      text: Our diverse team brings together expertise from multiple disciplines.
      user_groups:
        - Principal Investigators
        - Postdoctoral Researchers
        - PhD Students
      sort_by: 'Params.last_name'
      sort_ascending: true
      cta:
        text: Join Our Team
        url: /opportunities
        icon: user-plus
    design:
      show_role: true
      show_organizations: false
      show_interests: true
      show_social: true
      # Section background color (CSS class)
      css_class: "bg-gray-50 dark:bg-gray-900"
```

## Content Structure

Team members should be created in the `content/authors/` directory. Each team member needs:

```yaml
# content/authors/jane-doe/_index.md
---
title: Dr. Jane Doe
role: Postdoctoral Researcher
bio: Research interests include machine learning and computational biology.
interests:
  - Machine Learning
  - Computational Biology
  - Data Science
organizations:
  - name: University of Excellence
    url: https://example.edu
social:
  - icon: envelope
    icon_pack: fas
    link: 'mailto:jane@example.edu'
  - icon: twitter
    icon_pack: fab
    link: https://x.com/janedoe
  - icon: github
    icon_pack: fab
    link: https://github.com/janedoe
user_groups:
  - Postdoctoral Researchers
---

Full biography content here...
```

## Options

### Content Options

- **title**: Main heading for the team section
- **subtitle**: Optional subtitle
- **text**: Optional description text (supports Markdown)
- **user_groups**: Array of group names to display
- **sort_by**: Field to sort by (default: "Params.last_name")
- **sort_ascending**: Sort direction (default: true)
- **cta**: Optional call-to-action button with text, url, and icon

### Design Options

- **show_role**: Display team member roles (default: true)
- **show_organizations**: Display affiliated organizations (default: false)
- **show_interests**: Display research interests (default: false)
- **show_social**: Display social media links (default: true)

## Styling

The block uses Tailwind CSS classes and supports:
- Dark mode
- Custom background colors via `css_class`
- Responsive breakpoints
- Smooth hover transitions

## Tips

1. **Optimize Images**: Use square avatar images (minimum 400x400px) for best results
2. **User Groups**: Create logical groupings that reflect your organization structure
3. **Bio Length**: Keep bios concise (2-3 lines) for the card view
4. **Social Links**: Include relevant professional networks (ORCID, Google Scholar, GitHub)
