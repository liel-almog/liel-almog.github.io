document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

function closeMenu() {
    if (!menuToggle || !primaryNavigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNavigation.classList.remove("is-open");
}

if (menuToggle && primaryNavigation) {
    menuToggle.addEventListener("click", () => {
        const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
        menuToggle.setAttribute("aria-expanded", String(willOpen));
        primaryNavigation.classList.toggle("is-open", willOpen);
    });

    primaryNavigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMenu();
    });
}

document.querySelectorAll("[data-email-user][data-email-domain]").forEach((link) => {
    const { emailUser, emailDomain } = link.dataset;
    link.href = `mailto:${emailUser}@${emailDomain}`;
});

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateProject(selectedTab, moveFocus = false) {
    tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;

        const panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) {
            panel.hidden = !isSelected;
        }
    });

    if (moveFocus) {
        selectedTab.focus();
    }
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateProject(tab));
    tab.addEventListener("keydown", (event) => {
        let nextIndex;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
        }

        if (nextIndex !== undefined) {
            event.preventDefault();
            activateProject(tabs[nextIndex], true);
        }
    });
});

const initialTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
if (initialTab) {
    activateProject(initialTab);
}

panels.forEach((panel) => {
    const nodes = Array.from(panel.querySelectorAll(".architecture-node"));
    const detailTitle = panel.querySelector(".architecture-detail h4");
    const detailCopy = panel.querySelector(".architecture-detail div");

    function selectNode(selectedNode) {
        nodes.forEach((node) => node.setAttribute("aria-pressed", String(node === selectedNode)));

        if (detailTitle && detailCopy) {
            detailTitle.textContent = selectedNode.dataset.title;
            detailCopy.textContent = selectedNode.dataset.detail;
        }
    }

    nodes.forEach((node) => {
        node.addEventListener("click", () => selectNode(node));
        node.addEventListener("focus", () => selectNode(node));
    });
});

const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window) {
    const navigationObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

            if (!visibleEntry) return;

            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute("href") === `#${visibleEntry.target.id}`;
                if (isCurrent) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        },
        { rootMargin: "-25% 0px -60%", threshold: [0, 0.25, 0.5] },
    );

    observedSections.forEach((section) => navigationObserver.observe(section));
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(
    ".hero-copy, .ownership-card, .signal-grid > div, .section-heading, .timeline-item, .expertise-card, .system-explorer",
);

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    revealElements.forEach((element) => element.setAttribute("data-reveal", ""));

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}
