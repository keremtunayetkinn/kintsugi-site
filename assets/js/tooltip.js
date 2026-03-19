/* ============================================================
   tooltip.js — Tooltip / Popover Behavior on Term Hover
   ============================================================ */

export const Tooltip = (() => {
  let el, termEl, defEl;

  function init() {
    el = document.getElementById('tooltip');
    if (!el) return;

    termEl = el.querySelector('.tooltip__term');
    defEl  = el.querySelector('.tooltip__definition');

    document.querySelectorAll('.term').forEach(term => {
      term.addEventListener('mouseenter', show);
      term.addEventListener('mouseleave', hide);
      term.addEventListener('focus',      show);
      term.addEventListener('blur',       hide);
      term.addEventListener('touchstart', toggle, { passive: true });
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.term')) hide();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') hide();
    });
  }

  function show(e) {
    const target = e.currentTarget;
    termEl.textContent = target.textContent.trim();
    defEl.textContent  = target.dataset.tooltipContent || '—';

    el.classList.add('visible');
    position(e);
  }

  function hide() {
    el.classList.remove('visible');
  }

  function toggle(e) {
    el.classList.contains('visible') ? hide() : show(e);
  }

  function position(e) {
    const rect    = e.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY;

    // Force layout so offsetWidth/offsetHeight are correct
    el.style.visibility = 'hidden';
    el.style.top  = '0';
    el.style.left = '0';
    el.style.transform = 'none';        // suppress CSS transform during measurement
    const tooltipW = el.offsetWidth  || 280;
    const tooltipH = el.offsetHeight || 80;
    el.style.transform = '';            // restore — CSS handles the translateY slide animation
    el.style.visibility = '';

    // Center horizontally on the term (exact pixel; no JS translateX needed)
    let left = rect.left + rect.width / 2 - tooltipW / 2;

    // Prevent overflow right
    if (left + tooltipW > window.innerWidth - 16) {
      left = window.innerWidth - tooltipW - 16;
    }
    // Prevent overflow left
    if (left < 16) {
      left = 16;
    }

    // Prefer below the term; flip above if it would overflow the viewport bottom
    let top = rect.bottom + scrollY + 8;
    if (rect.bottom + tooltipH + 8 > window.innerHeight) {
      top = rect.top + scrollY - tooltipH - 8;
    }

    el.style.top  = `${top}px`;
    el.style.left = `${left}px`;
    // No inline transform — CSS owns the translateY slide-in/out animation
  }

  return { init };
})();
