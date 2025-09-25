---
title: Buttons
linkTitle: Buttons
---

A modern, customizable button shortcode with gradient styling, icons, and smart link handling.

<!--more-->

## Basic Usage

{{< button url="/contact" >}}Contact Us{{< /button >}}

{{< button url="https://example.com" new_tab="true" style="secondary" >}}Visit External Site{{< /button >}}

The above buttons are created with:

```go-html-template
{{</* button url="/contact" */>}}Contact Us{{</* /button */>}}

{{</* button url="https://example.com" new_tab="true" style="secondary" */>}}Visit External Site{{</* /button */>}}
```

## Style Variants

### Primary (Default)

{{< button url="#" style="primary" >}}Primary Button{{< /button >}}

```go-html-template
{{</* button url="#" style="primary" */>}}Primary Button{{</* /button */>}}
```

### Secondary

{{< button url="#" style="secondary" >}}Secondary Button{{< /button >}}

```go-html-template
{{</* button url="#" style="secondary" */>}}Secondary Button{{</* /button */>}}
```

### Outline

{{< button url="#" style="outline" >}}Outline Button{{< /button >}}

```go-html-template
{{</* button url="#" style="outline" */>}}Outline Button{{</* /button */>}}
```

### Ghost

{{< button url="#" style="ghost" >}}Ghost Button{{< /button >}}

```go-html-template
{{</* button url="#" style="ghost" */>}}Ghost Button{{</* /button */>}}
```

## Sizes

### Small

{{< button url="#" size="sm" >}}Small Button{{< /button >}}

### Medium (Default)

{{< button url="#" size="md" >}}Medium Button{{< /button >}}

### Large

{{< button url="#" size="lg" >}}Large Button{{< /button >}}

### Extra Large

{{< button url="#" size="xl" >}}Extra Large{{< /button >}}

```go-html-template
{{</* button url="#" size="sm" */>}}Small Button{{</* /button */>}}
{{</* button url="#" size="md" */>}}Medium Button{{</* /button */>}}
{{</* button url="#" size="lg" */>}}Large Button{{</* /button */>}}
{{</* button url="#" size="xl" */>}}Extra Large{{</* /button */>}}
```

## Alignment

### Left (Default)

{{< button url="#" align="left" >}}Left Aligned{{< /button >}}

### Center

{{< button url="#" align="center" >}}Center Aligned{{< /button >}}

### Right

{{< button url="#" align="right" >}}Right Aligned{{< /button >}}

```go-html-template
{{</* button url="#" align="left" */>}}Left Aligned{{</* /button */>}}
{{</* button url="#" align="center" */>}}Center Aligned{{</* /button */>}}
{{</* button url="#" align="right" */>}}Right Aligned{{</* /button */>}}
```

## With Icons

### Icon Before Text

{{< button url="#" icon="arrow-down-tray" >}}Download{{< /button >}}

### Icon After Text

{{< button url="#" icon="arrow-right" icon_position="right" >}}Continue{{< /button >}}

```go-html-template
{{</* button url="#" icon="arrow-down-tray" */>}}Download{{</* /button */>}}
{{</* button url="#" icon="arrow-right" icon_position="right" */>}}Continue{{</* /button */>}}
```

## Rounded Corners

### Small Radius

{{< button url="#" rounded="sm" >}}Small Radius{{< /button >}}

### Medium Radius (Default)

{{< button url="#" rounded="md" >}}Medium Radius{{< /button >}}

### Large Radius

{{< button url="#" rounded="lg" >}}Large Radius{{< /button >}}

### Pill Shape

{{< button url="#" rounded="full" >}}Pill Button{{< /button >}}

```go-html-template
{{</* button url="#" rounded="sm" */>}}Small Radius{{</* /button */>}}
{{</* button url="#" rounded="md" */>}}Medium Radius{{</* /button */>}}
{{</* button url="#" rounded="lg" */>}}Large Radius{{</* /button */>}}
{{</* button url="#" rounded="full" */>}}Pill Button{{</* /button */>}}
```

## Advanced Examples

### Call-to-Action Button

{{< button url="/signup" style="primary" size="lg" align="center" icon="rocket-launch" >}}Get Started Today{{< /button >}}

```go-html-template
{{</* button url="/signup" style="primary" size="lg" align="center" icon="rocket-launch" */>}}Get Started Today{{</* /button */>}}
```

### External Link with New Tab

{{< button url="https://github.com/hugo-blox/hugo-blox-builder" new_tab="true" style="outline" icon="arrow-top-right-on-square" icon_position="right" >}}View on GitHub{{< /button >}}

```go-html-template
{{</* button url="https://github.com/hugo-blox/hugo-blox-builder" new_tab="true" style="outline" icon="arrow-top-right-on-square" icon_position="right" */>}}View on GitHub{{</* /button */>}}
```

### Download Button

{{< button url="/files/document.pdf" style="secondary" icon="document-arrow-down" rounded="full" >}}Download PDF{{< /button >}}

```go-html-template
{{</* button url="/files/document.pdf" style="secondary" icon="document-arrow-down" rounded="full" */>}}Download PDF{{</* /button */>}}
```

## Parameters

| Parameter       | Type    | Default       | Description                                                 |
| --------------- | ------- | ------------- | ----------------------------------------------------------- |
| `url`           | string  | `#`           | **Required.** Button destination URL (internal or external) |
| `text`          | string  | Inner content | Button text (overrides shortcode content)                   |
| `new_tab`       | boolean | `false`       | Whether to open link in new tab                             |
| `style`         | string  | `primary`     | Button style: `primary`, `secondary`, `outline`, `ghost`    |
| `size`          | string  | `md`          | Button size: `sm`, `md`, `lg`, `xl`                         |
| `align`         | string  | `left`        | Button alignment: `left`, `center`, `right`                 |
| `icon`          | string  | -             | Icon name from [Hero Icons](https://heroicons.com/)         |
| `icon_position` | string  | `left`        | Icon position: `left`, `right`                              |
| `rounded`       | string  | `md`          | Border radius: `sm`, `md`, `lg`, `xl`, `full`               |
| `disabled`      | boolean | `false`       | Whether button should be disabled                           |

## Security Features

The button shortcode automatically handles security for external links:

- **External links** get `rel="noreferrer"` attribute
- **External links opening in new tab** get `rel="noopener noreferrer"`
- **Internal links opening in new tab** get `rel="noopener"`

This ensures safe navigation while maintaining functionality.

## Accessibility

The button shortcode includes built-in accessibility features:

- Proper `role="button"` attribute
- `aria-label` support
- Keyboard focus indicators
- High contrast focus rings
- Disabled state handling
