# Verificação da implementação Foxstage

Registro de 10 de outubro de 2026, para a prévia local e o contrato visual **2.1.1**. O acabamento e as auditorias 2.0.1 e a extensão de movimento 2.1.0 permanecem como histórico; a correção de autoplay tem evidência própria ao final. Este documento distingue o que foi observado no ambiente de revisão das metas que ainda dependem de publicação ou validação adicional. Não houve publicação nem envio de mensagens a contatos externos.

## Verificações de código

| Verificação | Resultado observado | Escopo |
|---|---|---|
| `npm test` | Cinco testes passaram. | Codificação e destino do WhatsApp; condições de domínio e indexação. |
| `npm run typecheck` | Passou. | Tipagem da aplicação. |
| `npm run lint` | Passou após as correções finais. | Código da aplicação, scripts, testes e configuração. |
| `npm run build` | Build final passou, saída 0. | Compilação de produção após as correções de semântica e links. |
| Geração de tokens | 103 tokens resolvidos. | Aliases e geração de variáveis de layout/tipografia a partir de `design.json`. |
| Proveniência de imagens | Dez rasters, zero sem registro. | Arquivos usados ou gerados comparados ao manifesto e às origens preservadas. |
| `npm audit --omit=dev --audit-level=high` | Zero vulnerabilidades conhecidas na consulta. | Dependências de produção e catálogo disponível na data da revisão; não é certificação de segurança. |

Os testes não substituem a inspeção da página ou a validação da operação comercial.

## Responsividade e interação

Evidência automatizada: [browser-qa.json](browser-qa.json), reexecutada após a extensão em `2026-10-10T19:59:26.757Z`. Ambiente: Chromium headless, servidor Next.js local de produção em `http://127.0.0.1:3001`, sem limitação de rede ou CPU. O registro inicial 2.0.1 foi feito em `2026-10-10T19:20:32.799Z`.

| Larguras CSS verificadas | Resultado |
|---|---|
| 320, 360, 390 e 430px | Largura do documento igual à viewport, sem imagens quebradas ou texto recortado identificado. |
| 768, 1024, 1440 e 1920px | Mesmo resultado; grids de prática e atalhos seguem os estados 2/3 colunas do contrato. |

O relatório também registrou ausência de âncoras sem destino e de erros no console no cenário avaliado. No desktop de 1024, 1440 e 1920px, o hero ficou com 640px; em 768px, com 600px. No mobile, a altura aumentou pelo conteúdo.

Foram aprovados os cenários de menu por teclado, fechamento por Escape com retorno de foco, escolha de âncora com foco na seção, skip link e navegação sem JavaScript. No modo de movimento reduzido, a transição observada ficou em `0s` e a rolagem em `auto`.

A verificação correspondente a 200% utilizou **reflow equivalente**: viewport original de 1280px representada por 640px CSS, sem rolagem horizontal. Não foi um teste de zoom nativo do navegador. O alvo WCAG 2.2 AA permanece uma meta; os cenários registrados e as auditorias automáticas não constituem certificação de conformidade integral, nem substituem uma sessão com leitor de tela ou avaliação de contraste em cada recorte fotográfico.

## Evidências visuais

As capturas da implementação ficam em `.impeccable/review/`:

- `desktop.png` e `mobile.png`: composição completa nas larguras de revisão 1440 e 390px.
- `desktop-hero.png` e `mobile-hero.png`: primeira dobra e recorte do hero.

Uma revisão independente comparou a implementação às referências fixadas `01-hero-reference.png` e `03-full-page-reference.png`, considerando o contrato e as adaptações de conteúdo. A disposição retornada foi **`ship`**, a fidelidade foi considerada correspondente e não foram listadas correções materiais. O registro está em [visual-review.md](visual-review.md). Isso encerra o acabamento visual no escopo aprovado; não significa que os dados de lançamento estejam confirmados.

## Rotas e indexação

