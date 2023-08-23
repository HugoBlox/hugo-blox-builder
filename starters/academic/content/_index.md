---
# Leave the homepage title empty to use the site title
title:
date: 2023-08-23
type: landing

sections:
  - block: about.biography
    id: about
    content:
      title: Biography
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
  - block: features
    content:
      title: Skills
      items:
        - name: Matlab
          icon: matlab
          icon_pack: fab
        - name: Python
          icon: python
          icon_pack: fab
        - name: FORTRAN
          icon: computer
          icon_pack: fab
 # - block: experience
   # content:
    #  title: Experience
      # Date format for experience
      #   Refer to https://wowchemy.com/docs/customization/#date-format
      #date_format: Jan 2006
      # Experiences.
      #   Add/remove as many `experience` items below as you like.
      #   Required fields are `title`, `company`, and `date_start`.
      #   Leave `date_end` empty if it's your current employer.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      #items:
      #  - title: CEO
       #   company: GenCoin
       #   company_url: ''
       #   company_logo: org-gc
       #   location: California
       #   date_start: '2021-01-01'
       #   date_end: ''
       #   description: |2-
            #  Responsibilities include:

         #     * Analysing
         #     * Modelling
         #     * Deploying
        #- title: Professor of Semiconductor Physics
        #  company: University X
         # company_url: ''
         # company_logo: org-x
         # location: California
         # date_start: '2016-01-01'
         # date_end: '2020-12-31'
         # description: Taught electronic engineering and researched semiconductor physics.
    #design:
     # columns: '2'
  - block: accomplishments
    content:
      # Note: `&shy;` is used to add a 'soft' hyphen in a long heading.
      title: 'Accomplish&shy;ments'
      subtitle:
      # Date format: https://wowchemy.com/docs/customization/#date-format
      date_format: '2023-08-23'
      # Accomplishments.
      #   Add/remove as many `item` blocks below as you like.
      #   `title`, `organization`, and `date_start` are the required parameters.
      #   Leave other parameters empty if not required.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      items:
        - certificate_url: uploads/SHELL.ai_Participation.pdf
          date_end: '2020-10-20'
          date_start: '2020-09-14'
          description: 'In this Shell.ai Hackathon for Sustainable and Affordable Energy, we invite you to optimize the placement of 50 wind turbines of 100 m height and100 m rotor diameter each on a hypothetical 2D offshore wind farm area such that the AEP (Annual Energy Production) of the farm is maximized.'
          organization: HackerEarth
          organization_url: https://www.coursera.org
          title: Shell.ai Hackathon
          url: 'https://www.hackerearth.com/challenges/new/competitive/shell-hackathon/'
        - certificate_url: uploads/Baja_2015.jpg
          date_end: '2014-08-02'
          date_start: '2014-08-01'
          description: Participated in virtual Baja organized by SAE India
          organization: SAE Indian
          organization_url: https://saeindia.org/
          title: Virtual BAJA SAE India 2014
          url:
        - certificate_url: ''
          date_end: '2019-07-01'
          date_start: '2019-07-01'
          description: 'Received Ganga Devi and Khem Chand Memorial award for securing the highest CGPA amongst the 2019 M.Tech batch'
          organization: Centre for Atmospheric Sciences, IIT Delhi
          organization_url: https://cas.iitd.ac.in/
          title: Ganga Devi and Khem Chand Memorial award
          url: ''
        - certificate_url: uploads/Baja_2015.jpg
          date_end: '2016-02-21'
          date_start: '2016-02-18'
          description: 'Participated in Mahindra Baja organized by SAE India'
          organization: SAE India
          organization_url: https://saeindia.org/
          title: Mahindra BAJA SAE India 2016
          url: ''
        - certificate_url: uploads/ExpertHub_ICEngines.jpg
          date_end: '2014-12-27'
          date_start: '2014-12-20'
          description: 'Received Best Innovation Award at the internship program organized by Automotive Industry Simulation Industry (AISI), Winter Season 2014' 
          organization: ExpertsHub 
          organization_url: https://expertshub.org/
          title: 'Internship training program on Automotive IC Engine Design and Development'
          url: ''
        - certificate_url: uploads/UDVAVISK_FEA_Workshop.jpg
          date_end: '2015-08-14'
          date_start: '2015-08-11'
          description: 'Fundamentals of FEA Analysis, Overview Models and Solver, Application of Models and Solver (Linear Elastic, Modal, Fluid flow, ...)'
          organization: Udvavisk Technologies Pvt. Ltd.
          organization_url: https://www.udvavisk.com/
          title: Individual Training on Finite Element Analysis (FEA)
          url: ''
    design:
      columns: '2'
 # - block: collection
   # id: posts
   # content:
    #  title: Recent Posts
    #  subtitle: ''
    #  text: ''
      # Choose how many pages you would like to display (0 = all pages)
    #  count: 5
      # Filter on criteria
     # filters:
      #  folders:
      #    - post
       # author: ""
       # category: ""
       # tag: ""
       # exclude_featured: false
       # exclude_future: false
       # exclude_past: false
       # publication_type: ""
      # Choose how many pages you would like to offset by
      #offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      #order: desc
    #design:
      # Choose a layout view
     # view: compact
     # columns: '2'
  - block: portfolio
    id: projects
    content:
      title: Projects
      filters:
        folders:
          - project
      # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
      default_button_index: 0
      # Filter toolbar (optional).
      # Add or remove as many filters (`filter_button` instances) as you like.
      # To show all items, set `tag` to "*".
      # To filter by a specific tag, set `tag` to an existing tag name.
      # To remove the toolbar, delete the entire `filter_button` block.
      #buttons:
      #  - name: All
       #   tag: '*'
       # - name: Deep Learning
       #   tag: Deep Learning
       # - name: Other
       #   tag: Demo
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '1'
      view: showcase
      # For Showcase view, flip alternate rows?
      flip_alt_rows: false
  - block: markdown
    content:
      title: Gallery
      subtitle: 'Here are some moments captured through my camera lens'
      text: |-
        {{< gallery album="demo" >}}
    design:
      columns: '1'
  #- block: collection
  #  id: featured
   # content:
   #   title: Featured Publications
    #  filters:
     #   folders:
      #    - publication
       # featured_only: true
    #design:
     # columns: '2'
      #view: card
  - block: collection
    id: publications
    content:
      title: Publications
      text: |-
        {{% callout note %}}
        Quickly discover relevant content by [filtering publications](./publication/).
        {{% /callout %}}
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      columns: '2'
      view: citation
  - block: collection
    id: talks
    content:
      title: Recent & Upcoming Talks
      filters:
        folders:
          - event
    design:
      columns: '2'
      view: compact
