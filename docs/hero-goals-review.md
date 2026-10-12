# Extensão do hero — Foxstage 2.4.0

Conceito aprovado e implementado em 10 de outubro de 2026. A faixa de objetivos faz parte do acabamento do hero, fora do carrossel. Pergunta e três links são renderizados no servidor. A implementação usa os componentes e fontes existentes; nenhuma dependência nova foi instalada.

## Marca e composição

A página 7 de `assets/Identidade visual Foxstage/manual-de-marca.pdf` confirma **Creme #F3EFE8 / RGB 243,239,232** como superfície clara de apoio. O token `component.heroGoals.background` aponta para `semantic.color.surfaceWarm`, que resolve esse valor. Preto, laranja para texto e laranja das setas também usam aliases do sistema existente. A cor não foi amostrada da imagem gerada.

O hero mantém fotografia, dimensões, copy, menu e controles. Seus cantos superiores continuam arredondados; os cantos inferiores pertencem à faixa, formando uma peça única. O conteúdo da faixa acompanha o eixo do texto do hero, até 1200px. No desktop, pergunta à esquerda e links à direita; no tablet, pergunta acima; no celular, três links em lista com divisores horizontais e alvo mínimo de 44px. O espaço até Sobre foi ajustado para 48px no desktop e 40px em tablet/mobile.

“No dia a dia”, “Em viagens” e “No trabalho” abrem o número confirmado do WhatsApp com mensagens específicas sobre o objetivo escolhido. São objetivos de visitantes, sem implicar ofertas Business, curso de viagem ou resultados garantidos. A abertura em nova aba é informada por texto acessível. Os links funcionam sem JavaScript.

## Evidências

Build com TypeScript, lint e os cinco testes de domínio/WhatsApp passaram. `docs/hero-goals-qa.json` registra 13 larguras: 320, 360, 375, 390, 430, 560, 767, 768, 1024, 1280, 1440, 1920 e 2560px. A QA conferiu cor computada exata, faixa unida à imagem, alinhamento ao texto, ausência de overflow, links dentro da faixa, destinos e mensagens corretos, alvos de toque, foco de teclado e fallback sem JavaScript. Capturas de 320, 390, 768, 1024, 1440 e 1920px em `work/hero-goals-review/`.

Os testes locais usam Chromium automatizado e não constituem certificação de acessibilidade ou medição de desempenho em aparelhos físicos. A prévia continua sem publicação. Snapshot anterior em `backups/2026-10-10-pre-hero-goals/`.

## Centralização desktop 2.4.1

O conjunto de eyebrow, título, descrição e CTA foi centralizado verticalmente em cada fotografia no desktop, com alinhamento à esquerda. A faixa de objetivos não entra no cálculo do centro. A QA em `docs/hero-center-qa.json` verificou ambos os banners em 9 larguras, incluindo 1024, 1280, 1440, 1728, 1920 e 2560px para o desktop: desvio do centro inferior a 1px, CTA dentro do hero e texto abaixo do menu. As dimensões de mobile foram comparadas à QA anterior e preservadas. Build com TypeScript, lint e nova execução da QA da extensão em 13 larguras passaram. Os testes de rotação e Remotion da versão 2.4.0 continuam como evidência do ciclo anterior; a alteração 2.4.1 é exclusivamente de alinhamento CSS.
