# Foxstage — website em Next.js

**Conteúdo vigente:** versão 2.5.0, copy aprovada e English Day com foto e vídeo; consultar a nota final desta versão antes de reutilizar textos históricos.

Prévia local do website institucional da Foxstage, implementada a partir do contrato visual aprovado **2.5.0**. A página apresenta a proposta pública de ensino de inglês e encaminha ao WhatsApp ou Instagram. A extensão acrescenta uma assinatura tipográfica Remotion no painel final, indicador de seção desktop e feedback nas setas. Não foi publicada.

A marca atual segue o manual B v1.0 aprovado pelo usuário, com kit completo em `assets/Identidade visual Foxstage/`. O contrato original permanece em [design.md](design.md), [design.json](design.json) e [foxstage-prompt-completo-nextjs.md](foxstage-prompt-completo-nextjs.md). `design.json` é a fonte canônica dos tokens; a implementação aplica os mestres da marca B e preserva a direção editorial das referências.

## Executar localmente

Requer Node.js **22 ou superior** e npm. Na pasta do projeto:

```sh
npm ci
npm run dev
```

Abra `http://127.0.0.1:3000`. Para executar a versão compilada:

```sh
npm run build
npm run start
```

O servidor também usa a porta 3000 por padrão. A prévia usada na revisão desta entrega foi iniciada na porta **3001**, com `npm run start -- --port 3001`. Os servidores Next.js escutam somente em `127.0.0.1`.

Para revisar a assinatura separadamente, execute `npm run studio` e abra `http://127.0.0.1:3002`. Há duas composições: `FoxstageSignature` e `FoxstageSignatureMobile`. O Studio usa `src/remotion/index.tsx`, `public` como diretório público e cópias locais das mesmas fontes licenciadas, com OFL preservada. Seu carregador de fontes fica separado do Player do site.

## Conteúdo e manutenção

- Conteúdo, navegação, mensagens de contato e módulos: `src/content/site.ts`.
- Cores, tipografia e medidas: `design.json` → `npm run tokens` → `src/app/tokens.css`. Não editar o CSS gerado; os comandos de desenvolvimento, build e tipagem o regeneram automaticamente.
- Composição: `src/app/page.tsx`, `src/components/` e `src/app/globals.css`.
- Assinatura e fallback: `src/components/motion/`; composição e configuração do Studio: `src/remotion/`. O comportamento canônico está em `design.json`, em `behavior.motion.signature`; a navegação desktop está em `src/components/ui/DesktopNavigation.tsx`.
- Origens, autores e licenças das imagens: [docs/assets-manifest.json](docs/assets-manifest.json). O hero é uma ilustração gerada por IA e identificada na página; as cinco imagens de banco são ilustrativas, sem representar alunos ou instalações da Foxstage.
- Mapeamento do contrato e decisões: [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md).
- Evidências e limites da verificação: [docs/VERIFICATION.md](docs/VERIFICATION.md).

Os registros duráveis da revisão estão em [docs/browser-qa.json](docs/browser-qa.json), [docs/lighthouse-summary.json](docs/lighthouse-summary.json), [docs/performance-observation.json](docs/performance-observation.json) e [docs/visual-review.md](docs/visual-review.md). As capturas ficam em `.impeccable/review/`.

A correção 2.1.1 tem [QA de autoplay](docs/motion-qa.json), [prova de movimento mobile](docs/motion-mobile-progress.json), [observação de carregamento](docs/motion-performance-observation.json) e [revisão independente](docs/motion-autoplay-review.md). A rodada após corrigir o deslocamento da primeira linha mobile e seu recorte passou; o parecer correspondente deve ser consultado na revisão independente. O `ship` de [motion-visual-review.md](docs/motion-visual-review.md) pertence à extensão 2.1.0. Lighthouse e a medição inicial de LCP/CLS permanecem evidências históricas 2.0.1, sem nova alegação de performance ou conformidade integral para a correção.

## Verificar alterações

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

Para a QA de movimento, mantenha um servidor local ativo e execute `npm run test:motion`. O destino padrão é `http://127.0.0.1:3001`; para a produção revisada na porta 3001, defina `FOXSTAGE_QA_URL=http://127.0.0.1:3001` no ambiente. A suíte usa Playwright do runtime local quando disponível, ou o caminho de módulo indicado por `FOXSTAGE_PLAYWRIGHT_MODULE`.

Os cinco testes cobrem o destino e a codificação do WhatsApp, além das condições de domínio e indexação. A verificação visual e de interação é documentada separadamente; testes automáticos não certificam acessibilidade integral.

A assinatura dura cinco segundos (60fps, 300 quadros), executa uma vez sem áudio ou loop e termina no quadro 299. O Player é baixado perto da seção e inicia com 40% de visibilidade; pausa fora de vista ou com documento oculto. O Player começa silenciado e aguarda estar pronto; não exige clique ou teclado e não oferece controles. As três traduções se sobrepõem até 4,65s e então mantêm a arte final. Movimento reduzido e ausência de JavaScript mantêm a arte final estática e o contato. O mobile usa um quarto do deslocamento desktop.

