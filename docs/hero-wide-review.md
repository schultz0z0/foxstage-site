# Hero ampliado — Foxstage 2.2.1

10 de outubro de 2026. Alteração aprovada pelo usuário após análise da captura em tela ampla.

## Aplicação

O limite de largura passou de 1360 para 1680px, preservando margens laterais mínimas de 40px no desktop. A altura usa `clamp(40rem, calc(20.833333vw + 21.25rem), 46.25rem)`: 640px até 1440px de viewport, 700px em 1728px e 740px em 1920px, com raiz de 16px. Em monitores maiores, a altura e largura permanecem limitadas. Não há altura rígida de viewport.

| Viewport | Hero anterior | Hero ampliado |
| --- | --- | --- |
| 1440px | 1360 × 640px | 1360 × 640px |
| 1728px | 1360 × 640px | 1648 × 700px |
| 1920px | 1360 × 640px | 1680 × 740px |
| 2560px | 1360 × 640px | 1680 × 740px |

O eixo interno de 1200px, header de 1160px, tamanho da tipografia, logo, CTAs e demais seções foram preservados. Os recuos existentes em desktops menores permanecem; nas telas amplas, o texto do hero segue alinhado ao conteúdo das demais seções. A foto usa `object-fit: cover` e seu ponto de recorte central foi mantido após conferência visual dos rostos. O atributo `sizes` foi atualizado para acompanhar a largura efetiva da imagem.

Tablet e celular mantêm as regras anteriores: header em fluxo, foto mobile de 360px e posição de recorte `85% 50%`, conteúdo determinando a altura e botões empilhados. Não foi aplicada ampliação de tipografia nem altura de tela inteira no celular.

## Verificação

Build de produção com TypeScript e lint passaram. A conferência de navegador em `docs/hero-wide-qa.json` cobre 320, 360, 390, 430, 768, 1024, 1280, 1440, 1600, 1728, 1760, 1920 e 2560px: largura e altura do hero, alinhamento em telas amplas, botões dentro da área, limites do texto, carregamento da imagem, recorte mobile e ausência de rolagem horizontal. Não foram registrados erros JavaScript.

Capturas revisadas em `work/hero-wide-review/`: 390, 1440, 1728, 1920 e 2560px, além de 1920px com janela de 800px de altura. A captura de 1920px foi entregue como `foxstage-hero-ampliado.png`.

Os arquivos anteriores estão em `backups/2026-10-10-pre-hero-wide/`. O prompt, `design.md` e `design.json` foram sincronizados para 2.2.1, e `src/app/tokens.css` foi regenerado pelo fluxo existente. A revisão é local; não representa publicação ou nova medição de Core Web Vitals.


A regressão de movimento passou após ampliar o hero: autoplay sem interação, movimento contínuo, ausência de controles, parada final e fallbacks responsivos. Evidência atual em docs/motion-qa.json.
