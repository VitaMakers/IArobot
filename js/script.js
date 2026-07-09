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
  // ===================================================================
  const VIDEOS = [
    // Profissionais
    { aba: 'liberais', segmento: 'Advogados', titulo: 'Advogados', youtube: 'aui4-NVT76Y' },
    { aba: 'liberais', segmento: 'Advogados', titulo: 'Advogados', youtube: 'DeKOy6rSefE' },
    { aba: 'liberais', segmento: 'Estética', titulo: 'Estética', youtube: 'EY8UOKdqY_s' },
    { aba: 'liberais', segmento: 'Área da saúde', titulo: 'Área da saúde', youtube: 'puAgKZoW-cs' },
    { aba: 'liberais', segmento: 'Psicologia', titulo: 'Psicologia', youtube: 'kcj0NoLJSAk' },
    { aba: 'liberais', segmento: 'Influenciadores', titulo: 'Influenciadores', youtube: '1mB53HyGQXI' },
    // Negócios locais
    { aba: 'locais', segmento: 'Carros', titulo: 'Carros', youtube: 'hN2cFhjQdro' },
    { aba: 'locais', segmento: 'Carros', titulo: 'Carros', youtube: 'sh7gLdbOcmo' },
    { aba: 'locais', segmento: 'Carros', titulo: 'Carros', youtube: 'W-tE0Y60A4I' },
    { aba: 'locais', segmento: 'Carros', titulo: 'Carros', youtube: 'Gf21ALUxn-Y' },
    { aba: 'locais', segmento: 'Comida', titulo: 'Comida', youtube: 'xFPJvXiKxVw' },
    // Publicidade
    { aba: 'publicidade', segmento: 'Lançamentos', titulo: 'Lançamentos', youtube: '7gb9QB9J0sg' },
    // Eventos
    { aba: 'eventos', segmento: 'Formatura', titulo: 'Formatura', youtube: '1MPFBOLmo9U', formato: 'h' },
  ];
  // ===================================================================

  // ===================================================================
  //  🏷️ MARCAS (logos) — a faixa "MARCAS QUE CONFIAM NO NOSSO TRABALHO"
  //  Cada logo fica num cartão branco. Pra adicionar: suba o arquivo em
  //  assets/ no GitHub e acrescente uma linha aqui com { src, alt }.
  // ===================================================================
  const BRANDS = [
    { src: 'assets/bradesco.png', alt: 'Bradesco' },
    { src: 'assets/coca-cola.png', alt: 'Coca-Cola' },
    { src: 'assets/monster.png', alt: 'Monster Energy' },
    { src: 'assets/giraffas.png.svg.webp', alt: 'Giraffas' },
    { src: 'assets/921455_af4218998af34285b9810b5e9c4a1e2d~mv2.png', alt: 'Nova Escola' },
    { src: 'assets/tropical-grill.png', alt: 'Tropical Grill' },
    { src: 'assets/valec.png', alt: 'VALEC' },
    { src: 'assets/tubotecnica.png', alt: 'Tubotecnica' },
    { src: 'assets/luxdecor.png', alt: 'luxdecor' },
    { src: 'assets/sm.png', alt: 'SM' },
  ];
  // ===================================================================

  // ===================================================================
  //  📱 CONTATO — WhatsApp e Instagram (troque aqui quando mudar)
  //  WHATSAPP: só números -> 55 (Brasil) + DDD + número, sem + nem espaços.
  // ===================================================================
  const WHATSAPP = '5515991876671';
  const WHATSAPP_MSG = 'Olá! Vim pelo site da Vita Content e quero saber mais sobre os serviços de vocês.';
  const INSTAGRAM = 'https://instagram.com/vitacontent_';
  // ===================================================================

  const CATALOG = [
    { key: 'institucionais', label: 'Institucional', c1: '#24272f', c2: '#0d0e12', segs: [] },
    { key: 'locais', label: 'Negócios locais', c1: '#262a30', c2: '#0e1013', segs: ['Carros', 'Comida', 'Hospital veterinário', 'Ótica'] },
    { key: 'publicidade', label: 'Publicidade', c1: '#2b2531', c2: '#100d14', segs: ['Campanhas', 'Lançamentos', 'Promoções'] },
    { key: 'liberais', label: 'Profissionais', c1: '#23262f', c2: '#0d0f13', segs: ['Advogados', 'Estética', 'Área da saúde', 'Psicologia', 'Influenciadores'] },
    { key: 'eventos', label: 'Eventos', c1: '#2c2822', c2: '#12100b', segs: ['Corporativo', 'Social', 'Festivais', 'Formatura'] },
    { key: 'formatos', label: 'Formatos de edição', c1: '#25242f', c2: '#0d0d13', segs: ['Reels', 'Cortes', 'Motion'] },
  ];

  // ── Estilos injetados (player + cartões de logo) ────────────────
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
    .video-card--h .video-cover{aspect-ratio:16/9}
    .video-modal-frame.is-h{aspect-ratio:16/9;height:auto;width:min(94vw,940px)}
    .brands-strip .vc-track{gap:24px;padding-left:24px}
    .brand-logo{display:inline-flex;align-items:center;justify-content:center;height:72px;width:150px;padding:0 22px;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,.06);flex:0 0 auto}
    .brand-logo img{max-height:46px;max-width:118px;width:auto;height:auto;object-fit:contain;display:block}
    @media (max-width:820px){ .nav-actions{display:none} }
    @media (max-width:640px){
      .nav{padding:12px 16px;gap:10px}
      .nav-pill{padding:4px;gap:2px}
      .nav-link{padding:7px 13px;font-size:13px}
      .logo-text{font-size:17px}
      .brand-logo{height:60px;width:120px;padding:0 16px}
      .brand-logo img{max-height:36px;max-width:92px}
      .video-modal-frame{height:auto;width:min(94vw,420px);aspect-ratio:9/16}
    }
    @media (max-width:400px){
      .nav-link{padding:6px 10px;font-size:12.5px}
      .logo-text{font-size:16px}
    }
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

  // Liga os botões de WhatsApp (topo/hero/contato) e o botão do Instagram.
  function applyContactLinks() {
    const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
    document.querySelectorAll('a').forEach((a) => {
      const t = (a.textContent || '').toLowerCase();
      if (t.includes('whatsapp')) {
        a.href = wa; a.target = '_blank'; a.rel = 'noopener noreferrer';
      } else if (t.includes('instagram')) {
        a.href = INSTAGRAM; a.target = '_blank'; a.rel = 'noopener noreferrer';
      }
    });
  }

  const state = { cat: 'institucionais', seg: 0 };

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
    const cards = BRANDS.map((b) =>
      `<span class="brand-logo"><img src="${b.src}" alt="${escapeHtml(b.alt)}"></span>`
    ).join('');
    // Duas cópias pra o loop translateX(-50%) emendar sem cortar.
    marqueeEl.innerHTML = cards + cards;
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
    const h = v.formato === 'h';
    const thumb = `https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg`;
    return `
      <div class="video-card video-card--live${h ? ' video-card--h' : ''}" data-yt="${escapeHtml(v.youtube)}" data-format="${h ? 'h' : 'v'}" role="button" tabindex="0" aria-label="Assistir: ${escapeHtml(v.titulo)}">
        <div class="video-cover" style="background-image:url('${thumb}');background-size:cover;background-position:center;background-color:#0b0b0d">
          <div class="video-cover-shade"></div>
          <span class="video-play">${PLAY_ICON}</span>
          <span class="video-badge">${escapeHtml(segName)}</span>
        </div>
      </div>`;
  }

  function placeholderCard(current, segName) {
    const cover = coverStyle(current);
    return `
      <div class="video-card">
        <div class="video-cover" style="${cover}">
          <div class="video-cover-shade"></div>
          <span class="video-play">${PLAY_ICON}</span>
          <span class="video-badge">${escapeHtml(segName || current.label)}</span>
        </div>
      </div>`;
  }

  function renderVideos(current, segName) {
    const reais = current.segs.length
      ? VIDEOS.filter((v) => v.aba === current.key && v.segmento === segName)
      : VIDEOS.filter((v) => v.aba === current.key);
    if (reais.length) {
      gridEl.innerHTML = reais.map((v) => realCard(v, v.segmento || current.label)).join('');
    } else {
      gridEl.innerHTML = [0, 1, 2, 3].map(() => placeholderCard(current, segName)).join('');
    }
  }

  function render() {
    const current = CATALOG.find((c) => c.key === state.cat) || CATALOG[0];
    const hasSegs = current.segs.length > 0;
    state.seg = hasSegs ? Math.min(state.seg, current.segs.length - 1) : 0;
    const segName = hasSegs ? current.segs[state.seg] : '';
    renderTabs();
    renderSegments(current);
    const segRow = chipsEl.closest('.segments-row');
    if (segRow) segRow.style.display = hasSegs ? '' : 'none';
    renderVideos(current, segName);
  }

  injectPlayer();
  applyContactLinks();

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
  const videoModalFrame = videoModal.querySelector('.video-modal-frame');

  function openVideo(id, format) {
    if (videoModalFrame) videoModalFrame.classList.toggle('is-h', format === 'h');
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    videoModal.hidden = false;
  }
  function closeVideo() {
    videoModal.hidden = true;
    videoFrame.src = '';
  }

  gridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.video-card--live');
    if (card) openVideo(card.dataset.yt, card.dataset.format);
  });
  gridEl.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.video-card--live');
    if (card) { e.preventDefault(); openVideo(card.dataset.yt, card.dataset.format); }
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
