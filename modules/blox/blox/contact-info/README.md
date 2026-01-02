# Contact Info Block

Display comprehensive contact information for your lab or organization with a modern, responsive card layout.

## Features

- **Dual Card Layout**: Separate cards for location and contact methods
- **Rich Information Display**: Address, office hours, phone, email, social media
- **Interactive Elements**: Click-to-call, email links, map integration
- **Optional Contact Form**: Built-in contact form support
- **Map Integration**: External map links or embedded maps
- **Social Media Links**: Connect your social profiles
- **Prospective Members Section**: Dedicated area for recruitment
- **Fully Responsive**: Beautiful on all devices
- **Dark Mode Support**: Seamless light/dark theme switching

## Usage

```yaml
sections:
  - block: contact-info
    content:
      title: Contact Us
      subtitle: Get in touch with our research team
      visit_title: Visit Our Lab
      connect_title: Connect With Us
      address:
        lines:
          - Smith Laboratory
          - Department of Computer Science
          - University of Excellence
          - 123 Science Drive
          - Excellence City, EC 12345
          - United States
      office_hours:
        - "Monday - Friday: 9:00 AM - 5:00 PM"
        - "Lab Meetings: Fridays 2:00 PM"
      email: lab@example.edu
      phone: "+1 (555) 123-4567"
      social:
        - icon: brands/x
          url: https://x.com/SmithLabResearch
        - icon: brands/linkedin
          url: https://linkedin.com/company/smith-lab
        - icon: brands/github
          url: https://github.com/smith-lab
      prospective:
        title: Prospective Members
        text: Interested in joining our lab? We're looking for motivated researchers.
        button:
          text: View Open Positions
          url: /opportunities
      map_url: https://maps.google.com/?q=University+of+Excellence
      show_form: false
    design:
      css_class: "bg-gray-50 dark:bg-gray-900"
      spacing:
        padding: ["3rem", 0, "3rem", 0]
```

## Options

### Content Options

- **title**: Main heading for the contact section
- **subtitle**: Optional subtitle text
- **visit_title**: Heading for the location card (default: "Visit Us")
- **connect_title**: Heading for the contact card (default: "Connect")
- **address**: Physical address with multiple lines
  - `lines`: Array of address line strings
- **office_hours**: Array of office hour strings
- **email**: Contact email address
- **phone**: Contact phone number
- **social**: Array of social media links
  - `icon`: Icon identifier (e.g., "brands/x", "brands/linkedin")
  - `url`: Social media profile URL
- **prospective**: Information for prospective members
  - `title`: Section heading
  - `text`: Description text
  - `button`: CTA button with `text` and `url`
- **map_url**: External map service link
- **map_embed**: HTML embed code for inline map
- **show_form**: Display contact form (default: false)
- **form_action**: Form submission endpoint

### Design Options

Standard design options apply including:
- `css_class`: Background and styling classes
- `spacing`: Padding configuration

## Map Integration

### External Map Link
Provide a `map_url` to link to Google Maps, Apple Maps, or other services:

```yaml
map_url: "https://maps.google.com/?q=Your+Location"
```

### Embedded Map
For inline maps, provide the iframe HTML in `map_embed`:

```yaml
map_embed: |
  <iframe src="https://www.google.com/maps/embed?..." 
          width="100%" height="450" style="border:0;" 
          allowfullscreen="" loading="lazy"></iframe>
```

## Contact Form

Enable the built-in contact form:

```yaml
show_form: true
form_action: "https://formspree.io/f/YOUR_FORM_ID"
```

Note: You'll need to set up a form handler service like Formspree, Netlify Forms, or custom endpoint.

## Styling

The block uses modern card-based design with:
- Subtle shadows and hover effects
- Icon accents for visual hierarchy
- Consistent spacing and typography
- Fully responsive grid layout
- Dark mode optimized colors

## Best Practices

1. **Complete Information**: Provide all relevant contact methods
2. **Office Hours**: Clearly state availability
3. **Social Proof**: Link active social media profiles
4. **Map Integration**: Help visitors find your location
5. **Recruitment CTA**: Include prospective member information
6. **Form Handler**: Set up proper form submission handling
7. **Mobile Testing**: Verify all links work on mobile devices
