# Implementação do contrato Foxstage 3.1.1

**Complemento de publicação de 17/10/2026:** consentimento granular, políticas, descoberta e recuperação de falhas estão descritos em [Auditoria técnica](AUDITORIA-PUBLICACAO-2026-10-17.md). Configurações pendentes e roteiro de Android/iPhone físicos: [Checklist](PUBLICACAO-CHECKLIST.md). O complemento preserva a composição visual 3.1.2. Não habilitar tags sem consentimento nem inserir CNPJ fictício como dado confirmado.

**Conteúdo vigente:** versão 3.1.2, home preservada e páginas institucionais liberadas para publicação. Consultar a nota final desta versão antes de reutilizar especificações históricas.

Registro de 10 de outubro de 2026. Esta implementação preserva a composição aprovada e aplica a direção B escolhida pelo usuário, conforme o kit completo fornecido em assets. A direção é editorial para um curso de inglês, com fotografia, títulos condensados, laranja/preto/creme/branco e contato direto. Cores e fontes seguem agora o manual B v1.0 aprovado neste projeto. A pesquisa inicial do Instagram não é apresentada como origem desse manual.

O acabamento 2.0.1 permanece registrado abaixo. A extensão 2.1.0 acrescenta a assinatura Remotion ao painel final, o indicador do menu desktop e o feedback das setas, preservando conteúdo factual, imagens, ordem das regiões e contatos. Não houve publicação.

## Autoridade e fonte canônica

`PRODUCT.md` registra os compromissos de produto. O contrato de implementação continua composto pelos três arquivos originais na raiz: `design.md`, `design.json` e `foxstage-prompt-completo-nextjs.md`. Fatos confirmados e instruções explícitas do usuário prevalecem; `design.json` governa valores e aliases; `design.md` governa composição e comportamento; o prompt organiza a execução. As referências fixadas são `assets/references/01-hero-reference.png` e `assets/references/03-full-page-reference.png`; a montagem `02-overview-reference.png` ajuda a ler o ritmo, sem especificar breakpoints.

A documentação de acabamento segue o levantamento de componentes e evidências da referência `document.md` da skill Impeccable, adaptado à autoridade existente. O contrato local já é legível por máquina e foi aprovado. Seus arquivos e sua estrutura foram preservados: não houve migração para outro esquema, criação de frontmatter com uma segunda paleta ou sidecar concorrente. A documentação abaixo descreve a tradução do contrato para o código.

## Tokens e estilos

`scripts/generate-tokens.mjs` percorre as camadas `primitive`, `semantic` e `component`, resolve os aliases e gera `src/app/tokens.css`. O gerador acusa aliases inexistentes e ciclos. Também traduz as medidas de layout e tipografia pertinentes em variáveis CSS. A última compilação gerou **109 tokens resolvidos**, além das variáveis de layout e tipografia.

| Origem canônica | Uso no CSS | Aplicação |
|---|---|---|
| `tokens.primitive.*` | `--primitive-*` | Valores base, raios, sombras e duração. |
| `tokens.semantic.*` | `--semantic-*` | Superfícies, texto, acentos, foco, espaço e famílias por função. |
| `tokens.component.*` | `--component-*` | Header, hero, botões, cards e painel de contato. |
| `layout.*` | `--layout-*` | Larguras, margens, grids e recortes responsivos. |
| `typography.*` | `--type-*` | Escala, entrelinha, peso e medida de leitura. |

`globals.css` aplica essas variáveis e as regras responsivas. `tokens.css` é um derivado, não uma fonte paralela: mudanças nos valores aprovados devem partir de `design.json`. Regras locais de composição não criam outra identidade. Tokens de campos, erro e sucesso permanecem disponíveis no contrato, mas não anunciam um formulário ativo.

Bebas Neue 400 e Source Sans 3 400–700 são carregadas de arquivos WOFF2 locais por `next/font/local`, a partir das dependências do projeto. O carregamento não depende de uma chamada externa de fonte em tempo de visita, e a tipografia não é condensada artificialmente. A família de título é usada em títulos; a de leitura permanece nos textos e controles.

## Mapeamento das regiões

`src/app/page.tsx` compõe conteúdo institucional renderizado no servidor. `MobileMenu`, `DesktopNavigation` e `SignatureMotion` delimitam as interações no cliente. O contato é um link real; não simula envio ou matrícula.

