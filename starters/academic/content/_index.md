---
# Leave the homepage title empty to use the site title
title:
date: "2023-08-23T00:00:00Z"
type: landing

sections:
  - block: about.biography
    id: about
    content:
      title: Bio
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
  - block: portfolio
    id: projects
    content:
      title: Projects
      filters:
        folders:
          - project
      # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
      default_button_index: 0
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '2'
      view: showcase
      # For Showcase view, flip alternate rows?
      flip_alt_rows: false
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
      date_format: '2023-08-15T00:00:00Z'
      filters:
        folders:
          - event
      #design:
      #columns: '2'
      #view: compact
  - block: accomplishments
    content:
      # Note: `&shy;` is used to add a 'soft' hyphen in a long heading.
      title: 'Awards, Competitions  <br>& Workshops'
      subtitle:
      # Date format: https://wowchemy.com/docs/customization/#date-format
      #date_format: '2023-08-15T00:00:00Z'
      # Accomplishments.
      #   Add/remove as many `item` blocks below as you like.
      #   `title`, `organization`, and `date_start` are the required parameters.
      #   Leave other parameters empty if not required.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      items:
        - certificate_url: ''
          date_end: '2021-06-10T00:00:00Z'
          date_start: '2021-06-07T00:00:00Z'
          description: 'Attended the workshop'
          organization: MMM laboratory, NCAR
          organization_url: https://www.mmm.ucar.edu/
          title: Joint WRF and MPAS Users’ Workshop 2021
          url: 'https://www.mmm.ucar.edu/events/workshops/wrf-mpas/2021'
        - certificate_url: ''
          date_end: '2021-03-06T00:00:00Z'
          date_start: '2021-03-04T00:00:00Z'
          description: 'A unique online conference bringing together Academics, Researchers & Corporate leaders from India and Canada to discuss Global Challenges in Agriculture, Climate, Energy, Plant, and Soil will be held from March 4-5, 2021.'
          organization: IIT Delhi and University of Alberta
          organization_url: 
          title: 'Science and Technology for the New Age: Acquisition, Analyses and Adaptation'
          url: 'https://international.iitd.ac.in/blog/2021/02/24/indo-canadian-conference/'
        - certificate_url: ''
          date_end: '2021-06-15T00:00:00Z'
          date_start: '2021-06-16T00:00:00Z'
          description: 'The purpose of the workshop is to identify areas of complementarity within the broad area of AgTech that IITD and UQ could collaborate on and partner with other organizations such as the Indian Council of Agricultural Research (ICAR) in India and Australia.'
          organization: IIT Delhi and The University Of Queensland
          organization_url: 
          title: 'UQ-IITD Workshop on Agriculture Technology'
          url: 'https://international.iitd.ac.in/agtech/'
        - certificate_url: ''#uploads/SHELL.ai_Participation.pdf
          date_end: '2020-10-20T00:00:00Z'
          date_start: '2020-09-14T00:00:00Z'
          description: 'In this Shell.ai Hackathon for Sustainable and Affordable Energy, we (a team of four) have optimized the placement of 50 wind turbines of 100 m height and 100 m rotor diameter each on a hypothetical 2D offshore wind farm area such that the AEP (Annual Energy Production) of the farm is maximized. We secured 63rd position among ~1600 participating teams'
          organization: HackerEarth
          organization_url: https://www.coursera.org
          title: Shell.ai Hackathon
          url: 'https://www.hackerearth.com/challenges/new/competitive/shell-hackathon/'
        - certificate_url: ''#uploads/Baja_2015.jpg
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
        - certificate_url: ''#uploads/Baja_2015.jpg
          date_end: '2016-02-21'
          date_start: '2016-02-18'
          description: 'Participated in Mahindra Baja organized by SAE India'
          organization: SAE India
          organization_url: https://saeindia.org/
          title: Mahindra BAJA SAE India 2016
          url: ''
        - certificate_url: ''#uploads/ExpertHub_ICEngines.jpg
          date_end: '2014-12-27'
          date_start: '2014-12-20'
          description: 'Received Best Innovation Award at the internship program organized by Automotive Industry Simulation Industry (AISI), Winter Season 2014' 
          organization: ExpertsHub 
          organization_url: https://expertshub.org/
          title: 'Internship training program on Automotive IC Engine Design and Development'
          url: ''
        - certificate_url: ''#uploads/UDVAVISK_FEA_Workshop.jpg
          date_end: '2015-08-14'
          date_start: '2015-08-11'
          description: 'Fundamentals of FEA Analysis, Overview Models and Solver, Application of Models and Solver (Linear Elastic, Modal, Fluid flow, ...)'
          organization: Udvavisk Technologies Pvt. Ltd.
          organization_url: https://www.udvavisk.com/
          title: Individual Training on Finite Element Analysis (FEA)
          url: ''
      design:
      columns: '2'
      view: compact
  #- block: collection
  #  id: hobbies
    content:
      title: Hobbies
      text: |-
        The things I do to take a break from my regular job and add enjoyment and relaxation to my days.
      filters:
        folders:
          - hobbies
      design:
      columns: '2'
      view: compact
  - block: markdown
    content:
      title: Gallery
      subtitle: 'Here are some moments captured through my camera lens'
      text: |-
        {{< gallery album="demo" >}}
    design:
      columns: '1'
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
      # Automatically link email and phone or display as text?
      autolink: true
      # Email form provider
      #form:
       # provider: netlify
       # formspree:
       #   id:
       # netlify:
          # Enable CAPTCHA challenge to reduce spam?
       #   captcha: true
    design:
      columns: '2'
---
