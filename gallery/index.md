---
layout: default
title: Gallery
---

# Photo Gallery

Browse photos from past editions. Select a year to view thumbnails; click a tile to open the original image.

<div class="gallery-toolbar">
  <label for="gallery-year">Year</label>
  <select id="gallery-year" aria-label="Select gallery year">
    {%- assign years = site.data.gallery | keys | sort | reverse -%}
    {%- for y in years -%}
      <option value="{{ y }}">{{ y }}</option>
    {%- endfor -%}
  </select>
</div>

<div class="gallery-grid">
  {%- assign years = site.data.gallery | keys | sort | reverse -%}
  {%- for y in years -%}
    {%- assign items = site.data.gallery[y] -%}
    {%- for img in items -%}
      <div class="gallery-group" data-year="{{ y }}">
        <a href="{{ img.file | relative_url }}" data-full="{{ img.file | relative_url }}" data-alt="{{ img.caption | escape }}" class="gallery-item" title="{{ img.caption | escape }}">
          <img loading="lazy" src="{{ img.thumb | default: img.file | relative_url }}" alt="{{ img.caption | escape }}" />
          <div class="caption">{{ img.caption }}</div>
        </a>
      </div>
    {%- endfor -%}
  {%- endfor -%}
</div>
