// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav){
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll for in-page anchors
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1){
      const el = document.querySelector(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      }
    }
  });
});

// Gallery filtering + lightbox
const select = document.getElementById('year-select');
const thumbs = document.querySelectorAll('.thumb');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (select){
  select.addEventListener('change', () => {
    const year = select.value;
    thumbs.forEach(t => {
      const y = t.getAttribute('data-year');
      t.style.display = (year === 'all' || y === year) ? '' : 'none';
    });
  });
}

thumbs.forEach(t => {
  t.addEventListener('click', () => {
    const img = t.querySelector('img');
    lightboxImg.src = img.src; // open original-size source
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

if (lightboxClose){
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  });
}

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox){
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }
});
