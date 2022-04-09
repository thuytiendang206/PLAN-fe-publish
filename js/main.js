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
    // Init aos animation
    AOS.init({
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out',
        mirror: true,
    });

    // Single select
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

    // MENU
    var menuLabel = $('#menu-label');
    var liMenu = $('#navbar>ul>li');
    var ulMenu = $('#navbar>ul');
    var circle = $('#circle-1');
    var circle2 = $('#circle-2');

    function openMenu() {
        menuLabel.addClass('open-menu');
        const itemLength = liMenu.length;
        circle.css('transform', 'translateY(calc(' + 100 * itemLength + '%  + 15px))');
        circle2.css('transform', 'rotate(180deg) translate(0, -10px)');
        ulMenu.removeClass('d-none');
        $(liMenu.get(itemLength - 1)).addClass("active");
    }

    function closeMenu() {
        liMenu.removeClass("active");
        circle.css('transform', 'translateY(' + 0 + '%)');
        circle2.css('transform', 'translate(15px, 10px)');
        menuLabel.removeClass('open-menu');
        ulMenu.addClass('d-none');
    }

    menuLabel.click(function () {
        if ($(this).hasClass('open-menu')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    liMenu.hover(function () {
        liMenu.removeClass("active");
        circle.css('transform', 'translateY(calc(' + 100 * ($(this).index() + 1) + '%  + 15px))');
        $(this).addClass("active")
    });


    // Set height of a div based on a percentage of width
    $(function () {
        var div = $('.story-card-item');
        var width = div.width();
        div.css('height', width * 816 / 674);  //magic number from percentage width/ height of image background
    });


    // HOME PAGE, PEOPLE ANIMATION
    const canvas = document.getElementById("people-animation");
    const context = canvas.getContext("2d");
    const fullDuration = 7;
    const frameCount = 80;
    const timeDelay = fullDuration / frameCount * 1000;
    const img = new Image()
    img.src = 'images/people/00.png';
    canvas.width = 1280;
    canvas.height = 974;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    }

    function animationPeople() {
        for (let i = 0; i < frameCount; i++) {
            drawImg(i);
        }
    }

    function drawImg(i) {
        setTimeout(function () {
            img.src = `images/people/0${i.toString()}.png`;
            requestAnimationFrame(() => {
                context.drawImage(img, 0, 0);
            })
        }, timeDelay * i);
    }


    // Copy header for stories

    function copyHeader() {
        var $el = $('#header > div').clone();
        $('#header-stories').append($el);
    }

    // HOME PAGE, FULL PAGE JS
    var videoMap = $("#map-video");
    var header = $('#header');
    $('#home-page').fullpage({
        scrollOverflow: true,
        onLeave: function (origin, destination, direction) {
            $('.section [data-aos]').removeClass("aos-animate");
            if (destination) {
                if (destination === 1 || destination === 7) {
                    header.removeClass("showing");
                } else if (destination === 3 || destination === 5 || destination === 6) {
                    $("#logo-img").attr("src", "images/logo-louder-plan-white.svg");
                    circle.attr("src", "images/circle-white-1.svg");
                    circle2.attr("src", "images/circle-white-2.svg");
                    menuLabel.css("color", "#FFFFFF");
                    $('#navbar>ul>li>a').css("color", "#FFFFFF");

                } else if (destination === 2 || destination === 4 || destination === 7) {
                    $("#logo-img").attr("src", "images/logo-louder-plan-blue.svg");
                    circle.attr("src", "images/circle-blue-1.svg");
                    circle2.attr("src", "images/circle-blue-2.svg");
                    menuLabel.css("color", "#0072CE");
                    $('#navbar>ul>li>a').css("color", "#0072CE");
                }
            }
        },
        afterLoad: function (origin, destination, direction) {
            $('.section.active [data-aos]').addClass("aos-animate");
            if (destination) {
                header.remove("d-none");
                if (destination === 1) {
                    $('.page-1').addClass("showing");
                } else {
                    header.addClass("showing");
                    if (destination === 2) {
                        animationPeople();
                    } else {
                        drawImg(0);
                    }

                    if (destination === 4) {
                        videoMap.one("play", function () {
                            this.currentTime = 0;
                        });
                        videoMap.get(0).play();
                        $('.page-4-text-wrapper .part-2 [data-aos]').removeClass("aos-animate");
                        setTimeout(function () {
                            $('.page-4-text-wrapper .part-1').addClass("opacity-0");
                            $('.page-4-text-wrapper .part-2').addClass("opacity-1");
                            $('.page-4-text-wrapper .part-2 [data-aos]').addClass("aos-animate");
                        }, 3500);
                    } else {
                        $('.page-4-text-wrapper .part-1').removeClass("opacity-0");
                        $('.page-4-text-wrapper .part-2').removeClass("opacity-1");
                    }

                    if (destination === 7) {
                        header.addClass("d-none");
                    }
                }
            }
        },
        css3: true
    });
})
