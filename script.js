
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const navLinks = document.querySelectorAll(".nav-link");
    const serviceSearch = document.getElementById("serviceSearch");
    const serviceCards = document.querySelectorAll(".service-card");
    const noResults = document.getElementById("noResults");
    const currentYear = document.getElementById("currentYear");

    // Automatically update the copyright year.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile navigation.
    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });

        document.addEventListener("click", (event) => {
            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            }
        });
    }

    // Search government service cards.
    if (serviceSearch) {
        serviceSearch.addEventListener("input", () => {
            const searchTerm = serviceSearch.value
                .toLowerCase()
                .trim();

            let visibleCards = 0;

            serviceCards.forEach((card) => {
                const searchableText = (
                    card.textContent + " " + (card.dataset.search || "")
                ).toLowerCase();

                const matches = searchableText.includes(searchTerm);

                card.hidden = !matches;

                if (matches) {
                    visibleCards++;
                }
            });

            if (noResults) {
                noResults.hidden = visibleCards !== 0;
            }
        });
    }

    // Reveal sections as they enter the screen.
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Highlight the navigation link for the visible section.
    const sections = document.querySelectorAll("main section[id], main section.hero");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id || "home";

                    navLinks.forEach((link) => {
                        const linkTarget = link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            linkTarget === `#${sectionId}`
                        );
                    });
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }
});

