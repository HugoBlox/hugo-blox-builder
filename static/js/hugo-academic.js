/*************************************************
 *  Hugo Academic: an academic theme for Hugo.
 *  https://github.com/gcushen/hugo-academic
 **************************************************/

(function($){

  /* ---------------------------------------------------------------------------
   * Add smooth scrolling to all links inside the main navbar.
   * --------------------------------------------------------------------------- */

  $('#navbar-main li.nav-item a').on('click', function(event){

    // Store requested URL hash.
    var hash = this.hash;

    // If we are on the homepage and the navigation bar link is to a homepage section.
    if( hash && $(hash).length && ($("#homepage").length > 0)){
      // Prevent default click behavior
      event.preventDefault();

      var navbarHeight = $('.navbar-header').innerHeight();

      // Use jQuery's animate() method for smooth page scrolling.
      // The numerical parameter specifies the time (ms) taken to scroll to the specified hash.
      $('html, body').animate({
        scrollTop: $(hash).offset().top - navbarHeight
      }, 800, function () {
        // Add hash (#) to URL once finished scrolling to hash position
        if (hash == "#top"){
          window.location.hash = ""
        }else {
          window.location.hash = hash;
        }
      });
    }
  });

  /* ---------------------------------------------------------------------------
   * Smooth scrolling for Back To Top link.
   * --------------------------------------------------------------------------- */

  $('#back_to_top').on('click', function(event){
    event.preventDefault();

    $('html, body').animate({
      'scrollTop': 0
    }, 800, function(){
      window.location.hash = ""
    });
  });

  /* ---------------------------------------------------------------------------
   * Smooth scrolling for mouse wheel.
   * --------------------------------------------------------------------------- */

  function smoothScroll(scrollTime, scrollDistance){

    if (navigator.userAgent.indexOf('Mac') != -1 || navigator.userAgent.indexOf('Firefox') > -1 || jQuery('body').hasClass('is-horizontal')){
      return;
    }

    jQuery(window).on("mousewheel DOMMouseScroll", function(event){

      event.preventDefault();

      var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
      var scrollTop = jQuery(window).scrollTop();
      var finalScroll = scrollTop - parseInt(delta*scrollDistance);

      TweenMax.to(jQuery(window), scrollTime, {
        scrollTo : { y: finalScroll, autoKill:true },
        ease: Expo.easeOut,
        autoKill: true,
        overwrite: 5
      });

    });

  }

  /* ---------------------------------------------------------------------------
   * Hide mobile collapsable menu on clicking a link.
   * --------------------------------------------------------------------------- */

  $(document).on('click','.navbar-collapse.in',function(e){
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ){
      $(this).collapse('hide');
    }
  });

  /* ---------------------------------------------------------------------------
   * Filter projects.
   * --------------------------------------------------------------------------- */

  var $grid_projects = $('#container-projects');
  $grid_projects.imagesLoaded(function () {
    // Initialize Isotope after all images have loaded.
    $grid_projects.isotope({
      itemSelector: '.isotope-item',
      layoutMode: 'masonry'
    });

    // Filter items when filter link is clicked.
    $('#filters a').click(function () {
     var selector = $(this).attr('data-filter');
      $grid_projects.isotope({filter: selector});
     $(this).removeClass('active').addClass('active').siblings().removeClass('active all');
     return false;
     });
  });

  /* ---------------------------------------------------------------------------
   * Filter publications.
   * --------------------------------------------------------------------------- */

  var $grid_pubs = $('#container-publications');
  $grid_pubs.isotope({
    itemSelector: '.isotope-item',
    percentPosition: true,
    masonry: {
      // Use Bootstrap compatible grid layout.
      columnWidth: '.grid-sizer'
    }
  });

  // Bind publication filter on dropdown change.
  $('.pub-filters-select').on( 'change', function() {
    // Get filter value from option value.
    var filterValue = this.value;
    // Apply filter to Isotope.
    $grid_pubs.isotope({ filter: filterValue });

    // Set hash URL to current filter.
    var url = $(this).val();
    if (url.substr(0, 9) == '.pubtype-') {
      window.location.hash = url.substr(9);
    } else {
      window.location.hash = '';
    }
  });

  // Filter publications according to hash in URL.
  function filter_publications() {
    var urlHash = window.location.hash.replace('#','');
    var filterValue = '*';

    // Check if hash is numeric.
    if (urlHash != '' && !isNaN(urlHash)) {
      filterValue = '.pubtype-' + urlHash;
    }

    $('.pub-filters-select').val(filterValue);
    $grid_pubs.isotope({ filter: filterValue });
  }

  /* ---------------------------------------------------------------------------
   * On window load.
   * --------------------------------------------------------------------------- */

  $(window).load(function(){

    // When accessing publication index, enable filtering.
    if ($('.pub-filters-select')) {
      filter_publications();

      // Useful for changing hash manually (e.g. in development):
      // window.addEventListener('hashchange', filter_publications, false);
    }

    // Enable smooth scrolling with mouse wheel
    smoothScroll(1.3, 220);

    // When accessing homepage from another page and `#top` hash is set, show top of page (no hash).
    if (window.location.hash == "#top") {
      window.location.hash = ""
    }

    // Initialize Scrollspy.
    var $body = $('body');
    var $navbar = $('.navbar-header');
    var navbar_offset = $navbar.innerHeight() + 1;
    $body.scrollspy({offset: navbar_offset });

    // Make Scrollspy responsive.
    function fixScrollspy() {
      var data = $body.data('bs.scrollspy');
      if (data) {
        navbar_offset = $navbar.innerHeight() + 1;
        data.options.offset = navbar_offset;
        $body.data('bs.scrollspy', data);
        $body.scrollspy('refresh');
      }
    }

    // Call `fixScrollspy` when window is resized.
    var resizeTimer;
    $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fixScrollspy, 200);
    });

  });

})(jQuery);