| Região do contrato | Componente | Resultado implementado |
|---|---|---|
| Hero / `#inicio` | `Hero`, `HeroGoals`, `Header`, `Brand` | Fotografia com pessoas à direita, copy à esquerda e header branco em cápsula sobreposto no desktop; header em fluxo normal nos tamanhos menores. |
| Sobre / `#sobre` | `About` | Fundo branco, texto antes da imagem e duas colunas no desktop; empilhamento no mobile. |
| Prática / `#como-funciona` | `Practice` | Faixa preta, três cards fotográficos e conteúdo sempre visível; colunas 3/2/1. |
| Atalhos / `#atendimento` | `ContactShortcuts` | Superfície creme e primeiro card laranja; destinos para WhatsApp, aulas e Instagram. |
| Curso / `#cursos` | `Courses` | Composição editorial com uma fotografia e apresentação geral; sem catálogo ou seletor inventado. |
| Contato / `#contato` | `ContactCTA`, `SignatureMotion` | Painel escuro recuado no creme: assinatura pública à esquerda e contato à direita, em duas colunas iguais; mobile em uma coluna. Arte estática e CTA real permanecem disponíveis antes do Player e nos fallbacks, sem fabricar colagem de alunos. |
| Rodapé | `Footer`, `Brand`, `WhatsAppLink` | Variante detalhada em três grupos: marca, navegação e contato; uma coluna no mobile. |

Não há espaço reservado para módulos desligados. Formulário de leads, analytics, depoimentos, FAQ e processo de entrada não estão ativos. Não foram acrescentados portal, login, pagamento, newsletter ou calendário.

## Ajustes de implementação registrados

Dois ajustes foram incorporados ao contrato numérico, preservando a composição aprovada:

- `layout.hero.copyPaddingTopDesktop`: de **160px para 64px**, para acomodar a copy e a fonte reais dentro da altura desktop de 640px.
- `layout.hero.mobilePhotoHeight`: inicialmente **360px** na versão 2.0.1; atualizado para **460px** na versão 2.3.0 com máscara vertical até transparente. A altura total continua determinada pelo conteúdo.

Esses valores já estão em `design.json`; a versão 2.0.1 registra o acabamento e o mapeamento, sem alterar as demais decisões do sistema.

## Navegação e estados

O menu móvel usa disclosure nativo `<details>/<summary>` em fluxo normal. O estado `open` fornece a semântica de expansão nativa do navegador; não se repete um atributo literal `aria-expanded` que poderia ficar incorreto sem JavaScript. Há `aria-controls`, e a melhoria com JavaScript fecha por Escape, devolve o foco ao acionador e fecha ao escolher uma âncora, levando o foco à seção. Não há bloqueio de foco de um modal. Sem JavaScript, o disclosure e os links continuam disponíveis.

Os links do rodapé usam `next/link` com destinos da página inicial, inclusive na página 404. `Brand` usa o nome acessível “Foxstage, início”; a imagem da assinatura tem alt vazio para não duplicar o nome. O nome visual faz parte do SVG em curvas. Há skip link, foco visível por superfície e avisos de nova aba para os contatos externos.

Botões primários usam texto escuro sobre o acento e mudam de cor no hover/active. A interação não desloca os botões. Cards fotográficos podem ampliar a imagem dentro do recorte; o texto fica visível em repouso. `prefers-reduced-motion` desliga transições, zoom e rolagem suave. A implementação também inclui tratamento de cores forçadas.

Na extensão 2.1.0, `DesktopNavigation` acompanha a seção em leitura e fornece `aria-current="location"`. O indicador laranja altera posição e largura com translate/scale em 220ms. Setas horizontais e diagonais de ação deslocam 3px no hover ou foco em 160ms; o botão permanece no mesmo lugar. Movimento reduzido elimina essas transições e deslocamentos, conservando o estado atual.

`WhatsAppLink` usa o helper `whatsappUrl` para validar o número e codificar a mensagem por origem. O número vem de `design.json`; mensagens e demais conteúdos vivem em `src/content/site.ts`. O atributo `data-contact-origin` identifica a origem do link, sem um sistema de analytics ativo. Abrir o destino não envia automaticamente uma mensagem.

## Extensão de movimento 2.1.1 (correção da versão 2.1.0)

A assinatura pública “Aprenda inglês. Fale inglês. Viva o inglês.” reutiliza Bebas Neue, Source Sans 3 e os tokens existentes. O painel final passa a duas colunas `1fr 1fr` no desktop, com padding de 48px, e uma coluna no mobile. `behavior.motion.signature` governa 60fps, 300 quadros (cinco segundos), quadro final 299, reprodução única, ausência de áudio e loop, margem de pré-carregamento de 200px e limiar de visibilidade de 40%. O deslocamento mobile equivale a um quarto do desktop.

