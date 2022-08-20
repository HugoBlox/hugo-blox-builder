---
title: Import Jupyter Notebooks
linktitle: From Jupyter Notebooks
date: 2019-02-12
summary: Learn how to write and import Jupyter Notebooks from JupyterLab.
---

In this guide, we'll **learn how to blog in Wowchemy using Jupyter Notebooks**.

Here's a snippet from a Jupyter notebook, for example:

```python
print("I am a Jupyter Notebook!")
```

    I am a Jupyter Notebook!

## Install Python and Jupyter

[Install Anaconda](https://www.anaconda.com/distribution/#download-section) which includes Python 3 and Jupyter notebook.

Otherwise, for advanced users, install Jupyter notebook with `pip3 install jupyter`.

## Create a new blog post [as usual]({{< relref "../content/_index.md#create-a-blog-post" >}})

Run the following commands in your Terminal, substituting `<MY_WEBSITE_FOLDER>` and `my-post` with the file path to your Wowchemy website folder and a name for your blog post (without spaces), respectively:  

```bash
cd <MY_WEBSITE_FOLDER>
hugo new  --kind post post/my-post
cd <MY_WEBSITE_FOLDER>/content/post/my-post/
```

## Create or upload a Jupyter notebook

Run the following command to start Jupyter within your new blog post folder. Then create a new Jupyter notebook (*New > Python Notebook*) or upload a notebook.

```bash
jupyter notebook
```

## Convert notebook to Markdown

```bash
jupyter nbconvert Untitled.ipynb --to markdown --NbConvertApp.output_files_dir=.

# Copy the contents of Untitled.md and append it to index.md:
cat Untitled.md | tee -a index.md

# Remove the temporary file:
rm Untitled.md
```

## Edit your post metadata

Open `index.md` in your text editor and edit the title etc. in the [front matter]({{< relref "front-matter.md" >}}) according to your preference.

To set a [featured image]({{< relref "../content/_index.md#featured-image" >}}), place an image named `featured` into your post's folder.

For other tips, such as using math, see the guide on [writing content with Wowchemy]({{< relref "../content/writing-markdown-latex.md" >}}). 

## Alternative approaches

Alternatively, a Jupyter notebook can be embedded in a page by following one of the approaches below:

1. Upload your notebook as a [GitHub Gist](https://gist.github.com) and click *Embed* to copy and paste your hosted notebook into the body of content in Wowchemy

2. [Convert your notebook to HTML](
https://nbconvert.readthedocs.io/) using `jupyter nbconvert --to html <NOTEBOOK_NAME>.ipynb`. Then move the resulting HTML file to your page's folder and embed it into the body of the page's Markdown file using:

        <iframe
              src="./<CONVERTED_NOTEBOOK_FILENAME>"
              width="90%"
              height="1000px"
              style="border:none;">
        </iframe>

3. Upload your notebook to a cloud notebook service such as [Microsoft Azure](https://notebooks.azure.com/), [Google Cloud Datalab](https://cloud.google.com/datalab/) or [Kyso](https://kyso.io). Then click their *Embed* button, pasting their custom embedding code into the body of your page's Markdown file

4. Copy snippets of code from your notebook and paste them into the body of your page using [Wowchemy's code highlighting]({{< relref "../content/writing-markdown-latex.md#code-highlighting" >}})
