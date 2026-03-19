/* ============================================================
   lang.js — i18n Engine / Language Switching Logic
   ============================================================ */

export const Lang = (() => {
  let current = 'en';
  const cache = {};

  async function load(code) {
    if (cache[code]) return cache[code];
    try {
      const res = await fetch(`/assets/i18n/${code}.json`);
      if (!res.ok) throw new Error(`Failed to load language: ${code}`);
      cache[code] = await res.json();
      return cache[code];
    } catch (err) {
      console.warn(`[Lang] Could not load "${code}", falling back to "en".`, err);
      if (code !== 'en') return load('en');
      return {};
    }
  }

  function get(strings, key) {
    // Supports dot notation AND array bracket notation: "gallery.items[0].caption"
    const parts = key.replace(/\[(\d+)\]/g, '.$1').split('.');
    return parts.reduce((obj, k) => obj?.[k], strings) ?? key;
  }

  async function set(code) {
    current = code;
    const strings = await load(code);

    // Update <html lang>
    document.documentElement.lang = code;

    // Japanese font class
    document.documentElement.classList.toggle('lang-ja', code === 'ja');

    // Swap text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = get(strings, el.dataset.i18n);
      if (val !== el.dataset.i18n) el.textContent = val;
    });

    // Swap HTML nodes
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = get(strings, el.dataset.i18nHtml);
      if (val !== el.dataset.i18nHtml) el.innerHTML = val;
    });

    // Swap placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = get(strings, el.dataset.i18nPlaceholder);
      if (val !== el.dataset.i18nPlaceholder) el.placeholder = val;
    });

    // Update tooltip content for all terms
    document.querySelectorAll('[data-term]').forEach(el => {
      const key = `terms.${el.dataset.term}`;
      el.dataset.tooltipContent = get(strings, key);
    });

    // Update alt text
    document.querySelectorAll(`[data-alt-${code}]`).forEach(el => {
      el.alt = el.dataset[`alt${code.charAt(0).toUpperCase() + code.slice(1)}`];
    });

    // Update <title>
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const val = get(strings, titleEl.dataset.i18n);
      if (val !== titleEl.dataset.i18n) document.title = val;
    }

    // Persist preference
    try { localStorage.setItem('kintsugi-lang', code); } catch (_) {}

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === code);
      btn.setAttribute('aria-pressed', btn.dataset.lang === code ? 'true' : 'false');
    });

    // Announce language change to screen readers
    const announcer = document.getElementById('lang-announcer');
    if (announcer) {
      const names = { en: 'English', tr: 'Turkish', ja: 'Japanese' };
      announcer.textContent = `Language changed to ${names[code] || code}`;
    }
  }

  function init() {
    let saved = 'en';
    try { saved = localStorage.getItem('kintsugi-lang') || 'en'; } catch (_) {}
    set(saved);
  }

  return { set, init, getCurrent: () => current };
})();