`SignatureArtwork` é compartilhado pela arte estática e pela composição. `SignatureMotion` renderiza o poster no servidor, conserva a frase completa para tecnologia assistiva e usa observadores de interseção para a melhoria adiada. `SignaturePlayer` é importado dinamicamente, sem SSR, apenas perto da viewport e quando a preferência permite movimento. A reprodução começa com a visibilidade necessária, aguarda o Player e as fontes existentes e inicia silenciada, sem depender de ativação por clique ou teclado. Não há controles de pausa, continuação ou repetição. As traduções se sobrepõem de 0 a 4,65s; os últimos quadros mantêm a arte final. Pausa fora de vista e com documento oculto; concluir não causa nova execução ao voltar à seção. Falha de importação ou do Player conserva a arte estática. O link de WhatsApp fica fora da camada visual do Player.

`src/remotion/config.ts` lê o contrato canônico; `SignatureComposition.tsx` usa o quadro para calcular o deslocamento tipográfico. `SignatureArtwork` mantém o eixo de posição fixo e aplica o deslocamento por translate, preservando curva e arte final sem recalcular a posição de layout por quadro. `src/remotion/index.tsx` registra a entrada do Studio, com `FoxstageSignature` e `FoxstageSignatureMobile` em `Root.tsx`. `npm run studio` abre a revisão na porta 3002 com `--public-dir=public`. O carregador `@remotion/fonts` pertence a essa entrada separada; o Player do site usa o `next/font/local` já existente. As cópias em `public/fonts/` vêm das mesmas dependências tipográficas, com suas licenças OFL preservadas.

Remotion, Player, fontes e CLI têm versão fixada em 4.0.534; Zod está em 4.5.4. A CLI é dependência de desenvolvimento. Não foi acrescentado áudio, renderização de vídeo no servidor, serviço de exportação ou coleta de dados. `npm run test:motion` executa `tests/motion.browser.mjs`; usa Playwright disponível no runtime local ou o módulo indicado por `FOXSTAGE_PLAYWRIGHT_MODULE`, e `FOXSTAGE_QA_URL` escolhe o servidor (padrão `http://127.0.0.1:3001`, mesma origem da produção local revisada).

O backup anterior está em `backups/2026-10-10_1639-pre-remotion` e no ZIP entregue `foxstage-backup-2026-10-10-pre-remotion.zip` (16.411.561 bytes). Os 74 arquivos foram conferidos por SHA-256. Para restaurar, extrair em pasta vazia e executar `npm ci`, `npm run build` e `npm run start`; não sobrepor uma instalação em trabalho. A extensão não altera esse backup.

Evidências e limites atuais estão em [motion-qa.json](motion-qa.json), [motion-mobile-progress.json](motion-mobile-progress.json), [motion-autoplay-review.md](motion-autoplay-review.md) e [VERIFICATION.md](VERIFICATION.md). A QA após o ajuste mobile passou; o parecer independente correspondente está no registro de revisão. [motion-visual-review.md](motion-visual-review.md) conserva o `ship` histórico da extensão 2.1.0. A observação local [motion-performance-observation.json](motion-performance-observation.json) registra a altura do painel antes e depois do Player e não registrou layout shifts no intervalo desktop observado, após fontes e imagens prontas. O custo observado do chunk adiado é uma medida local de build/carregamento; não fornece nova nota Lighthouse ou dados de campo de Core Web Vitals.

## Imagens e proveniência

`assets/logo.png` foi preservado como histórico. Na versão 2.2.0, os SVGs copiados do kit B substituem essa arte na interface; nenhum mestre do kit é alterado. As capturas de referência não são usadas como imagens publicadas. As imagens de página usam `next/image`, tamanhos responsivos e recortes documentados; o hero é pré-carregado.

O registro completo de cada arquivo está em [assets-manifest.json](assets-manifest.json): cinco imagens do Pexels com origem, autor, licença e data de consulta, além do hero fictício gerado por IA e de seu original em `assets/generated/hero-ingles.png`. Os autores foram registrados conforme a página de origem, inclusive o identificador exibido para `pratica-idioma.jpg`; não se presume a origem humana de uma imagem apenas por estar no banco.

As legendas e os textos alternativos tratam esse material como ilustrativo. Nenhuma imagem comprova alunos, equipe, instalações ou resultado pedagógico. A verificação de proveniência cobriu dez rasters usados ou gerados e não encontrou arquivo sem registro de origem. Isso documenta os ativos da prévia; não transforma material ilustrativo em prova comercial da escola.

