# CTA Card Block

**Create irresistible calls-to-action that convert**

Make a bold statement and drive immediate action with the CTA Card block - a high-impact, conversion-optimized component designed to capture attention and compel your visitors to take the next step.

## ✨ Key Features

- **🪟 2025 Glassmorphism**: Modern translucent backgrounds with backdrop blur effects
- **🎨 Gradient Typography**: Beautiful gradient text effects for maximum visual appeal
- **🔗 Smart Icon Support**: Add icons to buttons with automatic sizing and hover animations
- **📱 Enhanced Responsiveness**: Fluid typography scaling from mobile to desktop
- **✨ Micro-Interactions**: Smooth hover animations with glow effects and transforms
- **🎯 Customizable Styling**: Multiple glassmorphism presets or custom CSS classes
- **♿ Accessibility Enhanced**: Improved focus states and semantic markup

## 🎯 Perfect For

- **Newsletter Signups**: Encourage email subscriptions with compelling copy
- **Product Launches**: Announce new products or services with impact
- **Event Promotions**: Drive registrations and attendance
- **Lead Generation**: Capture leads with irresistible offers
- **Content Downloads**: Promote whitepapers, guides, and resources
- **Service Inquiries**: Convert visitors into prospects and clients

## 🚀 Why Choose CTA Card?

**Maximum Visual Impact**: Bold design that stands out on any page and captures immediate attention

**Conversion Focused**: Every element is optimized for driving action, from typography to button placement

**Brand Flexible**: Fully customizable styling to match your brand colors and aesthetic

**Proven Results**: Based on high-converting design patterns used by top marketing teams

## 📊 Conversion Psychology

- **Contrast Principle**: Dark background creates visual separation and focus
- **Size Hierarchy**: Large headlines establish clear information priority
- **Action Clarity**: Single, prominent button reduces decision paralysis
- **Emotional Appeal**: Space for compelling copy that connects with your audience

## 💡 Best Practices

- Keep headlines short and benefit-focused
- Use action-oriented button text ("Get Started", "Download Now", "Join Today")
- Ensure your copy addresses a specific pain point or desire
- Test different background colors to maximize contrast with your site

Transform casual visitors into engaged users with a CTA Card that's impossible to ignore.

## 🎨 2025 Glassmorphism Styling Options

### **Glassmorphism Primary** (Recommended)

```yaml
- block: cta-card
  content:
    title: 'Ready to Get Started?'
    text: 'Join thousands of users creating amazing websites'
    button:
      text: 'Get Started Free'
      url: '/signup/'
      icon: 'hero/rocket-launch'
  design:
    card:
      css_class: 'cta-glassmorphism'
      text_color: 'auto' # auto|light|dark
      overlay_opacity: 0.15 # 0.0-1.0 for contrast control
    background:
      gradient:
        start: 'primary-500'
        end: 'primary-700'
        direction: 135
      image:
        filename: 'textures/noise-pattern.svg'
        size: '32px'
        position: 'repeat'
```

### **Glassmorphism Dark**

```yaml
design:
  card:
    css_class: 'glassmorphism-dark glass-ring glass-shadow text-white'
```

### **Glassmorphism Light**

```yaml
design:
  card:
    css_class: 'glassmorphism-light glass-ring glass-shadow text-gray-900'
```

### **Custom Background + Glassmorphism**

```yaml
design:
  card:
    css_class: 'glassmorphism-secondary noise-texture text-white'
  background:
    color: 'primary-600'
    image:
      filename: 'your-background.jpg'
      size: 'cover'
      position: 'center'
      opacity: 0.8
    gradient:
      start: 'primary-500'
      end: 'secondary-600'
      direction: 135
```

## 🔗 Icon Support

Add icons to your CTA buttons:

```yaml
button:
  text: 'Download Now'
  url: '/download/'
  icon: 'hero/download'        # Download icon

button:
  text: 'Contact Us'
  url: 'mailto:hello@example.com'
  icon: 'hero/paper-airplane'  # Email icon

button:
  text: 'Learn More'
  url: '#features'
  icon: 'hero/arrow-right'     # Arrow icon
```

## 🎨 Contrast Control Options

### **Text Color Modes**

```yaml
card:
  text_color: 'auto'    # Auto-detects based on background brightness
  text_color: 'light'   # Force white text (for dark backgrounds)
  text_color: 'dark'    # Force dark text (for light backgrounds)
```

### **Overlay Opacity Control**

```yaml
card:
  overlay_opacity: 0.1   # Subtle glassmorphism (better for text contrast)
  overlay_opacity: 0.15  # Default glassmorphism
  overlay_opacity: 0.25  # Strong glassmorphism (may reduce contrast)
  overlay_opacity: 0.05  # Minimal glassmorphism (maximum contrast)
```

### **Perfect Contrast Examples**

**Dark Background (Light Text):**

```yaml
design:
  card:
    css_class: 'cta-glassmorphism'
    text_color: 'light'
    overlay_opacity: 0.1
  background:
    gradient:
      start: 'gray-800'
      end: 'gray-900'
```

**Light Background (Dark Text):**

```yaml
design:
  card:
    css_class: 'cta-glassmorphism'
    text_color: 'dark'
    overlay_opacity: 0.2
  background:
    gradient:
      start: 'gray-100'
      end: 'gray-300'
```

**Vibrant Background (Auto Detection):**

```yaml
design:
  card:
    css_class: 'cta-glassmorphism'
    text_color: 'auto' # Will detect primary-500 as medium and use adaptive colors
    overlay_opacity: 0.15
  background:
    gradient:
      start: 'primary-500'
      end: 'primary-700'
```

## ✨ Available Glassmorphism Classes

- **`cta-glassmorphism`**: Smart adaptive glassmorphism with contrast controls
- **`glassmorphism-primary`**: Primary color glassmorphism (legacy)
- **`glassmorphism-secondary`**: Secondary color glassmorphism (legacy)
- **`glassmorphism-dark`**: Dark glassmorphism (legacy)
- **`glassmorphism-light`**: Light glassmorphism (legacy)
- **`glass-ring`**: Enhanced ring borders
- **`glass-shadow`**: Multi-layer glass shadows
- **`noise-texture`**: Subtle noise texture overlay
