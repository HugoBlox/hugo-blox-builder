/* ---------------------------------------------------------------------------
 *  Hugo Blox Builder
 *  https://github.com/HugoBlox/hugo-blox-builder
 *
 *  Announcement Bar component
 * --------------------------------------------------------------------------- */

let announcement = document.getElementById('announcement');

// Check if the page has an announcement defined for it
if (announcement !== null) {
  console.debug('Announcement detected!');

  let announcement_id = announcement.dataset.id;

  // Check local storage for the announcement status
  Object.keys(localStorage).forEach(function(key) {
    if (/^wc-announcement-/.test(key)) {
      if (key !== announcement_id ) {
        localStorage.removeItem(key);
        document.documentElement.removeAttribute('data-wc-announcement-status');
        console.debug('Announcement key removed!');
      }
    }
  });

  // Dismiss announcement
  // TODO: for BS5 upgrade with vanilla JS, change to `announcement.addEventListener('closed.bs.alert', () => {`
  $('#announcement').on('closed.bs.alert', function () {
    console.debug(`Announcement ${announcement_id} dismissed!`);
    localStorage.setItem(announcement_id, 'dismissed');
  });
}
