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

    // Set height of a div based on a percentage of width
    $(function () {
        var div = $('.story-card-item');
        var width = div.width();
        div.css('height', width * 816 / 674);  //magic number from percentage width/ height of image background
    });


    // HOME PAGE, PEOPLE ANIMATION
    const canvas = document.getElementById("people-animation");
    const context = canvas.getContext("2d");
    const fullDuration = 6;
    const frameCount = 73;
    const timeDelay = fullDuration / frameCount * 1000;
    const img = new Image()
    img.src = 'images/people/0.png';
    canvas.width = 1920;
    canvas.height = 1365;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    }

    // preload to make the animation smoother
    const preloadImages = () => {
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `images/people/${i.toString()}.png`;
        }
    };
    preloadImages();

    function animationPeople() {
        for (let i = 0; i < frameCount; i++) {
            drawImg(i);
        }
    }

    function drawImg(i) {
        setTimeout(function () {
            img.src = `images/people/${i.toString()}.png`;
            requestAnimationFrame(() => {
                context.drawImage(img, 0, 0);
            })
        }, timeDelay * i);
    }

    // HOME PAGE, FULL PAGE JS
    var videoMap = $("#map-video");
    $('#home-page').fullpage({
        scrollOverflow: true,
        onLeave: function (origin, destination, direction) {
            $('.section [data-aos]').removeClass("aos-animate");
            if (destination) {
                if (destination === 1) {
                    $('#header').removeClass("showing")
                } else if (destination === 3 || destination === 5 || destination === 6) {
                    $("#logo-img").attr("src", "images/logo-louder-plan-white.svg");
                } else if (destination === 2 || destination === 4 || destination === 7) {
                    $("#logo-img").attr("src", "images/logo-louder-plan-blue.svg");
                }
            }
        },
        afterLoad: function (origin, destination, direction) {
            $('.section.active [data-aos]').addClass("aos-animate");
            if (destination) {
                if (destination === 1) {
                    $('.page-1').addClass("showing");
                } else {
                    $('#header').addClass("showing");
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
                }
            }
        },
        css3: true
    });
})
