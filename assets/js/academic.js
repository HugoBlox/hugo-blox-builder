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

  // Dynamically get responsive navigation bar height for offsetting Scrollspy.
  function getNavBarHeight() {
    let $navbar = $('#navbar-main');
    let $navbar_collapse_show = $('#navbar-main .navbar-collapse.collapse.show');
    let navbar_offset = $navbar.innerHeight();
    if ($navbar_collapse_show.length){
      navbar_offset -= $navbar_collapse_show.innerHeight();
    }
    console.debug('Navbar height: ' + navbar_offset);
    return navbar_offset;
  }

  /**
   * Responsive hash scrolling.
   * Check for a URL hash as an anchor.
   * If it exists on current page, scroll to it responsively.
   * If `target` argument omitted (e.g. after event), assume it's the window's hash.
   */
  function scrollToAnchor(target) {
    // If `target` is undefined or HashChangeEvent object, set it to window's hash.
    // Decode the hash as browsers can encode non-ASCII characters (e.g. Chinese symbols).
    target = (typeof target === 'undefined' || typeof target === 'object') ? decodeURIComponent(window.location.hash) : target;

    // If target element exists, scroll to it taking into account fixed navigation bar offset.
    if($(target).length) {
      // Escape special chars from IDs, such as colons found in Markdown footnote links.
      target = '#' + $.escapeSelector(target.substring(1));  // Previously, `target = target.replace(/:/g, '\\:');`

      let elementOffset = Math.ceil($(target).offset().top - getNavBarHeight());  // Round up to highlight right ID!
      $('body').addClass('scrolling');
      $('html, body').animate({
        scrollTop: elementOffset
      }, 600, function () {
        $('body').removeClass('scrolling');
      });
    }else{
      console.debug('Cannot scroll to target `#'+target+'`. ID not found!');
    }
  }

  // Make Scrollspy responsive.
  function fixScrollspy() {
    let $body = $('body');
    let data = $body.data('bs.scrollspy');
    if (data) {
      data._config.offset = getNavBarHeight();
      $body.data('bs.scrollspy', data);
      $body.scrollspy('refresh');
    }
  }

  function removeQueryParamsFromUrl() {
    if (window.history.replaceState) {
      let urlWithoutSearchParams = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
      window.history.replaceState({path:urlWithoutSearchParams}, '', urlWithoutSearchParams);
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

    // If we are on a widget page and the navbar link is to a section on the same page.
    if ( this.pathname === window.location.pathname && hash && $(hash).length && ($(".js-widget-page").length > 0)) {
      // Prevent default click behavior.
      event.preventDefault();

      // Use jQuery's animate() method for smooth page scrolling.
      // The numerical parameter specifies the time (ms) taken to scroll to the specified hash.
      let elementOffset = Math.ceil($(hash).offset().top - getNavBarHeight());  // Round up to highlight right ID!

      // Uncomment to debug.
      // let scrollTop = $(window).scrollTop();
      // let scrollDelta = (elementOffset - scrollTop);
      // console.debug('Scroll Delta: ' + scrollDelta);

      $('html, body').animate({
        scrollTop: elementOffset
      }, 800);
    }
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

  // Active publication filters.
  let pubFilters = {};

  // Search term.
  let searchRegex;

  // Filter values (concatenated).
  let filterValues;

  // Publication container.
  let $grid_pubs = $('#container-publications');

  // Initialise Isotope.
  $grid_pubs.isotope({
    itemSelector: '.isotope-item',
    percentPosition: true,
    masonry: {
      // Use Bootstrap compatible grid layout.
      columnWidth: '.grid-sizer'
    },
    filter: function() {
      let $this = $(this);
      let searchResults = searchRegex ? $this.text().match( searchRegex ) : true;
      let filterResults = filterValues ? $this.is( filterValues ) : true;
      return searchResults && filterResults;
    }
  });

  // Filter by search term.
  let $quickSearch = $('.filter-search').keyup( debounce( function() {
    searchRegex = new RegExp( $quickSearch.val(), 'gi' );
    $grid_pubs.isotope();
  }) );

  // Debounce input to prevent spamming filter requests.
  function debounce( fn, threshold ) {
    let timeout;
    threshold = threshold || 100;
    return function debounced() {
      clearTimeout( timeout );
      let args = arguments;
      let _this = this;
      function delayed() {
        fn.apply( _this, args );
      }
      timeout = setTimeout( delayed, threshold );
    };
  }

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
    filterValues = concatValues( pubFilters );

    // Activate filters.
    $grid_pubs.isotope();

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
    filterValues = concatValues( pubFilters );

    // Activate filters.
    $grid_pubs.isotope();

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
      $(selector).append(' '+release.name);
    }).fail(function( jqxhr, textStatus, error ) {
      let err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
  }

  /* ---------------------------------------------------------------------------
  * Toggle search dialog.
  * --------------------------------------------------------------------------- */

  function toggleSearchDialog() {
    if ($('body').hasClass('searching')) {
      // Clear search query and hide search modal.
      $('[id=search-query]').blur();
      $('body').removeClass('searching compensate-for-scrollbar');

      // Remove search query params from URL as user has finished searching.
      removeQueryParamsFromUrl();

      // Prevent fixed positioned elements (e.g. navbar) moving due to scrollbars.
      $('#fancybox-style-noscroll').remove();
    } else {
      // Prevent fixed positioned elements (e.g. navbar) moving due to scrollbars.
      if ( !$('#fancybox-style-noscroll').length && document.body.scrollHeight > window.innerHeight ) {
        $('head').append(
          '<style id="fancybox-style-noscroll">.compensate-for-scrollbar{margin-right:' +
          (window.innerWidth - document.documentElement.clientWidth) +
          'px;}</style>'
        );
        $('body').addClass('compensate-for-scrollbar');
      }

      // Show search modal.
      $('body').addClass('searching');
      $('.search-results').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 200);
      $('#search-query').focus();
    }
  }

  /* ---------------------------------------------------------------------------
  * Toggle day/night mode.
  * --------------------------------------------------------------------------- */

  function toggleDarkMode(codeHlEnabled, codeHlLight, codeHlDark, diagramEnabled) {
    if ($('body').hasClass('dark')) {
      $('body').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 500);
      $('body').removeClass('dark');
      if (codeHlEnabled) {
        codeHlLight.disabled = false;
        codeHlDark.disabled = true;
      }
      $('.js-dark-toggle i').removeClass('fa-sun').addClass('fa-moon');
      localStorage.setItem('dark_mode', '0');
      if (diagramEnabled) {
        // TODO: Investigate Mermaid.js approach to re-render diagrams with new theme without reloading.
        location.reload();
      }
    } else {
      $('body').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 500);
      $('body').addClass('dark');
      if (codeHlEnabled) {
        codeHlLight.disabled = true;
        codeHlDark.disabled = false;
      }
      $('.js-dark-toggle i').removeClass('fa-moon').addClass('fa-sun');
      localStorage.setItem('dark_mode', '1');
      if (diagramEnabled) {
        // TODO: Investigate Mermaid.js approach to re-render diagrams with new theme without reloading.
        location.reload();
      }
    }
  }

  /* ---------------------------------------------------------------------------
  * Normalize Bootstrap Carousel Slide Heights.
  * --------------------------------------------------------------------------- */

  function normalizeCarouselSlideHeights() {
    $('.carousel').each(function(){
      // Get carousel slides.
      let items = $('.carousel-item', this);
      // Reset all slide heights.
      items.css('min-height', 0);
      // Normalize all slide heights.
      let maxHeight = Math.max.apply(null, items.map(function(){return $(this).outerHeight()}).get());
      items.css('min-height', maxHeight + 'px');
    })
  }

  /* ---------------------------------------------------------------------------
   * On document ready.
   * --------------------------------------------------------------------------- */

  $(document).ready(function() {
    // Fix Hugo's auto-generated Table of Contents.
    //   Must be performed prior to initializing ScrollSpy.
    $('#TableOfContents > ul > li > ul').unwrap().unwrap();
    $('#TableOfContents').addClass('nav flex-column');
    $('#TableOfContents li').addClass('nav-item');
    $('#TableOfContents li a').addClass('nav-link');

    // Fix Mmark task lists (remove bullet points).
    $("input[type='checkbox'][disabled]").parents('ul').addClass('task-list');

    // Fix Mermaid.js clash with Highlight.js.
    let mermaids = [];
    [].push.apply(mermaids, document.getElementsByClassName('language-mermaid'));
    for (i = 0; i < mermaids.length; i++) {
      $(mermaids[i]).unwrap('pre');  // Remove <pre> wrapper.
      $(mermaids[i]).replaceWith(function(){
        // Convert <code> block to <div> and add `mermaid` class so that Mermaid will parse it.
        return $("<div />").append($(this).contents()).addClass('mermaid');
      });
    }

    // Get theme variation (day/night).
    let defaultThemeVariation;
    if ($('body').hasClass('dark')) {
      // The `color_theme` of the site is dark.
      defaultThemeVariation = 1;
    } else if ($('.js-dark-toggle').length && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // The visitor prefers dark themes and switching to the dark variation is allowed by admin.
      defaultThemeVariation = 1;
    } else {
      // Default to day (light) theme.
      defaultThemeVariation = 0;
    }
    let dark_mode = parseInt(localStorage.getItem('dark_mode') || defaultThemeVariation);

    // Is code highlighting enabled in site config?
    const codeHlEnabled = $('link[title=hl-light]').length > 0;
    const codeHlLight = $('link[title=hl-light]')[0];
    const codeHlDark = $('link[title=hl-dark]')[0];
    const diagramEnabled = $('script[title=mermaid]').length > 0;

    if (dark_mode) {
      $('body').addClass('dark');
      if (codeHlEnabled) {
        codeHlLight.disabled = true;
        codeHlDark.disabled = false;
      }
      if (diagramEnabled) {
        mermaid.initialize({ theme: 'dark' });
      }
      $('.js-dark-toggle i').removeClass('fa-moon').addClass('fa-sun');
    } else {
      $('body').removeClass('dark');
      if (codeHlEnabled) {
        codeHlLight.disabled = false;
        codeHlDark.disabled = true;
      }
      if (diagramEnabled) {
        mermaid.initialize({ theme: 'default' });
      }
      $('.js-dark-toggle i').removeClass('fa-sun').addClass('fa-moon');
    }

    // Toggle day/night mode.
    $('.js-dark-toggle').click(function(e) {
      e.preventDefault();
      toggleDarkMode(codeHlEnabled, codeHlLight, codeHlDark, diagramEnabled);
    });
  });

  /* ---------------------------------------------------------------------------
   * On window loaded.
   * --------------------------------------------------------------------------- */

  $(window).on('load', function() {
    // Re-initialize Scrollspy with dynamic navbar height offset.
    fixScrollspy();

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
      let layout;
      if ($section.find('.isotope').hasClass('js-layout-row')) {
        layout = 'fitRows';
      } else {
        layout = 'masonry';
      }

      $container.imagesLoaded(function() {
        // Initialize Isotope after all images have loaded.
        $container.isotope({
          itemSelector: '.isotope-item',
          layoutMode: layout,
          masonry: {
            gutter: 20
          },
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

    // Scroll to top of page.
    $('.back-to-top').click( function(event) {
      event.preventDefault();
      $('html, body').animate({
        'scrollTop': 0
      }, 800, function() {
        window.location.hash = "";
      });
    });

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

    // Print latest version of GitHub projects.
    let githubReleaseSelector = '.js-github-release';
    if ($(githubReleaseSelector).length > 0)
      printLatestRelease(githubReleaseSelector, $(githubReleaseSelector).data('repo'));

    // On search icon click toggle search dialog.
    $('.js-search').click(function(e) {
      e.preventDefault();
      toggleSearchDialog();
    });
    $(document).on('keydown', function(e){
      if (e.which == 27) {
        // `Esc` key pressed.
        if ($('body').hasClass('searching')) {
          toggleSearchDialog();
        }
      } else if (e.which == 191 && e.shiftKey == false && !$('input,textarea').is(':focus')) {
        // `/` key pressed outside of text input.
        e.preventDefault();
        toggleSearchDialog();
      }
    });

  });

  // Normalize Bootstrap carousel slide heights.
  $(window).on('load resize orientationchange', normalizeCarouselSlideHeights);

})(jQuery);