| Rota | Resposta observada |
|---|---|
| `/` | 200, HTML. |
| `/robots.txt` | 200, bloqueio de todos os caminhos nesta prévia. |
| `/sitemap.xml` | 200, sem URLs nesta prévia. |
| `/opengraph-image` | 200, PNG. |
| `/icon.png` e `/apple-icon.png` | 200, PNG. |
| `/pagina-inexistente` | 404, página de erro da aplicação. |

Sem domínio definitivo, a página emite `noindex, nofollow` e não cria canonical. O aviso de `metadataBase` com fallback localhost permanece até configurar a URL real e recompilar. A ausência de indexação é deliberada e explica a falha correspondente de SEO na auditoria local.

## Auditoria e performance

A auditoria móvel histórica 2.0.1 está resumida em [lighthouse-summary.json](lighthouse-summary.json), registro de `2026-10-10T19:20:34.402Z`. O escopo incluiu acessibilidade, boas práticas, SEO e revisão agentic; não incluiu a categoria de performance do Lighthouse. Essa auditoria não foi reexecutada após a extensão Remotion 2.1.0; as notas abaixo pertencem ao estado anterior.

| Categoria | Nota final |
|---|---|
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 66 |
| Agentic browsing | 100 |

O único audit reprovado foi `is-crawlable`, devido ao `noindex` e bloqueio de robots deliberados da prévia. O achado experimental de divergência entre rótulo visível e nome acessível da marca foi corrigido: o link agora preserva “Foxstage English course” e acrescenta apenas “início”. A nova auditoria confirmou a correção. A nota 100 não amplia o escopo da validação manual de acessibilidade.

Uma medição local da prévia em viewport móvel 390×844, CPU 1× e sem limitação de rede registrou **LCP de 130ms e CLS de 0,00**, conforme [performance-observation.json](performance-observation.json). O cache não foi limpo; o trace ocorreu depois das auditorias do navegador. São observações locais; não são dados de campo ou evidência de desempenho na conexão dos visitantes. Não houve dados CrUX nem medição representativa de INP. As metas de Core Web Vitals e o comportamento sob condições reais de hospedagem, rede e dispositivos permanecem por verificar depois do lançamento.

Essa observação de LCP/CLS é histórica, anterior à extensão de movimento; não confirma as mesmas métricas para 2.1.0.

## Contatos e ativos

O contato publicado foi reconferido em 10 de outubro de 2026: `https://wa.link/m6g4ra` respondeu com redirecionamento 301 para `https://api.whatsapp.com/send?phone=5521989848517`. O número e a codificação das mensagens foram verificados; nenhuma mensagem foi enviada. A disponibilidade do destino deve ser reconferida no lançamento.

O manifesto `docs/assets-manifest.json` documenta origem, autores, licença e tratamento. O hero fictício gerado por IA tem identificação visível; cinco imagens Pexels têm uso ilustrativo e não foram apresentadas como alunos ou instalações da Foxstage. A logo original e as referências foram preservadas.

## Verificação da extensão de movimento 2.1.0 (histórico)

O relatório de movimento registrou **pass** em `2026-10-10T20:05:14.469Z`, em produção local `http://127.0.0.1:3001`, em execução isolada no Chromium headless após o ajuste para translate. Foram aprovados 320, 360, 390, 430, 768, 1024, 1440 e 1920px, sem rolagem horizontal, texto recortado ou erro de página detectado no cenário. A QA geral de menu, foco, skip link, rotas e bloqueio de indexação também foi reexecutada em produção. Os resultados desta seção pertencem a 2.1.0: controles, quadro 149 e medidas daquele build são históricos. [motion-qa.json](motion-qa.json) e [motion-performance-observation.json](motion-performance-observation.json) foram atualizados para a correção 2.1.1 e não conservam o snapshot anterior.

