/* ============================================================
   nav.js — Mobile Nav Toggle + Active State + Smooth Scroll
   ============================================================ */

export const Nav = (() => {
  function init() {
    setActiveLink();
    initMobileToggle();
    initSmoothScroll();
  }

  /* Mark the current page's nav link as active */
  function setActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.main-nav a').forEach(link => {
      const href = link.getAttribute('href');
      const linkPath = new URL(href, window.location.origin).pathname;

      const isHome = (path === '/' || path.endsWith('/index.html'));
      const isLinkHome = (linkPath === '/' || linkPath.endsWith('/index.html'));

      const match = isHome ? isLinkHome : (path === linkPath || path.endsWith(linkPath));
      link.classList.toggle('active', match);
      if (match) link.setAttribute('aria-current', 'page');
    });
  }

  /* Hamburger toggle */
  function initMobileToggle() {
    const toggle = document.querySelector('.nav-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav on outside click (overlay)
    document.addEventListener('click', e => {
      if (
        document.body.classList.contains('nav-open') &&
        !e.target.closest('.main-nav') &&
        !e.target.closest('.nav-toggle')
      ) {
        closeNav();
      }
    });

    // Close nav on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        closeNav();
        toggle.focus();
      }
    });

    // Close nav when a link is clicked
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  /* Smooth scroll for anchor links */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  return { init };
})();
