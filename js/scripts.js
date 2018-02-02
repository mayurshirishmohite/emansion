$(document).ready(function() {
    /*Set Environment here
    var env = 'prod';
    if (env == 'development') {
        $('.test-div').show();
        console.log(env);
    } else {
        console.log(env);
        $('.test-div').hide();
    }*/


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
    var searchImgTooltip = $('.fa.fa-picture-o');
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
    })

    function hamburgerMenu() {
        if ($('.main-menu').css('display') == 'none') {
            $('#nav-icon').addClass('open');
            $('nav').addClass('active');
            $('.main-menu').slideDown();
        } else {
            $('#nav-icon').removeClass('open');
            $('nav').removeClass('active');
            $('.main-menu').slideUp();
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
    if ($('.clap-count:empty')) {
        clapCount.hide();
    }
    $("#clap_count").click(function(event) {
        event.preventDefault();
        var num = "";
        if (clapCount.is(':hidden')) {
            clapCount.show().text('0');
        }
        num = parseInt(clapCount.text());
        clapCount.text(num + 1);
    });

    // Response form button 
    $('#res_form_button').click(function(event) {
        var response_form = $('#real_response');
        event.preventDefault();
        if (response_form.css('display') == 'none') {
            response_form.slideDown();
            $(this).addClass('active');
            $(this).html('閉じる');
            $('html, body').animate({
                scrollTop: response_form.offset().top - 70
            }, 500);
        } else {
            response_form.slideUp();
            $(this).removeClass('active');
            $(this).html('投稿する');
        }

    });

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
            $("#detail_and_post").fadeIn("slow");
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



});