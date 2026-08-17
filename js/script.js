/* =========================================================
   TIMIFXXX MARKETING
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SMOOTH SCROLLING
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbar = document.querySelector(".navbar");

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       2. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(3, 9, 18, 0.94)";

            navbar.style.boxShadow =
                "0 10px 40px rgba(0, 0, 0, 0.18)";

        } else {

            navbar.style.background =
                "rgba(5, 11, 22, 0.82)";

            navbar.style.boxShadow =
                "none";
        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       3. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    const updateActiveNavigation = () => {

        if (!sections.length || !navLinks.length) {
            return;
        }

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach((link) => {

            const linkTarget =
                link.getAttribute("href");

            link.classList.remove("active");

            if (
                currentSection &&
                linkTarget === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       4. SERVICE CARD REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, .feature, .about-card, .contact-box"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach((element) => {

            element.classList.add(
                "scroll-reveal"
            );

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       5. SERVICE ORDER BUTTONS
       ===================================================== */

    const serviceButtons = document.querySelectorAll(
        ".service-button"
    );

    serviceButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const originalText =
                button.innerHTML;

            button.innerHTML =
                "Opening Telegram...";

            button.style.pointerEvents =
                "none";

            setTimeout(() => {

                button.innerHTML =
                    originalText;

                button.style.pointerEvents =
                    "";

            }, 1500);

        });

    });


    /* =====================================================
       6. CONTACT BUTTON
       ===================================================== */

    const contactButtons =
        document.querySelectorAll(
            ".contact-button, .nav-button"
        );

    contactButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const originalText =
                button.innerHTML;

            button.innerHTML =
                "Opening Telegram...";

            setTimeout(() => {

                button.innerHTML =
                    originalText;

            }, 1800);

        });

    });


    /* =====================================================
       7. BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons = document.querySelectorAll(
        ".primary-button, " +
        ".secondary-button, " +
        ".service-button, " +
        ".contact-button, " +
        ".nav-button, " +
        ".card-button"
    );

    buttons.forEach((button) => {

        button.addEventListener(
            "pointerdown",
            (event) => {

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "button-ripple";

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                button.appendChild(ripple);

                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =====================================================
       8. CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       9. PREVENT EMPTY LINKS
       ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    emptyLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {
                event.preventDefault();
            }
        );

    });


    /* =====================================================
       10. TELEGRAM ORDER TRACKING
       ===================================================== */

    const telegramLinks =
        document.querySelectorAll(
            'a[href*="t.me/timifxx203"]'
        );

    telegramLinks.forEach((link) => {

        link.addEventListener("click", () => {

            try {

                sessionStorage.setItem(
                    "lastTelegramVisit",
                    new Date().toISOString()
                );

            } catch (error) {

                console.log(
                    "Session storage unavailable."
                );

            }

        });

    });


    /* =====================================================
       11. PAGE LOAD ANIMATION
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       12. CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%c TimiFxxx Marketing ",
        "background:#229ed9;color:#fff;" +
        "padding:8px 12px;" +
        "border-radius:6px;" +
        "font-weight:bold;"
    );

    console.log(
        "Telegram Ads Marketing Website"
    );

});
