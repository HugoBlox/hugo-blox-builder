/*************************************************
 *  Hugo Academic: an academic theme for Hugo.
 *  https://github.com/gcushen/hugo-academic
 **************************************************/

(function($){

  /* ---------------------------------------------------------------------------
   * Add smooth scrolling to all links inside the main navbar.
   * --------------------------------------------------------------------------- */

  $("#navbar-main li.nav-item a").on('click', function(event){

    var hash = this.hash;

    if( hash && $(hash).length && ($("#homepage").length > 0)) {
      // Prevent default click behavior
      event.preventDefault();

      var navbarHeight = $('.navbar-header').innerHeight();

      // Use jQuery's animate() method for smooth page scrolling.
      // The numerical parameter specifies the time (ms) taken to scroll to the specified hash.
      $('html, body').animate({
        scrollTop: $(hash).offset().top - navbarHeight
      }, 800, function () {
        // Add hash (#) to URL once finished scrolling to hash position
        window.location.hash = hash;
      });
    }
  });

  /* ---------------------------------------------------------------------------
   * Smooth scrolling for mouse wheel.
   * --------------------------------------------------------------------------- */

  function smoothScroll(scrollTime, scrollDistance){

    if (navigator.userAgent.indexOf('Mac') != -1 || navigator.userAgent.indexOf('Firefox') > -1 || jQuery('body').hasClass('is-horizontal')) {
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

  $(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
      $(this).collapse('hide');
    }
  });

  /* --------------------------------------------------------------------------------------------------------------------------
   * On Window Load.
   * ----------------------------------------------------------------------------------------------------------------------- */

  $(window).load(function(){

    // Enable smooth scrolling with mouse wheel
    smoothScroll(1.3, 220);

  });

})(jQuery);
