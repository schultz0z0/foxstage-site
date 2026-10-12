# Foxstage — Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task when the user requests execution. Steps use checkbox syntax for tracking. This delivery is planning only; do not start implementation or delegate agents automatically.

**Goal:** Evoluir a home aprovada para um website institucional com ofertas, instituição, experiência, conteúdo e atendimento próprios.

**Architecture:** Manter a home fora do layout das internas. Criar shell e conteúdo tipado compartilhados, com publicação/navegação/metadados derivados da mesma disponibilidade. Backend de formulários é um plano opcional separado.

**Tech Stack:** Next.js App Router, TypeScript, React, CSS/tokens e Remotion já existentes; baseline Next.js 16.4.0 e Remotion 4.0.534. Verificar versões na execução, sem upgrades incidentais.

**Spec:** [Arquitetura](../../evolucao/ARQUITETURA-E-MODELOS.md), [contrato comum](../../evolucao/CONTRATO-COMUM.md), [conteúdo](../../evolucao/CONTEUDO-E-PENDENCIAS.md), [prompts](../../evolucao/README.md).

## Global Constraints

- Preservar design system 2.7.3, manual B v1.0, logo em curvas, cores e fontes existentes.
- `design.json` governa valores; `npm run tokens` gera tokens.css; não editar o derivado manualmente.
- Não criar fatos, equipe, depoimentos, preços, certificados, níveis, turmas ou resultados.
- Personalização confirmada somente no formato individual.
- Home: duas imagens, 10 segundos, um CTA por banner, degradê mobile e composição preservados.
- English Day: copy/CTA estáticos; movimento apenas nas mídias, sem corte e sem pausa por hover/foco.
- Não instalar bibliotecas, CMS, banco ou analytics como efeito colateral. Consultar O Setup antes de recursos adicionais; consulta indisponível não significa catálogo vazio.
- Conteúdo pendente fica fora da interface pública; preview não é publicação.
- Prefixar comandos de shell com rtk; verificar AGENTS.md e guias da versão instalada.
- Não exigir testes unitários de CSS/markup trivial. Testar invariantes de navegação, publicação, dados e interações; conferir alterações visuais com capturas.

## Review Focus

1. Uma interna ou 404 não pode ter header, main, H1 ou footer duplicados; a home conserva sua estrutura própria.
2. Link de rota não pode ir a querySelector como hash; menu deve funcionar sem JavaScript e por teclado.
3. Rascunho acessado diretamente e slug desconhecido recebem 404 pública; noindex não protege conteúdo.
4. Internas não herdam canonical da home; preview não se torna indexável; sitemap reflete somente publicação real.
5. Dados ausentes, acervo vazio ou conteúdo não revisado não criam rotas vazias, autores fictícios ou diferenciais inventados.

## Mapa de arquivos

Ver a tabela da especificação de arquitetura para arquivos e responsabilidades. Nesta fase, criar `src/content/evolution/*`, `src/components/layout/InstitutionalShell.tsx`, `src/components/ui/RouteNavigation.tsx`, `EditorialHero.tsx`, `FAQ.tsx`, `src/components/pages/CoursePage.tsx` e `src/lib/page-metadata.ts`. Rotas ficam no grupo `src/app/(institucional)/`. Modificar Header/MobileMenu/Footer somente para integração; home e arquivos de movimento permanecem preservados, exceto extensão do nível do heading do English Day.

Dados e metadados não devem ser duplicados em componentes. Campos opcionais ausentes são omitidos; rascunhos são segregados da publicação. Não criar todas as rotas de uma vez com conteúdo fictício para validar navegação.

## Task 1: Conteúdo tipado e disponibilidade comum

**Files:** criar `src/content/evolution/types.ts`, `courses.ts`, `availability.ts`, `navigation.ts`; preparar módulos das páginas escolhidas. Teste: `tests/evolution-content.test.mjs`.

**Interfaces:** consumir fatos/matriz editorial; produzir `CourseId`, `CoursePageData`, `NavigationEntry`, `PageAvailability`, `coursePages`, `pageAvailability` e `getInstitutionalNavigation(availability)` conforme a arquitetura. Availability é derivada do status dos registros.

- [ ] Registrar respostas e pendências da escola por página; aprovar somente informações concretas.
- [ ] Escrever `publishedNavigationOmitsDraftAndEmptyGroups`: estado todo draft não gera Cursos/conteúdos vazios; group publicado gera destino exato; individual também publicado gera dois filhos válidos.
- [ ] Escrever `availabilityUsesContentState`: um registro draft não aparece como published em outra lista; conteúdo sem aprovações mínimas não é marcado automaticamente como publicado.
- [ ] Executar os testes e confirmar falha antes da implementação desses comportamentos.
- [ ] Implementar as interfaces e a derivação, sem duplicar estados ou copiar pendências para HTML público.
- [ ] Executar `rtk proxy node --experimental-strip-types --test tests/evolution-content.test.mjs`, verificando compatibilidade do runner instalado; usar a estratégia já existente do projeto se necessário. Resultado: testes passam.
- [ ] Registrar diff/entrega. Commit somente se houver checkout Git e esse fluxo estiver em uso; não inicializar repositório como efeito colateral.

