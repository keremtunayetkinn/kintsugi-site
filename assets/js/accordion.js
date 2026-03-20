/* Smooth height animation for <details> accordion elements.
   We intercept the summary click to control open/close ourselves,
   because the browser hides content before the toggle event fires —
   making it impossible to read scrollHeight for the closing animation. */
document.querySelectorAll('#faq-accordion details').forEach(details => {
  const body    = details.querySelector('.accordion__body');
  const summary = details.querySelector('summary');
  if (!body || !summary) return;

  summary.addEventListener('click', e => {
    e.preventDefault();

    if (details.open) {
      body.style.transition = 'max-height var(--transition-smooth)';
      body.style.overflow   = 'hidden';
      body.style.maxHeight  = body.scrollHeight + 'px';
      body.getBoundingClientRect();
      body.style.maxHeight  = '0';

      body.addEventListener('transitionend', () => {
        details.removeAttribute('open');
        body.style.maxHeight = '';
        body.style.overflow  = '';
        body.style.transition = '';
      }, { once: true });

    } else {
      details.setAttribute('open', '');
      body.style.transition = 'max-height var(--transition-smooth)';
      body.style.overflow   = 'hidden';
      body.style.maxHeight  = '0';
      body.getBoundingClientRect();
      body.style.maxHeight  = body.scrollHeight + 'px';

      body.addEventListener('transitionend', () => {
        body.style.maxHeight = 'none';
        body.style.overflow  = '';
        body.style.transition = '';
      }, { once: true });
    }
  });
});
