// Gera o site-conceito da Añejo: página inicial + uma página por unidade.
// Uso: node scripts/gerar.mjs   (a partir da pasta anejo-cocina)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unidades, regioes } from '../src/unidades.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const CSS = readFileSync(join(RAIZ, 'src/estilo.css'), 'utf8');
const ANO = 2026;

// ---------- utilidades ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const telFmt = (t) => `(${t.slice(2, 5)}) ${t.slice(5, 8)}-${t.slice(8)}`;
const hora = (m) => { let h = Math.floor(m / 60); const mm = m % 60; const s = h >= 12 && h < 24 ? 'pm' : 'am'; h = h % 12 || 12; return h + (mm ? ':' + String(mm).padStart(2, '0') : '') + ' ' + s; };
const hhmm = (m) => String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
const DIAS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CURTO = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ORDEM = [1, 2, 3, 4, 5, 6, 0];

function grupos(horas) {
  const g = [];
  for (const d of ORDEM) {
    const k = horas[d].join('-');
    const ult = g[g.length - 1];
    if (ult && ult.k === k) ult.dias.push(d); else g.push({ k, dias: [d], h: horas[d] });
  }
  return g;
}
const resumoHoras = (horas) => grupos(horas).map((g) => {
  const a = CURTO[g.dias[0]], b = CURTO[g.dias[g.dias.length - 1]];
  return `${g.dias.length > 1 ? a + '–' + b : a} ${hora(g.h[0])}–${hora(g.h[1])}`;
});
const fraseHoras = (horas) => grupos(horas).map((g) => {
  const a = DIAS[g.dias[0]], b = DIAS[g.dias[g.dias.length - 1]];
  return `${g.dias.length > 1 ? a + ' to ' + b : a} from ${hora(g.h[0])} to ${hora(g.h[1])}`;
}).join(', ').replace(/, ([^,]*)$/, ', and $1');

const endereco = (u) => `${u.rua}, ${u.local}, FL ${u.cep}`;
const nomeCompleto = (u) => `Añejo ${u.nome}`;

// ---------- ícones ----------
const I = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  seta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

const HALO = `<span class="desenvolvido">Desenvolvido por <a href="https://haloconsulting.com.br/" target="_blank" rel="noopener" class="halo-credit"><svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true"><g transform="rotate(-90 16 16)" fill="none" stroke-width="3.2" stroke-linecap="round"><circle cx="16" cy="16" r="11" pathLength="300" stroke="#E0506F" stroke-dasharray="86 214"/><circle cx="16" cy="16" r="11" pathLength="300" stroke="#E7C493" stroke-dasharray="86 214" stroke-dashoffset="-100"/><circle cx="16" cy="16" r="11" pathLength="300" stroke="#F8F3EB" stroke-dasharray="86 214" stroke-dashoffset="-200"/></g></svg><span class="halo-nome">halo <small>company</small></span></a></span>`;

const HEROS = {
  birria: ['Three birria tacos with consommé, grilled onions and lime on a wooden board', 1204],
  arrachera: ['Arrachera skirt steak sliced on a plate with rice and beans', 1200],
  'shrimp-chipotle': ['Shrimp in chipotle cream sauce with rice', 1200],
  'chicken-shrimp': ['Grilled chicken and shrimp platter with peppers and onions', 1200],
  'smoked-rita': ['Smoked margarita being torched next to tequila bottles', 1200],
  guacamole: ['Fresh guacamole in a stone bowl with tortilla chips', 1200],
  flautas: ['Crispy corn flautas topped with cream and cheese', 1200],
  mangonada: ['Mangonada with chamoy and tajín rim', 1200],
};

// ---------- blocos comuns ----------
const PRATOS = [
  ['arrachera', 'From the grill', 'Arrachera', 'Marinated skirt steak, grilled and sliced, served with rice, beans and tortillas.', 'Arrachera skirt steak sliced on a plate'],
  ['shrimp-chipotle', 'Seafood', 'Shrimp Chipotle', 'Shrimp in a smoky chipotle cream. Ask for extra tortillas to clean the plate.', 'Shrimp in chipotle cream sauce'],
  ['chicken-shrimp', 'To share', 'Chicken &amp; Shrimp', 'Grilled chicken and shrimp over peppers and onions, sizzling when it lands.', 'Grilled chicken and shrimp platter with peppers and onions'],
  ['flautas', 'Classic', 'Corn Flautas', 'Rolled corn tortillas fried crisp, topped with crema, cheese and salsa.', 'Crispy corn flautas topped with cream and cheese'],
  ['cauliflower-tacos', 'Vegetarian', 'Cauliflower Tacos', 'Roasted cauliflower in corn tortillas. The meat-free pick that nobody treats as second best.', 'Cauliflower tacos with fresh toppings'],
  ['guacamole', 'Start here', 'Fresh Guacamole', 'Made to order with ripe avocado, onion, cilantro and lime.', 'Fresh guacamole in a stone bowl with tortilla chips'],
];

