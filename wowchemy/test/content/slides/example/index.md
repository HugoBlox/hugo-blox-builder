---
title: Slides
summary: An introduction to using Academic's Slides feature.
authors: []
tags: []
categories: []
date: "2019-02-05T00:00:00Z"
slides:
  # Choose a theme from https://github.com/hakimel/reveal.js#theming
  theme: black
  # Choose a code highlighting style (if highlighting enabled in `params.toml`)
  #   Light style: github. Dark style: dracula (default).
  #   Available highlight themes listed in: https://highlightjs.org/static/demo/
  #   Use lower case names and replace space with hyphen '-'
  highlight_style: monokai

  mermaid_enabled: true # configure js or not
  mermaid_options: # see mermaid documentation for other options
    theme: base # default/base/dark/neutral/forest
    securityLevel: loose

  # Remember to use snake case for options under reveal_options instead of camel case
  # all snake case will be converted into came case for reveal 

  reveal_options: # see reveal documentation for other options
    controls: true
    progress: true
    slide_number: c/t # true | false | h.v | h/v | c | c/t
    center: true
    rtl: false
    mouse_wheel: true
    transition: fase #  none/fade/slide/convex/concave/zoom
    # transitionSpeed: slow  # default/fast/slow
    background_transition: slide # none/fade/slide/convex/concave/zoom
    touch: true
    loop: false

  #   menu_enabled: true # configure js or not

  #   # same item as name used for setting plugin configuration
  #   menu: # see menu plugin documentation for other options
  #     numbers: false  # numbers in menu slides
  #     themes: true  # theme selection in menu
  #     transitions: false  # transition selection in menu

  #   chalkboard_enabled: true

---
## testing slides

Not having iframe or youtube on first slide will render diagrams correctly?

trick is to wait a few seconds before switching slide

---

## iframes (work)

<iframe src="https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics_es.html" width="100%" height="500" scrolling="no" allowfullscreen></iframe>

---
## Youtube shortcode (works)

{{< youtube w7Ft2ymGmfc >}}

---

## other shortcodes

- Efficiently write slides in Markdown
- cta button {{< cta cta_text="Do something" cta_link="/" cta_new_tab="true" >}} (DOES NOT WORK)

---

## more shortcodes

- figure {{< figure src="icon.png" title="A caption" numbered="true" >}}
- icons {{< icon name="terminal" pack="fas" >}} Terminal 

---

## callout (does not work)

{{% callout warning %}}
Here's some important information...y
{{% /callout %}}

---

chart

{{< chart data="chart" >}}

---

## diagram works!


