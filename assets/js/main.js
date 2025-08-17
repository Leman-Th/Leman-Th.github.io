// Smooth-scroll for on-page anchors (supports "#id" and "/#id")
(function () {
  function smoothScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 72; // sticky nav offset
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  document.addEventListener("click", function (e) {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;

    // Case 1: pure in-page hash link ("#about")
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (document.getElementById(id)) {
        e.preventDefault();
        smoothScrollTo(id);
        history.replaceState(null, "", "#" + id);
      }
      return;
    }

    // Case 2: root-anchored hash link ("/#about")
    try {
      const url = new URL(a.href, window.location.origin);
      const isRootAnchor = url.hash && url.pathname === "/";
      const onRoot = location.pathname === "/";
      if (isRootAnchor && onRoot) {
        const id = url.hash.slice(1);
        if (document.getElementById(id)) {
          e.preventDefault();
          smoothScrollTo(id);
          history.replaceState(null, "", "#" + id);
        }
      }
    } catch (_) {
      /* ignore invalid URLs */
    }
  });
})();

// Past editions dropdown (click to open/close)
(function () {
  const d = document.getElementById("past-dropdown");
  if (!d) return;
  const b = d.querySelector(".dropbtn");
  if (!b) return;

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

// Gallery: optional year filter + lightbox overlay
(function () {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return; // only run on the gallery page

  // Optional year filter
  const yearSelect = document.getElementById("gallery-year");
  function applyFilter() {
    if (!yearSelect) return;
    const year = String(yearSelect.value);
    document.querySelectorAll(".gallery-group").forEach((group) => {
      group.style.display = group.dataset.year === year ? "contents" : "none";
    });
  }
  if (yearSelect) {
    yearSelect.addEventListener("change", applyFilter);
    applyFilter(); // initial
  }

  // Lightbox overlay
  const backdrop = document.createElement("div");
  backdrop.className = "lightbox-backdrop";
  backdrop.innerHTML =
    '<button class="lightbox-close" aria-label="Close">Close</button><div class="lightbox-content"></div>';
  document.body.appendChild(backdrop);

  const content = backdrop.querySelector(".lightbox-content");
  const closeBtn = backdrop.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    if (!src) return;
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
    const alt = a.getAttribute("data-alt") || a.getAttribute("title") || "";
    e.preventDefault();
    openLightbox(full, alt);
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop || e.target === closeBtn) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