| Cenário da extensão | Resultado observado |
|---|---|
| Primeira dobra | Player ausente; seu chunk aparece apenas depois de aproximar o painel final. |
| Teclado | Pausar, continuar e repetir funcionaram; pausa manual conservou o quadro. |
| Visibilidade | Pausa e retomada fora de vista aprovadas; documento oculto aprovado por sinal simulado. |
| Término | Quadro final 149 e ausência de repetição automática ao retornar à seção. |
| Mobile | Oito larguras aprovadas, com composição empilhada e deslocamento reduzido. |
| Preferência de movimento | Estado reduzido inicial e mudanças da preferência aprovados, com arte estática. |
| Fallbacks | Sem JavaScript e com chunk dinâmico bloqueado, a assinatura e o contato continuaram disponíveis. |
| Navegação | Estado ativo e indicador desktop aprovados. |

A aba oculta foi simulada em ambiente headless; isso não prova alternância nativa de abas. Uma execução simultânea com outra QA excedeu o prazo de 12 segundos para término; a execução final isolada passou. O registro demonstra o fluxo isolado, sem comprovar estabilidade sob qualquer contenção do ambiente.

Build, tipagem, lint e os cinco testes de domínio/WhatsApp passaram após a extensão. O detector visual retornou lista vazia; a conferência atual de proveniência inspecionou nove rasters e não encontrou origem faltante. Esse escopo atual é distinto dos dez arquivos usados/gerados da verificação histórica 2.0.1. A auditoria de dependências de produção encontrou zero vulnerabilidades conhecidas; a auditoria completa registrou cinco achados high de desenvolvimento preexistentes na cadeia `braces`/ESLint. Não foi aplicado downgrade forçado.

O chunk adiado do Player de 2.1.0 foi observado com **327.356 bytes sem compressão e 100.213 bytes gzip**. Esse é o custo local daquele arquivo do build, ausente na primeira dobra; não equivale a transferência de campo, nova nota Lighthouse ou validação de LCP, INP e CLS. A observação mais recente de 2.1.1 está em [motion-performance-observation.json](motion-performance-observation.json), com medidas distintas.

A observação final de `2026-10-10T20:05:54.150Z` foi feita em desktop, sem limitação de CPU/rede, com fontes e imagens prontas antes de medir o movimento. A altura do painel foi **481,90625px** antes e depois do Player, e `layoutShiftValues` ficou vazio no intervalo observado. O ajuste usa translate sobre um eixo fixo para o deslocamento tipográfico. Isso demonstra reserva de layout e ausência de shifts naquele intervalo local; não equivale a CLS zero da página inteira ou dos visitantes, nem mede INP.

A revisão independente em [motion-visual-review.md](motion-visual-review.md) retornou **ship**, sem achados visuais materiais no escopo da assinatura, indicador e setas. Foi leitura de código e capturas, sem reexecução de navegador pelo revisor. Além de `desktop.png` e `mobile.png`, as evidências incluem `contact-desktop.png`, `contact-mobile.png`, `contact-reduced-motion.png`, `contact-playing-desktop.png` e `desktop-hero-motion-final.png` em `.impeccable/review/`. Capturas e testes não certificam fluidez em aparelhos físicos, uso por leitor de tela ou conformidade integral de WCAG.

O backup anterior à extensão preserva 74 arquivos verificados por SHA-256, em `backups/2026-10-10_1639-pre-remotion` e no ZIP `foxstage-backup-2026-10-10-pre-remotion.zip` (16.411.561 bytes). Não foi modificado durante esta extensão. A restauração usa pasta vazia, seguida de `npm ci`, build e servidor local.

## Verificação da correção de autoplay 2.1.1

O pedido mais recente exige início sem clique ou teclado, movimento fluido e contínuo, ausência de controles e parada após uma execução. O código atual usa 60fps, 300 quadros (cinco segundos), traduções sobrepostas de 0 a 4,65s e manutenção do quadro 299. `SignaturePlayer` inicia silenciado, aguarda o ref e as fontes, pausa fora de vista ou com documento oculto e não repete após concluir. A arte estática e o contato permanecem disponíveis nos fallbacks.