#  - block: tag_cloud
 #   content:
  #    title: Popular Topics
  #  design:
   #   columns: '2'
  - block: contact
    id: contact
    content:
      title: Contact
      subtitle:
      text: |-
        Feel free to contact me for any questions, collaborations, or just a meet-up
      # Contact (add or remove contact options as necessary)
      email: knreddy@cas.iitd.ac.in
      phone: +91 9533615121
      #appointment_url: 'https://calendly.com'
      address:
        street: 421, Block VI, IITD, Hauz Khas
        city: New Delhi
        region: Delhi
        postcode: '110016'
        country: India
        country_code: IN
      #directions: Enter Building 1 and take the stairs to Office 200 on Floor 2
      #office_hours:
        #- 'Monday 10:00 to 13:00'
       # - 'Wednesday 09:00 to 10:00'
      contact_links:
        - icon: twitter
          icon_pack: fab
          name: DM Me
          link: 'https://twitter.com/vivekreddy'
       # - icon: skype
        #  icon_pack: fab
         # name: Skype Me
          #link: 'skype:echo123?call'
        #- icon: video
          #icon_pack: fas
          #name: Zoom Me
          #link: 'https://zoom.com'
      # Automatically link email and phone or display as text?
      autolink: true
      # Email form provider
      form:
        provider: netlify
        formspree:
          id:
        netlify:
          # Enable CAPTCHA challenge to reduce spam?
          captcha: false
    design:
      columns: '2'
---
