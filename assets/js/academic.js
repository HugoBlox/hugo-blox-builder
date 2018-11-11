/*************************************************
 *  Academic
 *  https://github.com/gcushen/hugo-academic
 *
 *  Core JS functions and initialization.
 **************************************************/

(function($){

  /* ---------------------------------------------------------------------------
   * Responsive scrolling for URL hashes.
   * --------------------------------------------------------------------------- */

  // Dynamically get responsive navigation bar offset.
  let $navbar = $('.navbar');
  let navbar_offset = $navbar.innerHeight();

  /**
   * Responsive hash scrolling.
   * Check for a URL hash as an anchor.
   * If it exists on current page, scroll to it responsively.
   * If `target` argument omitted (e.g. after event), assume it's the window's hash.
   */
  function scrollToAnchor(target) {
    // If `target` is undefined or HashChangeEvent object, set it to window's hash.
    target = (typeof target === 'undefined' || typeof target === 'object') ? window.location.hash : target;
    // Escape colons from IDs, such as those found in Markdown footnote links.
    target = target.replace(/:/g, '\\:');

    // If target element exists, scroll to it taking into account fixed navigation bar offset.
    if($(target).length) {
      $('body').addClass('scrolling');
      $('html, body').animate({
        scrollTop: $(target).offset().top - navbar_offset
      }, 600, function () {
        $('body').removeClass('scrolling');
      });
    }
  }

  // Make Scrollspy responsive.
  function fixScrollspy() {
    let $body = $('body');
    let data = $body.data('bs.scrollspy');
    if (data) {
      data._config.offset = navbar_offset;
      $body.data('bs.scrollspy', data);
      $body.scrollspy('refresh');
    }
  }

  // Check for hash change event and fix responsive offset for hash links (e.g. Markdown footnotes).
  window.addEventListener("hashchange", scrollToAnchor);

  /* ---------------------------------------------------------------------------
   * Add smooth scrolling to all links inside the main navbar.
   * --------------------------------------------------------------------------- */

  $('#navbar-main li.nav-item a.nav-link').on('click', function(event) {
    // Store requested URL hash.
    let hash = this.hash;

    // If we are on the homepage and the navigation bar link is to a homepage section.
    if ( hash && $(hash).length && ($("#homepage").length > 0)) {
      // Prevent default click behavior.
      event.preventDefault();

      // Use jQuery's animate() method for smooth page scrolling.
      // The numerical parameter specifies the time (ms) taken to scroll to the specified hash.
      $('html, body').animate({
        scrollTop: $(hash).offset().top - navbar_offset
      }, 800);
    }
  });

  /* ---------------------------------------------------------------------------
   * Smooth scrolling for Back To Top link.
   * --------------------------------------------------------------------------- */

  $('#back_to_top').on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({
      'scrollTop': 0
    }, 800, function() {
      window.location.hash = "";
    });
  });

  /* ---------------------------------------------------------------------------
   * Hide mobile collapsable menu on clicking a link.
   * --------------------------------------------------------------------------- */

  $(document).on('click', '.navbar-collapse.show', function(e) {
    //get the <a> element that was clicked, even if the <span> element that is inside the <a> element is e.target
    let targetElement = $(e.target).is('a') ? $(e.target) : $(e.target).parent();

    if (targetElement.is('a') && targetElement.attr('class') != 'dropdown-toggle') {
      $(this).collapse('hide');
    }
  });

  /* ---------------------------------------------------------------------------
   * Filter publications.
   * --------------------------------------------------------------------------- */

  let $grid_pubs = $('#container-publications');
  $grid_pubs.isotope({
    itemSelector: '.isotope-item',
    percentPosition: true,
    masonry: {
      // Use Bootstrap compatible grid layout.
      columnWidth: '.grid-sizer'
    }
  });

  // Active publication filters.
  let pubFilters = {};

  // Flatten object by concatenating values.
  function concatValues( obj ) {
    let value = '';
    for ( let prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }

  $('.pub-filters').on( 'change', function() {
    let $this = $(this);

    // Get group key.
    let filterGroup = $this[0].getAttribute('data-filter-group');

    // Set filter for group.
    pubFilters[ filterGroup ] = this.value;

    // Combine filters.
    let filterValues = concatValues( pubFilters );

    // Activate filters.
    $grid_pubs.isotope({ filter: filterValues });

    // If filtering by publication type, update the URL hash to enable direct linking to results.
    if (filterGroup == "pubtype") {
      // Set hash URL to current filter.
      let url = $(this).val();
      if (url.substr(0, 9) == '.pubtype-') {
        window.location.hash = url.substr(9);
      } else {
        window.location.hash = '';
      }
    }
  });

  // Filter publications according to hash in URL.
  function filter_publications() {
    let urlHash = window.location.hash.replace('#','');
    let filterValue = '*';

    // Check if hash is numeric.
    if (urlHash != '' && !isNaN(urlHash)) {
      filterValue = '.pubtype-' + urlHash;
    }

    // Set filter.
    let filterGroup = 'pubtype';
    pubFilters[ filterGroup ] = filterValue;
    let filterValues = concatValues( pubFilters );

    // Activate filters.
    $grid_pubs.isotope({ filter: filterValues });

    // Set selected option.
    $('.pubtype-select').val(filterValue);
  }

  /* ---------------------------------------------------------------------------
  * Google Maps or OpenStreetMap via Leaflet.
  * --------------------------------------------------------------------------- */

  function initMap () {
    if ($('#map').length) {
      let map_provider = $('#map-provider').val();
      let lat = $('#map-lat').val();
      let lng = $('#map-lng').val();
      let zoom = parseInt($('#map-zoom').val());
      let address = $('#map-dir').val();
      let api_key = $('#map-api-key').val();

      if ( map_provider == 1 ) {
        let map = new GMaps({
          div: '#map',
          lat: lat,
          lng: lng,
          zoom: zoom,
          zoomControl: true,
          zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
          },
          panControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          overviewMapControl: false,
          scrollwheel: true,
          draggable: true
        });

        map.addMarker({
          lat: lat,
          lng: lng,
          click: function (e) {
            let url = 'https://www.google.com/maps/place/' + encodeURIComponent(address) + '/@' + lat + ',' + lng +'/';
            window.open(url, '_blank')
          },
          title: address
        })
      } else {
          let map = new L.map('map').setView([lat, lng], zoom);
          if ( map_provider == 3 && api_key.length ) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
              maxZoom: 18,
              id: 'mapbox.streets',
              accessToken: api_key
            }).addTo(map);
          } else {
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
          }
          let marker = L.marker([lat, lng]).addTo(map);
          let url = lat + ',' + lng +'#map='+ zoom +'/'+ lat +'/'+ lng +'&layers=N';
          marker.bindPopup(address + '<p><a href="https://www.openstreetmap.org/directions?engine=osrm_car&route='+ url +'">Routing via OpenStreetMap</a></p>');
      }
    }
  }

  /* ---------------------------------------------------------------------------
   * GitHub API.
   * --------------------------------------------------------------------------- */

  function printLatestRelease(selector, repo) {
    $.getJSON('https://api.github.com/repos/' + repo + '/tags').done(function (json) {
      let release = json[0];
      $(selector).append(release.name);
    }).fail(function( jqxhr, textStatus, error ) {
      let err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
  }

  /* ---------------------------------------------------------------------------
   * On window load.
   * --------------------------------------------------------------------------- */

  $(window).on('load', function() {
    if (window.location.hash) {
      // When accessing homepage from another page and `#top` hash is set, show top of page (no hash).
      if (window.location.hash == "#top") {
        window.location.hash = ""
      } else if (!$('.projects-container').length) {
        // If URL contains a hash and there are no dynamically loaded images on the page,
        // immediately scroll to target ID taking into account responsive offset.
        // Otherwise, wait for `imagesLoaded()` to complete before scrolling to hash to prevent scrolling to wrong
        // location.
        scrollToAnchor();
      }
    }

    // Initialize Scrollspy.
    let $body = $('body');
    $body.scrollspy({offset: navbar_offset });

    // Call `fixScrollspy` when window is resized.
    let resizeTimer;
    $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fixScrollspy, 200);
    });

    // Filter projects.
    $('.projects-container').each(function(index, container) {
      let $container = $(container);
      let $section = $container.closest('section');
      let layout = 'masonry';
      if ($section.find('.isotope').hasClass('js-layout-row')) {
        layout = 'fitRows';
      }

      $container.imagesLoaded(function() {
        // Initialize Isotope after all images have loaded.
        $container.isotope({
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: $section.find('.default-project-filter').text()
        });

        // Filter items when filter link is clicked.
        $section.find('.project-filters a').click(function() {
          let selector = $(this).attr('data-filter');
          $container.isotope({filter: selector});
          $(this).removeClass('active').addClass('active').siblings().removeClass('active all');
          return false;
        });

        // If window hash is set, scroll to hash.
        // Placing this within `imagesLoaded` prevents scrolling to the wrong location due to dynamic image loading
        // affecting page layout and position of the target anchor ID.
        // Note: If there are multiple project widgets on a page, ideally only perform this once after images
        // from *all* project widgets have finished loading.
        if (window.location.hash) {
          scrollToAnchor();
        }
      });
    });

    // Enable publication filter for publication index page.
    if ($('.pub-filters-select')) {
      filter_publications();
      // Useful for changing hash manually (e.g. in development):
      // window.addEventListener('hashchange', filter_publications, false);
    }

    // Load citation modal on 'Cite' click.
    $('.js-cite-modal').click(function(e) {
      e.preventDefault();
      let filename = $(this).attr('data-filename');
      let modal = $('#modal');
      modal.find('.modal-body code').load( filename , function( response, status, xhr ) {
        if ( status == 'error' ) {
          let msg = "Error: ";
          $('#modal-error').html( msg + xhr.status + " " + xhr.statusText );
        } else {
          $('.js-download-cite').attr('href', filename);
        }
      });
      modal.modal('show');
    });

    // Copy citation text on 'Copy' click.
    $('.js-copy-cite').click(function(e) {
      e.preventDefault();
      // Get selection.
      let range = document.createRange();
      let code_node = document.querySelector('#modal .modal-body');
      range.selectNode(code_node);
      window.getSelection().addRange(range);
      try {
        // Execute the copy command.
        document.execCommand('copy');
      } catch(e) {
        console.log('Error: citation copy failed.');
      }
      // Remove selection.
      window.getSelection().removeRange(range);
    });

    // Initialise Google Maps if necessary.
    initMap();

    // Fix Hugo's inbuilt Table of Contents.
    $('#TableOfContents > ul > li > ul').unwrap().unwrap();

    // Print latest Academic version if necessary.
    if ($('#academic-release').length > 0)
      printLatestRelease('#academic-release', $('#academic-release').data('repo'));
  });

})(jQuery);