[motion-qa.json](motion-qa.json) registra **pass** em `2026-10-10T22:12:50.626Z`, no Chromium headless e na produção local `http://127.0.0.1:3001`, sem limitação de CPU/rede. Esta é a execução posterior ao ajuste do movimento da primeira linha mobile e do recorte no início do Player; substitui o relatório anterior de `2026-10-10T22:09:44.260Z`.

| Cenário da correção | Resultado registrado nessa execução |
|---|---|
| Autoplay ao rolar | Início sem clique ou teclado. |
| Navegação direta à âncora | Desktop de 1440px e mobile de 390px iniciaram sem interação e terminaram no quadro 299. |
| Controles | Ausência de botões de movimento e de tab stops adicionais. |
| Continuidade | Amostras temporais desktop mostram avanço do quadro e evolução conjunta das três traduções. |
| Visibilidade | Pausa/retomada fora de vista e com documento oculto por sinal simulado. |
| Término | Quadro 299 estável, sem repetição automática. |
| Responsividade | 320, 360, 390, 430, 768, 1024, 1440 e 1920px; largura do documento igual à viewport e lista de recortes detectados vazia no cenário. |
| Preferência e fallbacks | Movimento reduzido inicial e alterações de preferência, ausência de JavaScript e chunk bloqueado aprovados. |

A revisão independente inicial [motion-autoplay-review.md](motion-autoplay-review.md) retornou **fix**: o limite inferior então aplicado ao deslocamento compacto deixava “Aprenda” imóvel. O código removeu esse limite para conservar o percurso proporcional de 7 até 8 e acrescentou `overflowVisible` no Player para preservar a linha no início. A QA posterior passou. [motion-mobile-progress.json](motion-mobile-progress.json), de `2026-10-10T22:13:14.696Z`, registra **pass** em 390px: nas amostras dos quadros 55 a 274, o translate da primeira linha evolui de `-8,33159px` até `0px`, enquanto a borda esquerda da palavra permanece mais de 20px dentro do painel. A captura `.impeccable/review/autoplay-moving-390.png` foi renovada. O parecer independente posterior deve ser consultado no registro de revisão; não se transfere o `ship` histórico de 2.1.0.

O parecer final em [motion-autoplay-review.md](motion-autoplay-review.md) registrou **`disposition: ship`**, **correção #1 resolvida**, `remaining: clear` e **Disposer: pass**. O escopo é exclusivamente o achado pontuado da primeira linha mobile: código ajustado, captura renovada e amostras locais fornecidas pelo agente principal. O revisor reabriu as mesmas quatro capturas e não observou regressão material nesse lote; não reexecutou o navegador, detector ou nova busca de acabamento. Esse parecer encerra o achado específico e não recertifica a página inteira, fluidez em hardware real, redes lentas ou métricas de campo.

[motion-performance-observation.json](motion-performance-observation.json), de `2026-10-10T22:13:22.375Z`, registra **433,90625px** antes e depois do Player e `layoutShiftValues` vazio, com fontes e imagens prontas. O chunk adiado observado tem **326.031 bytes sem compressão e 99.644 bytes gzip**. São medidas locais posteriores ao ajuste; não são dados de campo, nova nota Lighthouse, CLS da página inteira, medição de INP ou prova de fluidez em aparelhos físicos. A ocultação de documento foi simulada em headless, sem alternância nativa de abas.

Build, tipagem e lint passaram após o último ajuste, conforme a execução informada pelo agente principal. Os cinco testes de domínio/WhatsApp já registrados têm escopo distinto da QA de movimento; este passe documental não reexecutou comandos da aplicação.

Nenhum novo recurso foi criado ou instalado. Remotion e Impeccable já disponíveis foram reaproveitados; a consulta ao acervo O Setup permaneceu inconclusiva por OAuth, sem presumir catálogo vazio. O backup pré-Remotion foi preservado.

## Pendências de lançamento

