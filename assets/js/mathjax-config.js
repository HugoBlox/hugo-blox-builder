window.MathJax = {
  CommonHTML: {linebreaks: {automatic: true}},
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: false,
    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre']  // Remove `code` (required for inline math).
  },
  TeX: {noUndefined: {attributes: {mathcolor: 'red', mathbackground: '#FFEEEE', mathsize: '90%'}}},
  messageStyle: 'none'
};

MathJax.Hub.Queue(function() {
  // Fix inline math wrapped in <code> tags after MathJax finishes running.
  // This is a workaround to overcome a shortcoming of Blackfriday Markdown.
  // See discussion in Hugo Docs.
  let all = MathJax.Hub.getAllJax(), i;
  for (i = 0; i < all.length; i += 1) {
    all[i].SourceElement().parentNode.className += ' has-jax';
  }
});
