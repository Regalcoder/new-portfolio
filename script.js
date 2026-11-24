/* ==========================================================================
   KENNETH NDUBUEZE — PRODUCTION PORTFOLIO INTERACTIONS
   ========================================================================== */

// Paste your Loom share or embed URL here once recorded (e.g. "https://www.loom.com/share/...")
// Leaving this empty automatically shows the polished "Walkthrough Coming Soon / Request Invite" modal.
const DEMO_LOOM_URL = "";

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initCursorGlow();
    initScrollAvatar();
    initScrollSpy();
    initCategoryFilters();
    initDemoModal();
});

/* --------------------------------------------------------------------------
   1. DARK / LIGHT THEME TOGGLE
   -------------------------------------------------------------------------- */
function initTheme() {
    const html = document.documentElement;
    const toggleBtn = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    const applyTheme = (theme) => {
        html.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
        if (theme === "light") {
            themeIcon.className = "fa-solid fa-moon";
            themeText.textContent = "Dark Mode";
        } else {
            themeIcon.className = "fa-solid fa-sun";
            themeText.textContent = "Light Mode";
        }
    };

    const saved = localStorage.getItem("portfolio-theme") || "dark";
    applyTheme(saved);

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(next);
        });
    }
}

/* --------------------------------------------------------------------------
   2. SUBTLE AMBIENT CURSOR SPOTLIGHT (DESKTOP)
   -------------------------------------------------------------------------- */
function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.addEventListener("pointermove", (e) => {
        glow.style.setProperty("--mouse-x", `${e.clientX}px`);
        glow.style.setProperty("--mouse-y", `${e.clientY}px`);
    }, { passive: true });
}


/* --------------------------------------------------------------------------
   2B. SCROLL-REACTIVE COLLAPSING SIDEBAR AVATAR (DESKTOP > 1080px ONLY)
   Shrinks from 200x250 oval to 82x82 circle past 80px; expands below 24px.
   -------------------------------------------------------------------------- */
function initScrollAvatar() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    const desktopQuery = window.matchMedia("(min-width: 1081px)");
    const SHRINK_AT = 80;
    const EXPAND_AT = 24;
    let isCompact = false;
    let ticking = false;

    const updateSidebarState = () => {
        ticking = false;

        if (!desktopQuery.matches) {
            if (isCompact) {
                isCompact = false;
                sidebar.classList.remove("is-scrolled");
            }
            return;
        }

        const scrollY = window.scrollY || window.pageYOffset;
        if (!isCompact && scrollY > SHRINK_AT) {
            isCompact = true;
            sidebar.classList.add("is-scrolled");
        } else if (isCompact && scrollY < EXPAND_AT) {
            isCompact = false;
            sidebar.classList.remove("is-scrolled");
        }
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateSidebarState);
            ticking = true;
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", updateSidebarState);
    } else if (typeof desktopQuery.addListener === "function") {
        desktopQuery.addListener(updateSidebarState);
    }
    updateSidebarState();
}

/* --------------------------------------------------------------------------
   3. STICKY SIDEBAR SCROLL-SPY NAVIGATION
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll(".content-section[id]");
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");

    if (!sections.length || !navItems.length) return;

    const setActive = (id) => {
        navItems.forEach((link) => {
            const isMatch = link.getAttribute("data-section") === id;
            link.classList.toggle("active", isMatch);
            if (isMatch) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-20% 0px -65% 0px",
            threshold: 0
        }
    );

    sections.forEach((sec) => observer.observe(sec));

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("data-section");
            if (targetId) setActive(targetId);
        });
    });
}

/* --------------------------------------------------------------------------
   4. EXACT-TOKEN CATEGORY FILTERING (SYNCED ACROSS FEATURED + ARCHIVE)
   -------------------------------------------------------------------------- */
function initCategoryFilters() {
    const filterButtons = document.querySelectorAll(".filter-pill[data-filter]");
    const items = document.querySelectorAll(".filterable-item");
    const counter = document.getElementById("projectCounter");
    const featuredGrid = document.getElementById("featuredGrid");
    const archiveSection = document.getElementById("archive");

    if (!filterButtons.length || !items.length) return;

    const applyFilter = (category) => {
        let totalVisible = 0;
        let featuredGridVisible = 0;
        let archiveVisible = 0;

        items.forEach((item) => {
            const tokens = (item.getAttribute("data-category") || "")
                .trim()
                .split(/\s+/)
                .filter(Boolean);
            const matches = category === "all" || tokens.includes(category);

            item.classList.toggle("is-hidden", !matches);

            if (matches) {
                totalVisible += 1;
                if (item.getAttribute("data-tier") === "archive") {
                    archiveVisible += 1;
                } else if (item.classList.contains("project-card")) {
                    featuredGridVisible += 1;
                }
            }
        });

        if (featuredGrid) {
            featuredGrid.classList.toggle("is-hidden", featuredGridVisible === 0);
        }

        if (archiveSection) {
            archiveSection.classList.toggle("is-hidden", archiveVisible === 0);
        }

        if (counter) {
            counter.textContent = `Showing ${totalVisible} ${totalVisible === 1 ? "project" : "projects"}`;
        }
    };

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selected = btn.getAttribute("data-filter");
            filterButtons.forEach((b) => {
                const isActive = b === btn;
                b.classList.toggle("active", isActive);
                b.setAttribute("aria-pressed", String(isActive));
            });
            applyFilter(selected);
        });
    });
}

/* --------------------------------------------------------------------------
   5. REMOTEAFRICA 60-SECOND DEMO MODAL
   -------------------------------------------------------------------------- */
function initDemoModal() {
    const modal = document.getElementById("demoModal");
    const openBtn = document.getElementById("openDemoBtn");
    const closeBtn = document.getElementById("closeDemoBtn");
    const body = document.getElementById("demoModalBody");

    if (!modal || !openBtn || !closeBtn || !body) return;

    const toLoomEmbedUrl = (url) => {
        if (!url) return "";
        return url.replace("/share/", "/embed/");
    };

    const renderModalBody = () => {
        const embedUrl = toLoomEmbedUrl(DEMO_LOOM_URL.trim());
        if (embedUrl) {
            body.innerHTML = `
                <div class="loom-embed-wrap">
                    <iframe
                        src="${embedUrl}"
                        title="RemoteAfrica 60-second product walkthrough"
                        allowfullscreen
                    ></iframe>
                </div>
            `;
        } else {
            body.innerHTML = `
                <div class="demo-placeholder">
                    <div class="demo-placeholder-icon">
                        <i class="fa-solid fa-clapperboard" aria-hidden="true"></i>
                    </div>
                    <h4>60-Second Walkthrough Recording In Progress</h4>
                    <p>
                        RemoteAfrica is currently in invite-only beta. A concise 60-second walkthrough covering AI job matching, automated CV tailoring, and lead tracking is being finalized—or request direct invite access below.
                    </p>
                    <div class="demo-placeholder-actions">
                        <a href="mailto:ndubuezekenny@gmail.com?subject=RemoteAfrica%20Private%20Beta%20Invite%20Request" class="btn-primary">
                            <i class="fa-regular fa-envelope" aria-hidden="true"></i>
                            <span>Request Private Invite</span>
                        </a>
                        <a href="https://ai-job-hunter-private.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-outline">
                            <span>Open Live Instance</span>
                            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            `;
        }
    };

    const openModal = () => {
        renderModalBody();
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = "";
        body.innerHTML = "";
        openBtn.focus();
    };

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) closeModal();
    });
}
