/* ── Gallery Filter ── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const emptyMsg    = document.getElementById('gallery-empty');

function applyMasonryTall() {
  const visible = [...galleryItems].filter(item => !item.hidden);
  visible.forEach((item, i) => {
    item.classList.toggle('gallery-item--tall', i % 3 === 0);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    galleryItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.hidden = !show;
      if (show) visibleCount++;
    });

    applyMasonryTall();
    emptyMsg.hidden = visibleCount > 0;
  });
});

applyMasonryTall();

/* ── Lightbox ── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCap = document.getElementById('lightbox-caption');
const btnClose    = document.getElementById('lightbox-close');
const btnPrev     = document.getElementById('lightbox-prev');
const btnNext     = document.getElementById('lightbox-next');

let currentIndex = 0;

function getVisibleItems() {
  return [...galleryItems].filter(item => !item.hidden);
}

function openLightbox(index) {
  const visible = getVisibleItems();
  if (!visible[index]) return;
  currentIndex = index;

  const img = visible[index].querySelector('img');
  const cap = visible[index].querySelector('.gallery-item__caption');

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCap.textContent = cap ? cap.textContent.trim() : '';

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  btnClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navigate(dir) {
  const visible = getVisibleItems();
  currentIndex = (currentIndex + dir + visible.length) % visible.length;
  openLightbox(currentIndex);
}

galleryItems.forEach(item => {
  item.querySelector('.gallery-item__btn').addEventListener('click', () => {
    const visible = getVisibleItems();
    openLightbox(visible.indexOf(item));
  });
});

btnClose.addEventListener('click', closeLightbox);
btnPrev.addEventListener('click', () => navigate(-1));
btnNext.addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')    closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

lightbox.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = [...lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')];
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
  }
});