## Metadados e publicação

`src/lib/publication.ts` centraliza a configuração por `SITE_URL` e `SITE_INDEXABLE`, aplicada no build. Sem uma origem HTTPS válida e autorização explícita de indexação, a prévia permanece fora da busca. `layout.tsx` configura idioma, título, descrição e metadados sociais; canonical e `metadataBase` dependem do domínio. `page.tsx` emite apenas dados de `Organization` conhecidos, sem endereço, notas, avaliações ou ofertas presumidas.

As rotas `robots.txt`, `sitemap.xml`, imagem Open Graph, ícone, ícone Apple e página 404 foram implementadas. O domínio ainda ausente deixa o aviso de fallback localhost de `metadataBase` pendente. Os headers configurados restringem enquadramento, inferência de tipo, referenciador e permissões de câmera, microfone e geolocalização.

## Recursos consultados e dependências pendentes

A consulta ao servidor `setup-agent` encontrou exigência de OAuth e não foi concluída; não foi presumida a inexistência de um recurso no acervo. Nenhum plugin, skill ou MCP novo foi criado ou instalado. A consulta à 21st limitou-se a metadados, sem copiar um componente. Figma foi uma possibilidade condicional; nenhum arquivo Figma foi criado.

Na extensão 2.1.0, os plugins Remotion e Impeccable já instalados foram reaproveitados. A limitação OAuth da consulta ao acervo O Setup continuou explícita; ela não fundamenta uma conclusão de catálogo vazio nem a criação de recurso equivalente.

A publicação depende de domínio/hospedagem e revisão do conteúdo e das informações legais aplicáveis. Catálogo, público, modalidade, preços, endereço, credenciais, depoimentos e condições de entrada continuam sem confirmação. Formulário e analytics exigem operação e configuração reais caso sejam aprovados. Essas ausências foram respeitadas no conteúdo atual, e não há promessa de prontidão pública ou de conformidade integral de acessibilidade.

### Correção de autoplay 2.1.1

O teste da versão anterior, em navegação direta sem interação, encontrou estado `playing` com quadro 0 parado. A versão corrigida usa `initiallyMuted`, aguarda a disponibilidade do ref do Player, separa os listeners da sincronização de visibilidade e fixa explicitamente o último quadro ao terminar. O espaço de 48px reservado aos controles foi removido junto com os botões. O backup pré-Remotion permanece intacto.

A revisão independente apontou que o limite inferior do deslocamento mobile deixava “Aprenda” imóvel. `SignatureComposition` agora conserva o início proporcional de 7 até o eixo final 8; o Player usa `overflowVisible` para preservar a linha no início desse percurso. A execução posterior passou e o probe de 390px registrou variação da primeira linha com margem superior a 20px até a borda esquerda do painel nas amostras. A captura `autoplay-moving-390.png` foi renovada; o parecer posterior deve ser consultado em `motion-autoplay-review.md`.


## Aplicação do manual B — versão 2.2.0

Aprovada pelo usuário em 10 de outubro de 2026. O kit completo em `assets/Identidade visual Foxstage/` é a referência atual da marca; a assinatura anterior permanece arquivada. Header compacto colorido, rodapé horizontal invertido com variante compacta no celular, ícones de aba e toque e Open Graph utilizam a mesma geometria do kit. As sete cores e as famílias tipográficas já coincidiam com o manual; mantêm-se seus valores. O lettering da logo não é reconstruído com CSS.

O relatório da aplicação está em `docs/brand-audit.md`; evidências de navegador em `docs/brand-qa.json`. O manual e seus manifestos originais são preservados como entrega emitida antes desta migração.


## Hero ampliado — 2.2.1

Aprovado pelo usuário em 10 de outubro de 2026: largura máxima de 1680px, margem lateral mínima de 40px e altura desktop fluida de 640 a 740px. O ganho de altura se concentra acima de 1440px de viewport; em 1728px chega a 700px e em 1920px a 740px, com raiz de 16px. Conteúdo interno permanece no eixo de 1200px e o header no limite de 1160px. As regras de tablet e celular, fontes, identidade B, conteúdo e movimento permanecem vigentes. `sizes` da imagem acompanha a nova largura. Snapshot dos arquivos anteriores em `backups/2026-10-10-pre-hero-wide/`.


## Banners e correção mobile — 2.3.0

