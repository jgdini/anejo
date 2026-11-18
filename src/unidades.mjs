// Dados das unidades. Fonte: site atual (lido em 17/11/2026 via VPN) e Google Maps (endereço, coordenadas, nota).
// Horário: [abre, fecha] em minutos, índice 0 = domingo. Telefone: o do botão "Call Now" de cada página.

const H_PADRAO = [[660, 1260], [660, 1320], [660, 1320], [660, 1320], [660, 1320], [660, 1380], [660, 1380]]; // seg-qui 11-22, sex-sáb 11-23, dom 11-21
const H_22 = [[660, 1260], [660, 1320], [660, 1320], [660, 1320], [660, 1320], [660, 1320], [660, 1320]];      // seg-sáb 11-22, dom 11-21

const MENU_2026 = 'https://anejococinamexicana.com/wp-content/uploads/2026/07/anejo-2026-new-menu.pdf';
const vg = (s) => `https://oo.viguest.com/?siteName=${s}`;
const cid = (c) => `https://www.google.com/maps?cid=${c}`;

export const regioes = [
  { id: 'central', nome: 'Central Florida', sub: 'Orlando, Winter Park and Daytona Beach' },
  { id: 'nordeste', nome: 'Northeast Florida', sub: 'Jacksonville, St. Johns County and Nassau County' },
];

