/*=====================================================================
  COMPASSION AFRICA INITIATIVE — SHARED SITE JS
  Loaded on every page. Handles the mobile menu, dark-mode toggle,
  the scroll-to-top button, and the footer year. Page-specific
  behaviour (image sliders, carousels, forms) stays inline on that page.
=====================================================================*/

// ---------- Mobile menu ----------
function toggleMenu() {
    document.querySelector('.mobile-menu')?.classList.toggle('active');
}

document.addEventListener('click', function (event) {
    const menu = document.querySelector('.mobile-menu');
    const icon = document.querySelector('.menu-icon');
    if (!menu || !icon) return;
    if (menu.classList.contains('active') && !menu.contains(event.target) && !icon.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// ---------- Dark mode ----------
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('cai-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    document.querySelectorAll('.themeIcon').forEach(icon => {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

(function applyStoredTheme() {
    if (localStorage.getItem('cai-theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.themeIcon').forEach(icon => {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            });
        });
    }
})();

// ---------- Donate redirect (used by the header Donate button) ----------
function redirectToPage() {
    const prefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
    window.location.href = prefix + 'donation.html';
}

// ---------- Scroll-to-top with progress ring ----------
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('scrollToTop');
    const progress = document.getElementById('progress');
    if (!btn) return;

    const circumference = 2 * Math.PI * 22; // r=22, matches the SVG circle
    if (progress) progress.style.strokeDasharray = circumference;

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;

        btn.classList.toggle('show', scrollTop > 300);
        if (progress) progress.style.strokeDashoffset = circumference * (1 - scrolled);
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});