Pedido explícito de 10 de outubro de 2026: dois banners definidos em `site.hero.banners`, com rotação automática a cada 10 segundos e navegação manual por indicadores, teclado e gesto lateral. Um CTA por banner. O carrossel pausa por controle explícito, foco, hover, toque ou aba oculta; com movimento reduzido, a troca é exclusivamente manual. Não altera o autoplay da assinatura Remotion. O primeiro banner continua no HTML sem JavaScript.

No celular, foto de 460px com máscara que se torna transparente antes do fim da imagem, sobre fundo preto; overlay vertical complementar. Não existe junção opaca aos 360px. Texto começa com padding superior `clamp(15rem, 68vw, 18rem)` e o CTA tem largura pelo conteúdo, com padding horizontal de 18px. Botões de curso e contato também deixam de ocupar 100% da largura no celular. O desktop preserva dimensões, eixo e tipografia aprovados. A segunda fotografia já possui proveniência documentada e continua identificada como ilustrativa.

### Ajuste de composição 2.3.1

Pedido de 10 de outubro de 2026: desktop com hero até 1840px, margens laterais mínimas de 24px e altura de 664–764px. O início da fotografia fica 49px abaixo do topo do menu de 76px, aproximadamente 65% da altura do menu; header permanece em seu eixo de 1160px e texto em 1200px. Isso aumenta o respiro entre menu e copy. Tablet e mobile mantêm margens e sobreposição próprias.

No mobile, os dois títulos têm duas linhas editoriais explícitas, fonte fluida de 36–44px e nenhuma terceira linha vazia. Clique ou toque nos indicadores libera o foco após a seleção; teclado mantém foco visível. Toque não ativa pausa por hover. A rotação reinicia com 10 segundos completos após a interação.

## Extensão de objetivos do hero — 2.4.0

Conceito aprovado pelo usuário em 10 de outubro de 2026, a partir da edição da print em `assets/concepts/2026-10-10-goal-strip/foxstage-faixa-objetivos-conceito.png`. Implementar faixa em creme unida à base do hero e fora do carrossel. A fotografia preserva os cantos superiores; a faixa recebe os cantos inferiores de 24px. Cor exata do manual B, página 7: **Creme #F3EFE8**, RGB 243,239,232. Usar o alias `tokens.component.heroGoals.background` resolvido a partir da superfície de apoio existente, sem amostrar cor da imagem gerada.

Eyebrow “Seu objetivo”; pergunta “Onde você quer usar o inglês?” em Source Sans 3 700, caixa normal. Três links simples: “No dia a dia”, “Em viagens” e “No trabalho”, cada um com seta pequena e mensagem específica no WhatsApp confirmado. São objetivos de visitantes, não catálogo Business, cursos de viagem ou promessa de fluência. Sem cards, botões em cápsula, números, ícones adicionais ou efeitos de entrada. A faixa é HTML renderizado no servidor, inclusive sem JavaScript.

Desktop: conteúdo alinhado ao eixo interno do hero, limite de 1200px, padding vertical de 24px, pergunta à esquerda e três links à direita separados por linhas verticais. Tablet: pergunta acima dos links; celular: links em lista com linhas horizontais e alvo mínimo de 44px. Espaço até Sobre: 48px desktop e 40px tablet/mobile. Preservar as duas imagens, a rotação de 10 segundos, a navegação manual e as dimensões do banner. Snapshot anterior em `backups/2026-10-10-pre-hero-goals/`.

### Centralização da copy no desktop — 2.4.1

Pedido de 10 de outubro de 2026: centralizar verticalmente o conjunto completo de eyebrow, título, descrição e CTA dentro da fotografia em cada banner, mantendo alinhamento à esquerda e eixo horizontal existente. Em viewport >=1024px, o slide recebe a altura mínima do hero e alinhamento flex ao centro; os paddings superior e inferior de 64px permanecem simétricos. Se o texto exigir mais espaço, a altura pode crescer sem recorte. Não centralizar em relação à faixa de objetivos. Tablet e mobile preservam os posicionamentos aprovados.


## Copy e English Day — versão 2.5.0

Aprovados pelo usuário em 10 de outubro de 2026 após a auditoria editorial em `docs/AUDITORIA-COPY-FOXSTAGE.md`. A copy vigente está centralizada em `src/content/site.ts`, com proposta aprovada preservada em `docs/copy-proposta.json`; substitui os exemplos textuais anteriores sem alterar a composição das regiões existentes. Confirmações do usuário: aulas online ao vivo em grupo, opção individual personalizada, foco em conversação, cotidiano e situações reais, com espaço para errar durante a prática. Não ampliar personalização individual para as aulas em grupo nem inventar diagnóstico, duração, turmas, preços, materiais, certificação ou resultados. Navegação: Início, Sobre, O método, As aulas, Contato. CTA comercial: Conhecer as aulas; contato: Falar no WhatsApp.

