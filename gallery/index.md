---
layout: default
title: Gallery
years: [2025, 2024]
---

# Photo Gallery

Browse photos from past editions. Select a year to view thumbnails; click a tile to open the original image.

<div class="gallery-toolbar">
  <label for="gallery-year">Year</label>
  <select id="gallery-year" aria-label="Select gallery year">
    {% for y in page.years %}
      <option value="{{ y }}">{{ y }}</option>
    {% endfor %}
  </select>
</div>

{% assign all = site.static_files | where_exp: "f", "f.path contains '/assets/gallery/'" %}
{% assign all = all | where_exp: "f", "f.extname == '.jpg' or f.extname == '.jpeg' or f.extname == '.png' or f.extname == '.gif' or f.extname == '.webp'" %}
{% assign all = all | sort: "path" %}

<div class="gallery-grid">
  {% for y in page.years %}
    {% assign prefix = '/assets/gallery/' | append: y | append: '/' %}
    {% assign imgs = all | where_exp: "f", "f.path contains prefix" %}
    {% for f in imgs %}
      <div class="gallery-group" data-year="{{ y }}">
        <a href="{{ f.path | relative_url }}" data-full="{{ f.path | relative_url }}" data-alt="{{ f.name | escape }}" class="gallery-item" title="{{ f.name | escape }}">
          <img loading="lazy" src="{{ f.path | relative_url }}" alt="{{ f.name | escape }}" />
          <div class="caption">{{ f.name }}</div>
        </a>
      </div>
    {% endfor %}
  {% endfor %}
</div>
