(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }


})()

$(document).ready(function () {
    'use strict';
    AOS.init({
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out',
        mirror: true,
    });

    $('.faux-select').click(function () {
        $(this).toggleClass('open');
        $('.options', this).toggleClass('open');
    });

    $('.options-country li').click(function () {
        var selection = $(this).text();
        var dataValue = $(this).attr('data-value');
        $('.country-select .selected-option span').text(selection);
        $('.country-select').attr('data-selected-value', dataValue);
    });

    $('.options-theme li').click(function () {
        var selection = $(this).text();
        var dataValue = $(this).attr('data-value');
        $('.theme-select .selected-option span').text(selection);
        $('.theme-select').attr('data-selected-value', dataValue);
    });

    // Set height of a div based on a percentage of width
    $(function () {
        var div = $('.story-card-item');
        var width = div.width();
        div.css('height', width * 816 / 674);  //magic number from percentage width/ height of image background
    });

    $('#home-page').fullpage({
        scrollOverflow: true,
        onLeave: function (origin, destination, direction) {
            if (destination && destination === 1) {
                $('#header').removeClass("showing")
            }
            $('.section [data-aos]').removeClass("aos-animate");
            if (destination && (destination === 3 || destination === 5 || destination === 6)) {
                $("#logo-img").attr("src", "images/logo-louder-plan-white.svg");
            }
            if (destination && (destination === 2 || destination === 4 || destination === 7)) {
                $("#logo-img").attr("src", "images/logo-louder-plan-blue.svg");
            }
        },
        afterLoad: function (origin, destination, direction) {
            if (destination && destination === 1) {
                $('.page-1').addClass("showing")
            }
            if (destination && destination !== 1) {
                $('#header').addClass("showing")
            }
            $('.section.active [data-aos]').addClass("aos-animate");
        },
        css3: true
    });
})
