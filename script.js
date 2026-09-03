/* =========================================
   SCROLL ANIMATION
========================================= */

const animatedElements = document.querySelectorAll(
    ".program-card, .stat-card, .about-content, .about-card, .donation-card, .quote-card"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach((element) => {
    observer.observe(element);
});


/* =========================================
   PROGRESS BAR
========================================= */

const progressBars = document.querySelectorAll(".progress-bar");

const progressObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const progress = entry.target.dataset.progress || 0;

                entry.target.style.width = progress + "%";

                progressObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.4
    }
);


progressBars.forEach((bar) => {
    progressObserver.observe(bar);
});


/* =========================================
   HEADER SHADOW SAAT SCROLL
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 10px 30px rgba(4,45,35,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   TAHUN OTOMATIS
========================================= */

const yearElement = document.querySelector(".footer-bottom");

if (yearElement) {

    const currentYear = new Date().getFullYear();

    yearElement.innerHTML =
        `© ${currentYear} Yayasan Peduli Kalimantan. Semua hak dilindungi.`;

}