function secaoPratos(A, titulo, texto, menuUrl) {
  const itens = PRATOS.map(([img, tag, nome, desc, alt], i) => `
        <li class="dish reveal" style="--d:${((i % 3) * 0.08).toFixed(2)}s">
          <img src="${A}assets/${img}-400.webp" srcset="${A}assets/${img}-260.webp 260w, ${A}assets/${img}-400.webp 400w, ${A}assets/${img}-720.webp 720w" sizes="(max-width:760px) 80vw, (max-width:900px) 50vw, 380px" width="720" height="900" alt="${alt}" loading="lazy">
          <div class="cap glass"><span class="tag">${tag}</span><h3>${nome}</h3><p>${desc}</p></div>
        </li>`).join('');
  return `
  <section id="menu" aria-labelledby="menu-h">
    <div class="wrap">
      <div class="head reveal">
        <h2 id="menu-h">${titulo}</h2>
        <p>${texto}</p>
      </div>
      <ul class="dishes">${itens}
      </ul>
      <p class="swipe" aria-hidden="true">Swipe for more →</p>
      ${menuUrl ? `<div class="menu-links"><a class="btn btn-main" href="${menuUrl}" target="_blank" rel="noopener">${I.menu}Full menu (PDF)</a></div>` : ''}
    </div>
  </section>`;
}

function secaoBar(A) {
  const ph = (img, alt) => `<div class="ph"><img src="${A}assets/${img}-400.webp" srcset="${A}assets/${img}-400.webp 400w, ${A}assets/${img}-720.webp 720w" sizes="(max-width:900px) 50vw, 300px" width="720" height="900" alt="${alt}" loading="lazy"></div>`;
  return `
  <section id="bar" class="bar" aria-labelledby="bar-h">
    <div class="wrap bar-grid">
      <div class="bar-pics reveal">
        ${ph('smoked-rita', 'Smoked margarita being torched next to tequila bottles')}
        ${ph('mangonada', 'Mangonada with chamoy and tajín rim')}
        ${ph('house-margarita', 'House margarita with salted rim and lime')}
      </div>
      <div>
        <p class="kicker">The bar</p>
        <h2 id="bar-h">Añejo means <em>aged</em>. The tequila list shows it.</h2>
        <p>Pull up a stool for a margarita after work or stay for a long dinner with the table. Three drinks to start with:</p>
        <ul class="drinks glass">
          <li><strong>Smoked Rita</strong><span>Torched and smoked<br>in front of you</span></li>
          <li><strong>Mangonada</strong><span>Mango, chamoy,<br>tajín rim</span></li>
          <li><strong>House Margarita</strong><span>Tequila, fresh lime,<br>salt</span></li>
        </ul>
      </div>
    </div>
  </section>`;
}

const cabecalho = (A, botao, nav) => `
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <div class="wrap">
    <a class="logo" href="${A || './'}" aria-label="Añejo Cocina Mexicana, all locations"><img src="${A}assets/logo-224.webp" width="112" height="49" alt="Añejo Cocina Mexicana"></a>
    <nav class="nav" aria-label="Main">${nav}</nav>
    ${botao}
  </div>
</header>`;

const rodape = (A) => `
<footer>
  <div class="wrap">
    <span>© ${ANO} Añejo Cocina Mexicana</span>
    <nav aria-label="Site"><a href="${A || './'}">All locations</a></nav>
    <p class="nota">Concept site built with content from the current Añejo website. ${HALO}</p>
  </div>
</footer>`;

