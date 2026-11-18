# Añejo Cocina Mexicana: site-conceito

Proposta de site para a rede Añejo Cocina Mexicana (11 restaurantes na Flórida), feita pela Halo Company para apresentação comercial. Todas as páginas têm `noindex`: não entram no Google.

## O que tem

- `index.html`: página inicial com as 11 unidades separadas por região, cada uma com fachada, nota do Google e status de aberto/fechado ao vivo.
- `<unidade>/index.html`: uma página por unidade (`hunters-creek`, `winter-park`, `daytona-beach`, `riverside`, `san-marco`, `st-johns`, `nocatee`, `ponte-vedra`, `parkway`, `yulee`, `middleburg`), com:
  - botão de pedido on-line real (viGuest) e cardápio em PDF;
  - cartão "Today at Añejo" com horário do dia, endereço, telefone e rota;
  - pratos com foto grande, vidro e movimento ao passar o mouse; carrossel no celular;
  - bar, horário da semana, fachada, perguntas frequentes;
  - dados estruturados `Restaurant` + `FAQPage` + `BreadcrumbList` (endereço, coordenadas, horário, cardápio, pedido).

## Como editar

Os dados ficam em `src/unidades.mjs` (endereço, telefone, horário, links) e o visual em `src/estilo.css`. Depois de mudar, rode:

```bash
node scripts/gerar.mjs
```

O script reescreve `index.html` e as pastas das unidades.

## Fontes dos dados (17/11/2026)

- Site atual (anejococinamexicana.com), lido via VPN: telefone do botão "Call Now", horário, link de pedido, cardápio, redes sociais.
- Google Maps: endereço, coordenadas e nota de cada unidade.
- Fotos: do próprio site da Añejo.

## Para confirmar com o cliente

- Hunters Creek não tem link de pedido on-line (no site atual os botões levam a `#`): a página usa "Call to order".
- Horário de sexta e sábado: o topo do site atual diz até 23h, a página de algumas unidades diz 22h. Usamos o da página de cada unidade.
- Middleburg ainda não tem foto de fachada.
- Gift card: não há link de compra no site atual.

## Publicar no GitHub Pages

Suba a pasta inteira num repositório, vá em Settings → Pages → Deploy from a branch → `main` / raiz. O arquivo `.nojekyll` já está aqui.
