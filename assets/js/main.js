// Smooth-scroll for on-page anchors
(function () {
  function smoothScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  document.addEventListener("click", function (e) {
    const a = e.target.closest('a[href^="#"][href!="#"]');
    if (a && a.getAttribute("href")) {
      const id = a.getAttribute("href").slice(1);
      if (document.getElementById(id)) {
        e.preventDefault();
        smoothScrollTo(id);
      }
    }
  });
})();

// Past editions dropdown (click to open/close)
(function () {
  const d = document.getElementById("past-dropdown");
  if (!d) return;
  const b = d.querySelector(".dropbtn");
  b.addEventListener("click", () => {
    const o = d.classList.toggle("open");
    b.setAttribute("aria-expanded", String(o));
  });
  document.addEventListener("click", (e) => {
    if (!d.contains(e.target)) {
      d.classList.remove("open");
      b.setAttribute("aria-expanded", "false");
    }
  });
})();

// Mobile nav toggle
(function () {
  const t = document.querySelector(".nav-toggle");
  const l = document.querySelector(".nav-links");
  if (!t || !l) return;
  t.addEventListener("click", () => {
    const o = l.classList.toggle("open");
    t.setAttribute("aria-expanded", String(o));
  });
})();

// Gallery: optional year filter + lightbox
(function () {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return; // only run on the gallery page

  // Year filter is optional
  const yearSelect = document.getElementById("gallery-year");
  function applyFilter() {
    if (!yearSelect) return;
    const year = yearSelect.value;
    document.querySelectorAll(".gallery-group").forEach((group) => {
      group.style.display = group.dataset.year === String(year) ? "contents" : "none";
    });
  }
  if (yearSelect) {
    yearSelect.addEventListener("change", applyFilter);
    applyFilter(); // initial
  }

  // Lightbox
  const backdrop = document.createElement("div");
  backdrop.className = "lightbox-backdrop";
  backdrop.innerHTML =
    '<button class="lightbox-close" aria-label="Close">Close</button><div class="lightbox-content"></div>';
  document.body.appendChild(backdrop);

  const content = backdrop.querySelector(".lightbox-content");
  const closeBtn = backdrop.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    content.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    content.appendChild(img);
    backdrop.classList.add("open");
  }
  function closeLightbox() {
    backdrop.classList.remove("open");
  }

  grid.addEventListener("click", (e) => {
    const a = e.target.closest("a.gallery-item");
    if (!a) return;
    const full = a.getAttribute("data-full") || a.getAttribute("href");
    if (!full) return;
    e.preventDefault();
    openLightbox(full, a.getAttribute("data-alt") || a.getAttribute("title") || "");
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop || e.target === closeBtn) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