English Day é o módulo adicional aprovado entre as aulas e o contato final. Encontro presencial entre alunos a cada quatro meses, organizado e custeado pela Foxstage, com comunicação em inglês durante todo o dia. Atividade definida pela escola; edição registrada no cinema. Apresentar foto e vídeo reais fornecidos, sem alterar ou substituir o hero, a composição institucional, os três cards, os atalhos ou a assinatura Remotion. Não atribuir idioma ao filme, anunciar próxima data, despesas específicas, gratuidade irrestrita ou resultados de proficiência.

O módulo reutiliza creme #F3EFE8, famílias, títulos, raios e CTAs do manual vigente. Layout editorial: narrativa e fotografia completa à esquerda, vídeo vertical à direita no desktop; uma coluna no celular. Vídeo nativo com controles, playsInline, poster e preload none; sem autoplay. MP4 remuxado com faststart, mantendo áudio e vídeo, sem biblioteca adicional. Foto WebP sem recorte; originais intactos em assets/english-day. O vídeo possui legendas gravadas em suas imagens; não foi produzida transcrição integral ou faixa de legendas selecionável, e não há nova declaração de conformidade integral de acessibilidade.

Backup anterior validado por SHA-256: `backups/2026-10-10-pre-copy-english-day/`. Nenhuma publicação, coleta de leads ou ferramenta nova. Evidências desta aplicação em `docs/copy-implementation-qa.json` e `docs/COPY-IMPLEMENTATION.md`; evidências antigas permanecem históricas.


## English Day 2.6.0 — composição e movimento

Esta nota substitui as regras visuais do English Day 2.5.0. Apenas esta seção foi redesenhada por solicitação do usuário. Fundo laranja oficial #F65A0B, texto preto #101314 e CTA preto com texto creme claro. O desktop organiza a copy à esquerda e a fotografia real ao lado do vídeo em um mockup de celular. A composição se empilha abaixo de 1024px; abaixo de 768px, o celular precede a foto, sem sobreposição entre controles e imagem. A fotografia mantém o quadro completo 4:3.

O Remotion faz uma entrada de 1,6 segundo da fotografia e da legenda editorial, em uma composição de 2 segundos a 60fps. Executa uma vez e permanece no último quadro, sem controles de animação. O vídeo HTML permanece independente da linha do tempo: inicia sem som quando pelo menos 35% dele entra na tela, pausa fora da tela ou com a aba oculta e termina sem loop. Os controles nativos permitem som, pausa e tela cheia. A preferência por movimento reduzido desliga tanto a entrada quanto o autoplay; foto, poster e reprodução manual permanecem disponíveis. A arte estática compartilhada também atende ausência de JavaScript, falha de carregamento e bloqueio de autoplay. Não renderizar um MP4 adicional para esta entrada.

A copy aprovada, o hero, a navegação e as demais regiões foram preservados. O vídeo e a foto continuam os arquivos reais fornecidos pelo usuário. Backup anterior: backups/2026-10-10-pre-english-day-motion. Consulte docs/ENGLISH-DAY-MOTION.md para decisões e validação.


## English Day 2.7.0 — coreografia da seção

Esta nota substitui o movimento e a composição do English Day 2.6.0, por solicitação do usuário em 11 de outubro de 2026. Remover o título separado “Edição no cinema”; manter apenas a legenda na moldura da fotografia. Foto integral 4:3 mais alta, inclinada -6° no desktop, e celular à direita formam um único conjunto. Canvas desktop 680×570; mobile 360×810, com celular acima da foto e sem recorte de participantes ou sobreposição de controles.

Uma linha do tempo Remotion de 6 segundos, 360 quadros a 60fps, coordena eyebrow, título, dois parágrafos, CTA, fotografia e celular. A copy entra em sequência e estabiliza até 1,7 segundo; foto e celular percorrem arcos opostos, variam escala e inclinação e assentam até 5,5 segundos. Executa uma vez, segura o quadro 359 e não apresenta controles de animação. Inicia quando 35% do heading entra na tela; pausa quando toda a seção sai da tela ou a aba fica oculta. O Player transmite frameupdate para variáveis CSS dos elementos HTML reais, sem atualizar estado React por quadro. Hover/foco preserva a posição do CTA ou celular durante interação; conclusão limpa as transformações.