## Backup anterior ao movimento

O snapshot está em `backups/2026-10-10_1639-pre-remotion`. O ZIP entregue fica em `C:/Users/rapha/Documents/Codex/2026-10-10/referenced-chatgpt-conversation-this-is-an/outputs/foxstage-backup-2026-10-10-pre-remotion.zip`, com 16.411.561 bytes; seus 74 arquivos foram conferidos por SHA-256. Para restaurar, extraia em uma pasta vazia e execute `npm ci`, `npm run build` e `npm run start`. O backup foi preservado durante a extensão.

## Domínio e indexação

Sem configuração, a prévia usa `noindex, nofollow`, `robots.txt` bloqueia todos os caminhos e o sitemap fica sem URLs. Não há canonical sem domínio definitivo. A ausência de `metadataBase` pode produzir aviso de fallback para localhost nos metadados de imagens; isso permanece pendente até definir a URL real.

Após a aprovação do domínio e da publicação, configure `.env.local` ou o ambiente do build com `SITE_URL` como a origem HTTPS definitiva. A indexação só fica ativa quando também houver `SITE_INDEXABLE=true`. URLs inválidas, HTTP, localhost ou com credenciais são rejeitadas. Essas opções são consumidas durante a compilação: faça um novo build após alterá-las. `.env.example` contém a referência de configuração.

## Antes da publicação

Continuam pendentes a definição de domínio/hospedagem, a revisão final do conteúdo comercial e as informações operacionais e legais aplicáveis. Não foram presumidos público, modalidade, catálogo, preços, endereço, certificados ou depoimentos. Formulário, analytics, FAQ, depoimentos e processo de entrada estão desligados; não existe rota de privacidade com conteúdo fictício. A entrega é uma implementação local revisada, ainda sujeita às confirmações necessárias ao lançamento.

As regras de `AGENTS.md` permanecem aplicáveis. A consulta ao acervo O Setup não foi concluída por exigência de OAuth; nenhum plugin, skill ou servidor MCP novo foi instalado ou criado.

Remotion e Impeccable já instalados foram reaproveitados. As dependências Remotion estão fixadas em 4.0.534; a CLI é de desenvolvimento. A consulta OAuth inconclusiva não permite presumir catálogo vazio.


A aplicação 2.2.0 tem auditoria em [docs/brand-audit.md](docs/brand-audit.md) e evidência em [docs/brand-qa.json](docs/brand-qa.json). A assinatura principal aparece no rodapé e no compartilhamento; o header usa a compacta prevista no manual. Os ícones de aba e toque usam o símbolo do kit aprovado.


Os dois banners do hero são editados em `src/content/site.ts`, em `site.hero.banners`, sem CMS. Intervalo e comportamento estão em `design.json`, em `behavior.heroCarousel`.


## Copy e English Day — versão 2.5.0

Aprovados pelo usuário em 10 de outubro de 2026 após a auditoria editorial em `docs/AUDITORIA-COPY-FOXSTAGE.md`. A copy vigente está centralizada em `src/content/site.ts`, com proposta aprovada preservada em `docs/copy-proposta.json`; substitui os exemplos textuais anteriores sem alterar a composição das regiões existentes. Confirmações do usuário: aulas online ao vivo em grupo, opção individual personalizada, foco em conversação, cotidiano e situações reais, com espaço para errar durante a prática. Não ampliar personalização individual para as aulas em grupo nem inventar diagnóstico, duração, turmas, preços, materiais, certificação ou resultados. Navegação: Início, Sobre, O método, As aulas, Contato. CTA comercial: Conhecer as aulas; contato: Falar no WhatsApp.

English Day é o módulo adicional aprovado entre as aulas e o contato final. Encontro presencial entre alunos a cada quatro meses, organizado e custeado pela Foxstage, com comunicação em inglês durante todo o dia. Atividade definida pela escola; edição registrada no cinema. Apresentar foto e vídeo reais fornecidos, sem alterar ou substituir o hero, a composição institucional, os três cards, os atalhos ou a assinatura Remotion. Não atribuir idioma ao filme, anunciar próxima data, despesas específicas, gratuidade irrestrita ou resultados de proficiência.

O módulo reutiliza creme #F3EFE8, famílias, títulos, raios e CTAs do manual vigente. Layout editorial: narrativa e fotografia completa à esquerda, vídeo vertical à direita no desktop; uma coluna no celular. Vídeo nativo com controles, playsInline, poster e preload none; sem autoplay. MP4 remuxado com faststart, mantendo áudio e vídeo, sem biblioteca adicional. Foto WebP sem recorte; originais intactos em assets/english-day. O vídeo possui legendas gravadas em suas imagens; não foi produzida transcrição integral ou faixa de legendas selecionável, e não há nova declaração de conformidade integral de acessibilidade.

Backup anterior validado por SHA-256: `backups/2026-10-10-pre-copy-english-day/`. Nenhuma publicação, coleta de leads ou ferramenta nova. Evidências desta aplicação em `docs/copy-implementation-qa.json` e `docs/COPY-IMPLEMENTATION.md`; evidências antigas permanecem históricas.
