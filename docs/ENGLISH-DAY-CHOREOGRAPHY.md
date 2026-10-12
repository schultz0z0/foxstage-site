# English Day — coreografia 2.7.0

Pedido de 11 de outubro de 2026: ampliar o movimento para a seção inteira e retirar o título redundante acima da foto. Implementado apenas no English Day. Copy aprovada, mídias fornecidas e CSS das demais regiões preservados.

## Composição

Fundo laranja #F65A0B, texto #101314 e moldura #FFF8EC, conforme os tokens do manual. Desktop: copy à esquerda; fotografia integral 4:3, maior e mais alta, ao lado do vídeo em celular preto. A legenda permanece dentro da moldura; “Edição no cinema” deixa de existir como título separado. Inclinação final da foto: -6°. Canvas de mídias: 680×570. No mobile, canvas 360×810 com celular acima da foto, sem sobreposição entre foto e legenda/controles do vídeo.

## Movimento

Remotion 4.0.534 já instalado, sem novas dependências. Linha do tempo única de 360 quadros a 60fps, total de 6 segundos. Eyebrow, título, parágrafos e CTA entram em sequência, com deslocamento, inclinação do título e escala do CTA; estabilizam até 1,7 segundo. Foto entra por um arco ascendente, com rotação de -18° até -1° e assentamento em -6°. Celular segue trajetória oposta, com perspectiva, contrarrotação e escala. As mídias estabilizam até 5,5 segundos; o quadro final permanece.

`src/remotion/englishDayMotion.ts` contém as curvas compartilhadas. A fotografia é renderizada pela composição Remotion. Eventos `frameupdate` sincronizam as poses dos elementos HTML reais por variáveis CSS, com referências aos nós obtidas uma vez. Assim, o CTA continua sendo um link e o vídeo mantém controles nativos. Hover e foco interrompem o deslocamento do elemento interativo durante seu uso. Ao concluir ou desmontar o Player, as transformações HTML são removidas.

O início depende de 35% do heading visível. Depois do início, saída da seção da tela e aba oculta pausam a linha do tempo; retorno retoma do quadro existente. Não há loop nem botões de controle da animação. O mobile usa trajetórias menores para conter deslocamentos laterais. A arte compartilhada também produz a versão estática renderizada no servidor.

O vídeo original permanece fora da linha do tempo. Autoplay sem som quando 35% do próprio vídeo fica visível; pausa fora da tela ou com aba oculta; pausa manual respeitada após retorno; sem loop. Movimento reduzido impede Player e autoplay, permitindo reprodução manual. Ausência de JavaScript preserva fotografia, poster e controles. Não foi gerado outro MP4 para a animação.

Catálogo 21st consultado: “Focus Pull To Phone”, `mg-pr-focus-pull`, usado como referência de transferência de profundidade entre cena e celular. Nenhuma fonte do catálogo foi importada; não se adicionou GSAP, pois o relógio Remotion já coordena a sequência.

## Verificação

- Build de produção, TypeScript e lint concluídos; cinco testes existentes passaram.
- QA do navegador em `docs/english-day-choreography-qa.json`: copy, CTA, foto e celular em movimento; pausa fora da tela; quadro 359 estável; autoplay real do MP4; pausa manual; foco por teclado; versão com movimento reduzido e versão sem JavaScript; sem erros de execução.
- Doze larguras: 320, 360, 375, 390, 430, 568, 767, 768, 1023, 1024, 1280 e 1920px. Sem overflow horizontal ou sobreposição das mídias no mobile. Capturas desktop e mobile inspecionadas.
- Copy comparada byte a byte com o backup; CSS fora do English Day comparado com a versão anterior. Build mantém o aviso já existente de `metadataBase` da prévia local.
- Remotion Studio atualizado em `http://localhost:3002/FoxstageEnglishDay`; site disponível em `http://127.0.0.1:3001/#english-day`.

Backup anterior: `backups/2026-10-11-pre-english-day-choreography/`, 13 arquivos com manifesto SHA-256. Evidências visuais em `work/english-day-choreography/`. Nenhuma publicação foi realizada.


## English Day 2.7.1 — recorte e chegada da copy

Correção de 11 de outubro de 2026: o arco aprovado da fotografia ultrapassa a borda do canvas no início; SVG e Player recortavam a imagem com overflow hidden. Usar SVG overflow visible e a propriedade overflowVisible do Player, preservando integralmente trajetória, rotação, escala, tamanho e posição final da foto e do celular. O limite externo da seção continua contido, sem scroll horizontal.

A copy passa a ter uma chegada editorial: título revelado por máscara vertical, com deslocamento máximo de 14px e duração de 0,8s; parágrafos e CTA entram com deslocamento vertical de 8px e duração de 0,55s, estabilizando até 1,05s. Eyebrow aparece primeiro. Remover deslocamento lateral, skew e escala do texto e do CTA. Abertura, transformações e opacidade continuam sincronizadas pelo mesmo relógio Remotion; foco por teclado mantém o CTA visível e estável. A versão estática permanece o padrão sem JavaScript ou com movimento reduzido. Vídeo e demais regiões preservados. Backup: backups/2026-10-11-pre-english-day-arrival. Verificação: docs/english-day-arrival-qa.json.

Verificação da 2.7.1: build/TypeScript e lint passaram. QA confirmou SVG e Player sem recorte no quadro inicial, máscara do título e movimento apenas vertical da copy, fotografia dentro da seção durante 389 amostras da sequência, 12 larguras sem overflow, autoplay, pausa manual, foco por teclado, movimento reduzido e ausência de JavaScript. Sem erros de navegador. Curvas da fotografia e do celular comparadas com o backup e preservadas exatamente; 14 arquivos do backup validados por SHA-256. Capturas de entrada e mobile inspecionadas.


## English Day 2.7.2 — copy estática

Pedido de 11 de outubro de 2026: remover toda animação de eyebrow, título, parágrafos e CTA. Esses elementos permanecem HTML estático, visível desde o início, sem máscara, transformação, fade ou sequência de entrada. Remotion atua exclusivamente na foto e no celular/vídeo, com as mesmas trajetórias, duração, gatilho, reprodução única, pausa, controles e composição aprovados na 2.7.1. A correção do recorte permanece. Backup: backups/2026-10-11-pre-english-day-static-copy.

Verificação 2.7.2: build/TypeScript e lint passaram. Em desktop 1440px e mobile 390px, eyebrow, título, parágrafos e CTA permaneceram sem transformações, máscaras ou mudanças de opacidade/posição durante toda a sequência. Foto e celular continuaram animados, mantendo o quadro final 359. Curvas das mídias preservadas exatamente em comparação com o backup; SVG sem recorte; sem erros de navegador. Evidências: docs/english-day-static-copy-qa.json.


## English Day 2.7.3 — movimento contínuo sobre o celular

Correção solicitada em 11 de outubro de 2026: hover ou foco no celular não interrompe suas transformações. Remover o bloqueio por :hover e :focus-within; todos os quadros seguem atualizando a posição do celular. Preservar trajetórias, duração, vídeo nativo e copy estática. A linha do tempo só pausa com a seção fora da tela ou aba oculta; preferência por movimento reduzido mantém a versão estática. Backup: backups/2026-10-11-pre-english-day-hover-fix.

Verificação 2.7.3: build/TypeScript e lint passaram. Teste no navegador confirmou posição do celular avançando com hover mantido e com foco no vídeo, conclusão no quadro 359, controles nativos disponíveis e copy estática. Curvas das mídias preservadas byte a byte; sem erros de navegador. Evidências: docs/english-day-hover-qa.json.