O vídeo nativo continua independente, com autoplay sem som quando 35% dele fica visível, controles de som/pausa/tela cheia, pausa manual respeitada e sem loop. Movimento reduzido, ausência de JavaScript e falha do Player preservam a composição estática e reprodução manual. O fundo usa o laranja #F65A0B do manual; foto, vídeo, copy e todas as demais regiões permanecem preservados. Reaproveitado o Remotion 4.0.534 já instalado. Catálogo 21st consultado: referência “Focus Pull To Phone” (mg-pr-focus-pull) inspira a transferência de profundidade, sem importar fonte ou adicionar dependências. Backup: backups/2026-10-11-pre-english-day-choreography. Registro e verificações em docs/ENGLISH-DAY-CHOREOGRAPHY.md.


## English Day 2.7.1 — recorte e chegada da copy

Correção de 11 de outubro de 2026: o arco aprovado da fotografia ultrapassa a borda do canvas no início; SVG e Player recortavam a imagem com overflow hidden. Usar SVG overflow visible e a propriedade overflowVisible do Player, preservando integralmente trajetória, rotação, escala, tamanho e posição final da foto e do celular. O limite externo da seção continua contido, sem scroll horizontal.

A copy passa a ter uma chegada editorial: título revelado por máscara vertical, com deslocamento máximo de 14px e duração de 0,8s; parágrafos e CTA entram com deslocamento vertical de 8px e duração de 0,55s, estabilizando até 1,05s. Eyebrow aparece primeiro. Remover deslocamento lateral, skew e escala do texto e do CTA. Abertura, transformações e opacidade continuam sincronizadas pelo mesmo relógio Remotion; foco por teclado mantém o CTA visível e estável. A versão estática permanece o padrão sem JavaScript ou com movimento reduzido. Vídeo e demais regiões preservados. Backup: backups/2026-10-11-pre-english-day-arrival. Verificação: docs/english-day-arrival-qa.json.


## English Day 2.7.2 — copy estática

Pedido de 11 de outubro de 2026: remover toda animação de eyebrow, título, parágrafos e CTA. Esses elementos permanecem HTML estático, visível desde o início, sem máscara, transformação, fade ou sequência de entrada. Remotion atua exclusivamente na foto e no celular/vídeo, com as mesmas trajetórias, duração, gatilho, reprodução única, pausa, controles e composição aprovados na 2.7.1. A correção do recorte permanece. Backup: backups/2026-10-11-pre-english-day-static-copy.


## English Day 2.7.3 — movimento contínuo sobre o celular

Correção solicitada em 11 de outubro de 2026: hover ou foco no celular não interrompe suas transformações. Remover o bloqueio por :hover e :focus-within; todos os quadros seguem atualizando a posição do celular. Preservar trajetórias, duração, vídeo nativo e copy estática. A linha do tempo só pausa com a seção fora da tela ou aba oculta; preferência por movimento reduzido mantém a versão estática. Backup: backups/2026-10-11-pre-english-day-hover-fix.


## Evolução institucional 3.0.0 — contrato vigente

Atualização de 12 de outubro de 2026. As notas anteriores permanecem como histórico. As páginas internas seguem agora o hero fotográfico e o ritmo da home, conforme os pedidos posteriores do usuário. Não usar o pequeno hero editorial previsto no planejamento inicial.

O hero mantém menu em cápsula sobreposto no desktop, degradê, título alinhado à esquerda e centralizado verticalmente e um CTA. A seção seguinte é branca, com respiro de 48px desktop e 40px tablet/mobile; o preto não encosta na base do banner. A extensão em creme dos cursos permanece unida ao hero. A ordem completa por página está em `design.json > layout.institutional.surfaceSequences` e em [Implementação institucional](EVOLUCAO-INSTITUCIONAL-IMPLEMENTACAO.md). O laranja oficial fica reservado ao destaque do English Day.

A home conserva sua composição e seus movimentos. A página English Day usa a foto real no hero e a composição foto/celular/vídeo numa seção laranja posterior, com copy estática e movimento somente nas mídias. As demais páginas usam fotografias existentes e mockups identificados, sem dados comerciais ou credenciais fictícios.

Os prompts completos de cada página em `docs/evolucao/prompts/` continuam como base de conteúdo, junto a este contrato. Localização confirmada: Rio de Janeiro/RJ, atendimento online em todo o Brasil; English Days presenciais na cidade do Rio; professor Felipe Pontes. As cinco novas páginas são prévias privadas e dependem de aprovação editorial para publicação pública. Não houve implantação em VPS.


## Estrutura própria por página — 3.1.0