const head = ({ A, titulo, desc, canon, og, preHero, ld }) => `<!doctype html>
<html lang="en" class="nojs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${canon}">
<meta name="theme-color" content="#16100c">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%227%22 fill=%22%2316100c%22/%3E%3Cpath d=%22M16 27 9 9l7 9 7-9z%22 fill=%22%238cc63f%22/%3E%3C/svg%3E">
<meta property="og:type" content="restaurant.restaurant">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${A}assets/${og}-1600.webp">
<link rel="preload" href="${A}assets/barlow-condensed-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${A}assets/figtree.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${A}assets/${preHero}-960.webp" imagesrcset="${A}assets/${preHero}-960.webp 960w, ${A}assets/${preHero}-1600.webp 1600w" imagesizes="100vw" fetchpriority="high">
<style>
${CSS.replace(/%A%/g, A)}
</style>
<script type="application/ld+json">
${JSON.stringify(ld, null, 1)}
</script>
</head>
<body>`;

// script comum: status aberto/fechado, cabeçalho, entrada ao rolar, inclinação dos cards
const SCRIPT = `<script>
(function(){
  var d=document.documentElement;d.classList.remove('nojs');d.classList.add('js');
  var top=document.querySelector('.top');
  var onS=function(){top.classList.toggle('solid',scrollY>60)};onS();addEventListener('scroll',onS,{passive:true});
  var p;try{p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());}catch(e){}
  if(p){
    var g=function(t){for(var i=0;i<p.length;i++)if(p[i].type===t)return p[i].value};
    var dia=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday')),min=(parseInt(g('hour'),10)%24)*60+parseInt(g('minute'),10);
    var fmt=function(x){var h=Math.floor(x/60),mm=x%60,s=h>=12&&h<24?'pm':'am';h=h%12||12;return h+(mm?':'+(mm<10?'0':'')+mm:'')+' '+s};
    document.querySelectorAll('[data-horas]').forEach(function(el){
      var H=JSON.parse(el.getAttribute('data-horas')),o=H[dia],txt=el.querySelector('.st');
      if(min>=o[0]&&min<o[1]){el.classList.add('open');txt.textContent='Open now · until '+fmt(o[1]);}
      else txt.textContent=min<o[0]?'Opens today at '+fmt(o[0]):'Closed · opens tomorrow '+fmt(H[(dia+1)%7][0]);
    });
    var row=document.querySelector('.hours tr[data-d="'+dia+'"]');if(row)row.className='today';
  }
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,els=document.querySelectorAll('.reveal');
  if(rm||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)});}
  if(rm||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  document.querySelectorAll('.dish,.loc').forEach(function(c){
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      c.style.setProperty('--ry',((x-.5)*8).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y)*8).toFixed(2)+'deg');
      c.style.setProperty('--mx',(x*100).toFixed(1)+'%');c.style.setProperty('--my',(y*100).toFixed(1)+'%');});
    c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
  });
})();
</script>`;

const fachada = (u) => (u.slug === 'middleburg' ? null : `fachada-${u.slug}`);

