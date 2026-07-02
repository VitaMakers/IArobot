(() => {
  'use strict';

  const CATALOG = [
    { key: 'locais', label: 'Negócios locais', c1: '#262a30', c2: '#0e1013', segs: ['Loja', 'Restaurante', 'Barbearia', 'Academia'] },
    { key: 'liberais', label: 'Profissionais liberais', c1: '#23262f', c2: '#0d0f13', segs: ['Advogados', 'Estética', 'Dentistas', 'Contadores'] },
    { key: 'institucionais', label: 'Institucional', c1: '#24272f', c2: '#0d0e12', segs: ['Indústria', 'Saúde', 'Educação'] },
    { key: 'publicidade', label: 'Publicidade', c1: '#2b2531', c2: '#100d14', segs: ['Campanhas', 'Lançamentos', 'Promoções'] },
    { key: 'clipes', label: 'Clipes', c1: '#1f2a2a', c2: '#0b1010', segs: ['Musicais', 'Aftermovie', 'Documental'] },
    { key: 'eventos', label: 'Eventos', c1: '#2c2822', c2: '#12100b', segs: ['Corporativo', 'Social', 'Festivais'] },
    { key: 'formatos', label: 'Formatos de edição', c1: '#25242f', c2: '#0d0d13', segs: ['Reels', 'Cortes', 'VSL', 'Motion'] },
  ];

  const BRANDS = [
    ['Meridian', '#2563eb'], ['Aurora', '#e11d48'], ['Loja Norte', '#059669'],
    ['Prumo', '#d97706'], ['Sabor Local', '#7c3aed'], ['Studio Vibe', '#0891b2'], ['Nova Casa', '#db2777'],
  ];

  const state = { cat: 'locais', seg: 0 };

  const tabsEl = document.getElementById('tabs');
  const chipsEl = document.getElementById('segmentChips');
  const gridEl = document.getElementById('videoGrid');
  const marqueeEl = document.getElementById('marqueeTrack');

  function coverStyle(cat) {
    return `background-image:repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0 2px,transparent 2px 12px),linear-gradient(160deg,${cat.c1},${cat.c2});background-color:${cat.c2}`;
  }

  function renderMarquee() {
    const spans = BRANDS.map(([name, color]) =>
      `<span class="brand-name" style="color:${color}">${name}</span>`
    ).join('');
    // Rendered twice back-to-back so translateX(-50%) loops seamlessly.
    marqueeEl.innerHTML = spans + spans;
  }

  function renderTabs() {
    tabsEl.innerHTML = CATALOG.map((cat) => {
      const active = cat.key === state.cat;
      return `<button type="button" class="tab${active ? ' tab--active' : ''}" data-cat="${cat.key}">${cat.label}</button>`;
    }).join('');
  }

  function renderSegments(current) {
    chipsEl.innerHTML = current.segs.map((name, i) => {
      const active = i === state.seg;
      return `<button type="button" class="segment-chip${active ? ' segment-chip--active' : ''}" data-seg="${i}">${name}</button>`;
    }).join('');
  }

  function renderVideos(current, segName) {
    const cover = coverStyle(current);
    const cards = [0, 1, 2, 3].map((i) => `
      <div class="video-card">
        <div class="video-cover" style="${cover}">
          <div class="video-cover-shade"></div>
          <span class="video-play"><svg width="15" height="15" viewBox="0 0 24 24"><polygon points="8 5 19 12 8 19" fill="#fff"></polygon></svg></span>
          <span class="video-badge">${segName}</span>
          <div class="video-title">${segName} · Vídeo ${i + 1}</div>
        </div>
      </div>
    `).join('');
    gridEl.innerHTML = cards;
  }

  function render() {
    const current = CATALOG.find((c) => c.key === state.cat) || CATALOG[0];
    state.seg = Math.min(state.seg, current.segs.length - 1);
    const segName = current.segs[state.seg];
    renderTabs();
    renderSegments(current);
    renderVideos(current, segName);
  }

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    state.cat = btn.dataset.cat;
    state.seg = 0;
    render();
  });

  chipsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.segment-chip');
    if (!btn) return;
    state.seg = Number(btn.dataset.seg);
    render();
  });

  renderMarquee();
  render();

  // ── Showreel modal ──────────────────────────────────────────────
  const reelModal = document.getElementById('reelModal');
  const openReelBtn = document.getElementById('openReel');
  const closeReelBtn = document.getElementById('closeReel');

  function openReel() { reelModal.hidden = false; }
  function closeReel() { reelModal.hidden = true; }

  openReelBtn.addEventListener('click', openReel);
  closeReelBtn.addEventListener('click', closeReel);
  reelModal.addEventListener('click', (e) => {
    if (e.target === reelModal) closeReel();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !reelModal.hidden) closeReel();
  });
})();
