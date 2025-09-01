(function(){
  // Lightweight hydration for Template2 preview interactivity without full React
  try {
    // Smooth scrolling for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        var target = this.getAttribute('href');
        if (target && target.startsWith('#')){
          e.preventDefault();
          var el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Resume button (if present) opens mailto or toggles modal
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
      a.addEventListener('click', function(){ /* noop - default mailto handled by browser */ });
    });

    // Make project image clicks open links
    document.querySelectorAll('.project-card img').forEach(img=>{
      var parent = img.closest('.project-card');
      if (parent){
        parent.style.cursor = 'pointer';
        parent.addEventListener('click', function(){
          var link = parent.querySelector('a');
          if (link && link.href) window.open(link.href, '_blank');
        });
      }
    });

    // Add simple tooltip hover for social icons
    document.querySelectorAll('a[style*="font-size:1.8rem"]').forEach(a=>{
      a.addEventListener('mouseenter', function(){ this.style.transform = 'scale(1.15) rotate(5deg)'; });
      a.addEventListener('mouseleave', function(){ this.style.transform = 'none'; });
    });

    // Make badges clickable to copy text
    document.querySelectorAll('.tech-pill, .skill-card, .project-card .tech span').forEach(el=>{
      el.addEventListener('click', function(){
        try{ navigator.clipboard.writeText(this.textContent.trim()); }
        catch(e){}
      });
    });

    // Prevent console errors in older browsers
    if (!window.__TEMPLATE2_HYDRATED__){ window.__TEMPLATE2_HYDRATED__ = true; }
  }catch(e){ console.error('Hydration script error', e); }
})();
