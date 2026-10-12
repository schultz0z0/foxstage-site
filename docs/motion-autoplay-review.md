## verdict

1. Correção #1 — resolved. Finding preservado: a revisão inicial encontrou Math.max(8, ...) em SignatureComposition, que transformava o início 4 de Aprenda em 8 no compacto e deixava a linha imóvel. O código recapturado remove esse limite e calcula 7 → 8, preservando o deslocamento de um quarto previsto no contrato.

A nova autoplay-moving-390.png mostra Aprenda inteiro, deslocado à esquerda da posição final. docs/motion-mobile-progress.json (2026-10-10T22:13:14.696Z) registra translate evoluindo de -8.33159px no quadro 55 para -0.0350155px no 226 e zero no 250; wordLeft permanece entre 45.55px e 48.00px, com panelLeft=24px. A margem medida é superior a 21px e a captura não mostra corte de letras. overflowVisible impede que a borda interna do Player corte o movimento, sem alteração visível na composição do painel.

As mesmas quatro capturas da revisão inicial foram reabertas e são válidas: contact-autoplay-desktop.png, contact-autoplay-mobile.png, autoplay-moving-1440.png e autoplay-moving-390.png. Nenhuma regressão material introduzida pelo lote foi observada no escopo pontuado. docs/motion-qa.json (2026-10-10T22:12:50.626Z) registra pass sem erros, início sem interação nos dois viewports e término no quadro 299. Isso é evidência fornecida pelo agente principal, não uma execução independente de browser pelo revisor.

## remaining

clear. Este ship cobre a correção #1 pontuada, não a página inteira. O feedback mais recente do usuário continua sendo a autoridade; a aprovação histórica da versão rejeitada não foi usada como evidência.

Limites preservados: capturas e amostras locais demonstram movimento e composição, mas não certificam fluidez em hardware real, redes lentas, INP ou Core Web Vitals. A observação de performance recapturada conserva a altura do painel e não registra layout shift no Chromium local sem throttling. Não houve nova busca de polish, detector ou mudança de interface nesta revisão.

Disposer: pass para a correção #1 resolvida no escopo.

disposition: ship
