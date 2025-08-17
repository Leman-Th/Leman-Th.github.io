// Smooth-scroll for on-page anchors
(function() {
  function smoothScrollTo(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  document.addEventListener('click', function(e) {
    const a = e.target.closest('a[href^="#"][href!="#"]');
    if (a && a.getAttribute('href')) {
      const id = a.getAttribute('href').slice(1);
      if (document.getElementById(id)) {
        e.preventDefault();
        smoothScrollTo(id);
      }
    }
  });
})();

// Dropdown: click to open/close; close on outside click
(function() {
  const dropdown = document.getElementById('past-dropdown');
  if (!dropdown) return;
  const btn = dropdown.querySelector('.dropbtn');
  btn.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Mobile nav toggle
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

// Gallery filtering + lightbox
(function() {
  const yearSelect = document.getElementById('gallery-year');
  const grid = document.querySelector('.gallery-grid');
  if (!yearSelect || !grid) return; // only on gallery page

  function applyFilter() {
    const year = yearSelect.value;
    document.querySelectorAll('.gallery-group').forEach(group => {
      group.style.display = (group.dataset.year === year) ? 'contents' : 'none';
    });
  }

  yearSelect.addEventListener('change', applyFilter);
  applyFilter();

  // Lightbox
  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';
  backdrop.innerHTML = '<button class="lightbox-close" aria-label="Close">Close</button><div class="lightbox-content"></div>';
  document.body.appendChild(backdrop);
  const content = backdrop.querySelector('.lightbox-content');
  const closeBtn = backdrop.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    content.innerHTML = '';
    const img = document.createElement('img');
    img.src = src; img.alt = alt || '';
    content.appendChild(img);
    backdrop.classList.add('open');
  }
  function closeLightbox() { backdrop.classList.remove('open'); }

  grid.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-full]');
    if (!a) return;
    e.preventDefault();
    openLightbox(a.getAttribute('data-full'), a.getAttribute('data-alt') || '');
  });
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target === closeBtn) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();
