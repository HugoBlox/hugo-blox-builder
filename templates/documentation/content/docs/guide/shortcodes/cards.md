---
title: Cards Shortcode
linkTitle: Cards
---

A Hugo extension to create cards. Cards can be shown as links or as plain text.

## Usage

{{< cards >}}
  {{< card url="../" title="Learn Shortcodes" icon="academic-cap" >}}
  {{< card url="" title="A card without an icon or link" >}}
{{< /cards >}}

is rendered by:

```
{{</* cards */>}}
  {{</* card url="../callout" title="Callout" icon="academic-cap" */>}}
  {{</* card url="" title="A card without an icon" */>}}
{{</* /cards */>}}
```

## Options

| Parameter  | Description                                                            |
|------------|------------------------------------------------------------------------|
| `icon`     | Name of the icon. Defaults to [Hero Icon Pack](https://heroicons.com/) |
| `title`    | Title heading for the card.                                            |
| `subtitle` | Subtitle heading (supports Markdown).                                  |
| `url`      | URL                                                                    |
