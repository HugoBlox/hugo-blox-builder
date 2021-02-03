// Register any CSS file on the home page as a preview style
fetch("/")
  .then(response => response.text())
  .then(html => {
    const f = document.createElement("html");
    f.innerHTML = html;
    Array.from(f.getElementsByTagName("link")).forEach(tag => {
      if (tag.rel == "stylesheet") {
        CMS.registerPreviewStyle(tag.href);
      }
    });
  });
CMS.registerPreviewStyle("custom-preview.css"); // custom preview CSS
