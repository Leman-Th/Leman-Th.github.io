// Smooth-scroll for on-page anchors
(function() {
  function smoothScrollTo(id){const el=document.getElementById(id);if(!el)return;const y=el.getBoundingClientRect().top+window.pageYOffset-72;window.scrollTo({top:y,behavior:'smooth'});}
  document.addEventListener('click',function(e){const a=e.target.closest('a[href^="#"][href!="#"]');if(a&&a.getAttribute('href')){const id=a.getAttribute('href').slice(1);if(document.getElementById(id)){e.preventDefault();smoothScrollTo(id);}}});
})();
// Dropdown
(function(){const d=document.getElementById('past-dropdown');if(!d)return;const b=d.querySelector('.dropbtn');b.addEventListener('click',()=>{const o=d.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});document.addEventListener('click',e=>{if(!d.contains(e.target)){d.classList.remove('open');b.setAttribute('aria-expanded','false');}});})();
// Mobile nav toggle
(function(){const t=document.querySelector('.nav-toggle');const l=document.querySelector('.nav-links');if(!t||!l)return;t.addEventListener('click',()=>{const o=l.classList.toggle('open');t.setAttribute('aria-expanded',String(o));});})();
// Gallery filtering + lightbox
(function(){
  const yearSelect=document.getElementById('gallery-year');const grid=document.querySelector('.gallery-grid');if(!yearSelect||!grid)return;
  function apply(){const y=yearSelect.value;document.querySelectorAll('.gallery-group').forEach(g=>{g.style.display=(g.dataset.year===y)?'contents':'none';});}
  yearSelect.addEventListener('change',apply);apply();
  const backdrop=document.createElement('div');backdrop.className='lightbox-backdrop';backdrop.innerHTML='<button class="lightbox-close" aria-label="Close">Close</button><div class="lightbox-content"></div>';document.body.appendChild(backdrop);
  const content=backdrop.querySelector('.lightbox-content');const closeBtn=backdrop.querySelector('.lightbox-close');
  function open(src,alt){content.innerHTML='';const img=document.createElement('img');img.src=src;img.alt=alt||'';content.appendChild(img);backdrop.classList.add('open');}
  function close(){backdrop.classList.remove('open');}
  grid.addEventListener('click',e=>{const a=e.target.closest('a[data-full]');if(!a)return;e.preventDefault();open(a.getAttribute('data-full'),a.getAttribute('data-alt')||'');});
  backdrop.addEventListener('click',e=>{if(e.target===backdrop||e.target===closeBtn)close();});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();