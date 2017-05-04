// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    $(document).on('click', "a.page-scroll", function (event) {
        event.preventDefault();
        var $anchor = $(this);
        
        if (!$($anchor.attr('href')).offset())
            return;
        
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
    });
    
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    
    

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

})(jQuery); // End of use strict
