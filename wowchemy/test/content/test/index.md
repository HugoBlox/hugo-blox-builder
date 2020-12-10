---
title: Testing
summary: An introduction to using Academic's Slides feature.
authors: []
tags: []
categories: []
date: "2019-02-05T00:00:00Z"
math: true
diagram: true
---

callout works here, not in slides


{{% callout warning %}}
Here's some important information...
{{% /callout %}}



CTA works here, not in slides
cta button {{< cta cta_text="Do something" cta_link="/" cta_new_tab="true" >}}

diagram works here, not in slides:

```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

{{% diagram %}}
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
{{% /diagram %}}

Chart works here, not in slides

{{< chart data="chart" >}}