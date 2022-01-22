/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Wowchemy Publications
 **************************************************/

// Active publication filters.
let pubFilters = {};

// Search term.
let searchRegex;

// Filter values (concatenated).
let filterValues;

// Publication container.
let $grid_pubs = $('#container-publications');

// Initialise Isotope publication layout if required.
if ($grid_pubs.length) {
  $grid_pubs.isotope({
    itemSelector: '.isotope-item',
    percentPosition: true,
    masonry: {
      // Use Bootstrap compatible grid layout.
      columnWidth: '.grid-sizer',
    },
    filter: function () {
      let $this = $(this);
      let searchResults = searchRegex ? $this.text().match(searchRegex) : true;
      let filterResults = filterValues ? $this.is(filterValues) : true;
      return searchResults && filterResults;
    },
  });

  // Filter by search term.
  let $quickSearch = $('.filter-search').keyup(
    debounce(function () {
      searchRegex = new RegExp($quickSearch.val(), 'gi');
      $grid_pubs.isotope();
    }),
  );

  $('.pub-filters').on('change', function () {
    let $this = $(this);

    // Get group key.
    let filterGroup = $this[0].getAttribute('data-filter-group');

    // Set filter for group.
    pubFilters[filterGroup] = this.value;

    // Combine filters.
    filterValues = concatValues(pubFilters);

    // Activate filters.
    $grid_pubs.isotope();

    // If filtering by publication type, update the URL hash to enable direct linking to results.
    if (filterGroup === 'pubtype') {
      // Set hash URL to current filter.
      let url = $(this).val();
      if (url.substr(0, 9) === '.pubtype-') {
        window.location.hash = url.substr(9);
      } else {
        window.location.hash = '';
      }
    }
  });
}

// Debounce input to prevent spamming filter requests.
function debounce(fn, threshold) {
  let timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout(timeout);
    let args = arguments;
    let _this = this;

    function delayed() {
      fn.apply(_this, args);
    }

    timeout = setTimeout(delayed, threshold);
  };
}

// Flatten object by concatenating values.
function concatValues(obj) {
  let value = '';
  for (let prop in obj) {
    value += obj[prop];
  }
  return value;
}

// Filter publications according to hash in URL.
function filter_publications() {
  // Check for Isotope publication layout.
  if (!$grid_pubs.length) return;

  let urlHash = window.location.hash.replace('#', '');
  let filterValue = '*';

  // Check if hash is numeric.
  if (urlHash != '' && !isNaN(urlHash)) {
    filterValue = '.pubtype-' + urlHash;
  }

  // Set filter.
  let filterGroup = 'pubtype';
  pubFilters[filterGroup] = filterValue;
  filterValues = concatValues(pubFilters);

  // Activate filters.
  $grid_pubs.isotope();

  // Set selected option.
  $('.pubtype-select').val(filterValue);
}

document.addEventListener('DOMContentLoaded', function () {
  // Enable publication filter for publication index page.
  if ($('.pub-filters-select')) {
    filter_publications();
    // Useful for changing hash manually (e.g. in development):
    // window.addEventListener('hashchange', filter_publications, false);
  }

  // Load citation modal on 'Cite' click.
  $('.js-cite-modal').click(function (e) {
    e.preventDefault();
    let filename = $(this).attr('data-filename');
    let modal = $('#modal');
    modal.find('.modal-body code').load(filename, function (response, status, xhr) {
      if (status == 'error') {
        let msg = 'Error: ';
        $('#modal-error').html(msg + xhr.status + ' ' + xhr.statusText);
      } else {
        $('.js-download-cite').attr('href', filename);
      }
    });
    modal.modal('show');
  });

  // Copy citation text on 'Copy' click.
  $('.js-copy-cite').click(function (e) {
    e.preventDefault();
    // Get text to copy.
    let citation = document.querySelector('#modal .modal-body').innerHTML;
    navigator.clipboard
      .writeText(citation)
      .then(function () {
        console.debug('Citation copied!');
      })
      .catch(function () {
        console.error('Citation copy failed!');
      });
  });
});
