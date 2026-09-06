const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const meta = {
  profile: ['Profil', 'Double culture développement et qualité logicielle'],
  experience: ['Expérience', 'Contexte et défis des missions clés'],
  projects: ['Projets', 'Démonstrateurs QA, automatisation et preuves'],
  technologies: ['Technologies', 'Outils et pratiques QA']
};

function renderTimeline() {
  const timeline = $('#timeline');
  if (!timeline || typeof experienceData === 'undefined') return;
  timeline.innerHTML = experienceData.map(item => `
    <article class="timeline-item searchable" data-search="${[item.period,item.company,item.role,item.location,...item.tags,item.context,item.challenge].join(' ').toLowerCase()}">
      <div class="timeline-marker"><span></span></div>
      <div class="timeline-period"><strong>${item.period}</strong><small>${item.duration}</small></div>
      <div class="timeline-card card">
        <div class="timeline-card-head">
          <div><span class="company-kicker">${item.company}</span><h3>${item.role}</h3><p>${item.location}</p></div>
          <button class="collapse-btn" type="button" aria-label="Réduire ou développer l'expérience"><i class="fa-solid fa-chevron-up"></i></button>
        </div>
        <div class="tech-tags timeline-tags">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <div class="story-grid timeline-details">
          <section class="story-block context"><div class="story-icon"><i class="fa-regular fa-file-lines"></i></div><div><h4>Contexte</h4><p>${item.context}</p></div></section>
          <section class="story-block challenge"><div class="story-icon"><i class="fa-solid fa-bullseye"></i></div><div><h4>Défi</h4><p>${item.challenge}</p></div></section>
        </div>
      </div>
    </article>`).join('');

  $$('.collapse-btn', timeline).forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.timeline-card');
    card.classList.toggle('collapsed');
    btn.innerHTML = card.classList.contains('collapsed') ? '<i class="fa-solid fa-chevron-down"></i>' : '<i class="fa-solid fa-chevron-up"></i>';
  }));
}

function showSection(name, updateHash=true) {
  if (!meta[name]) name = 'profile';
  $$('.page-section').forEach(el => el.classList.toggle('active', el.id === `section-${name}`));
  $$('.nav-item, .subnav-item').forEach(el => el.classList.toggle('active', el.dataset.section === name));
  const title = $('#pageTitle'), subtitle = $('#pageSubtitle');
  if (title) title.textContent = meta[name][0];
  if (subtitle) subtitle.textContent = meta[name][1];
  if (updateHash) history.replaceState(null, '', `#${name}`);
  window.scrollTo({top:0, behavior:'smooth'});
  const sidebar = $('#sidebar'); if (window.innerWidth <= 780 && sidebar) sidebar.classList.remove('mobile-open');
  requestAnimationFrame(revealVisible);
}

function revealVisible() {
  $$('.page-section.active .reveal').forEach((el, i) => setTimeout(() => el.classList.add('is-visible'), Math.min(i*55, 280)));
}

function initNav() {
  $$('.nav-item, .subnav-item').forEach(item => item.addEventListener('click', () => showSection(item.dataset.section)));
  $$('[data-jump]').forEach(btn => btn.addEventListener('click', () => showSection(btn.dataset.jump)));
}

function initSidebar() {
  const sidebar = $('#sidebar'), shell = $('#appShell'), toggle = $('#sidebarToggle'), mobile = $('#mobileMenu');
  if (!sidebar || !shell) return;
  const collapsed = localStorage.getItem('qaSidebarCollapsed') === 'true';
  if (collapsed && window.innerWidth > 780) { sidebar.classList.add('collapsed'); shell.classList.add('sidebar-collapsed'); }
  const sync = () => { if (toggle) toggle.innerHTML = sidebar.classList.contains('collapsed') ? '<i class="fa-solid fa-chevron-right"></i>' : '<i class="fa-solid fa-chevron-left"></i>'; };
  sync();
  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed'); shell.classList.toggle('sidebar-collapsed');
    localStorage.setItem('qaSidebarCollapsed', String(sidebar.classList.contains('collapsed'))); sync();
  });
  mobile?.addEventListener('click', () => sidebar.classList.toggle('mobile-open'));
}

function initSearch() {
  const search = $('#globalSearch');
  if (!search) return;
  search.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    $$('.searchable').forEach(el => {
      const hay = (el.dataset.search || el.textContent).toLowerCase();
      el.classList.toggle('search-hidden', !!q && !hay.includes(q));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline(); initNav(); initSidebar(); initSearch();
  const hash = location.hash.replace('#','');
  showSection(meta[hash] ? hash : 'profile', false);
  revealVisible();
});