export const unidades = [
  {
    slug: 'hunters-creek', nome: 'Hunters Creek', regiao: 'central', cidade: 'Orlando',
    rua: '13586 Village Park Dr, Suite 304', local: 'Orlando', cep: '32837', geo: [28.3686025, -81.4270614],
    tel: '+14072032105', horas: H_22, pedido: null, menu: MENU_2026,
    mapa: 'https://www.google.com/maps/place/Anejo+Cocina+Hunters+Creek/@28.3686025,-81.4270614,17z',
    fb: 'https://www.facebook.com/anejococinahunterscreek', ig: 'https://www.instagram.com/anejococinahunterscreek/',
    nota: [4.7, 456], hero: 'birria', ponto: 'in the Village Park shopping center',
    lead: 'Birria tacos with consommé on the side, arrachera off the grill and a smoked margarita finished at your table.',
    atual: 'https://anejococinamexicana.com/locations/anejo-cocina-hunters-creek/',
  },
  {
    slug: 'winter-park', nome: 'Winter Park', regiao: 'central', cidade: 'Winter Park',
    rua: '1035 N Orlando Ave, Suite 101', local: 'Winter Park', cep: '32789', geo: [28.6068028, -81.3656054],
    tel: '+13219721558', horas: H_PADRAO, pedido: vg('anejowinterpark'),
    menu: 'https://anejococinamexicana.com/wp-content/uploads/2026/05/Anejo-Winter-Park-Menus-2026.pdf',
    mapa: cid('13288972894304853327'),
    fb: 'https://www.facebook.com/anejococinawinterpark', ig: 'https://www.instagram.com/anejococinawinterpark/',
    nota: [4.8, 3824], hero: 'smoked-rita', ponto: 'on N Orlando Ave (US 17-92)',
    lead: 'A patio built for long afternoons, margaritas smoked at the table and a grill that keeps the arrachera coming.',
    atual: 'https://anejococinamexicana.com/anejo-winter-park/',
  },
  {
    slug: 'daytona-beach', nome: 'Daytona Beach', regiao: 'central', cidade: 'Daytona Beach',
    rua: '2642 LPGA Blvd', local: 'Daytona Beach', cep: '32124', geo: [29.2144273, -81.1185726],
    tel: '+13862741224', horas: [[660, 1260], [660, 1320], [660, 1320], [660, 1320], [660, 1320], [660, 1320], [660, 1320]],
    pedido: vg('AnejoDaytona'),
    menu: 'https://anejococinamexicana.com/wp-content/uploads/2026/05/Anejo-Daytona-Beach-Menus-2026.pdf',
    mapa: cid('5490142211874743227'),
    fb: 'https://www.facebook.com/anejococinadaytonabeach/', ig: 'https://www.instagram.com/anejodaytona/',
    nota: [4.5, 1114], hero: 'arrachera', ponto: 'on LPGA Blvd',
    happy: 'Happy hour 2–6 pm, every day except Tuesday',
    lead: 'Skirt steak off the grill, shrimp in chipotle cream and a happy hour that starts at 2 pm.',
    atual: 'https://anejococinamexicana.com/anejo-daytona/',
  },
  {
    slug: 'riverside', nome: 'Riverside', regiao: 'nordeste', cidade: 'Jacksonville',
    rua: '220 Riverside Ave, Suite 103', local: 'Jacksonville', cep: '32202', geo: [30.3222064, -81.6736602],
    tel: '+19045167860', horas: H_PADRAO, pedido: vg('anejoriverside'), menu: MENU_2026,
    mapa: cid('9198175314323541182'),
    fb: 'https://www.facebook.com/anejoriverside', ig: 'https://www.instagram.com/anejoriverside',
    nota: [4.4, 1314], hero: 'chicken-shrimp', ponto: 'on Riverside Ave',
    lead: 'Sizzling platters, cold margaritas and a downtown Jacksonville room that fills up after work.',
    atual: 'https://anejococinamexicana.com/anejo-riverside/',
  },
  {
    slug: 'san-marco', nome: 'San Marco', regiao: 'nordeste', cidade: 'Jacksonville',
    rua: '2039 Hendricks Ave, Unit 211', local: 'Jacksonville', cep: '32207', geo: [30.3052115, -81.6524611],
    tel: '+19046665134', horas: H_PADRAO, pedido: vg('anejosanmarco'), menu: MENU_2026,
    mapa: cid('8257926025275952767'),
    fb: 'https://www.facebook.com/anejococinasanmarco', ig: 'https://www.instagram.com/anejosanmarco/',
    nota: [4.5, 464], hero: 'guacamole', ponto: 'on Hendricks Ave',
    lead: 'Guacamole made to order, tacos by the plate and a tequila list worth taking slowly.',
    atual: 'https://anejococinamexicana.com/locations/anejo-san-marco/',
  },
  {
    slug: 'st-johns', nome: 'St. Johns', regiao: 'nordeste', cidade: 'St. Johns',
    rua: '170 Fountains Way, Suite 1', local: 'St. Johns', cep: '32259', geo: [30.0687273, -81.4960496],
    tel: '+19044847406', horas: H_PADRAO, pedido: vg('Anejostjohns'), menu: MENU_2026,
    mapa: cid('11702386323355218266'),
    fb: 'https://www.facebook.com/anejococinastjohns', ig: 'https://www.instagram.com/anejococinastjohns',
    nota: [4.4, 501], hero: 'flautas', ponto: 'on Fountains Way',
    lead: 'Crispy flautas, birria tacos and margaritas for the whole table, close to home in St. Johns.',
    atual: 'https://anejococinamexicana.com/anejo-st-johns/',
  },
  {
    slug: 'nocatee', nome: 'Nocatee', regiao: 'nordeste', cidade: 'Nocatee',
    rua: '335 Pine Lake Dr, Suite D104', local: 'Nocatee', cep: '32081', geo: [30.1110699, -81.416274],
    tel: '+19048225605', horas: H_PADRAO, pedido: vg('AnejoNocatee'), menu: MENU_2026,
    mapa: cid('10148777352019292325'),
    fb: 'https://www.facebook.com/anejonocatee', ig: 'https://www.instagram.com/anejonocatee',
    nota: [4.6, 1405], hero: 'shrimp-chipotle', ponto: 'on Pine Lake Dr',
    lead: 'Patio tables under the red umbrellas, shrimp in chipotle cream and a margarita before the sun goes down.',
    atual: 'https://anejococinamexicana.com/anejo-nocatee/',
  },
  {
    slug: 'ponte-vedra', nome: 'Ponte Vedra', regiao: 'nordeste', cidade: 'Ponte Vedra Beach',
    rua: '330 A1A N', local: 'Ponte Vedra Beach', cep: '32082', geo: [30.2357636, -81.3868528],
    tel: '+19046861274', horas: H_PADRAO, pedido: vg('ANEJOPV'), menu: MENU_2026,
    mapa: cid('7796408812755007676'),
    fb: 'https://www.facebook.com/anejococinapontevedra', ig: 'https://www.instagram.com/anejopontevedra',
    nota: [4.6, 1510], hero: 'mangonada', ponto: 'on A1A',
    lead: 'Mangonadas, smoked margaritas and plates to share, right on A1A in Ponte Vedra Beach.',
    atual: 'https://anejococinamexicana.com/anejo-ponte-vedra/',
  },
  {
    slug: 'parkway', nome: 'Parkway', regiao: 'nordeste', cidade: 'St. Augustine',
    rua: '650 E Twincourt Trail', local: 'St. Augustine', cep: '32095', geo: [29.9877118, -81.4532899],
    tel: '+19044299395', horas: H_PADRAO, pedido: vg('anejostaugustine'), menu: MENU_2026,
    mapa: 'https://www.google.com/maps/search/?api=1&query=Anejo+Cocina+Parkway+650+E+Twincourt+Trail+St+Augustine+FL',
    fb: 'https://www.facebook.com/anejococinaparkway', ig: 'https://www.instagram.com/anejoparkway/',
    nota: [4.4, 428], hero: 'arrachera', ponto: 'on E Twincourt Trail',
    lead: 'Arrachera, birria tacos and a full tequila bar for the north side of St. Augustine.',
    atual: 'https://anejococinamexicana.com/locations/anejo-cocina-parkway/',
  },
  {
    slug: 'yulee', nome: 'Yulee', regiao: 'nordeste', cidade: 'Yulee',
    rua: '40 Homegrown Way, Unit B', local: 'Yulee', cep: '32097', geo: [30.6236422, -81.6374989],
    tel: '+19048497591', horas: H_PADRAO, pedido: vg('ANEJOYULEE'), menu: MENU_2026,
    mapa: cid('13141098514262152927'),
    fb: 'https://www.facebook.com/anejococinacocinayulee', ig: 'https://www.instagram.com/anejococinayulee',
    nota: [3.9, 906], hero: 'chicken-shrimp', ponto: 'on Homegrown Way',
    lead: 'Sizzling chicken and shrimp, fresh guacamole and cold drinks on the road to Amelia Island.',
    atual: 'https://anejococinamexicana.com/anejo-yulee/',
  },
  {
    slug: 'middleburg', nome: 'Middleburg', regiao: 'nordeste', cidade: 'Middleburg',
    rua: '1660 Jeremiah St, Suite 201', local: 'Middleburg', cep: '32068', geo: [30.1129798, -81.8304976],
    tel: '+19044060069', horas: H_22, pedido: vg('anejomiddleburg'), menu: MENU_2026,
    mapa: 'https://www.google.com/maps/search/?api=1&query=Anejo+Cocina+Middleburg+1660+Jeremiah+St+Middleburg+FL',
    fb: 'https://www.facebook.com/anejococinamiddleburg', ig: 'https://www.instagram.com/anejococinamiddleburg',
    nota: [4.1, 381], hero: 'guacamole', ponto: 'on Jeremiah St', foto: null,
    lead: 'The newest Añejo: birria tacos, guacamole made to order and the full tequila bar, now in Clay County.',
    atual: 'https://anejococinamexicana.com/locations/anejo-cocina-middleburg/',
  },
];
