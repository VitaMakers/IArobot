(() => {
  'use strict';

  // ===================================================================
  //  🎬 SEUS VÍDEOS — adicione aqui
  //  Copie uma linha, troque os valores e pronto. Campos:
  //   aba:      chave da aba -> locais | liberais | institucionais |
  //             publicidade | clipes | eventos | formatos
  //   segmento: nome EXATO do segmento (igual aparece no chip)
  //   titulo:   texto que aparece no card
  //   youtube:  o ID do vídeo (o pedaço depois de /shorts/ , v= ou youtu.be/)
  //             ex.: https://youtube.com/shorts/aui4-NVT76Y  ->  'aui4-NVT76Y'
  // ===================================================================
  const VIDEOS = [
    { aba: 'liberais', segmento: 'Advogados', titulo: 'Vídeo de teste', youtube: 'aui4-NVT76Y' },
  ];
  // ===================================================================

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

  // ── Estilos do player + cards clicáveis (injetados, pra não precisar mexer no CSS) ──
  const STYLE = `
    .video-card--live{cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
    .video-card--live:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.25);box-shadow:0 18px 40px -18px rgba(0,0,0,.7)}
    .video-card--live:focus-visible{outline:2px solid var(--pf-accent,#fff);outline-offset:2px}
    .video-modal{position:fixed;inset:0;z-index:110;background:rgba(6,6,8,.88);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:24px}
    .video-modal[hidden]{display:none}
    .video-modal-card{position:relative}
    .video-modal-frame{aspect-ratio:9/16;height:min(85vh,880px);max-width:92vw;border-radius:16px;overflow:hidden;background:#000;box-shadow:0 30px 80px rgba(0,0,0,.55)}
    .video-modal-frame iframe{width:100%;height:100%;border:0;display:block}
    .video-modal-close{position:absolute;top:10px;right:10px;z-index:2;width:40px;height:40px;border-radius:50%;border:none;background:rgba(255,255,255,.95);color:#0a0a0a;font-size:26px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.35)}
  `;

  const MODAL_HTML = `
    <div class="video-modal" id="videoModal" hidden>
      <div class="video-modal-card">
        <button class="video-modal-close" id="closeVideo" aria-label="Fechar vídeo">&times;</button>
        <div class="video-modal-frame">
          <iframe id="videoFrame" src="" title="Vídeo do portfólio" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>
    </div>`;

  function injectPlayer() {
    if (!document.getElementById('vc-player-style')) {
      const st = document.createElement('style');
      st.id = 'vc-player-style';
      st.textContent = STYLE;
      document.head.appendChild(st);
    }
    if (!document.getElementById('videoModal')) {
      const wrap = document.createElement('div');
      wrap.innerHTML = MODAL_HTML.trim();
      document.body.appendChild(wrap.firstChild);
    }
  }

  const state = { cat: 'locais', seg: 0 };

  const tabsEl = document.getElementById('tabs');
  const chipsEl = document.getElementById('segmentChips');
  const gridEl = document.getElementById('videoGrid');
  const marqueeEl = document.getElementById('marqueeTrack');

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  function coverStyle(cat) {
    return `background-image:repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0 2px,transparent 2px 12px),linear-gradient(160deg,${cat.c1},${cat.c2});background-color:${cat.c2}`;
  }

  const PLAY_ICON = '<svg width="15" height="15" viewBox="0 0 24 24"><polygon points="8 5 19 12 8 19" fill="#fff"></polygon></svg>';

  function renderMarquee() {
    const spans = BRANDS.map(([name, color]) =>
      `<span class="brand-name" style="color:${color}">${escapeHtml(name)}</span>`
    ).join('');
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
      return `<button type="button" class="segment-chip${active ? ' segment-chip--active' : ''}" data-seg="${i}">${escapeHtml(name)}</button>`;
    }).join('');
  }

  function realCard(v, segName) {
    const thumb = `https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg`;
    return `
      <div class="video-card video-card--live" data-yt="${escapeHtml(v.youtube)}" role="button" tabindex="0" aria-label="Assistir: ${escapeHtml(v.titulo)}">
        <div class="video-cover" style="background-image:url('${thumb}');background-size:cover;background-position:center;background-color:#0b0b0d">
          <div class="video-cover-shade"></div>
          <span class="video-play">${PLAY_ICON}</span>
          <span class="video-badge">${escapeHtml(segName)}</span>
          <div class="video-title">${escapeHtml(v.titulo)}</div>
        </div>
      </div>`;
  }

  function placeholderCard(current, segName, i) {
    const cover = coverStyle(current);
    return `
      <div class="video-card">
        <div class="video-cover" style="${cover}">
          <div class="video-cover-shade"></div>
          <span class="video-play">${PLAY_ICON}</span>
          <span class="video-badge">${escapeHtml(segName)}</span>
          <div class="video-title">${escapeHtml(segName)} · Vídeo ${i + 1}</div>
        </div>
      </div>`;
  }

  function renderVideos(current, segName) {
    const reais = VIDEOS.filter((v) => v.aba === current.key && v.segmento === segName);
    if (reais.length) {
      gridEl.innerHTML = reais.map((v) => realCard(v, segName)).join('');
    } else {
      gridEl.innerHTML = [0, 1, 2, 3].map((i) => placeholderCard(current, segName, i)).join('');
    }
  }

  function render() {
    const current = CATALOG.find((c) => c.key === state.cat) || CATALOG[0];
    state.seg = Math.min(state.seg, current.segs.length - 1);
    const segName = current.segs[state.seg];
    renderTabs();
    renderSegments(current);
    renderVideos(current, segName);
  }

  injectPlayer();

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

  // ── Player de vídeo (popup) ─────────────────────────────────────
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const closeVideoBtn = document.getElementById('closeVideo');

  function openVideo(id) {
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    videoModal.hidden = false;
  }
  function closeVideo() {
    videoModal.hidden = true;
    videoFrame.src = '';
  }

  gridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.video-card--live');
    if (card) openVideo(card.dataset.yt);
  });
  gridEl.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.video-card--live');
    if (card) { e.preventDefault(); openVideo(card.dataset.yt); }
  });
  closeVideoBtn.addEventListener('click', closeVideo);
  videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideo(); });

  // ── Showreel modal (já existe no index.html) ────────────────────
  const reelModal = document.getElementById('reelModal');
  const openReelBtn = document.getElementById('openReel');
  const closeReelBtn = document.getElementById('closeReel');

  function openReel() { reelModal.hidden = false; }
  function closeReel() { reelModal.hidden = true; }

  if (openReelBtn) openReelBtn.addEventListener('click', openReel);
  if (closeReelBtn) closeReelBtn.addEventListener('click', closeReel);
  if (reelModal) reelModal.addEventListener('click', (e) => { if (e.target === reelModal) closeReel(); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!videoModal.hidden) closeVideo();
    if (reelModal && !reelModal.hidden) closeReel();
  });
})();
