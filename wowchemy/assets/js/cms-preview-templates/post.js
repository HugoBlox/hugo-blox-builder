let PostPreview = createClass({
  render: function() {
    let entry = this.props.entry;
    let bg = this.props.getAsset('featured.jpg')
    if (bg == 'featured.jpg') { // bg will be equal to 'featured.jpg' if the image doesn't exist
      bg = this.props.getAsset('featured.jpeg')
      if (bg == 'featured.jpeg') {
        bg = this.props.getAsset('featured.png')
      }
    }
    return h('div', {},
      h('h1', {}, entry.getIn(['data', 'title'])),
      h('p', {
        "className": "page-subtitle"
      }, entry.getIn(['data', 'subtitle'])),
      (bg == 'featured.png' || entry.getIn(['data', 'image', 'preview_only']) == true) ? '' : h('img', {
        src: bg.toString(),
        "className": "featured-image"
      }), // Don't show image if it doesn't exist or if it is preview only
      h('div', {
        "className": "article-container"
      }, this.props.widgetFor('body'))
    );
  }
});

CMS.registerPreviewTemplate("posts", PostPreview);
CMS.registerPreviewTemplate("projects", PostPreview);
