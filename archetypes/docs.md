+++
title = "{{ replace .Name "-" " " | title }}"
date = {{ .Date }}
draft = false
type = "docs"  # Do not modify.

# Show table of contents? true/false
toc = true

# Add menu entry to sidebar.

# Uncomment to customize menu title, e.g. to abbreviate page title.
# linktitle = "Example"

# Substitute `tutorial` with the name of your tutorials folder.
[menu.tutorial]
  # Define a parent ID if this page is a parent.
  name = "YourParentID"
  
  # Reference a parent ID if this page is a child.
  # parent = "YourParentID"
  
  # Order that this page appears in the menu.
  weight = 1
+++
