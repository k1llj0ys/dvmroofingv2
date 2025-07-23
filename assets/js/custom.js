jQuery( document ).ready(function( $ ) {


	"use strict";


    // Initialize logo visibility based on scroll position
    function initLogoVisibility() {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();
        
        if (scroll >= box - header) {
            $(".logo-white").hide();
            $(".logo-color").show();
        } else {
            $(".logo-white").show();
            $(".logo-color").hide();
        }
    }
    
    // Call on page load
    initLogoVisibility();
    
        $(function() {
            $( "#tabs" ).tabs();
        });


        // Page loading animation

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });       

        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var box = $('.header-text').height();
          var header = $('header').height();

          if (scroll >= box - header) {
            $("header").addClass("background-header");
            $(".logo-white").hide();
            $(".logo-color").show();
          } else {
            $("header").removeClass("background-header");
            $(".logo-white").show();
            $(".logo-color").hide();
          }
          
          // Set active menu item based on scroll position
          setActiveMenuItemOnScroll();
        });
        
        // Function to set active menu item based on scroll position
        function setActiveMenuItemOnScroll() {
          var scrollPosition = $(window).scrollTop() + 200; // Adding offset to improve detection
          var navLinks = $('.navbar-nav .nav-link');
          var currentSection = '';
          
          // Remove current class from all navigation links
          navLinks.removeClass('current');
          
          // Check each section
          navLinks.each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            var sectionId = currLink.attr("href").substring(1); // Remove the # from href
            
            // Skip if the reference element doesn't exist
            if(refElement.length === 0) return;
            
            // Check if the current scroll position is within this section
            if (refElement.position().top <= scrollPosition && 
                refElement.position().top + refElement.height() > scrollPosition) {
              navLinks.removeClass("current");
              currLink.addClass("current");
              currentSection = sectionId;
            }
          });
          
          // Special case for home/top section when at the very top of the page
          if(scrollPosition < 200) {
            navLinks.removeClass("current");
            $('.navbar-nav .nav-link[href="#top"]').addClass("current");
            currentSection = 'top';
          }
          
          // Update body data attribute for section-specific styling
          $('body').attr('data-section', currentSection);
        }
        
		if ($('.owl-testimonials').length) {
            $('.owl-testimonials').owlCarousel({
                loop: true,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                dots: true,
                dotsEach: true,
                items: 3,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    },
                    460: {
                        items: 1,
                        margin: 0,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    },
                    576: {
                        items: 2,
                        margin: 20,
                        nav: true
                    },
                    992: {
                        items: 3,
                        margin: 30,
                        nav: true
                    }
                }
            });
        }
        
        // Using the same owl carousel properties for all carousels
        if ($('.owl-faq').length) {
            $('.owl-faq').owlCarousel({
                loop: true,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                dots: true,
                dotsEach: true,
                items: 1,
                margin: 20,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    },
                    460: {
                        items: 1,
                        margin: 10,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    }
                }
            });
        }
        if ($('.owl-services').length) {
            $('.owl-services').owlCarousel({
                loop: true,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                dots: true,
                dotsEach: true,
                items: 3,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    },
                    460: {
                        items: 1,
                        margin: 0,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    },
                    576: {
                        items: 2,
                        margin: 20,
                        nav: true
                    },
                    992: {
                        items: 3,
                        margin: 30,
                        nav: true
                    }
                }
            });
        }
        
        if ($('.owl-partners').length) {
            $('.owl-partners').owlCarousel({
                loop: true,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                dots: true,
                dotsEach: true,
                items: 3,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    },
                    460: {
                        items: 1,
                        margin: 0,
                        dots: true,
                        dotsEach: true,
                        nav: true
                    },
                    576: {
                        items: 2,
                        margin: 20,
                        nav: true
                    },
                    992: {
                        items: 3,
                        margin: 30,
                        nav: true
                    }
                }
            });
        }

        // Slider removed and replaced with static banner

        function visible(partial) {
            var $t = partial,
                $w = jQuery(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

        }

        $(window).scroll(function(){

          if(visible($('.count-digit')))
            {
              if($('.count-digit').hasClass('counter-loaded')) return;
              $('.count-digit').addClass('counter-loaded');
              
        $('.count-digit').each(function () {
          var $this = $(this);
          jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.Counter));
            }
          });
        });
        }
    })
 
});
