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
    $('.faux-select').click(function(){
        $(this).toggleClass('open');
        $('.options',this).toggleClass('open');
    });

    $('.options-country li').click(function(){
        var selection = $(this).text();
        var dataValue = $(this).attr('data-value');
        $('.country-select .selected-option span').text(selection);
        $('.country-select').attr('data-selected-value',dataValue);
    });

    $('.options-theme li').click(function(){
        var selection = $(this).text();
        var dataValue = $(this).attr('data-value');
        $('.theme-select .selected-option span').text(selection);
        $('.theme-select').attr('data-selected-value',dataValue);
    });
})
