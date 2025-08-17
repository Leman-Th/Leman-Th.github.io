LemanTh Root Website (Jekyll) — v3
==================================

What changed:
- **Markdown rendering fixed**: `index.md` now uses pure Markdown with kramdown ID attributes (e.g., `## Schedule {: #schedule }`) instead of wrapping Markdown inside raw HTML blocks, which can suppress Markdown parsing.
- Navbar order: Gallery before Past editions.
- Banner placeholder at `assets/img/LemanTh.png` remains.
- Dropdown CSS remains scoped to navbar.

Deploy:
1) Unzip into the root of `leman-th.github.io`.
2) Commit & push.
3) If caching interferes, hard refresh or add `?v=3` to the URL.
