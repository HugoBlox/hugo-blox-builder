/*************************************************
 *  Academic: the personal website framework for Hugo.
 *  https://github.com/gcushen/hugo-academic
 **************************************************/

(function($){

  /* ---------------------------------------------------------------------------
   * Add smooth scrolling to all links
   * --------------------------------------------------------------------------- */

  function scrollToAnchor(event, hash) {
    if (hash) {
      // Escape colons from IDs, such as those found in Markdown footnote links.
      hash = hash.replace(/:/g, '\\:');

      if ( $(hash).length ) { //if target exists
        if (event) {
          event.preventDefault();
        }

        $('html, body').stop().animate({
          scrollTop: $(hash).offset().top - get_navbar_offset()
        }, 800);

        window.location.hash = "";
      }
    }
  }

  $('a').on('click', function(event) {
    let hash = this.hash;
    scrollToAnchor(event, hash);
  });

  function get_navbar_offset() {
    if ($('#top.body-fixed-nav').length) {//we're on a page where navbar is fixed
      return $('.navbar-header').outerHeight();
    } else {
      return 0; //no adjustment needed when nav is not fixed
    }
  }


  /* ---------------------------------------------------------------------------
   * Hide mobile collapsable menu on most clicks
   * --------------------------------------------------------------------------- */

  let menuExpanded = false;
  $(document).on('click', function(e) {
    let $button = $(".navbar-toggle.collapsed");
    if ( containsOrIs($button, e.target) ) { //if clicked on the Nav Button
      if ( menuExpanded ) {
        $button.blur();
        collapseNav(true);
      } else {
        expandNav();
      }
      
    } else if ( menuExpanded ) { //if did not click the nav button, check if we need to collapse the navMenu      
      if ( containsOrIs($('.navbar-collapse'), e.target) ) { //if clicked in navMenu
        let $eltClicked = $(e.target).is('a') ? $(e.target) : $(e.target).parent();
        if ( $eltClicked.is('a') ) { //collapse only if click follows a link
          collapseNav(false);
        }
      } else { //always collapse if clicked outside the navMenu
        collapseNav(false);
      }
    }
  });

  //helper functions for above
  let navClassRemoveTimer;
  function collapseNav(clickedOnButton) {
    if(!clickedOnButton) {
      $('.navbar-collapse').collapse('hide');
    }
    clearTimeout(navClassRemoveTimer);
    navClassRemoveTimer = setTimeout(function() { //don't remove the class until a little after the animation is done
      $('#navbar-main').removeClass('navbar-fixed-top'); 
      $('body').removeClass('body-add-margin');
    }, 350 );
    menuExpanded = false;
  }

  function expandNav() {
    clearTimeout(navClassRemoveTimer);
    $('#navbar-main').addClass('navbar-fixed-top'); //this css fixes the navbar in place, so it displays correctly when bootstrap expands it.
    $('body').addClass('body-add-margin');
    menuExpanded = true;
  }

  function containsOrIs(container,target) {
    return (container.length > 0) && ($.contains(container[0],target) || container.is(target));
  }


  /* ---------------------------------------------------------------------------
   * Filter projects.
   * --------------------------------------------------------------------------- */

  let $grid_projects = $('#container-projects');
  $grid_projects.imagesLoaded(function () {
    // Initialize Isotope after all images have loaded.
    $grid_projects.isotope({
      itemSelector: '.isotope-item',
      layoutMode: 'masonry',
      filter: $('#default-project-filter').text()
    });

    // Filter items when filter link is clicked.
    $('#filters a').click(function () {
      let selector = $(this).attr('data-filter');
      $grid_projects.isotope({filter: selector});
      $(this).removeClass('active').addClass('active').siblings().removeClass('active all');
      return false;
    });
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
   * On window load.
   * --------------------------------------------------------------------------- */

  $(window).on('load', function() {
    if (window.location.hash) {
      // When accessing homepage from another page and `#top` hash is set, show top of page (no hash).
      if (window.location.hash == "#top") {
        window.location.hash = ""
      } else {
        //Adjusts scroll position if fixed navbar is covering the default scroll location
        scrollToAnchor(null,window.location.hash);
      }
    }

    // Initialize Scrollspy.
    updateScrollspy();

    // Update scrollspy when window is resized.
    let resizeTimer;
    $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateScrollspy, 200);
    });

    // Enable publication filter for publication index page.
    if ($('.pub-filters-select').length) {
      filter_publications();
      // Useful for changing hash manually (e.g. in development):
      // window.addEventListener('hashchange', filter_publications, false);
    }

  });

  function updateScrollspy() {
    let $body = $('body');
    $body.scrollspy({offset: get_navbar_offset() + 2 }); //need +2 because scrollspy calculates locations of items imprecisely.
    $body.scrollspy('refresh');
  } 

})(jQuery);