- Domínio e hospedagem aprovados; configuração de URL e indexação no build e revisão dos metadados com a origem real.
- Confirmação editorial e comercial de público, modalidade, catálogo, preços, localização, condições de entrada e informações legais que forem divulgadas.
- Operação real e configuração de privacidade caso sejam habilitados formulário ou analytics; os módulos atuais permanecem desligados.
- Validação de acessibilidade além dos cenários documentados, incluindo zoom nativo de 200%, leitor de tela e contraste sobre os recortes fotográficos.
- Medição de desempenho em condições reais, incluindo INP e dados de campo quando disponíveis.

A QA posterior ao ajuste mobile passou e o parecer final encerrou somente a correção #1, conforme [motion-autoplay-review.md](motion-autoplay-review.md). Os pareceres `ship` de 2.0.1 e 2.1.0 permanecem históricos. As demais pendências tratam de confirmação, publicação e escopo de validação; a prévia local não equivale a um site público lançado.


## Aplicação de marca 2.2.0 — 10 de outubro de 2026

Manual B fornecido em `assets/Identidade visual Foxstage/` aplicado após aprovação explícita do usuário. Build, lint, cinco testes de domínio/WhatsApp, QA de marca em 12 larguras e regressão de movimento passaram. O relatório `docs/brand-audit.md` registra os parâmetros conferidos; `docs/brand-qa.json` registra dimensões, proteção, variantes, ícones e Open Graph. Os dados históricos de Lighthouse não foram revalidados por esta migração. O kit original não foi alterado.


## Hero ampliado 2.2.1

Build com TypeScript, lint, QA em 13 larguras e regressão de movimento passaram. Recorte visual revisado em 390, 1440, 1728, 1920 e 2560px, com janela curta adicional. Ver docs/hero-wide-review.md e docs/hero-wide-qa.json.

## Banners 2.3.1

Build com TypeScript, lint e QA dos dois banners em 13 larguras passaram. Verificados intervalo real de 10 segundos, navegação manual, teclado, gesto simulado, pausa/retomada, foco após toque, movimento reduzido e fallback sem JavaScript. O teste de retomada falhou antes do ajuste de saída do ponteiro e passou depois. Cinco testes de domínio/WhatsApp e regressão de Remotion passaram no mesmo ciclo de trabalho. Detalhes e limites: [banners-review.md](banners-review.md) e [banners-qa.json](banners-qa.json).

## Extensão do hero 2.4.0

Faixa aprovada aplicada com Creme #F3EFE8, confirmado na página 7 do manual B. Build com TypeScript, lint e cinco testes de domínio/WhatsApp passaram. QA da extensão em 13 larguras conferiu alinhamento, cor exata, união ao hero, links específicos, alvos de toque, foco por teclado e fallback sem JavaScript. Regressões do carrossel e da assinatura Remotion passaram após a aplicação. O relógio do teste de toque do carrossel foi congelado antes da navegação para eliminar avanço de tempo real durante os passos da automação. Relatórios: [hero-goals-review.md](hero-goals-review.md), [hero-goals-qa.json](hero-goals-qa.json), [banners-qa.json](banners-qa.json) e [motion-qa.json](motion-qa.json).

## Copy do hero 2.4.1

Build com TypeScript, lint, QA da extensão em 13 larguras e QA de centralização dos dois banners em 9 larguras passaram. A copy desktop ficou centralizada na fotografia com desvio inferior a 1px. Alinhamento à esquerda, espaço em relação ao menu e geometria mobile preservados. Ver [hero-center-qa.json](hero-center-qa.json) e [hero-goals-review.md](hero-goals-review.md).


## Copy e English Day 2.5.0 — 10 de outubro de 2026

Copy aprovada aplicada; English Day com foto e vídeo reais. Build final, lint e cinco testes existentes passaram. QA de navegador: 23 verificações, os dois banners em 11 larguras, vídeo reproduzido após clique, HTTP 206, foco de teclado e fallback sem JavaScript. CSS das regiões anteriores e tokens existentes preservados. Evidências e limites em COPY-IMPLEMENTATION.md e copy-implementation-qa.json.
