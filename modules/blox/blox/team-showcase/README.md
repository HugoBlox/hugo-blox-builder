# Team Showcase Block

Display your team members with a beautiful, responsive grid layout featuring rich profiles, social links, and customizable grouping.

## Features

- **Responsive Grid Layout**: Automatically adjusts from 1-4 columns based on screen size
- **User Groups**: Organize team members by role (e.g., Principal Investigators, PhD Students)
- **Rich Profiles**: Display avatar, name, role, bio, interests, and social links
- **Customizable Display**: Toggle visibility of role, organization, interests, and social links
- **Sorting**: Sort by last name, graduation year, weight, or any author field (no `Params.` prefix needed); per-group sorting supported
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
        - name: Alumni          # optional per-group sort override
          sort_by: graduation_year
          sort_ascending: false
      sort_by: 'graduation_year' # legacy 'Params.' prefix optional
      sort_ascending: false
      cta:
        text: Join Our Team
        url: /opportunities
        icon: user-plus
    design:
      show_role: true
      show_organizations: true
      show_interests: true
      max_interests: 3   # set 0 to hide interests even if provided
      align: center      # or "left" to align header + CTA left
      max_columns: 4     # 2, 3, or 4
      show_social: true
      show_empty_groups: false # show a placeholder when a group has no members
      # Section background color (CSS class)
      css_class: "bg-gray-50 dark:bg-gray-900"
```

## Content Structure

Team members are defined in `data/authors/<slug>.yaml`. All fields in the data file can be sorted on directly—no `Params.` prefix is required.

```yaml
# data/authors/jane-doe.yaml
name:
  display: Dr. Jane Doe
role: Postdoctoral Researcher
bio: Research interests include machine learning and computational biology.
interests:
  - Machine Learning
  - Computational Biology
  - Data Science
affiliations:
  - name: University of Excellence
    url: https://example.edu
links:
  - icon: envelope
    url: 'mailto:jane@example.edu'
  - icon: twitter
    url: https://x.com/janedoe
  - icon: github
    url: https://github.com/janedoe
user_groups:
  - Postdoctoral Researchers
graduation_year: 2024
```

## Options

### Content Options

- **title**: Main heading for the team section
- **subtitle**: Optional subtitle
- **text**: Optional description text (supports Markdown)
- **user_groups**: Array of group names to display, or objects `{ name, sort_by?, sort_ascending? }` for per-group sorting
- **sort_by**: Field to sort by (default: "name_family", falling back to the last word of `title`). Use plain field names from `data/authors`—the legacy `Params.` prefix is optional for backwards compatibility. Recommended: `name_family` (last name), `graduation_year` (alumni), `weight` (manual order).
- **sort_ascending**: Sort direction (default: true)
- **cta**: Optional call-to-action button with text, url, and icon

### Design Options

- **show_role**: Display team member roles (default: true)
- **show_organizations**: Display affiliated organizations (default: true)
- **show_interests**: Display research interests (default: false)
- **max_interests**: Maximum number of interests to show (default: 3; 0 hides interests)
- **show_social**: Display social media links (default: true)
- **align**: Align header and CTA (`center` or `left`, default `center`)
- **max_columns**: Limit grid columns on wide screens (2, 3, or 4; default 4)
- **show_empty_groups**: If true, render an empty-state message for groups with no members

## Recipes

- **Lab alumni list**: `user_groups: ['Alumni']`, `sort_by: graduation_year`, `sort_ascending: false`, set `graduation_year` in each author file.
- **Startup leadership-first**: set `weight` on leadership (e.g., 1–10), `sort_by: weight`, `sort_ascending: true`, leave others empty or higher.
- **Classic last-name sort**: ensure `name.family` is set; leave defaults or set `sort_by: name_family`.
- **Hide interests but keep data**: `show_interests: true`, `max_interests: 0`.
- **Left-aligned hero style**: `design.align: left` (header + CTA).
- **Per-group sorting**: mix strings and objects in `user_groups`, e.g. `- name: Alumni; sort_by: graduation_year; sort_ascending: false`.

## Best Practices

- Keep `data/authors/<slug>.yaml` tidy: set `name.display`, `name.family`, `role`, short `bio`, `affiliations` (first shown), `links` with icons (`github`, `linkedin`, `orcid`, `google-scholar`), and `user_groups`.
- Use square WebP avatars in `assets/media/authors/<slug>.*`, ~400×400px, optimized (<200 KB). Names center-cropped.
- Prefer high-signal interests (3 or fewer); longer lists belong on the profile page.
- For credibility, show organizations (default on) and keep roles concise.
- Review people data each semester/quarter to keep roles and photos fresh.
- Use valid icon names for `links.icon` (e.g., `github`, `linkedin`, `orcid`, `google-scholar`, `twitter`) to avoid broken social icons.

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
