# Revisão dos banners Foxstage 2.3.1

Implementação local de 10 de outubro de 2026. Os dois banners estão definidos em `src/content/site.ts`, com um CTA por banner, sem gestão de conteúdo. Fotografias já existentes foram reaproveitadas com sua proveniência e identificação de uso ilustrativo.

No desktop, o hero passou de 1680 para 1840px máximos, com margens mínimas de 24px e altura de 664 a 764px. O início da fotografia fica 49px abaixo do topo do menu de 76px, cerca de 65% da sua altura. O eixo de conteúdo de 1200px e o menu de 1160px continuam alinhados.

No mobile, a imagem de 460px se dissolve no fundo escuro por máscara vertical. O recorte do segundo banner foi deslocado para a pessoa falando. Os títulos têm duas linhas editoriais, com fonte fluida de 36 a 44px. Foi removida a terceira linha vazia que separava título e descrição em telas estreitas. CTA tem largura pelo conteúdo; indicadores descem para a base abaixo de 375px.

A rotação automática ocorre a cada 10 segundos. Indicadores, setas do teclado, Home/End e gesto lateral permitem troca manual. O intervalo reinicia após a interação; hover com mouse, foco por teclado, toque em andamento, pausa explícita e aba oculta suspendem a rotação. Movimento reduzido mantém navegação manual. Sem JavaScript, o primeiro banner e seu CTA permanecem disponíveis, sem controles inativos.

Clique ou toque nos controles libera o foco após a ação; a navegação por teclado mantém o contorno visível. A troca do SVG do controle de pausa podia perder o evento sintético de saída do mouse e deixar a rotação pausada. Eventos de ponteiro e sincronização da saída pelo documento corrigem esse caso. Reprodução anterior falhou em retomar; reprodução após o ajuste voltou a rodar.

## Verificação

Build com TypeScript e lint passaram. Os cinco testes de domínio/WhatsApp passaram. A regressão de Remotion passou após a introdução dos banners; o painel continua iniciando sozinho e segurando o quadro final.

QA dos banners passou em 13 larguras: 320, 360, 375, 390, 430, 450, 560, 767, 768, 1024, 1440, 1728 e 1920px. Foram conferidos os dois banners, ausência de overflow horizontal e sobreposição entre CTA e controles, altura estável entre banners, duas linhas nos títulos mobile, máscara transparente e posição desktop relativa ao menu.

O teste em tempo real verificou que não houve troca em 8 segundos, ocorreu troca após 10 segundos e houve pausa, retomada e retorno ao primeiro banner. Teclado e gesto simulado passaram. Um teste com toque real do Playwright e relógio controlado confirmou liberação do foco e retorno da rotação após o intervalo completo. Movimento reduzido e fallback sem JavaScript passaram. Evidências numéricas: `docs/banners-qa.json`. Capturas: `work/banners-review/`.

Os testes usam Chromium local automatizado. Não constituem certificação de acessibilidade ou medição de desempenho em aparelhos físicos. O domínio de produção continua pendente; a prévia permanece fora da indexação.

Snapshot anterior: `backups/2026-10-10-pre-mobile-banners/`. Nenhuma dependência nova foi instalada.