// ---------- página da unidade ----------
function paginaUnidade(u) {
  const A = '../';
  const nome = nomeCompleto(u);
  const tel = telFmt(u.tel);
  const heroImg = `hero-${u.hero}`;
  const [heroAlt, heroH] = HEROS[u.hero];
  const resumo = resumoHoras(u.horas);
  const notaOk = u.nota && u.nota[0] >= 4.4;
  const fach = fachada(u);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant', '@id': u.atual + '#restaurant',
        name: `Añejo Cocina Mexicana – ${u.nome}`, url: u.atual, telephone: u.tel,
        servesCuisine: ['Mexican'], priceRange: '$$',
        address: { '@type': 'PostalAddress', streetAddress: u.rua, addressLocality: u.local, addressRegion: 'FL', postalCode: u.cep, addressCountry: 'US' },
        geo: { '@type': 'GeoCoordinates', latitude: u.geo[0], longitude: u.geo[1] },
        hasMap: u.mapa,
        openingHoursSpecification: grupos(u.horas).map((g) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: g.dias.map((d) => DIAS[d]), opens: hhmm(g.h[0]), closes: hhmm(g.h[1]) })),
        hasMenu: u.menu,
        ...(u.pedido ? { potentialAction: { '@type': 'OrderAction', target: u.pedido } } : {}),
        sameAs: [u.fb, u.ig],
        parentOrganization: { '@type': 'Organization', name: 'Añejo Cocina Mexicana', url: 'https://anejococinamexicana.com/' },
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anejococinamexicana.com/' },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://anejococinamexicana.com/locations/' },
          { '@type': 'ListItem', position: 3, name: u.nome },
        ],
      },
    ],
  };
  const faqs = [
    [`Where is ${nome}?`, `${endereco(u)}, ${u.ponto}.`],
    ['What are the hours?', fraseHoras(u.horas) + '.'],
    u.pedido ? ['Can I order online?', `Yes. Order pickup online through the ${nome} ordering page, or call ${tel}.`] : ['Can I order takeout?', `Yes. Call ${tel} to place a pickup order.`],
    ...(u.happy ? [['Is there a happy hour?', u.happy + '.']] : []),
    ['Are there vegetarian options?', 'Yes. The cauliflower tacos are vegetarian, and the guacamole, made to order, is a good start for any table.'],
    ['Do you sell gift cards?', 'Yes. Añejo gift cards are available at the restaurant.'],
  ];
  ld['@graph'].push({ '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

  const botaoTopo = u.pedido
    ? `<a class="btn btn-main" href="${u.pedido}" target="_blank" rel="noopener">Order online</a>`
    : `<a class="btn btn-main" href="tel:${u.tel}">Call to order</a>`;
  const ctas = u.pedido
    ? `<a class="btn btn-main" href="${u.pedido}" target="_blank" rel="noopener">${I.bag}Order online</a>
          <a class="btn btn-line glass" href="#menu">See the menu</a>`
    : `<a class="btn btn-main" href="#menu">See the menu</a>
          <a class="btn btn-line glass" href="tel:${u.tel}">Call to order</a>`;
  const nav = `<a href="#menu">Menu</a><a href="#bar">Bar</a><a href="#visit">Hours &amp; location</a><a href="#gift">Gift cards</a><a href="${A}#locations">All locations</a>`;

  const linhasHoras = ORDEM.map((d) => `<tr data-d="${d}"><th scope="row">${DIAS[d]}</th><td>${hora(u.horas[d][0])} – ${hora(u.horas[d][1])}</td></tr>`).join('\n            ');
  const outras = unidades.map((o) => `<li><a href="${A}${o.slug}/"${o.slug === u.slug ? ' aria-current="page"' : ''}>${o.nome}</a></li>`).join('\n        ');
  const fotoVisita = fach
    ? `<img src="${A}assets/${fach}-480.webp" srcset="${A}assets/${fach}-480.webp 480w, ${A}assets/${fach}-800.webp 800w" sizes="(max-width:900px) 100vw, 560px" width="800" height="909" alt="${nome} storefront" loading="lazy">`
    : `<img src="${A}assets/clientes-480.webp" srcset="${A}assets/clientes-480.webp 480w, ${A}assets/clientes-800.webp 800w" sizes="(max-width:900px) 100vw, 560px" width="800" height="602" alt="Guests toasting with a beer and a margarita at the Añejo bar" loading="lazy">`;

  return head({
    A, titulo: `${nome} | Mexican Restaurant &amp; Tequila Bar in ${u.cidade}, FL`,
    desc: `${nome}: birria tacos, arrachera, smoked margaritas and a full tequila bar at ${u.rua}, ${u.local}. ${resumo.join(', ')}.`,
    canon: u.atual, og: heroImg, preHero: heroImg, ld,
  }) + cabecalho(A, botaoTopo, nav) + `

<main id="main">
  <section class="hero" aria-labelledby="h1">
    <picture>
      <img src="${A}assets/${heroImg}-960.webp" srcset="${A}assets/${heroImg}-960.webp 960w, ${A}assets/${heroImg}-1600.webp 1600w" sizes="100vw" width="1600" height="${heroH}" alt="${heroAlt}" fetchpriority="high">
    </picture>
    <div class="wrap">
      <div>
        <h1 id="h1">Añejo <em>${u.nome}</em><small>Mexican restaurant &amp; tequila bar in ${u.cidade}, FL</small></h1>
        <p class="lead">${u.lead}</p>
        <div class="ctas">
          ${ctas}
        </div>
      </div>
      <aside class="tonight glass" aria-label="Today at ${nome}">
        <h2>Today at Añejo</h2>
        ${notaOk ? `<p class="rating"><b>★ ${u.nota[0].toFixed(1)}</b> on Google · ${u.nota[1].toLocaleString('en-US')} reviews</p>` : ''}
        <p class="status" data-horas='${JSON.stringify(u.horas)}' aria-live="polite"><span class="dot"></span><span class="st">${resumo[0]}</span></p>
        ${u.happy ? `<p class="hh">${u.happy}</p>` : ''}
        <dl>
          <div><dt>Address</dt><dd>${u.rua}<br>${u.local}, FL ${u.cep}</dd></div>
          <div><dt>Phone</dt><dd><a href="tel:${u.tel}">${tel}</a></dd></div>
        </dl>
        <a class="btn btn-main" href="${u.mapa}" target="_blank" rel="noopener">${I.pin}Get directions</a>
      </aside>
    </div>
  </section>
${secaoPratos(A, 'What people <em>come back</em> for', `Six plates from the ${u.nome} kitchen. The full menu, with lunch, dinner and dessert, opens in one tap below.`, u.menu)}
${secaoBar(A)}

  <section id="visit" class="visit" aria-labelledby="visit-h">
    <div class="wrap visit-grid">
      <div class="visit-photo ph reveal">
        ${fotoVisita}
      </div>
      <div>
        <p class="kicker">Plan your visit</p>
        <h2 id="visit-h">Find us ${u.ponto.replace(/^(on|in|at) /, (m) => m)}</h2>
        <table class="hours" aria-label="Opening hours">
          <tbody>
            ${linhasHoras}
          </tbody>
        </table>
        <address class="addr">${u.rua}<br>${u.local}, FL ${u.cep}</address>
        <div class="ctas" style="margin-top:24px">
          <a class="btn btn-main" href="${u.mapa}" target="_blank" rel="noopener">Open in Google Maps</a>
          <a class="btn btn-line" href="tel:${u.tel}">${tel}</a>
        </div>
      </div>
    </div>
  </section>

  <div class="gift" id="gift">
    <div class="wrap">
      <div class="gift-card">
        <div>
          <h2>Give dinner, not a sweater</h2>
          <p>Añejo gift cards work for birthdays, thank-yous and anyone who already talks about the birria. Ask for one at the host stand or call ahead.</p>
        </div>
        <a class="btn" href="tel:${u.tel}">Call about gift cards</a>
      </div>
    </div>
  </div>

  <section class="faq" aria-labelledby="faq-h">
    <div class="wrap">
      <div class="head reveal"><h2 id="faq-h">Good to know</h2></div>
      <div class="faq-list">
        ${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section id="locations" aria-labelledby="loc-h">
    <div class="wrap">
      <div class="head reveal"><h2 id="loc-h">Other Añejo locations</h2><p>${unidades.length} restaurants across Central and Northeast Florida.</p></div>
      <ul class="locs">
        ${outras}
      </ul>
    </div>
  </section>
</main>
` + rodape(A) + `

<nav class="actionbar" aria-label="Quick actions" style="grid-template-columns:repeat(${u.pedido ? 4 : 3},1fr)">
  <a class="hot" href="tel:${u.tel}">${I.tel}Call</a>
  ${u.pedido ? `<a href="${u.pedido}" target="_blank" rel="noopener">${I.bag}Order</a>` : ''}
  <a href="#menu">${I.menu}Menu</a>
  <a href="${u.mapa}" target="_blank" rel="noopener">${I.pin}Directions</a>
</nav>
${SCRIPT}
</body>
</html>
`;
}

// ---------- página inicial ----------
function paginaInicial() {
  const A = '';
  const card = (u, i) => {
    const f = fachada(u);
    const img = f
      ? `<img src="assets/${f}-480.webp" srcset="assets/${f}-480.webp 480w, assets/${f}-800.webp 800w" sizes="(max-width:560px) 100vw, (max-width:900px) 50vw, 380px" width="800" height="909" alt="" loading="lazy">`
      : `<img src="assets/hero-guacamole-960.webp" width="960" height="720" alt="" loading="lazy">`;
    const nota = u.nota && u.nota[0] >= 4.4 ? `<span class="rate glass"><b>★ ${u.nota[0].toFixed(1)}</b> Google</span>` : (u.slug === 'middleburg' ? '<span class="rate glass"><b>New</b> location</span>' : '');
    return `
        <li class="loc reveal" style="--d:${((i % 3) * 0.08).toFixed(2)}s">
          ${img}
          ${nota}
          <div class="cap glass">
            <div><span class="tag">${u.cidade}</span><h3>${u.nome}</h3><p>${u.rua}</p>
              <p class="status" data-horas='${JSON.stringify(u.horas)}' style="font-size:14px;min-height:0;margin-top:6px"><span class="dot"></span><span class="st">${resumoHoras(u.horas)[0]}</span></p></div>
            <span class="go" aria-hidden="true">${I.seta}</span>
          </div>
          <a href="${u.slug}/" aria-label="Añejo ${u.nome}, ${u.rua}, ${u.local}"></a>
        </li>`;
  };
  const blocos = regioes.map((r) => `
      <div class="region">
        <h2>${r.nome}<small>${r.sub}</small></h2>
        <ul class="loc-grid">${unidades.filter((u) => u.regiao === r.id).map(card).join('')}
        </ul>
      </div>`).join('');

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Organization', name: 'Añejo Cocina Mexicana', url: 'https://anejococinamexicana.com/',
    subOrganization: unidades.map((u) => ({ '@type': 'Restaurant', name: `Añejo Cocina Mexicana – ${u.nome}`, url: u.atual, telephone: u.tel, address: { '@type': 'PostalAddress', streetAddress: u.rua, addressLocality: u.local, addressRegion: 'FL', postalCode: u.cep, addressCountry: 'US' } })),
  };
  const nav = `<a href="#locations">Locations</a><a href="#menu">Menu</a><a href="#bar">Bar</a>`;
  const faqs = [
    ['How many Añejo locations are there?', `${unidades.length}, in Central Florida (${unidades.filter((u) => u.regiao === 'central').map((u) => u.nome).join(', ')}) and Northeast Florida (${unidades.filter((u) => u.regiao === 'nordeste').map((u) => u.nome).join(', ')}).`],
    ['Can I order online?', 'Yes, at most locations. Open your location page and tap Order online. Hunters Creek takes pickup orders by phone.'],
    ['Are there vegetarian options?', 'Yes. The cauliflower tacos are vegetarian, and the guacamole is made to order at every location.'],
    ['Do you sell gift cards?', 'Yes. Añejo gift cards are available at the restaurants.'],
  ];

  return head({
    A, titulo: 'Añejo Cocina Mexicana | Mexican Restaurants &amp; Tequila Bars in Florida',
    desc: `Añejo Cocina Mexicana: ${unidades.length} Mexican restaurants and tequila bars in Central and Northeast Florida. Find your location, see the menu and order online.`,
    canon: 'https://anejococinamexicana.com/', og: 'hero-birria', preHero: 'hero-birria', ld,
  }) + cabecalho(A, '<a class="btn btn-main" href="#locations">Find a location</a>', nav) + `

<main id="main">
  <section class="hero hub-hero" aria-labelledby="h1">
    <picture>
      <img src="assets/hero-birria-960.webp" srcset="assets/hero-birria-960.webp 960w, assets/hero-birria-1600.webp 1600w" sizes="100vw" width="1600" height="1204" alt="${HEROS.birria[0]}" fetchpriority="high">
    </picture>
    <div class="wrap">
      <div>
        <h1 id="h1">Añejo <em>Cocina Mexicana</em><small>${unidades.length} Mexican restaurants &amp; tequila bars across Florida</small></h1>
        <p class="lead">Birria tacos with consommé, arrachera off the grill and margaritas smoked at the table, from Winter Park to Yulee.</p>
        <div class="ctas">
          <a class="btn btn-main" href="#locations">${I.pin}Find your Añejo</a>
          <a class="btn btn-line glass" href="#menu">See the food</a>
        </div>
      </div>
    </div>
  </section>

  <section id="locations" aria-labelledby="loc-h">
    <div class="wrap">
      <div class="head reveal"><h2 id="loc-h">Pick your <em>table</em></h2><p>Every location has its own hours, phone and online ordering. Tap one to see it.</p></div>
      ${blocos}
    </div>
  </section>
${secaoPratos(A, 'What people <em>come back</em> for', 'Six plates you will find on every Añejo menu.', null)}
${secaoBar(A)}

  <section class="faq" aria-labelledby="faq-h">
    <div class="wrap">
      <div class="head reveal"><h2 id="faq-h">Good to know</h2></div>
      <div class="faq-list">
        ${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </div>
    </div>
  </section>
</main>
` + rodape(A) + `
${SCRIPT}
</body>
</html>
`;
}

// ---------- gravar ----------
writeFileSync(join(RAIZ, 'index.html'), paginaInicial());
for (const u of unidades) {
  mkdirSync(join(RAIZ, u.slug), { recursive: true });
  writeFileSync(join(RAIZ, u.slug, 'index.html'), paginaUnidade(u));
}
console.log(`ok: index.html + ${unidades.length} unidades`);
