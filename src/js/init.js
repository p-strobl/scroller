

// Init lax
var updateLax = function () {
    if (!disableLaxOnScroll) {
        lax.update(window.scrollY);
    }
    window.requestAnimationFrame(updateLax);
};

$(document).ready(function() {

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementTop === viewportTop && elementBottom === viewportBottom;
        // return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    $(window).on('resize scroll', function() {
        $('video').each(function() {
            if ($(this).isInViewport()) {
                this.play();
            } else {
                this.pause();
            }
        });
    });

});

// Check if IE11 is used
if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
    console.log("IE11 Detected");
} else {
    // Get prop URL
    var url_string = window.location.href;
    var url = new URL(url_string);
    var scrollDuration = url.searchParams.get("scrollDuration") || 500;
    var disableLaxOnScroll = url.searchParams.get("disableLaxOnScroll") === 'true' || false;

    $(document).ready(function ($) {

        // init controller

        lax.setup(); // init
        window.requestAnimationFrame(updateLax);
        window.addEventListener("resize", function () {
            lax.updateElements()
        });


        // $(window).scroll(function() {
        //     $('video').each(function() {
        //         if ($(this).visible(true)) {
        //             $(this)[0].play();
        //         } else {
        //             $(this)[0].pause();
        //         }
        //     })
        // });

        // $('a[href*="#"]').on('click', function (e) {
        //     e.preventDefault();
        //     var target = this.hash;
        //     var $target = $(target);
        //     $('html, body').stop().animate({
        //         'scrollTop': $target.offset().top
        //     }, parseInt(scrollDuration), 'swing', function () {
        //         window.location.hash = target;
        //         disableLaxOnScroll = false;
        //     });
        // });


    });
}