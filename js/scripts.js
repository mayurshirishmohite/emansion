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
            $('#sb-search .fa-search,.site-description').hide();
            $('#nav-icon-search').show();

        } else {
            $('#search-form').slideUp();
            $('#nav-icon-search').hide();
            $('#sb-search .fa-search,.site-description').show();
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
			
			//Hide Filter when DD menu open
			$('.filter-opt-cont').hide();
        } else {
            $('#nav-icon').removeClass('open');
            $('nav').removeClass('active');
            $('.main-menu').slideUp();
            StickyOnScroll.show();
            overlayMenu.hide();
			//Show Filter when DD menu closed
			$('.filter-opt-cont').show();
        }

        // For Search results polyfil if menu dd is open than switch to rel pos
        if ($('nav').hasClass('active')) {
            $('html, body').animate({ scrollTop: 0 }, 1);
            $('.sticky-search-cont').css('position', 'relative');
        } else {
            $('.sticky-search-cont').css('position', 'fixed');
        }
    }

    // Show/Hide Property  Detail Toggle
    $('.property-view-detail-toggle').click(function(event) {
        event.preventDefault();
        var fullDescrition = $('#full-description');
        if ($(this).parent().next(fullDescrition).css('display') == 'none') {
            $(this).parent().next(fullDescrition).slideDown();
            $(this).find('.desc-c').hide();
            $(this).find('.desc-o').show();
            $(this).find('svg').removeClass('fa-chevron-down');
            $(this).find('svg').addClass('fa-chevron-up');
        } else {
            $(this).parent().next(fullDescrition).slideUp('slow');
            $(this).find('.desc-o').hide();
            $(this).find('.desc-c').show();
            $(this).find('svg').removeClass('fa-chevron-up');
            $(this).find('svg').addClass('fa-chevron-down');
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
        // offset based on device
        if ($(window).width() >= 320 && $(window).width() < 375) {
            deviceOffset = 230;
        } else if ($(window).width() > 320 && $(window).width() <= 375) {
            deviceOffset = 370;
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
    $('.textarea-expand').click(function(event) {
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
        //Check if elements exists before setting offset;
        var fdin_inq_pos = $('#fadein_inquiry_position');
        var fadeinposition = "";
        if (fdin_inq_pos.length) {
            fadeinposition = fdin_inq_pos.offset().top;
        }

        //Check if elements exists before setting offset;
        var fdout_inq_pos = $('#fadeout_inquiry_position');
        var fadeoutposition = "";
        if (fdout_inq_pos.length) {
            fadeoutposition = fdout_inq_pos.offset().top;
        }

        //Check if elements exists before setting offset;
        var fdin_find_nby = $('#fadeinfinding_nearby');
        var fadeinfinding_nearby = "";
        if (fdin_find_nby.length) {
            fadeinfinding_nearby = fdin_find_nby.offset().top;
        }

        //Check if elements exists before setting offset;
        var fdout_find_nby = $('#fadeoutfinding_nearby');
        var fadeoutfinding_nearby = "";
        if (fdout_find_nby.length) {
            fadeoutfinding_nearby = fdout_find_nby.offset().top;
        }

        //Check if elements exists before setting offset;
        var fdout_down_arr = $('#fadeout_downarrow');
        var fadeoutfinding_downarrow = "";
        if (fdout_down_arr.length) {
            fadeoutfinding_downarrow = fdout_down_arr.offset().top;
        }

        //Check if elements exists before setting offset;
        var fdin_price_btn = $('#fadein_price_btn');
        var fadein_price_btn = "";
        if (fdin_price_btn.length) {
            fadein_price_btn = fdin_price_btn.offset().top;
        }

        //Check if elements exists before setting offset;
        var fdout_price_btn = $('#fadeout_price_btn');
        var fadeout_price_btn = "";
        if (fdout_price_btn.length) {
            fadeout_price_btn = fdout_price_btn.offset().top;
        }

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

        if (trigger_position > fadeout_price_btn) {
            $("#pricing_tables").addClass("relative");
        } else if (trigger_position < fadein_price_btn) {
            $("#pricing_tables").fadeOut("slow").removeClass("relative");
        } else if (trigger_position > fadein_price_btn) {
            if ($('.main-menu').css('display') !== 'none') {
                $("#pricing_tables").fadeOut("slow").removeClass("relative");
            } else {
                $("#pricing_tables").fadeIn("slow").removeClass("relative");
            }
        }

        if (trigger_position > fadeoutfinding_nearby) {
            $("#findingNearBy_sticky").show().removeClass('active').addClass('inactive');
        } else if (trigger_position < fadeinfinding_nearby) {
            $("#findingNearBy_sticky").show().removeClass('active').addClass('inactive');
        } else if (trigger_position > fadeinfinding_nearby) {
            $("#findingNearBy_sticky").addClass('active').removeClass('inactive');
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

    if ($(".custom-nav-tabs").is(":visible")) {
        if ($('.custom-nav-tabs').hasHScrollBar()) {
            $('.right-tab-arrow').fadeIn();
        } else {
            $('.right-tab-arrow,.left-tab-arrow').fadeOut();
        }
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

    //freeze tables columns
    var $table = $('.table-pinned');
    var $fixedColumn = $table.clone().insertBefore($table).addClass('fixed-column');

    $fixedColumn.find('th,td').not('.pinned').remove();

    $fixedColumn.find('tr').each(function(i, elem) {
        $(this).height($table.find('tr:eq(' + i + ')').height());
    });

    //  Generic nav click function on same page
    $('#detail_and_post .sticky-btns a[href^="#"]').on('click', function(event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    if ($(".owl-carousel").length) {
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            center: true,
            dots: false,
            nav: true,
        });
    }

    // Filter options for search results
    $(window).scroll(function() {
        var sticky = $('.sticky-search-cont'),
            scroll = $(window).scrollTop();

        if (scroll >= 50) sticky.addClass('shadow');
        else sticky.removeClass('shadow');
    });

    $('.more-filter').click(function() {
        event.preventDefault();
        if ($('.filter-opt-sub-list').css('display') == 'none') {
            $('.filter-opt-sub-list').slideDown();
            $(this).find('svg').removeClass('fa-chevron-down');
            $(this).find('svg').addClass('fa-chevron-up');
            $(this).find('.filterC').hide();
            $(this).find('.filterO').addClass('filterOInline');
        } else {
            $('.filter-opt-sub-list').slideUp();
            $(this).find('svg').removeClass('fa-chevron-up');
            $(this).find('svg').addClass('fa-chevron-down');
            $(this).find('.filterO').removeClass('filterOInline');;
            $(this).find('.filterC').show();
        }
    });
});