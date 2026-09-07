document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const hero =
        document.querySelector(".hero");

    const artCards =
        document.querySelectorAll(".art-card");

    const videoCards =
        document.querySelectorAll(".video-card");


    /* ARTWORK VIEWER */

    const artViewer =
        document.getElementById("artViewer");

    const viewerImage =
        document.getElementById("viewerImage");

    const viewerTitle =
        document.getElementById("viewerTitle");

    const viewerNumber =
        document.getElementById("viewerNumber");

    const viewerClose =
        document.getElementById("viewerClose");

    const viewerPrev =
        document.getElementById("viewerPrev");

    const viewerNext =
        document.getElementById("viewerNext");


    /* VIDEO VIEWER */

    const videoViewer =
        document.getElementById("videoViewer");

    const fullVideo =
        document.getElementById("fullVideo");

    const videoViewerClose =
        document.getElementById("videoViewerClose");


    /* CUSTOM CURSOR */

    const customCursor =
        document.getElementById("customCursor");

    const cursorText =
        document.getElementById("cursorText");


    /* LOADER */

    const siteLoader =
        document.getElementById("siteLoader");

    const loaderPercent =
        document.getElementById("loaderPercent");

    const loaderProgressBar =
        document.getElementById("loaderProgressBar");


    /* SCROLL PROGRESS */

    const scrollProgressBar =
        document.getElementById("scrollProgressBar");


    /* NAVIGATION */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const pageSections =
        document.querySelectorAll(
            "#home, #gallery, #videos, #about, #contact"
        );


    /* ACCESSIBILITY */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* =========================================
       GSAP + LENIS SETUP
    ========================================= */

    let lenis = null;


    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {
        gsap.registerPlugin(ScrollTrigger);
    }


    if (
        typeof Lenis !== "undefined" &&
        !prefersReducedMotion
    ) {

        lenis = new Lenis({

            autoRaf: false,

            smoothWheel: true,

            lerp: 0.08,

            wheelMultiplier: 0.9

        });


        if (
            typeof ScrollTrigger !== "undefined"
        ) {

            lenis.on(
                "scroll",
                ScrollTrigger.update
            );

        }


        if (
            typeof gsap !== "undefined"
        ) {

            gsap.ticker.add((time) => {

                lenis.raf(
                    time * 1000
                );

            });


            gsap.ticker.lagSmoothing(0);

        }

    }


    /* =========================================
        CINEMATIC SECTION TRANSITIONS
    ========================================= */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !prefersReducedMotion
    ) {

        const transitionSections =
            document.querySelectorAll(
                ".section-transition"
            );


        transitionSections.forEach(
            (section) => {

                gsap.fromTo(
                    section,

                    {
                        y: 80,
                        opacity: 0.65
                    },

                    {
                        y: 0,
                        opacity: 1,

                        ease:
                            "power3.out",

                        scrollTrigger: {

                            trigger:
                                section,

                            start:
                                "top 92%",

                            end:
                                "top 55%",

                            scrub:
                            1

                        }

                    }
                );

            }
        );

    }



    /* =========================================
       CINEMATIC LOADER
    ========================================= */

    let loaderValue = 0;


    if (
        siteLoader &&
        loaderPercent &&
        loaderProgressBar
    ) {

        if (lenis) {
            lenis.stop();
        }


        const loaderInterval =
            setInterval(() => {

                const increase =
                    Math.floor(
                        Math.random() * 4
                    ) + 1;


                loaderValue += increase;


                if (loaderValue >= 100) {

                    loaderValue = 100;

                }


                loaderPercent.textContent =
                    `${loaderValue}%`;


                loaderProgressBar.style.width =
                    `${loaderValue}%`;


                if (loaderValue >= 100) {

                    clearInterval(
                        loaderInterval
                    );


                    setTimeout(
                        revealWebsite,
                        300
                    );

                }

            }, 35);

    } else {

        document.body.classList.remove(
            "loading"
        );

    }



    /* =========================================
       REVEAL WEBSITE
    ========================================= */

    function revealWebsite() {

        if (!siteLoader) {

            document.body.classList.remove(
                "loading"
            );


            if (lenis) {
                lenis.start();
            }


            return;

        }


        if (
            typeof gsap !== "undefined"
        ) {

            const timeline =
                gsap.timeline({

                    onComplete: () => {

                        siteLoader.style.display =
                            "none";


                        document.body.classList.remove(
                            "loading"
                        );


                        if (lenis) {
                            lenis.start();
                        }


                        if (
                            typeof ScrollTrigger !==
                            "undefined"
                        ) {

                            ScrollTrigger.refresh();

                        }

                    }

                });



            /* LOADER CONTENT */

            timeline.to(
                ".loader-inner",
                {

                    y: -80,

                    opacity: 0,

                    duration: 0.65,

                    ease: "power3.inOut"

                }
            );



            /* LOADER SCREEN */

            timeline.to(
                siteLoader,
                {

                    yPercent: -100,

                    duration: 1,

                    ease: "power4.inOut"

                },

                "-=0.1"
            );



            /* NAVBAR */

            timeline.fromTo(
                ".navbar",

                {

                    y: -40,

                    opacity: 0

                },

                {

                    y: 0,

                    opacity: 1,

                    duration: 0.8,

                    ease: "power3.out"

                },

                "-=0.45"
            );



            /* HERO SMALL TEXT */

            timeline.fromTo(
                ".hero-small-text",

                {

                    y: 35,

                    opacity: 0

                },

                {

                    y: 0,

                    opacity: 1,

                    duration: 0.7

                },

                "-=0.65"
            );



            /* HERO TITLE */

            timeline.fromTo(
                ".hero h1",

                {

                    y: 90,

                    opacity: 0

                },

                {

                    y: 0,

                    opacity: 1,

                    duration: 1,

                    ease: "power3.out"

                },

                "-=0.5"
            );



            /* HERO DESCRIPTION */

            timeline.fromTo(
                ".hero-description",

                {

                    y: 40,

                    opacity: 0

                },

                {

                    y: 0,

                    opacity: 1,

                    duration: 0.8

                },

                "-=0.65"
            );



            /* EXPLORE BUTTON */

            timeline.fromTo(
                ".explore-button",

                {

                    y: 30,

                    opacity: 0

                },

                {

                    y: 0,

                    opacity: 1,

                    duration: 0.7

                },

                "-=0.55"
            );



            /* SCROLL INDICATOR */

            timeline.fromTo(
                ".scroll-indicator",

                {

                    opacity: 0

                },

                {

                    opacity: 1,

                    duration: 0.6

                },

                "-=0.3"
            );

        } else {

            siteLoader.style.display =
                "none";


            document.body.classList.remove(
                "loading"
            );


            if (lenis) {
                lenis.start();
            }

        }

    }



    /* =========================================
       HERO MOUSE PARALLAX
    ========================================= */

    if (
        hero &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches &&
        !prefersReducedMotion
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const moveX =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 4;


                const moveY =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 4;


                hero.style.backgroundPosition =
                    `${50 + moveX}% ${50 + moveY}%`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                hero.style.backgroundPosition =
                    "50% 50%";

            }
        );

    }



    /* =========================================
       ARTWORK 3D TILT + GLARE
    ========================================= */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches &&
        !prefersReducedMotion
    ) {

        artCards.forEach((card) => {

            const inner =
                card.querySelector(
                    ".art-card-inner"
                );


            const glare =
                card.querySelector(
                    ".art-card-glare"
                );


            if (!inner) {
                return;
            }


            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const mouseX =
                        event.clientX -
                        rect.left;


                    const mouseY =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (
                            (
                                mouseY -
                                centerY
                            ) /
                            centerY
                        ) *
                        -4;


                    const rotateY =
                        (
                            (
                                mouseX -
                                centerX
                            ) /
                            centerX
                        ) *
                        4;


                    inner.style.transform =
                        `
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        scale(1.015)
                        `;


                    if (glare) {

                        const glareX =
                            (
                                mouseX /
                                rect.width
                            ) *
                            100;


                        const glareY =
                            (
                                mouseY /
                                rect.height
                            ) *
                            100;


                        glare.style.setProperty(
                            "--glare-x",
                            `${glareX}%`
                        );


                        glare.style.setProperty(
                            "--glare-y",
                            `${glareY}%`
                        );

                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    inner.style.transform =
                        `
                        rotateX(0deg)
                        rotateY(0deg)
                        scale(1)
                        `;

                }
            );

        });

    }



    /* =========================================
       SMOOTH ANCHOR SCROLLING
    ========================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    if (lenis) {

                        lenis.scrollTo(
                            target,
                            {

                                offset: 0,

                                duration: 1.5

                            }
                        );

                    } else {

                        target.scrollIntoView({

                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth",

                            block: "start"

                        });

                    }

                }
            );

        });



    /* =========================================
       PAGE SCROLL PROGRESS
    ========================================= */

    function updateScrollProgress() {

        if (!scrollProgressBar) {
            return;
        }


        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            scrollProgressBar.style.width =
                "0%";

            return;

        }


        const progress =
            (
                scrollTop /
                documentHeight
            ) *
            100;


        scrollProgressBar.style.width =
            `${progress}%`;

    }

    /* =========================================
        CINEMATIC BACK TO TOP
    ========================================= */

    const backTop =
        document.getElementById(
            "backTop"
        );


    const backTopValue =
        document.querySelector(
            ".back-top-value"
        );


    const backTopCircleLength =
        169.65;



    function updateBackTop() {

        if (!backTop) {
            return;
        }


        const scrollTop =
            window.scrollY;


        const scrollHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        /* SHOW / HIDE */

        if (scrollTop > 500) {

            backTop.classList.add(
                "visible"
            );

        }

        else {

            backTop.classList.remove(
                "visible"
            );

        }


        /* UPDATE CIRCLE */

        if (
            backTopValue &&
            scrollHeight > 0
        ) {

            const progress =
                scrollTop /
                scrollHeight;


            const offset =
                backTopCircleLength -
                progress *
                backTopCircleLength;


            backTopValue.style
                .strokeDashoffset =
                offset;

        }

    }

    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );



    if (lenis) {

        lenis.on(
            "scroll",
            updateBackTop
        );

    }



    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                if (lenis) {

                    lenis.scrollTo(
                        "#home",
                        {
                            duration: 1.4
                        }
                    );

                }

                else {

                    window.scrollTo({

                        top: 0,

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }

            }
        );

    }



    updateBackTop();



    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    function updateActiveNavigation() {

        if (
            !navLinks.length ||
            !pageSections.length
        ) {
            return;
        }


        let currentSection =
            "home";


        const scrollPosition =
            window.scrollY +
            window.innerHeight *
            0.35;


        pageSections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop;


                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    scrollPosition >=
                        sectionTop &&
                    scrollPosition <
                        sectionBottom
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            (link) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {
                    return;
                }


                const target =
                    href.replace(
                        "#",
                        ""
                    );


                link.classList.toggle(
                    "active",
                    target === currentSection
                );

            }
        );

    }



    /* NORMAL WINDOW SCROLL */

    window.addEventListener(
        "scroll",
        () => {

            updateScrollProgress();

            updateActiveNavigation();

        },
        {
            passive: true
        }
    );


    /* LENIS SCROLL */

    if (lenis) {

        lenis.on(
            "scroll",
            () => {

                updateScrollProgress();

                updateActiveNavigation();

            }
        );

    }


    updateScrollProgress();

    updateActiveNavigation();


    /* =========================================
        CINEMATIC NAVBAR HIDE / REVEAL
    ========================================= */

    const navbar =
        document.querySelector(".navbar");

    let lastScrollPosition = 0;

    let navbarTicking = false;


    function updateNavbarVisibility() {

        if (!navbar) {
            return;
        }


        const currentScrollPosition =
            window.scrollY;


        /* TOP OF PAGE */

        if (currentScrollPosition <= 20) {

            navbar.classList.remove(
                "nav-hidden"
            );

            navbar.classList.add(
                "nav-visible"
            );

            navbar.classList.remove(
                "nav-scrolled"
            );

            lastScrollPosition =
                currentScrollPosition;

            navbarTicking = false;

            return;
        }


        /* SCROLLED STATE */

        navbar.classList.add(
            "nav-scrolled"
        );


        /* SCROLLING DOWN */

        if (
            currentScrollPosition >
            lastScrollPosition + 8
        ) {

            navbar.classList.add(
                "nav-hidden"
            );

            navbar.classList.remove(
                "nav-visible"
            );

        }


        /* SCROLLING UP */

        else if (
            currentScrollPosition <
            lastScrollPosition - 8
        ) {

            navbar.classList.remove(
                "nav-hidden"
            );

            navbar.classList.add(
                "nav-visible"
            );

        }


        lastScrollPosition =
            currentScrollPosition;


        navbarTicking = false;

    }



    window.addEventListener(
        "scroll",
        () => {

            if (!navbarTicking) {

                requestAnimationFrame(
                    updateNavbarVisibility
                );

                navbarTicking = true;

            }

        },
        {
            passive: true
        }
    );



    if (lenis) {

        lenis.on(
            "scroll",
            updateNavbarVisibility
        );

    }



    updateNavbarVisibility();


    /* =========================================
        MAGNETIC BUTTON EFFECT
    ========================================= */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches &&
        !prefersReducedMotion
    ) {

        const magneticElements =
            document.querySelectorAll(
            `
                .explore-button,
                .about-button,
                .video-play-btn,
                .viewer-close,
                .viewer-arrow,
                .video-viewer-close
                `
            );


        magneticElements.forEach(
            (element) => {

                const strength =
                    element.classList.contains(
                        "viewer-arrow"
                    )
                        ? 10
                        : 14;


                element.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();


                        const mouseX =
                            event.clientX -
                            rect.left;


                        const mouseY =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const moveX =
                            (
                                mouseX -
                                centerX
                            ) /
                            centerX *
                            strength;


                        const moveY =
                            (
                                mouseY -
                                centerY
                            ) /
                            centerY *
                            strength;


                        element.classList.remove(
                            "magnetic-reset"
                        );


                        element.classList.add(
                            "magnetic-active"
                        );


                        element.style.transform =
                            `
                            translate(
                                ${moveX}px,
                                ${moveY}px
                            )
                            `;

                    }
                );



                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.classList.remove(
                            "magnetic-active"
                        );


                        element.classList.add(
                            "magnetic-reset"
                        );


                        element.style.transform =
                            "translate(0, 0)";

                    }
                );

            }
        );

    }   

    /* =========================================
        IMAGE LOAD EFFECT
    ========================================= */

    const lazyImages =
        document.querySelectorAll(
            ".art-card img, .about-image-frame img"
        );


    lazyImages.forEach((image) => {

        function markImageLoaded() {

            image.classList.add(
                "image-loaded"
            );

        }


        if (image.complete) {

            markImageLoaded();

        }

        else {

            image.addEventListener(
                "load",
                markImageLoaded,
                {
                    once: true
                }
            );

        }

    });

    /* =========================================
        MOBILE NAVIGATION MENU
    ========================================= */

    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const mobileMenuLinks =
        document.querySelectorAll(
            ".mobile-menu-links a"
        );



    function openMobileMenu() {

        if (
            !mobileMenu ||
            !mobileMenuBtn
        ) {

            return;

        }


        mobileMenu.classList.add(
            "active"
        );


        mobileMenuBtn.classList.add(
            "active"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "true"
        );


        mobileMenuBtn.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        document.body.classList.add(
            "mobile-menu-open"
        );


        if (lenis) {

            lenis.stop();

        }

    }



    function closeMobileMenu() {

        if (
            !mobileMenu ||
            !mobileMenuBtn
        ) {

            return;

        }


        mobileMenu.classList.remove(
            "active"
        );


        mobileMenuBtn.classList.remove(
            "active"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );


        mobileMenuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        document.body.classList.remove(
            "mobile-menu-open"
        );


        if (lenis) {

            lenis.start();

        }

    }



    if (
        mobileMenuBtn &&
        mobileMenu
    ) {

        mobileMenuBtn.addEventListener(
            "click",
            () => {

                if (
                    mobileMenu.classList.contains(
                        "active"
                    )
                ) {

                    closeMobileMenu();

                }

                else {

                    openMobileMenu();

                }

            }
        );

    }



    mobileMenuLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        }
    );



    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                768
            ) {

                closeMobileMenu();

            }

        }
    );



    /* =========================================
       ARTWORK DATA
    ========================================= */

    let currentArtworkIndex = 0;

    const artworkData = [];


    artCards.forEach(
        (card, cardIndex) => {

            const image =
                card.querySelector(
                    "img"
                );


            const title =
                card.querySelector(
                    "h3"
                );


            const number =
                card.querySelector(
                    ".art-info span"
                );


            if (
                !image ||
                !title ||
                !number
            ) {
                return;
            }


            const artworkIndex =
                artworkData.length;


            artworkData.push({

                image:
                    image.src,

                title:
                    title.textContent.trim(),

                number:
                    number.textContent.trim()

            });


            card.dataset.artworkIndex =
                artworkIndex;


            card.addEventListener(
                "click",
                () => {

                    openArtwork(
                        Number(
                            card.dataset.artworkIndex
                        )
                    );

                }
            );

        }
    );



    /* =========================================
       OPEN ARTWORK
    ========================================= */

    function openArtwork(index) {

        if (
            !artViewer ||
            !viewerImage ||
            artworkData.length === 0
        ) {

            return;

        }


        if (
            index < 0 ||
            index >= artworkData.length
        ) {

            return;

        }


        currentArtworkIndex =
            index;


        const artwork =
            artworkData[
                currentArtworkIndex
            ];


        viewerImage.src =
            artwork.image;


        if (viewerTitle) {

            viewerTitle.textContent =
                artwork.title;

        }


        if (viewerNumber) {

            viewerNumber.textContent =
                artwork.number;

        }


        artViewer.classList.add(
            "active"
        );


        artViewer.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "viewer-open"
        );


        if (lenis) {
            lenis.stop();
        }

    }



    /* =========================================
       CLOSE ARTWORK
    ========================================= */

    function closeArtwork() {

        if (!artViewer) {
            return;
        }


        artViewer.classList.remove(
            "active"
        );


        artViewer.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "viewer-open"
        );


        if (lenis) {
            lenis.start();
        }

    }



    /* =========================================
       UPDATE ARTWORK
    ========================================= */

    function updateArtwork() {

        if (
            !viewerImage ||
            artworkData.length === 0
        ) {
            return;
        }


        const artwork =
            artworkData[
                currentArtworkIndex
            ];


        viewerImage.style.opacity =
            "0";


        viewerImage.style.transform =
            "scale(0.95)";


        setTimeout(() => {

            viewerImage.src =
                artwork.image;


            if (viewerTitle) {

                viewerTitle.textContent =
                    artwork.title;

            }


            if (viewerNumber) {

                viewerNumber.textContent =
                    artwork.number;

            }


            viewerImage.style.opacity =
                "1";


            viewerImage.style.transform =
                "scale(1)";

        }, 200);

    }



    /* =========================================
       NEXT ARTWORK
    ========================================= */

    function nextArtwork() {

        if (
            artworkData.length === 0
        ) {
            return;
        }


        currentArtworkIndex =
            (
                currentArtworkIndex +
                1
            ) %
            artworkData.length;


        updateArtwork();

    }



    /* =========================================
       PREVIOUS ARTWORK
    ========================================= */

    function previousArtwork() {

        if (
            artworkData.length === 0
        ) {
            return;
        }


        currentArtworkIndex =
            (
                currentArtworkIndex -
                1 +
                artworkData.length
            ) %
            artworkData.length;


        updateArtwork();

    }



    /* =========================================
       ARTWORK VIEWER EVENTS
    ========================================= */

    if (viewerClose) {

        viewerClose.addEventListener(
            "click",
            closeArtwork
        );

    }


    if (viewerNext) {

        viewerNext.addEventListener(
            "click",
            nextArtwork
        );

    }


    if (viewerPrev) {

        viewerPrev.addEventListener(
            "click",
            previousArtwork
        );

    }


    if (artViewer) {

        artViewer.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    artViewer
                ) {

                    closeArtwork();

                }

            }
        );

    }



    /* =========================================
       VIDEO HOVER PREVIEW
    ========================================= */

    videoCards.forEach(
        (card) => {

            const video =
                card.querySelector(
                    "video"
                );


            if (!video) {
                return;
            }


            card.addEventListener(
                "mouseenter",
                () => {

                    if (
                        window.innerWidth >
                            768 &&
                        !prefersReducedMotion
                    ) {

                        video
                            .play()
                            .catch(
                                () => {}
                            );

                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    if (
                        window.innerWidth >
                        768
                    ) {

                        video.pause();

                        video.currentTime =
                            0;

                    }

                }
            );

        }
    );



    /* =========================================
       OPEN VIDEO VIEWER
    ========================================= */

    videoCards.forEach(
        (card) => {

            const video =
                card.querySelector(
                    "video"
                );


            if (!video) {
                return;
            }


            card.addEventListener(
                "click",
                () => {

                    if (
                        !videoViewer ||
                        !fullVideo
                    ) {
                        return;
                    }


                    videoCards.forEach(
                        (item) => {

                            const previewVideo =
                                item.querySelector(
                                    "video"
                                );


                            if (previewVideo) {

                                previewVideo.pause();

                            }

                        }
                    );


                    fullVideo.src =
                        video.currentSrc ||
                        video.src;


                    videoViewer.classList.add(
                        "active"
                    );


                    videoViewer.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    document.body.classList.add(
                        "viewer-open"
                    );


                    if (lenis) {
                        lenis.stop();
                    }


                    fullVideo
                        .play()
                        .catch(
                            () => {}
                        );

                }
            );

        }
    );



    /* =========================================
       CLOSE VIDEO VIEWER
    ========================================= */

    function closeVideoViewer() {

        if (
            !videoViewer ||
            !fullVideo
        ) {
            return;
        }


        fullVideo.pause();

        fullVideo.currentTime =
            0;


        fullVideo.removeAttribute(
            "src"
        );


        fullVideo.load();


        videoViewer.classList.remove(
            "active"
        );


        videoViewer.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "viewer-open"
        );


        if (lenis) {
            lenis.start();
        }

    }



    /* VIDEO VIEWER EVENTS */

    if (videoViewerClose) {

        videoViewerClose.addEventListener(
            "click",
            closeVideoViewer
        );

    }


    if (videoViewer) {

        videoViewer.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    videoViewer
                ) {

                    closeVideoViewer();

                }

            }
        );

    }



    /* =========================================
       KEYBOARD CONTROLS
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                videoViewer &&
                videoViewer.classList.contains(
                    "active"
                )
            ) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeVideoViewer();

                }


                return;

            }


            if (
                artViewer &&
                artViewer.classList.contains(
                    "active"
                )
            ) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeArtwork();

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextArtwork();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousArtwork();

                }

            }

        }
    );



    /* =========================================
       CUSTOM CURSOR
    ========================================= */

    if (
        customCursor &&
        cursorText &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = -100;
        let mouseY = -100;

        let cursorX = -100;
        let cursorY = -100;



        /* TRACK MOUSE */

        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );



        /* SMOOTH MOVEMENT */

        function animateCursor() {

            cursorX +=
                (
                    mouseX -
                    cursorX
                ) *
                0.18;


            cursorY +=
                (
                    mouseY -
                    cursorY
                ) *
                0.18;


            customCursor.style.left =
                `${cursorX}px`;


            customCursor.style.top =
                `${cursorY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();



        /* ARTWORK CURSOR */

        artCards.forEach(
            (card) => {

                card.addEventListener(
                    "mouseenter",
                    () => {

                        customCursor
                            .classList
                            .remove(
                                "cursor-link"
                            );


                        customCursor
                            .classList
                            .add(
                                "cursor-large"
                            );


                        cursorText.textContent =
                            "VIEW";

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        customCursor
                            .classList
                            .remove(
                                "cursor-large"
                            );


                        cursorText.textContent =
                            "";

                    }
                );

            }
        );



        /* VIDEO CURSOR */

        videoCards.forEach(
            (card) => {

                card.addEventListener(
                    "mouseenter",
                    () => {

                        customCursor
                            .classList
                            .remove(
                                "cursor-link"
                            );


                        customCursor
                            .classList
                            .add(
                                "cursor-large"
                            );


                        cursorText.textContent =
                            "PLAY";

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        customCursor
                            .classList
                            .remove(
                                "cursor-large"
                            );


                        cursorText.textContent =
                            "";

                    }
                );

            }
        );



        /* LINKS */

        document
            .querySelectorAll(
                "a, button"
            )
            .forEach(
                (element) => {

                    element.addEventListener(
                        "mouseenter",
                        () => {

                            if (
                                !element.closest(
                                    ".art-card"
                                ) &&
                                !element.closest(
                                    ".video-card"
                                )
                            ) {

                                customCursor
                                    .classList
                                    .add(
                                        "cursor-link"
                                    );

                            }

                        }
                    );


                    element.addEventListener(
                        "mouseleave",
                        () => {

                            customCursor
                                .classList
                                .remove(
                                    "cursor-link"
                                );

                        }
                    );

                }
            );



        /* CLICK EFFECT */

        document.addEventListener(
            "mousedown",
            () => {

                customCursor
                    .classList
                    .add(
                        "cursor-click"
                    );

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                customCursor
                    .classList
                    .remove(
                        "cursor-click"
                    );

            }
        );



        /* WINDOW ENTER / LEAVE */

        document.addEventListener(
            "mouseleave",
            () => {

                customCursor.style.opacity =
                    "0";

            }
        );


        document.addEventListener(
            "mouseenter",
            () => {

                customCursor.style.opacity =
                    "1";

            }
        );

    }



    /* =========================================
       GSAP SCROLL ANIMATIONS
    ========================================= */

    const canAnimate =

        typeof gsap !== "undefined" &&

        typeof ScrollTrigger !==
            "undefined" &&

        !prefersReducedMotion;



    if (canAnimate) {


        /* =====================================
           GALLERY HEADING
        ====================================== */

        gsap.from(
            ".gallery-heading > p",
            {

                scrollTrigger: {

                    trigger:
                        ".gallery-heading",

                    start:
                        "top 85%"

                },


                y: 30,

                opacity: 0,

                duration: 0.8

            }
        );


        gsap.from(
            ".gallery-heading h2",
            {

                scrollTrigger: {

                    trigger:
                        ".gallery-heading",

                    start:
                        "top 80%"

                },


                y: 80,

                opacity: 0,

                duration: 1.2,

                ease:
                    "power3.out"

            }
        );



        /* =====================================
           ARTWORK CARDS
        ====================================== */

        artCards.forEach(
            (
                card,
                index
            ) => {

                gsap.fromTo(
                    card,

                    {

                        y: 120,

                        opacity: 0,

                        scale: 0.96

                    },

                    {

                        y: 0,

                        opacity: 1,

                        scale: 1,

                        duration: 1.2,


                        delay:
                            (
                                index %
                                2
                            ) *
                            0.08,


                        ease:
                            "power3.out",


                        scrollTrigger: {

                            trigger:
                                card,

                            start:
                                "top 90%",

                            toggleActions:
                                "play none none none"

                        }

                    }
                );

            }
        );



        /* =====================================
           ARTWORK IMAGE PARALLAX
        ====================================== */

        artCards.forEach(
            (card) => {

                const image =
                    card.querySelector(
                        "img"
                    );


                if (!image) {
                    return;
                }


                gsap.fromTo(
                    image,

                    {

                        yPercent: -4

                    },

                    {

                        yPercent: 4,

                        ease: "none",


                        scrollTrigger: {

                            trigger:
                                card,

                            start:
                                "top bottom",

                            end:
                                "bottom top",

                            scrub: 1

                        }

                    }
                );

            }
        );



        /* =====================================
           VIDEO HEADING
        ====================================== */

        gsap.from(
            ".video-heading > p:first-child",
            {

                scrollTrigger: {

                    trigger:
                        ".video-heading",

                    start:
                        "top 85%"

                },


                y: 30,

                opacity: 0,

                duration: 0.8

            }
        );


        gsap.from(
            ".video-heading h2",
            {

                scrollTrigger: {

                    trigger:
                        ".video-heading",

                    start:
                        "top 82%"

                },


                y: 90,

                opacity: 0,

                duration: 1.2,

                ease:
                    "power3.out"

            }
        );


        gsap.from(
            ".video-intro",
            {

                scrollTrigger: {

                    trigger:
                        ".video-heading",

                    start:
                        "top 72%"

                },


                y: 40,

                opacity: 0,

                duration: 1,

                delay: 0.15

            }
        );



        /* =====================================
           VIDEO CARDS
        ====================================== */

        videoCards.forEach(
            (card) => {

                gsap.fromTo(
                    card,

                    {

                        opacity: 0,

                        y: 120,

                        scale: 0.97

                    },

                    {

                        opacity: 1,

                        y: 0,

                        scale: 1,

                        duration: 1.2,

                        ease:
                            "power3.out",


                        scrollTrigger: {

                            trigger:
                                card,

                            start:
                                "top 90%"

                        }

                    }
                );

            }
        );



        /* =====================================
           ABOUT IMAGE
        ====================================== */

        gsap.from(
            ".about-image-frame",
            {

                scrollTrigger: {

                    trigger:
                        ".about-section",

                    start:
                        "top 75%"

                },


                x: -100,

                opacity: 0,

                duration: 1.3,

                ease:
                    "power3.out"

            }
        );



        /* ABOUT LABEL */

        gsap.from(
            ".about-label",
            {

                scrollTrigger: {

                    trigger:
                        ".about-content",

                    start:
                        "top 80%"

                },


                y: 30,

                opacity: 0,

                duration: 0.8

            }
        );



        /* ABOUT TITLE */

        gsap.from(
            ".about-content h2",
            {

                scrollTrigger: {

                    trigger:
                        ".about-content",

                    start:
                        "top 78%"

                },


                y: 100,

                opacity: 0,

                duration: 1.3,

                ease:
                    "power3.out"

            }
        );



        /* ABOUT DESCRIPTION */

        gsap.from(
            ".about-description",
            {

                scrollTrigger: {

                    trigger:
                        ".about-content",

                    start:
                        "top 68%"

                },


                y: 40,

                opacity: 0,

                duration: 1,

                stagger: 0.15

            }
        );



        /* ABOUT DETAILS */

        gsap.from(
            ".about-details > div",
            {

                scrollTrigger: {

                    trigger:
                        ".about-details",

                    start:
                        "top 85%"

                },


                y: 30,

                opacity: 0,

                duration: 0.8,

                stagger: 0.12

            }
        );



        /* ABOUT BUTTON */

        gsap.from(
            ".about-button",
            {

                scrollTrigger: {

                    trigger:
                        ".about-button",

                    start:
                        "top 92%"

                },


                y: 25,

                opacity: 0,

                duration: 0.8,

                ease:
                    "power2.out"

            }
        );



        /* =====================================
           FLOATING WORD - IMAGINE
        ====================================== */

        gsap.to(
            ".word-one",
            {

                x: 100,

                ease: "none",


                scrollTrigger: {

                    trigger:
                        ".about-section",

                    start:
                        "top bottom",

                    end:
                        "bottom top",

                    scrub: 1.2

                }

            }
        );



        /* FLOATING WORD - CREATE */

        gsap.to(
            ".word-two",
            {

                x: -100,

                ease: "none",


                scrollTrigger: {

                    trigger:
                        ".about-section",

                    start:
                        "top bottom",

                    end:
                        "bottom top",

                    scrub: 1.2

                }

            }
        );



        /* =====================================
           CONTACT
        ====================================== */

        gsap.from(
            ".contact-label",
            {

                scrollTrigger: {

                    trigger:
                        ".contact-section",

                    start:
                        "top 80%"

                },


                y: 30,

                opacity: 0,

                duration: 0.8

            }
        );


        gsap.from(
            ".contact-top h2",
            {

                scrollTrigger: {

                    trigger:
                        ".contact-section",

                    start:
                        "top 75%"

                },


                y: 120,

                opacity: 0,

                duration: 1.4,

                ease:
                    "power3.out"

            }
        );


        gsap.from(
            ".contact-description",
            {

                scrollTrigger: {

                    trigger:
                        ".contact-section",

                    start:
                        "top 60%"

                },


                y: 40,

                opacity: 0,

                duration: 1

            }
        );


        gsap.from(
            ".contact-actions",
            {

                scrollTrigger: {

                    trigger:
                        ".contact-actions",

                    start:
                        "top 90%"

                },


                y: 60,

                opacity: 0,

                duration: 1.1,

                ease:
                    "power3.out"

            }
        );



        /* =====================================
           FOOTER
        ====================================== */

        gsap.from(
            ".footer",
            {

                scrollTrigger: {

                    trigger:
                        ".footer",

                    start:
                        "top 95%"

                },


                y: 30,

                opacity: 0,

                duration: 0.9

            }
        );



        /* =====================================
           REFRESH SCROLLTRIGGER
        ====================================== */

        window.addEventListener(
            "load",
            () => {

                ScrollTrigger.refresh();

            }
        );

    }

    /* =========================================
        FEATURED ARTWORK SCROLL FOCUS
    ========================================= */

    const focusArtCards = document.querySelectorAll(".art-card");

    if (
        focusArtCards.length &&
        typeof ScrollTrigger !== "undefined" &&
        !prefersReducedMotion
    ) {
        focusArtCards.forEach((card) => {

            ScrollTrigger.create({
                trigger: card,

                start: "top 65%",
                end: "bottom 35%",

                onEnter: () => {
                    focusArtCards.forEach(item => {
                        item.classList.remove("art-focused");
                    });

                    card.classList.add("art-focused");
                },

                onEnterBack: () => {
                    focusArtCards.forEach(item => {
                        item.classList.remove("art-focused");
                    });

                    card.classList.add("art-focused");
                }
            });

        });
    }

    /* =========================================
        STEP 25 — GALLERY STAGGER ENTRANCE
    ========================================= */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !prefersReducedMotion
    ) {

        const galleryCards = gsap.utils.toArray(".art-card");

        ScrollTrigger.batch(galleryCards, {

            start: "top 90%",

            once: true,

            onEnter: (cards) => {

                gsap.fromTo(
                    cards,

                    {
                        y: 55,
                        opacity: 0
                    },

                    {
                        y: 0,
                        opacity: 1,

                        duration: 0.9,

                        stagger: 0.13,

                        ease: "power3.out",

                        clearProps: "transform"
                    }
                );

            }

        });

    }

    /* =========================================
        STEP 26 — HERO TEXT SCROLL PARALLAX
    ========================================= */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !prefersReducedMotion
    ) {

        const heroContent = document.querySelector(".hero-content");
        const scrollIndicator = document.querySelector(".scroll-indicator");

        if (heroContent) {
            gsap.to(heroContent, {
                y: -100,
                opacity: 0.25,
                ease: "none",

                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }

        if (scrollIndicator) {
            gsap.to(scrollIndicator, {
                y: -40,
                opacity: 0,

                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "45% top",
                    scrub: true
                }
            });
        }

    }

    /* =========================================
        STEP 27 — HERO BACKGROUND SCROLL ZOOM
    ========================================= */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !prefersReducedMotion &&
        window.innerWidth > 768
    ) {

        const heroSection = document.querySelector(".hero");

        if (heroSection) {

            gsap.fromTo(
                heroSection,

                {
                    backgroundSize: "110%"
                },

                {
                    backgroundSize: "125%",
                    ease: "none",

                    scrollTrigger: {
                        trigger: heroSection,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.2
                    }
                }
            );  

        }
    }

    /* =========================================
        STEP 28 — LOGO HOME SCROLL
    ========================================= */

    const brandLogo = document.querySelector(".logo");

    if (brandLogo) {

        brandLogo.addEventListener("click", (event) => {

            event.preventDefault();

            if (lenis) {

                lenis.scrollTo("#home", {
                    duration: 1.4
                });

            } else {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        });

    }

    /* =========================================
        STEP 30 — CINEMATIC NAVIGATION
    ========================================= */

    const sectionNavigationLinks =
        document.querySelectorAll(
            '.nav-link[href^="#"], .mobile-menu-links a[href^="#"]'
        );

    sectionNavigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID = link.getAttribute("href");
            const targetSection = document.querySelector(targetID);

            if (!targetSection) return;

            event.preventDefault();

            // Smooth scroll
            if (lenis) {

                lenis.scrollTo(targetSection, {
                    duration: 1.5,
                    offset: 0
                });

            } else {

                targetSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

            // Arrival animation
            if (targetID !== "#home") {

                setTimeout(() => {

                    targetSection.classList.remove("section-arrived");

                    void targetSection.offsetWidth;

                    targetSection.classList.add("section-arrived");

                    setTimeout(() => {
                        targetSection.classList.remove("section-arrived");
                    }, 1200);

                }, 900);

            }

        });

    });

    /* =========================================
        STEP 31 — MOUSE SPOTLIGHT
    ========================================= */

    const mouseSpotlight =
        document.getElementById("mouseSpotlight");

    if (
        mouseSpotlight &&
        window.matchMedia("(pointer: fine)").matches &&
        !prefersReducedMotion
    ) {

        let spotlightX = window.innerWidth / 2;
        let spotlightY = window.innerHeight / 2;

        let targetX = spotlightX;
        let targetY = spotlightY;

        window.addEventListener("mousemove", (event) => {

            targetX = event.clientX;
            targetY = event.clientY;

        });

        function animateSpotlight() {

            spotlightX += (targetX - spotlightX) * 0.12;
            spotlightY += (targetY - spotlightY) * 0.12;

            mouseSpotlight.style.left = `${spotlightX}px`;
            mouseSpotlight.style.top = `${spotlightY}px`;

            requestAnimationFrame(animateSpotlight);
        }

        animateSpotlight();
    }

    /* =========================================
        STEP 33 — ABOUT IMAGE REVEAL
    ========================================= */

    const aboutImageFrame =
        document.querySelector(".about-image-frame");

    if (
        aboutImageFrame &&
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !prefersReducedMotion
    ) {

        const aboutReveal =
            document.createElement("div");

        aboutReveal.classList.add("about-image-reveal");

        aboutImageFrame.appendChild(aboutReveal);

        const aboutTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top 78%",
                once: true
            }
        });

        aboutTimeline.to(aboutReveal, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
        });

        aboutTimeline.fromTo(
            ".word-one",
            {
                x: -30,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out"
            },
            "-=0.45"
        );

        aboutTimeline.fromTo(
            ".word-two",
            {
                x: 30,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out"
            },
            "-=0.55"
        );
    }

});