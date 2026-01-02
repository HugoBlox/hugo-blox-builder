---
title: 📈 Communicate your results effectively with the best data visualizations
summary: Use popular tools such as HuggingFace, Plotly, Mermaid, and data frames.
date: 2023-10-25
authors:
  - me
tags:
  - Hugo
  - Hugo Blox
  - Markdown
cover:
  image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2560"
  position:
    x: 50
    y: 40
  overlay:
    enabled: true
    type: "gradient"
    opacity: 0.4
    gradient: "bottom"
  fade:
    enabled: true
    height: "80px"
  icon:
    name: "✨"
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com)'
---

Hugo Blox is designed to give technical content creators a seamless experience. You can focus on the content and Hugo Blox handles the rest.

Use popular tools such as Plotly, Mermaid, and data frames.

## Embed Rich Content

HuggingFace Model

{{< embed platform="huggingface" resource="google/embeddinggemma-300m" type="model" >}}

HuggingFace Dataset

{{< embed platform="huggingface" resource="fka/awesome-chatgpt-prompts" type="dataset" >}}

GitHub Repository

{{< embed platform="github" resource="HugoBlox/kit" type="repo" >}}

Custom embed with manual data

{{< embed url="https://example.com" title="My Custom Resource" description="A great resource for learning" >}}

### Custom Images

Embed beautiful images from any source with Hugo image processing (Unsplash, custom URLs, etc.):

{{< embed url="https://example.com" title="Data Visualization Guide" description="Beautiful data visualization workspace" image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&h=600&auto=format&fit=crop" width="800" height="600" quality="90" >}}

You can also add images to any platform embed:

{{< embed platform="github" resource="plotly/plotly.py" type="repo" image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&auto=format&fit=crop" width="600" height="400" >}}

## Charts

Hugo Blox supports the popular [Plotly](https://plot.ly/) format for interactive data visualizations. With Plotly, you can design almost any kind of visualization you can imagine!

Save your Plotly JSON in your page folder, for example `line-chart.json`, and then add the `{{</* chart data="line-chart" */>}}` shortcode where you would like the chart to appear.

Demo:

{{< chart data="line-chart" >}}

You might also find the [Plotly JSON Editor](http://plotly-json-editor.getforge.io/) useful.

## Diagrams

Hugo Blox supports the _Mermaid_ Markdown extension for diagrams.

An example **flowchart**:

    ```mermaid
    graph TD
    A[Hard] -->|Text| B(Round)
    B --> C{Decision}
    C -->|One| D[Result 1]
    C -->|Two| E[Result 2]
    ```

renders as

```mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

An example **sequence diagram**:

    ```mermaid
    sequenceDiagram
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
    ```

renders as

```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

An example **class diagram**:

    ```mermaid
    classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label
    ```

renders as

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```

An example **state diagram**:

    ```mermaid
    stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
    ```

renders as

```mermaid
stateDiagram
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
```

## Data Frames

Save your spreadsheet as a CSV file in your page's folder and then render it by adding the _Table_ shortcode to your page:

```go
{{</* table path="results.csv" header="true" caption="Table 1: My results" */>}}
```

renders as

{{< table path="results.csv" header="true" caption="Table 1: My results" >}}

## Interactive Buttons

Add engaging call-to-action buttons to your data visualization posts:

### Basic Buttons

{{< button url="/" >}}Contact Us{{< /button >}}

&nbsp;

{{< button url="https://plotly.com/python/" new_tab="true" style="secondary" >}}Learn Plotly{{< /button >}}

```go-html-template
{{</* button url="/" */>}}Contact Us{{</* /button */>}}

{{</* button url="https://plotly.com/python/" new_tab="true" style="secondary" */>}}Learn Plotly{{</* /button */>}}
```

### Styled Buttons for Data Actions

{{< button url="#" style="primary" size="lg" align="center" icon="chart-bar" >}}View Dashboard{{< /button >}}

&nbsp;

{{< button url="/data/results.csv" style="outline" icon="document-arrow-down" >}}Download Data{{< /button >}}

&nbsp;

{{< button url="https://github.com/HugoBlox" new_tab="true" style="ghost" icon="arrow-top-right-on-square" icon_position="right" >}}View Source Code{{< /button >}}

```go-html-template
{{</* button url="#" style="primary" size="lg" align="center" icon="chart-bar" */>}}View Dashboard{{</* /button */>}}

{{</* button url="/data/results.csv" style="outline" icon="document-arrow-down" */>}}Download Data{{</* /button */>}}

{{</* button url="https://github.com/HugoBlox" new_tab="true" style="ghost" icon="arrow-top-right-on-square" icon_position="right" */>}}View Source Code{{</* /button */>}}
```

### Multiple Aligned Buttons

{{< button url="https://jupyter.org/" new_tab="true" style="secondary" rounded="full" align="center" >}}Try Jupyter{{< /button >}}

&nbsp;

{{< button url="https://colab.research.google.com/" new_tab="true" style="primary" rounded="full" align="center" icon="rocket-launch" >}}Open in Colab{{< /button >}}

```go-html-template
{{</* button url="https://jupyter.org/" new_tab="true" style="secondary" rounded="full" align="center" */>}}Try Jupyter{{</* /button */>}}

{{</* button url="https://colab.research.google.com/" new_tab="true" style="primary" rounded="full" align="center" icon="rocket-launch" */>}}Open in Colab{{</* /button */>}}
```

## Did you find this page helpful? Consider sharing it 🙌