Revisão solicitada em 12 de outubro de 2026: a home é referência da marca, não um molde de seções. Esta nota substitui a sequência fixa das internas descrita na 3.0.0. Heroes, home, fontes, cores oficiais e trajetórias de mídia permanecem.

Grupo: cena de conversa, exemplos cotidianos e consulta sobre turma. Individual: objetivo escolhido pelo visitante com mensagem contextual no WhatsApp, seguido de uma explicação breve do formato com fotografia. A Foxstage: posicionamento institucional, identidade oficial, professor confirmado e comunidade real. English Day: fatos essenciais, registro do cinema com mídias centrais e participação. Contato: uma seção de destinos e canais oficiais.

Não repetir em todas as internas o bloco de método, a comparação completa, o destaque laranja de English Day e a assinatura final da home. A quantidade e as cores das seções seguem o conteúdo da página. Detalhes em [Revisão de estrutura e copy](REVISAO-ESTRUTURA-E-COPY.md). Valores e funções atualizados em `design.json`; conteúdo das aulas em `src/content/evolution/courses.ts`. As páginas continuam como prévias privadas para revisão editorial.


## English Day com vídeo em destaque — 3.1.1

Pedido de 12 de outubro de 2026: na página `/english-day`, a fotografia do cinema fica apenas no hero. A seção laranja usa copy estática à esquerda e vídeo vertical à direita, inspirado na apresentação de um Reels. Remover foto duplicada e mockup de celular desta seção. Não acrescentar contadores, comentários, curtidas ou botões sociais fictícios. Marca oficial e link real do Instagram identificam a origem.

O vídeo mantém proporção464:816, controles nativos, autoplay sem som quando35% dele está visível, pausa fora da tela ou com aba oculta, respeito à pausa manual e ausência de loop. Movimento reduzido impede autoplay; reprodução manual e poster permanecem. A home conserva sua composição foto/celular e coreografia Remotion. O comportamento de playback é compartilhado em `src/hooks/useViewportVideo.ts`. Teste específico em `tests/english-day-reel.browser.mjs`; evidência em `docs/english-day-reel-qa.json`.


## Liberação das páginas institucionais — 13 de outubro de 2026

O usuário autorizou disponibilizar a versão completa na Vercel para apresentação ao cliente. As duas páginas de cursos, A Foxstage, English Day e Contato estão publicadas nos registros de conteúdo e devem aparecer no menu em produção. Esta autorização substitui as restrições históricas de prévia privada dessas páginas. Layout, copy e sistema visual permanecem como aprovados. Consulte [Publicação na Vercel](PUBLICACAO-VERCEL.md) para causa, configuração e validação.

## Preparação da VPS e imagem social — 17 de outubro de 2026

O Next.js gera `standalone` para o Dockerfile de produção. `compose.yaml` isola o Foxstage na bridge própria `foxstage-web`, sem portas publicadas, para o Traefik existente do usuário em `network_mode: host`, com entrada `websecure` e resolver `letsencrypt`. A configuração canônica é `https://foxstage.com.br`; indexação é habilitada pelo arquivo de ambiente da VPS. Nenhuma alteração no Traefik ou nos demais projetos é necessária. Instruções e pendências em [Produção na VPS](PRODUCAO-VPS.md).

A imagem de compartilhamento usa a fotografia do primeiro hero, assinatura oficial, fontes locais e degradê, em 1200×630, na URL versionada `/opengraph-image/hero-20261017`. Sharp é dependência explícita para decodificar o WebP no gerador. Open Graph e Twitter recebem a imagem; o corpo e as animações do website permanecem iguais.


## Avisos de mídia e submenu — 3.1.2

Pedido explícito de 17 de outubro de 2026: retirar da interface e do preview social os avisos de fotografia ilustrativa, imagem gerada por IA e equivalentes. Descrições alternativas permanecem objetivas sobre o conteúdo das imagens; não atribuir fotos de composição a alunos ou professores reais. A proveniência fica no manifesto interno de assets. Esta decisão substitui instruções históricas que exigiam avisos públicos.

O submenu desktop de Cursos usa links com largura completa, área mínima de 44px, cantos pequenos e transição apenas de cor e fundo na duração rápida existente. As regras são específicas para o submenu, evitando que o estilo geral inline-flex do menu reduza o destaque à largura do texto. Clique de ponteiro não deixa anel de foco; teclado, Escape e navegação sem JavaScript permanecem. A imagem social sem aviso usa a URL versionada `/opengraph-image/hero-20261017-v2`. O teste `tests/menu-media.browser.mjs` cobre a regressão.
