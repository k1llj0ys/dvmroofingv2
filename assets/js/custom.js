jQuery( document ).ready(function( $ ) {


	"use strict";
	
	// Disable submit button by default
	$('form .schedule-btn').prop('disabled', true).addClass('disabled-btn');
	
	// Function to validate email
	function validateEmail(email) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}
	
	// Function to validate phone number
	function validatePhone(phone) {
		const phoneRegex = /^(\+?1[\s-]?)?(\([0-9]{3}\)|[0-9]{3})[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
		return phoneRegex.test(phone);
	}
	
	// Function to check if all form fields are valid
	function checkFormValidity() {
		const form = $('form');
		const firstName = form.find('input[name="firstname"]').val().trim();
		const lastName = form.find('input[name="lastname"]').val().trim();
		const email = form.find('input[name="email"]').val().trim();
		const phone = form.find('input[name="phone"]').val().trim();
		const captchaChecked = $('#captcha-check').is(':checked');
		const termsChecked = $('#terms-check').is(':checked');
		
		const isEmailValid = validateEmail(email);
		const isPhoneValid = validatePhone(phone);
		
		// Enable submit button only if all fields are valid and checkboxes are checked
		if (firstName && lastName && isEmailValid && isPhoneValid && captchaChecked && termsChecked) {
			$('form .schedule-btn').prop('disabled', false).removeClass('disabled-btn');
		} else {
			$('form .schedule-btn').prop('disabled', true).addClass('disabled-btn');
		}
		
		return {
			isEmailValid: isEmailValid,
			isPhoneValid: isPhoneValid
		};
	}
	
	// Email validation
	$('input[name="email"]').on('input', function() {
		const email = $(this).val().trim();
		const isValid = validateEmail(email);
		
		// Update validation UI
		if (email && !isValid) {
			$(this).addClass('invalid-input');
			if (!$(this).siblings('.input-help').length) {
				$(this).after('<small class="input-help">Please enter a valid email address</small>');
			}
			$(this).siblings('.input-help').addClass('error-text');
		} else {
			$(this).removeClass('invalid-input');
			$(this).siblings('.input-help').removeClass('error-text');
		}
		
		checkFormValidity();
	});
	
	// Phone number formatting and validation
	$('input[name="phone"]').on('input', function() {
		// Get input value and remove all non-digit characters
		let input = $(this).val().replace(/\D/g, '');
		
		// Format the phone number as user types
		let formatted = '';
		if (input.length > 0) {
			// Handle country code if present
			if (input.length > 10 && input.charAt(0) === '1') {
				formatted = '1-';
				input = input.substring(1);
			}
			
			// Format the area code
			if (input.length > 0) {
				formatted += input.length > 3 ? '(' + input.substring(0, 3) + ') ' : '(' + input.substring(0, input.length);
			}
			
			// Format the exchange code
			if (input.length > 3) {
				formatted += input.length > 6 ? input.substring(3, 6) + '-' : input.substring(3, input.length);
			}
			
			// Format the line number
			if (input.length > 6) {
				formatted += input.substring(6, Math.min(10, input.length));
			}
		}
		
		// Update the input value with formatted number
		$(this).val(formatted);
		
		// Validate the phone number
		const isValid = validatePhone(formatted);
		
		// Update validation UI
		if (formatted && !isValid) {
			$(this).addClass('invalid-input');
			$(this).siblings('.input-help').addClass('error-text');
		} else {
			$(this).removeClass('invalid-input');
			$(this).siblings('.input-help').removeClass('error-text');
		}
		
		checkFormValidity();
	});
	
	// Monitor other form fields and checkboxes
	$('input[name="firstname"], input[name="lastname"]').on('input', checkFormValidity);
	$('#captcha-check, #terms-check').on('change', checkFormValidity);
	
	// Form validation before submit
	$('form').on('submit', function(e) {
		const validity = checkFormValidity();
		
		if (!validity.isPhoneValid || !validity.isEmailValid) {
			e.preventDefault();
			
			if (!validity.isPhoneValid) {
				const phoneInput = $(this).find('input[name="phone"]');
				phoneInput.addClass('invalid-input');
				phoneInput.siblings('.input-help').addClass('error-text');
				phoneInput.focus();
			} else if (!validity.isEmailValid) {
				const emailInput = $(this).find('input[name="email"]');
				emailInput.addClass('invalid-input');
				emailInput.siblings('.input-help').addClass('error-text');
				emailInput.focus();
			}
		}
	});


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
            
            // FAQ Tabs functionality
            $('.faq-tab-item').on('click', function() {
                const tabId = $(this).data('tab');
                
                // Remove active class from all tabs and content
                $('.faq-tab-item').removeClass('active');
                $('.faq-content-item').removeClass('active');
                
                // Add active class to clicked tab and corresponding content
                $(this).addClass('active');
                $('#' + tabId).addClass('active');
            });
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
