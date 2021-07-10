CMS.registerEditorComponent({
  label: 'Figure',
  id: 'figure',
  fromBlock: match =>
    match && {
    image: match[1],
    alt: match[5],
    caption: match[3],
    },
  toBlock: ({ alt, image, caption }) =>
    `{{< figure src="${image}" ${caption ? `caption="` + caption + `" ` : ''}${alt ? `alt="` + alt + `" ` : ''}>}}`,
  toPreview: ({ alt, image, caption }, getAsset, fields) => {
    const mdcaption = caption ? marked(caption) : ''; // render markdown
    const imageField = fields?.find(f => f.get('widget') === 'image');
    const src = getAsset(image, imageField);
    return `<figure><img src=${src || ''} alt="${alt || ''}"><figcaption>${mdcaption || ''}</figcaption></figure>`;
  },
  pattern: /^{{< figure src="(.*?)"( caption="([^"]*)")?( alt="([^"]*)")? >}}/,
  fields: [
    {
    label: 'Image',
    name: 'image',
    widget: 'image',
    media_library: {
      allow_multiple: false,
    },
    },
    {
    label: 'Alt Text',
    name: 'alt',
    required: false
    },
    {
    label: 'Caption',
    name: 'caption',
    required: false,
    widget: "markdown",
    minimal: true
    },
  ],
  });
CMS.registerEditorComponent({
  id: "gist",
  label: "Gist",
  fields: [{
      name: "username",
      label: "Github Username",
      widget: "string"
    },
    {
      name: "gid",
      label: "Gist ID",
      widget: "string"
    },
  ],
  pattern: /{{< gist ([a-zA-Z0-9]+) ([a-zA-Z0-9]+) >}}/,
  fromBlock: function(match) {
    return {
      username: match[1],
      gid: match[2],
    };
  },
  toBlock: function(obj) {
    return `{{< gist ${obj.username} ${obj.gid} >}}`;
  },
  toPreview: function(obj) {
    return `{{< gist ${obj.username} ${obj.gid} >}}`;
  },
});
CMS.registerEditorComponent({
  id: "instagram",
  label: "Instagram",
  fields: [{
    name: "pid",
    label: "Post id",
    widget: "string"
  }],
  pattern: /{{< instagram ([a-zA-Z0-9]+) >}}/,
  fromBlock: function(match) {
    return {
      pid: match[1]
    };
  },
  toBlock: function(obj) {
    return `{{< instagram ${obj.pid} >}}`;
  },
  toPreview: function(obj) {
    return `{{< instagram ${obj.pid} >}}`;
  },
});
CMS.registerEditorComponent({
  id: "twitter",
  label: "Twitter",
  fields: [{
    name: "tid",
    label: "Tweet id",
    widget: "string"
  }],
  pattern: /{{< tweet ([a-zA-Z0-9]+) >}}/,
  fromBlock: function(match) {
    return {
      tid: match[1]
    };
  },
  toBlock: function(obj) {
    return `{{< tweet ${obj.tid} >}}`;
  },
  toPreview: function(obj) {
    return `{{< tweet ${obj.tid} >}}`;
  },
});
CMS.registerEditorComponent({
  id: "vimeo",
  label: "Vimeo",
  fields: [{
    name: "shortcode",
    label: "Vimeo shortcode",
    widget: "string"
  }],
  pattern: /{{< vimeo ([a-zA-Z0-9]+) >}}/,
  fromBlock: function(match) {
    return {
      shortcode: match[1]
    };
  },
  toBlock: function(obj) {
    return `{{< vimeo ${obj.shortcode} >}}`;
  },
  toPreview: function(obj) {
    return `{{< vimeo ${obj.shortcode} >}}`;
  },
});
CMS.registerEditorComponent({
  id: "youtube",
  label: "Youtube",
  fields: [{
    name: "id",
    label: "Youtube Video ID",
    widget: "string"
  }],
  pattern: /{{< youtube ([a-zA-Z0-9]+) >}}/,
  fromBlock: function(match) {
    return {
      id: match[1],
    };
  },
  toBlock: function(obj) {
    return `{{< youtube ${obj.id} >}}`;
  },
  toPreview: function(obj) {
    return `<img src="http://img.youtube.com/vi/${obj.id}/maxresdefault.jpg" alt="Youtube Video"/>`;
  },
});

CMS.registerEditorComponent({
  id: "callout",
  label: "Callout",
  fields: [
    {
      name: "text",
      label: "Text",
      widget: "markdown",
      minimal: true
    },
    {
      name: "type",
      label: "Type",
      widget: "select",
      options: ["note", "warning"]
    },
  ],
  pattern: /^{{% callout (\w*) %}}\n([\s\S]*?)\n{{% \/callout %}}/,
  fromBlock: function(match) {
    return {
      text: match[2],
      type: match[1]
    };
  },
  toBlock: function(obj) {
    return `{{% callout ${obj.type} %}}\n${obj.text}\n{{% /callout %}}`;
  },
  toPreview: function(obj) {
    const mdText = marked(obj.text); // render markdown
    return `<div class="alert alert-${obj.type}"> <div> ${mdText} </div> </div>`;
  },
});
