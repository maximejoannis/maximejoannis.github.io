(() => {
  const state = { headings: [] };
  const q = (s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];

  function slugify(text){return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');}
  function buildToc(){
    const doc=q('#reviewDocument'), toc=q('#reviewToc'); if(!doc||!toc)return;
    state.headings=qa('h1,h2,h3',doc); toc.innerHTML='';
    state.headings.forEach((h,i)=>{h.id=h.id||slugify(h.textContent)||`section-${i+1}`; const a=document.createElement('a'); a.href=`#${h.id}`; a.className=`toc-link toc-${h.tagName.toLowerCase()}`; a.textContent=h.textContent; a.onclick=()=>{if(innerWidth<=980)q('#reviewSidebar')?.classList.remove('open')}; toc.appendChild(a);});
  }
  function update(){
    const max=document.documentElement.scrollHeight-innerHeight, y=scrollY; const p=q('#reviewProgress'); if(p)p.style.width=`${max>0?Math.min(100,y/max*100):0}%`;
    q('#reviewBackTop')?.classList.toggle('visible',y>650);
    let active=state.headings[0]; state.headings.forEach(h=>{if(h.getBoundingClientRect().top<=150)active=h;});
    qa('.toc-link').forEach(a=>a.classList.toggle('active',active && a.getAttribute('href')===`#${active.id}`));
  }
  window.reviewNavigationInit=()=>{buildToc();update();addEventListener('scroll',update,{passive:true});q('#reviewBackTop')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));q('#reviewTocToggle')?.addEventListener('click',()=>q('#reviewSidebar')?.classList.toggle('open'));};
})();
