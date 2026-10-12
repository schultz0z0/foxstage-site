# Revisão independente de acabamento — extensão de movimento Foxstage

Revisão em 10/10/2026 por agente independente, com leitura das capturas e do código. Escopo: assinatura Remotion no painel final, indicador do menu desktop e setas de ação. Não houve edição da interface nem inspeção em navegador nesta revisão.

## 1. Disposition

**ship** para o acabamento visual da extensão apresentada. Nenhum defeito material encontrado exige fix, rebuild ou recapture. A conclusão preserva a composição previamente aprovada e se limita às evidências abaixo; os comandos de compilação e qualidade permanecem sob verificação do agente implementador.

**pass** para a confirmação pontual da correção de execução em `SignatureArtwork`: o eixo de layout ficou em `left: 8%` e o deslocamento passou para `translate` em `cqw`. A nova leitura da fonte e das capturas desktop/mobile mantém a geometria final já aprovada. Não foi iniciada outra rodada de acabamento visual.

## 2. Material findings

Não há achados visuais bloqueadores nas sete capturas obrigatórias.

- A assinatura ocupa uma área própria no painel preto. No desktop, a frase à esquerda e o contato à direita têm hierarquia e separação claras; no mobile, o empilhamento mantém frase, controle e contato legíveis.
- O quadro inicial pausado mantém “Aprenda”, “Fale” e “Viva” visíveis, mesmo antes de convergirem para o eixo final. O movimento não é uma condição para acessar conteúdo.
- O painel em movimento reduzido mantém o mesmo desenho final e o link real de WhatsApp. A retirada do controle não desloca o conteúdo: o espaço da assinatura está reservado.
- O controle de repetição/continuação tem ícone consistente, texto explícito e foco visível. Sua altura mínima de 44px consta no CSS. A ação de contato tem maior destaque e permanece fora da camada do Player.
- O indicador do menu é fino e coerente com o laranja existente. O feedback de seta de 3px fica restrito a hover/foco e é desativado em movimento reduzido.

O contrato em prosa foi sincronizado com a extensão 2.1.0. A versão atual foi confirmada nos cabeçalhos de `design.md` e `foxstage-prompt-completo-nextjs.md`.

## 3. Craft-floor

A extensão continua dentro do mundo visual aprovado: Bebas Neue, Source Sans 3, preto, creme e laranja. A assinatura tem um gesto focal de tipografia, com deslocamentos escalonados e estabilização; não introduz um padrão de entradas em cada seção. O mobile reduz o deslocamento para um quarto do desktop.

Os textos secundários e controles do painel usam o token já existente para leitura sobre preto. O foco claro sobre a superfície escura aparece nas capturas de contato. A assinatura não acrescenta fotos, promessas, números, gradientes, emojis, cards ou ornamentos genéricos. Os eyebrows existentes e a escala do hero pertencem ao contrato fixado; não são novos desvios causados por esta extensão.

O desenho estático e o Player reutilizam `SignatureArtwork`, o que conserva a geometria do estado final e do fallback. O Player começa no quadro final antes do disparo, termina no quadro 149, não repete automaticamente e disponibiliza controle textual separado da camada visual marcada como decorativa. A frase completa está disponível para tecnologia assistiva por texto próprio.

## 4. Fidelity / evidence limits

Comparação visual feita com `assets/references/01-hero-reference.png`, `assets/references/03-full-page-reference.png` e as capturas desktop/mobile de `backups/2026-10-10_1639-pre-remotion/.impeccable/review/`.

O header em cápsula, o hero fotográfico, os recortes das fotos, a ordem das regiões, a alternância branco/preto/creme e o rodapé foram preservados. A mudança principal está concentrada no painel final: o contato antes centralizado passa a compartilhar o painel com a assinatura aprovada. Isso amplia a composição local sem redesenhar a página.

Capturas não demonstram, por si só, fluidez ao longo dos cinco segundos, comportamento entre quadros, uso real por leitor de tela, desempenho em aparelho físico, contraste sobre todos os recortes de fotografia ou conformidade integral de acessibilidade. A captura adicional `desktop-hero-motion-final.png`, relida após aguardar o fim das transições CSS, mostra “Início” ativo no topo. A captura anterior havia registrado o estado transitório de “Contato” durante o retorno ao topo.

O teste de aba oculta informado foi simulado em ambiente headless. Não houve validação nativa de alternância de aba nesta revisão. Nenhuma recaptura é necessária para avaliar as composições fornecidas.

A observação posterior em `docs/motion-performance-observation.json`, de 20:05:54 UTC, registra altura do painel de 481.90625px antes e depois do Player e `layoutShiftValues: []` no intervalo medido após o carregamento das fontes e decodificação das imagens. A evidência é local, em Chromium headless, sem limitação de CPU/rede. Sustenta a correção de estabilidade de layout nesse intervalo; não certifica Core Web Vitals, INP ou desempenho em aparelhos reais.

## 5. Verification scope

Inspeção direta das capturas:

- `.impeccable/review/desktop.png` — 1440px, página completa.
- `.impeccable/review/mobile.png` — 390px, página completa.
- `.impeccable/review/desktop-hero-motion.png` — 1440px, hero e estado do indicador.
- `.impeccable/review/desktop-hero-motion-final.png` — 1440px, confirmação do indicador em “Início” após o retorno ao topo e término das transições.
- `.impeccable/review/contact-desktop.png` — 1440px, assinatura final e repetição com foco.
- `.impeccable/review/contact-mobile.png` — 390px, assinatura final e contato empilhados.
- `.impeccable/review/contact-reduced-motion.png` — 1440px, fallback estático.
- `.impeccable/review/contact-playing-desktop.png` — 1440px, quadro inicial pausado por teclado e continuação.

Na confirmação pontual após a troca para `translate`, também foram inspecionadas as novas capturas sem foco `foxstage-remotion-desktop.png` e `foxstage-remotion-mobile.png`, em `C:/Users/rapha/Documents/Codex/2026-10-10/referenced-chatgpt-conversation-this-is-an/outputs/`. Ambas conservam a composição final da revisão original.

Leitura de `src/app/page.tsx`, `src/app/globals.css`, `src/components/sections/ContactCTA.tsx`, `src/components/motion/SignatureArtwork.tsx`, `SignatureMotion.tsx`, `SignaturePlayer.tsx`, `src/components/ui/DesktopNavigation.tsx` e `src/remotion/SignatureComposition.tsx`, além dos contratos e do plano de movimento.

`docs/motion-qa.json` registra resultado pass em execução isolada no servidor de produção local `http://127.0.0.1:3001`, sem erros, em 320/360/390/430/768/1024/1440/1920px, sem overflow horizontal ou conteúdo recortado detectado. Também registra pausa/continuação/repetição por teclado, pausa fora de vista, preferência reduzida inicial e alterada, quadro final 149, ausência de repetição automática, fallback sem JavaScript e fallback com chunk bloqueado. Esses resultados foram lidos, não reexecutados por este revisor. O registro atualizado após a correção de execução tem horário de 20:05:14 UTC. Build, tipos, cinco testes e lint aprovados após a alteração, detector novamente vazio e nove rasters sem origem faltante foram informados pelo implementador. Uma execução simultânea anterior com outra suíte excedeu o prazo de 12 segundos para término da animação; a execução final isolada passou. Isso limita a evidência de estabilidade sob contenção, sem demonstrar falha visual do fluxo isolado.
