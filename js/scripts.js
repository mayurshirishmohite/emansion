$(document).ready(function() {
    // cursor on tap
    $('input').click(function() {
        $(this).focus();
    });
    // Search action
    $('.sb-search-cta').click(function(e) {
        e.preventDefault();
        checkSearch();
    });
    // CheckSearch Function
    function checkSearch() {
        if ($('#search-form').css('display') == 'none') {
            $('#search-form').slideDown();
            $('#sb-search .fa.fa-search').hide();
            $('#nav-icon-search').show();

        } else {
            $('#search-form').slideUp();
            $('#nav-icon-search').hide();
            $('#sb-search .fa.fa-search').show();
        }
    }

    //Popover for image search UI
    var searchImgTooltip = $('.far.fa-image');
    var sbSearchInput = $(".sb-search-input");
    searchImgTooltip.tooltip({
        container: '#res_search_box',
        html: true
    });
    sbSearchInput.focus(function() {
        searchImgTooltip.tooltip('show');
    });
    sbSearchInput.blur(function() {
        searchImgTooltip.tooltip('hide');
    });

    // Humburger Menu
    $('#nav-icon').click(function() {
        hamburgerMenu();
    });

    // create active link
    $('.main-menu ul li a').click(function() {
        $('.main-menu ul li a').removeClass('active')
        $(this).addClass('active');
    });
    // sticky post field variable
    var StickyOnScroll = $('#detail_and_post,#sticky-arrow');
    var overlayMenu = $('.overlay-for-menu');

    function hamburgerMenu() {
        if ($('.main-menu').css('display') == 'none') {
            $('#nav-icon').addClass('open');
            $('nav').addClass('active');
            $('.main-menu').slideDown();
            if ($('.main-menu').css('display') !== 'none') {
                StickyOnScroll.hide();
                overlayMenu.show();
            }
        } else {
            $('#nav-icon').removeClass('open');
            $('nav').removeClass('active');
            $('.main-menu').slideUp();
            StickyOnScroll.show();
            overlayMenu.hide();
        }
    }

    // Show/Hide Property  Detail Toggle
    $('.property-view-detail-toggle').click(function(event) {
        event.preventDefault();
        if ($('#full-description').css('display') == 'none') {
            $('#full-description').slideDown();
            $(this).find('i').removeClass('fa-chevron-down');
            $(this).find('i').addClass('fa-chevron-up');
        } else {
            $('#full-description').slideUp('slow');
            $(this).find('i').removeClass('fa-chevron-up');
            $(this).find('i').addClass('fa-chevron-down');

        }
    });
    // Clap Count 
    var clapCount = $('.clap-count');
    var numClapCount = "";
    if ($('.clap-count:empty')) {
        clapCount.hide();
    }
    $(".single-thread-container a.clap-btn").click(function(event) {
        event.preventDefault();
        if ($(this).next(clapCount)) {
            if ($(this).next(clapCount).is(':hidden')) {
                $(this).next(clapCount).show().text('0');
            }
            numClapCount = parseInt($(this).next(clapCount).text());
            $(this).next(clapCount).text(numClapCount + 1);
        }

    });

    // Response form button 
    $('#res_form_button').click(function(event) {
        var response_form = $('#real_response');
        var deviceOffset = '';
        if ($(window).width() >= 320 && $(window).width() < 375) {
            deviceOffset = 230;
        } else if ($(window).width() > 320 && $(window).width() <= 375) {
            deviceOffset = 490;
        } else if ($(window).width() > 375 && $(window).width() <= 415) {
            deviceOffset = 400;
        } else if ($(window).width() <= 768 && $(window).width() > 415) {
            deviceOffset = 720;
        }
        event.preventDefault();
        if (response_form.css('display') == 'none') {
            response_form.slideDown();
            $(this).addClass('active');
            $(this).html('閉じる');
            //check if input is in visible viewport if not than slide up in viewport
            if ($(response_form).isInViewport()) {
                //move input up if its near the bottom hidden behind the sticky section
                if ($(response_form).offset().top > ($(window).scrollTop() + $(window).height() - 150)) {
                    $('html, body').animate({
                        scrollTop: response_form.offset().top - deviceOffset
                    }, 500);
                }
            } else {
                $('html, body').animate({
                    scrollTop: response_form.offset().top - 330
                }, 500);
            }
        } else {
            response_form.slideUp();
            $(this).removeClass('active');
            $(this).html('投稿する');
        }

    });
    // Generic function to check elements in viewport
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // expand textarea
    $('#real_response .fa-expand').click(function(event) {
        var textarea_input = $('#real_response_body');
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            textarea_input.addClass('expand');
        } else {
            $(this).removeClass('active');
            textarea_input.removeClass('expand');
        }
    });

    // Scroll to fixed for detail_and_post
    $(window).scroll(function() {
        var trigger_position = $(this).scrollTop() + $(this).height();
        /* console.log('Scroll top:' + $(this).scrollTop());
         console.log('This Height :' + $(this).height());*/
        var fadeinposition = $('#fadein_inquiry_position').offset().top;
        var fadeoutposition = $('#fadeout_inquiry_position').offset().top;
        var fadeinfinding_nearby = $('#fadeinfinding_nearby').offset().top;
        var fadeoutfinding_nearby = $('#fadeoutfinding_nearby').offset().top;
        var fadeoutfinding_downarrow = $('#fadeout_downarrow').offset().top;

        if (trigger_position > fadeoutposition) {
            $("#detail_and_post").fadeOut("slow");
        } else if (trigger_position < fadeinposition) {
            $("#detail_and_post").fadeOut("slow");
        } else if (trigger_position > fadeinposition) {
            if ($('.main-menu').css('display') !== 'none') {
                $("#detail_and_post").fadeOut("slow");
            } else {
                $("#detail_and_post").fadeIn("slow");
            }
        }

        if (trigger_position > fadeoutfinding_nearby) {
            $("#findingNearBy_sticky").show();
            $("#findingNearBy_sticky").removeClass('active');
            $("#findingNearBy_sticky").addClass('inactive');
        } else if (trigger_position < fadeinfinding_nearby) {
            $("#findingNearBy_sticky").show();
            $("#findingNearBy_sticky").removeClass('active');
            $("#findingNearBy_sticky").addClass('inactive');
        } else if (trigger_position > fadeinfinding_nearby) {
            $("#findingNearBy_sticky").addClass('active');
            $("#findingNearBy_sticky").removeClass('inactive');
        }
        if (trigger_position > fadeoutfinding_downarrow) {
            $("#sticky-arrow .arrow-down").hide();
            $("#sticky-arrow .arrow-up").show();
        } else if (trigger_position < fadeinposition) {
            $("#sticky-arrow .arrow-down").hide();
            $("#sticky-arrow .arrow-up").fadeIn();
        } else if (trigger_position > fadeinposition) {
            $("#sticky-arrow .arrow-down").fadeIn();
            $("#sticky-arrow .arrow-up").hide();
        }

    });
    $('#sticky-arrow a.arrow-down').click(function() {
        var downpositionY =
            $("#thread_downcontrol_position").offset().top;
        $('html,body').animate({ scrollTop: downpositionY }, 'slow');
    });
    $('#sticky-arrow a.arrow-up').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });
    //show hide sticky inputs
    $('#sticky-action-btn').click(function() {
        $(this).parent().hide();
        $('.sticky-posts').show();
    });
    $('#close-sticky-inputs').click(function() {
        $(this).parent().hide();
        $('#sticky-action-btn').parent().show();
    });

    // Trigger checkbox On Off 
    var checkBoxes = $(".rec_property .checkbox input");
    var checkbox_trigger = $(".checkbox_trigger");
    // By Default Active
    checkBoxes.prop("checked", true);
    checkboxCheckStatus();
    $(checkbox_trigger).click(function(event) {
        event.preventDefault();
        checkboxCheckStatus();
    });

    function checkboxCheckStatus() {
        if (!$(checkbox_trigger).hasClass('active')) {
            $(checkbox_trigger).addClass('active').html('全てのチェックを外す');
            checkBoxes.prop("checked", true);
        } else {
            $(checkbox_trigger).removeClass('active').html('全てにチェックを入れる');
            checkBoxes.prop("checked", false);
        }
    }

    //horizontal scroll tabs 
    $('.left-tab-arrow').hide();
    $('.right-tab-arrow').click(function() {
        event.preventDefault();
        $('.custom-nav-tabs').animate({
            scrollLeft: "+=200px"
        }, "slow", function() {
            hscrollTab();
        });
    });
    $('.left-tab-arrow').click(function() {
        event.preventDefault();
        $('.custom-nav-tabs').animate({
            scrollLeft: "-=200px"
        }, "slow", function() {
            hscrollTab();
        });
    });
    //detect user manuel scroll event triggered
    $('.custom-nav-tabs').scroll(function() {
        hscrollTab();
    });
    //function to detect HScroll bar if exists or not!
    $.fn.hasHScrollBar = function() {
        return this.get(0).scrollWidth > this.innerWidth();
    }
    if ($('.custom-nav-tabs').hasHScrollBar()) {
        $('.right-tab-arrow').fadeIn();
    } else {
        $('.right-tab-arrow,.left-tab-arrow').fadeOut();
    }
    // scroll tab function to hide and how arrows
    function hscrollTab() {
        var $elem = $('.custom-nav-tabs');
        var newScrollLeft = $elem.scrollLeft(),
            width = $elem.outerWidth(),
            scrollWidth = $elem.get(0).scrollWidth;
        if (scrollWidth - newScrollLeft == width) {
            $('.right-tab-arrow').fadeOut();
            $('.left-tab-arrow').fadeIn();
        } else {
            $('.left-tab-arrow').fadeOut();
            $('.right-tab-arrow').fadeIn();
        }
    }

});