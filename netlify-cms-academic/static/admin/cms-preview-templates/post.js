var PostPreview = createClass({
  render: function() {
    var entry = this.props.entry;
    var bg = this.props.getAsset('featured.jpg')
    if(bg == 'featured.jpg') { // If the image doesn't exist then bg will equal the filename
      bg = this.props.getAsset('featured.jpeg')
      if(bg == 'featured.jpeg')
        bg = this.props.getAsset('featured.png')
    }
    return h('div', {},
      h('h1', {}, entry.getIn(['data', 'title'])),
      h('p', {"className": "page-subtitle"}, entry.getIn(['data', 'subtitle'])),
      (bg == 'featured.png' || entry.getIn(['data', 'image', 'preview_only']) == true)?'':h('img', {src: bg.toString(), "className": "featured-image"}), // Don't show image if doesn't exist or is preview only
      h('div', {"className": "article-container"}, this.props.widgetFor('body'))
    );
  }
});

CMS.registerPreviewTemplate("posts", PostPreview);
CMS.registerPreviewTemplate("projects", PostPreview);