```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

---

## diagram works!2


{{% diagram %}}
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
{{% /diagram %}}

---

## diagram works!

{{% diagram %}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
{{% /diagram %}}

---
## gantt

{{% diagram %}}
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid
excludes weekdays 2014-01-10
section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
{{% /diagram %}}

---
## class

{{% diagram %}}
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
{{% /diagram %}}

---

## gitGraph

{{% diagram %}}
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
{{% /diagram %}}

---

## ERD

{{% diagram %}}
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
{{% /diagram %}}

---

## journey

{{% diagram %}}
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
{{% /diagram %}}

---

## Test

{{% diagram %}}
graph TD
    subgraph Enabling Faculty
    a[Activate KU e-mail]
    b[Install MS Teams]
    a --> b
    end
    subgraph Enabling Students
    c[Activate KU e-mail]
    d[Install Teams]
    l[Student Check-in<br />Using Tacking System]
    c --> d
    d --> l
    end
    subgraph Testing With Colleagues
    h[Test Online Meeting]
    end
    b --> h
    subgraph Testing With Students
    m[Track Student Progress<br />Using Tacking System]
    i[Create Teams for Classes]
    j[Add Students to Class Teams]
    k[Test Sharing Content]
    f[Test Online Lecture]
    m --> i
    i --> j
    j --> k
    k --> f
    end
    l --> m
    h --> m
    g[Add/Improve Content]
    f -- Section is ready for emergency distance learning --> g
    a -- Notify Students --> c
    click a "http://kuweb.ku.edu.kw/ku/Staff/ElectronicServices/KUOffice365/Office365FAQ/FacultyandStaff/index.htm" "Activate KU e-mail for Faculty"
    click b "https://www.microsoft.com/en-ww/microsoft-365/microsoft-teams/download-app" "Install MS Teams"
    click c "http://kuweb.ku.edu.kw/ku/Staff/ElectronicServices/KUOffice365/Office365FAQ/Students/index.htm" "Activate KU e-mail for students"
    click d "https://www.microsoft.com/en-ww/microsoft-365/microsoft-teams/download-app" "Install MS Teams"
    click h "https://youtu.be/Y44n1QHbdZk?t=129" "Test Online Meetings"
    click i "https://youtu.be/QCXpw0fr_Ko‬" "Setup/Create a Team for Class"
    click k "‪https://youtu.be/mRAmivNyj90‬" "Test sharing content with class"
    click f "https://youtu.be/Y_oH9ZpH4RM" "Test online lecture"
    click l "http://is.cba.edu.kw/checkin/student.aspx" "Student Check-in"
    click m "http://is.cba.edu.kw/checkin/faculty.aspx" "Faculty Check-in"
    style a fill:#ECECFF
    style b fill:#ECECFF
    style c fill:#ECECFF
    style d fill:#ECECFF
    style f fill:#ECECFF
    style l fill:#ECECFF
    style m fill:#ECECFF
    style g fill:#FFE18E
    style h fill:#FFD9F0
    style i fill:#FFD9F0
    style j fill:#FFD9F0
    style k fill:#FFD9F0
    style f fill:#FFD9F0
{{% /diagram %}}

---
## Controls

- Next: `Right Arrow` or `Space`
- Previous: `Left Arrow`
- Start: `Home`
- Finish: `End`
- Overview: `Esc`
- Speaker notes: `S`
- Fullscreen: `F`
- Zoom: `Alt + Click`
- [PDF Export](https://github.com/hakimel/reveal.js#pdf-export): `E`

---

## Code Highlighting

Inline code: `variable`

Code block:
```python
porridge = "blueberry"
if porridge == "blueberry":
    print("Eating...")
```

---

## Math

In-line math: $f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n$

Block math:

$$
f\left( x \right) = \;\frac{{2\left( {x + 4} \right)\left( {x - 4} \right)}}{{\left( {x + 4} \right)\left( {x + 1} \right)}}
$$

---

## Fragments

Make content appear incrementally

```
{{%/* fragment */%}} One {{%/* /fragment */%}}
{{%/* fragment */%}} **Two** {{%/* /fragment */%}}
{{%/* fragment */%}} Three {{%/* /fragment */%}}
```

Press `Space` to play!

{{% fragment %}} One {{% /fragment %}}
{{% fragment %}} **Two** {{% /fragment %}}
{{% fragment %}} Three {{% /fragment %}}

---

A fragment can accept two optional parameters:

- `class`: use a custom style (requires definition in custom CSS)
- `weight`: sets the order in which a fragment appears

---

## Speaker Notes

Add speaker notes to your presentation

```markdown
{{%/* speaker_note */%}}
- Only the speaker can read these notes
- Press `S` key to view
{{%/* /speaker_note */%}}
```

Press the `S` key to view the speaker notes!

{{< speaker_note >}}
- Only the speaker can read these notes
- Press `S` key to view
{{< /speaker_note >}}

---

## Themes

- black: Black background, white text, blue links (default)
- white: White background, black text, blue links
- league: Gray background, white text, blue links
- beige: Beige background, dark text, brown links
- sky: Blue background, thin dark text, blue links

---

- night: Black background, thick white text, orange links
- serif: Cappuccino background, gray text, brown links
- simple: White background, black text, blue links
- solarized: Cream-colored background, dark green text, blue links

---
{{< slide background-image="./boards.jpg" >}}

## Custom Slide

Customize the slide style and background

```markdown
{{</* slide background-image="/media/boards.jpg" */>}}
{{</* slide background-color="#0000FF" */>}}
{{</* slide class="my-style" */>}}
```

---

## Custom CSS Example

Let's make headers navy colored.

Create `assets/css/reveal_custom.css` with:

```css
.reveal section h1,
.reveal section h2,
.reveal section h3 {
  color: navy;
}
```

---

# Questions?

[Ask](https://spectrum.chat/academic)

[Documentation](https://sourcethemes.com/academic/docs/managing-content/#create-slides)
