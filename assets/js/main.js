$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
            $('.scrollup').addClass('active');
        } else {
            $('.scrollup').fadeOut();
            $('.scrollup').removeClass('active');
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    jQuery(document).on('click', '.addfavourite', function () {

        var productid = jQuery(this).attr('product-id');

        const url = 'http://localhost:3000/wishlist';
        const inputdata = {
            id: productid
        };

        postData(url, inputdata);

    });

    jQuery(document).on('click', '.addtocart', function () {

        var productid = jQuery(this).attr('product-id');
        var quantity = parseInt(jQuery(this).attr('product-qty'));

        const url = 'http://localhost:3000/cart';
        const inputdata = {
            id: productid,
            quantity: quantity
        };



        postData(url, inputdata);

    });

});

async function postData(url = '', inputdata = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(inputdata), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }
}


$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function () {
    $(".various").fancybox({
        maxWidth: 800,
        maxHeight: 600,
        fitToView: false,
        // width       : '70%',
        // height      : '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
})

$(function () {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    $('.modal').on('show.bs.modal', reposition);
    $(window).on('resize', function () {
        $('.modal:visible').each(reposition);
    });
});

// chosen section //
$(function () {
    $('.chosen-select').chosen();
});
//end//

$(document).ready(function () {
    var menu_h = $('.header_login').height();
    $('.banner-slider').css({ "marginTop": menu_h });
});

$(document).ready(function () {
    $(window).scroll(function () {
        var banner_h = $('.banner-slider').height();
        var menu_h = $('.header_login').height();
        var scroll = $(window).scrollTop();
        //alert(searh_h);
        if (scroll > banner_h) {
            $(".leftFilterSticky").addClass('active');
            $('.leftFilterSticky').css({ "top": menu_h });

            $(".sortSection").addClass('active');
            $('.sortSection').css({ "top": menu_h });

        }
        else {
            $(".leftFilterSticky").removeClass('active');
            $('.leftFilterSticky').css({ "top": "0px" });

            $(".sortSection").removeClass('active');
            $('.sortSection').css({ "top": "0px" });
        }
        if ($(window).width() < 767) {
            $(".leftFilterSticky").removeClass('active');
        }
    });
});

$('.banner-slider').owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});


$(document).ready(function () {
    $('#product-detail').eagleGallery({
        miniSliderArrowPos: 'inside',
        miniSliderArrowStyle: 2,
        changeMediumStyle: true,
        autoPlayMediumImg: true,
        openGalleryStyle: 'transform',
        bottomControlLine: true,
        theme: 'light',
        miniSlider: {
            navigation: true,
            pagination: false,
            navigationText: false,
            rewindNav: false,
            theme: 'mini-slider',
            responsiveBaseWidth: '.eagle-gallery',
            itemsCustom: [[0, 1], [250, 2], [450, 5], [650, 5], [850, 5], [1050, 6], [1250, 7], [1450, 8]],
            margin: 1
        }
    });
});


AOS.init();

$(document).ready(function () {
    $('#cartPopupOpen').on('click', function () {
        $('#cartPopup').addClass('active');
        $('.popUp-backdrop').addClass('show');
    });
    $('#cartPopupClose').on('click', function () {
        $('#cartPopup').removeClass('active');
        $('.popUp-backdrop').removeClass('show');
    });
});


$(document).ready(function () {
    $('#mobileCartPopupOpen').on('click', function () {
        $('#cartPopup').addClass('active');
        $('.popUp-backdrop').addClass('show');
    });
    $('#cartPopupClose').on('click', function () {
        $('#cartPopup').removeClass('active');
        $('.popUp-backdrop').removeClass('show');
    });
});

$(document).ready(function () {
    $('#mobileNavPopupOpen').on('click', function () {
        $('.leftFilterStickyy').addClass('active');
        $('.popUp-backdrop').addClass('show');
    });
    $('.popUp-backdrop').on('click', function () {
        $('.leftFilterStickyy').removeClass('active');
        $(this).removeClass('show');
    });
});


$(window).scroll(function () {
    var homeTop = $(window).scrollTop();
    var height = $(window).height() / 2;

    $('.header-title').css({
        'opacity': ((height - homeTop) / height)
    });
});
$(document).ready(function () {
    $('.mobileFiterOpen').on('click', function () {
        $('.leftFilterSticky').addClass('Leftactive');
        $('.popUp-backdrop').addClass('show');
    });
    $('.mobFilterClose').on('click', function () {
        $('.leftFilterSticky').removeClass('Leftactive');
        $('.popUp-backdrop').removeClass('show');
    });
});