## Task 2: Shell e navegação das internas

**Files:** criar `InstitutionalShell.tsx`, `RouteNavigation.tsx` e `src/app/(institucional)/layout.tsx`; modificar Header/MobileMenu. Teste: `tests/evolution-navigation.browser.mjs`.

**Interfaces:** consumir `getInstitutionalNavigation`; produzir `Header({variant?,entries?})`, `RouteNavigation({entries})` e `InstitutionalShell({children})`. Header sem novas props preserva o modo da home.

- [ ] Implementar uma interna representativa com conteúdo confirmado em ambiente de revisão; não publicar uma rota de teste vazia.
- [ ] Criar caso `oneShellPerPage`: home/interna/404 possuem um header, main#conteudo, H1 e footer apropriados, sem duplicação.
- [ ] Criar `routeLinksDoNotBecomeSelectors`: navegar pela interna e pelo menu mobile não produz erro de seletor; hashes ainda focam seções existentes.
- [ ] Criar `courseDisclosureKeyboardAndNoJS`: abrir e navegar com teclado, Escape retorna foco, links existem sem JS; não usar semântica de modal/foco preso.
- [ ] Implementar variante page em fluxo normal, nav por pathname e integração do mobile. Preservar cápsula e eixo do header da home.
- [ ] Executar `rtk proxy node tests/evolution-navigation.browser.mjs` com o runner de navegador disponível; registrar PASS e pageerrors vazios.
- [ ] Comparar home e interna em desktop/mobile; registrar quaisquer extensões numéricas no design.json e gerar tokens.

## Task 3: Metadados, acesso editorial e sitemap

**Files:** criar `src/lib/page-metadata.ts`; modificar `src/app/sitemap.ts` e metadados das rotas escolhidas; preservar `src/lib/publication.ts`/robots. Testes: `tests/evolution-publication.test.mjs` e casos do runner de navegação.

**Interfaces:** consumir PageSEO, pageAvailability e getPublicationConfig; produzir `buildPageMetadata(seo,publication): Metadata` e `getPublishedPathnames(availability): string[]`.

- [ ] Criar `previewNeverIndexes`: ausência de domínio/autorização mantém index/follow desligados e não fabrica origem pública.
- [ ] Criar `canonicalMatchesEveryInternalRoute`: grupo, individual e instituição usam seus paths, nunca canonical `/` herdado.
- [ ] Criar `sitemapOmitsDraftItems`: listar somente rotas e slugs publicados; domínio inválido não habilita publicação.
- [ ] Criar caso de navegador `draftAndUnknownSlug404Public`: URL direta draft/slug desconhecido recebe 404 na configuração de publicação. Não validar apenas ausência no menu.
- [ ] Implementar helpers e política de renderização/preview; aguardar params assíncronos nas rotas dinâmicas conforme guias instalados.
- [ ] Rodar `rtk proxy node --experimental-strip-types --test tests/evolution-publication.test.mjs` e os casos de navegação, respeitando o runner instalado. Resultado: invariantes passam.
- [ ] Confirmar title/description/Open Graph por página no HTML inicial e JSON-LD seguro quando aplicável.

## Task 4: Duas ofertas com conteúdo próprio

**Files:** criar CoursePage, EditorialHero e FAQ; criar as rotas e dados de grupo/individual indicados nos prompts. Modificar `src/content/site.ts` somente para acrescentar mensagens group/individual. Testes de conteúdo/navegação anteriores são ampliados para esses destinos.

**Interfaces:** consumir CoursePageData e shell; produzir `CoursePage({course})`, `EditorialHero({heading,introduction?,image?})` e FAQ com pares question/answer aprovados.

- [ ] Executar os prompts completos de grupo e individual, cada um com sua ficha e fontes. Não publicar descrição genérica duplicada.
- [ ] Organizar informações práticas e inclusões reais; omitir dados ausentes e manter pendências na ficha.
- [ ] Verificar que personalização não é indevidamente atribuída ao grupo, e que atividades ilustrativas não viram alegações da operação.
- [ ] Conectar CTA ao WhatsApp contextual; conferir URL/mensagem e acesso direto sem obrigação de visitar Contato.
- [ ] Ampliar o teste de navegação para destinos reais de ambos os formatos e comparação contextual.
- [ ] Verificar teclado, sem JS, imagens e leitura em 320/390/768/1024/1440/1920px; executar checks apropriados e registrar capturas.

## Task 5: Instituição e Contato

**Files:** criar school.ts/contact.ts e rotas A Foxstage/Contato; acrescentar origens school/studentSupport. Reutilizar modelos/shell/FAQ e componentes atuais.

**Interfaces:** consumir fotos/biografias/canais aprovados, navegação e helpers de contato; produzir páginas institucionais e atendimento sem backend obrigatório.

- [ ] Executar os prompts específicos, com história/papéis/qualificações reais e leitura editorial.
- [ ] Não presumir papel de fundador/professor ou formação a partir do Instagram; não gerar retratos como prova da equipe.
- [ ] Na ausência de e-mail/endereço/horário, omitir esse dado sem inventar outra estrutura de atendimento.
- [ ] Contato apresenta interesse e atendimento de aluno por ações reais; formulário permanece desligado nesta fase.
- [ ] Testar hrefs e mensagens novos, contato de aluno e navegação de volta às ofertas; avaliar foco/legibilidade/créditos.
- [ ] Marcar publicação somente após revisão do conteúdo correspondente e atualização da disponibilidade derivada.

## Task 6: English Day aprofundado

**Files:** criar english-day.ts e rota `/english-day`; modificar `EnglishDay.tsx` para `headingLevel?: 1 | 2`, padrão 2; adicionar classe compatível do título no CSS sem alterar composição. Não alterar trajetórias em englishDayMotion.ts.

**Interfaces:** consumir registros e condições aprovados, EnglishDayMedia/Player existentes; produzir abertura com H1 na interna e H2 na home, uma instância de mídia por página.

- [ ] Executar o prompt English Day com narrativa própria e condições; preservar foto/vídeo e crédito.
- [ ] Garantir H1 único da interna, sem duplicar abertura ou título redundante acima da foto.
- [ ] Criar caso `englishDayMotionPreserved`: copy/CTA estáticos, frame avança com hover/foco, foto inteira durante a entrada, vídeo independente e sem loop da animação.
- [ ] Verificar reduced motion/sem JS, pausa manual e retomada fora da tela sem nova execução do Player concluído.
- [ ] Reutilizar runner e evidências históricas como referência; executar de novo os casos tocados, não afirmar que a QA antiga prova o código novo.
- [ ] Só criar `/english-day/[slug]` posteriormente com relato/acervo próprio e o prompt de edição; não duplicar a apresentação geral para aumentar URLs.

## Task 7: Conteúdos e artigo, condicionais

**Files:** criar `src/content/articles/index.ts` e rotas índice/artigo; usar tipos de blocos editoriais; ajustar navegação/sitemap por disponibilidade.

**Interfaces:** consumir registros com slug/status/autor/revisor/datas/blocos; produzir listagem publicada e renderer server de artigo. `relatedCourse` aceita group/individual/ausente.

- [ ] Reunir pequeno acervo autoral revisado e executá-lo pelo prompt de artigo; não criar conteúdos de preenchimento.
- [ ] Escrever `articlePublicationIntegrity`: slug draft/ausente não entra no índice/sitemap e retorna 404 pública; autoria e datas vêm do registro.
- [ ] Renderizar blocos tipados, exemplos e atividade com leitura confortável; sem HTML arbitrário ou cadastro obrigatório para ler.
- [ ] Executar o prompt de índice quando houver acervo; sem filtros/busca/infinite scroll para poucos itens.
- [ ] Conferir links relacionados, metadados específicos e leitura sem JavaScript; manter acesso à oferta contextual após o conteúdo útil.

## Task 8: Integração da home e revisão final

**Files:** atualizar destinos em site.ts, Header/Footer e Courses/links institucionais conforme o prompt de home. Atualizar contratos vivos somente para alterações efetivamente implementadas.

**Interfaces:** consumir disponibilidade e rotas concluídas; produzir website integrado, com home visualmente preservada e caminhos completos até contato.

- [ ] Executar o prompt de home-evolução e manter todos os IDs/fluxos existentes que continuem usados.
- [ ] Verificar cenários de acervo vazio, uma só oferta publicada e links antigos de âncora; não mostrar dropdown ou destinos vazios.
- [ ] Rodar lint, testes pertinentes e build conforme qualidade/publicação. TypeScript do build conta como conferência quando equivalente.
- [ ] Fazer conferência visual em lote, corrigir falhas observadas e confirmar os pontos corrigidos.
- [ ] Registrar evidências e pendências reais; nenhuma promessa de conversão sem acompanhamento posterior de conversas/matrículas.
- [ ] Entregar em revisão. Publicar somente quando domínio, conteúdo, mídias e decisão de publicação estiverem preparados e autorizados.

## Dependências e handoff

Tarefas 1–3 sustentam as páginas; tarefas 4–6 compõem o núcleo institucional/comercial; tarefa 7 depende de produção editorial; tarefa 8 integra os destinos. O formulário é independente e pode entrar depois. Consulta ao O Setup e eventual configuração de serviços são decisões da execução, não instalações feitas por este plano.

O usuário solicitou planejamento para implementação posterior. Esta entrega não pede escolha de método de execução nem inicia tarefas. Ao retomar, escolher o bloco desejado, atualizar conteúdo/versões e executar com evidências.
