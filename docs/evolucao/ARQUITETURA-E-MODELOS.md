# Arquitetura, navegação e modelos de páginas

Proposta para implementação futura. Ler [contrato comum](CONTRATO-COMUM.md) e [pesquisa](../PESQUISA-CONCORRENTES-ARQUITETURA.md).

## 1. Separação de funções

Home apresenta; ofertas explicam contratação; A Foxstage apresenta a instituição e quem ensina; English Day documenta a experiência; conteúdos ajudam a aprender; Contato orienta e atende. Uma página interna deve acrescentar conteúdo, evidência ou uma decisão ao resumo da home.

| Rota | Estado atual | Papel planejado | Modelo |
|---|---|---|---|
| `/` | Implementada | Apresentação e encaminhamento | Home preservada |
| `/cursos/ingles-em-grupo` | Planejada | Considerar aulas online em grupo | Oferta editorial |
| `/cursos/ingles-individual` | Planejada | Considerar aulas individuais personalizadas | Oferta editorial |
| `/a-foxstage` | Planejada | Conhecer a escola e quem ensina | Institucional |
| `/english-day` | Planejada | Conhecer a experiência dos alunos | Experiência |
| `/contato` | Planejada | Contato e orientação | Atendimento |
| `/conteudos` | Condicional | Encontrar materiais de aprendizado | Índice editorial |
| `/conteudos/[slug]` | Condicional | Ler e praticar um assunto | Artigo/atividade |
| `/english-day/[slug]` | Expansão condicional | Registro completo de uma edição | Relato de experiência |
| `/privacidade` | Condicional ao texto aprovado | Informações sobre tratamento de dados | Documento editorial |

Não criar rota de catálogo `/cursos` somente para repetir duas opções. Não separar método e professores em rotas enquanto o material cabe com clareza na página institucional e nas ofertas. Não adicionar página de depoimentos ou FAQ sem acervo que justifique outra rota.

## 2. Navegação

Logo → `/`. Cursos é disclosure com dois links reais de ofertas publicadas; A Foxstage, English Day e Conteúdos são links por rota. Conteúdos aparece quando o índice tem acervo. CTA do header mantém contato direto. Contato e informações de privacidade ficam acessíveis também no rodapé.

O destino ainda não publicado não aparece em navegação pública. Se só uma oferta estiver publicada, Cursos pode ser um link direto para ela. Menu com até cinco entradas principais conforme o sistema. Sem `href="#"`, megamenu desnecessário ou página vazia para completar menu.

O estado ativo de rota usa `aria-current="page"` no link final. O indicador por rolagem da home não pode executar `document.querySelector('/cursos/...')`: isso não é um seletor válido. `MobileMenu` só tenta focar `document.querySelector` para href iniciado por `#`; rotas usam navegação normal e foco inicial da página.

## 3. Layouts sem duplicação

Hoje `Hero` inclui `Header`; a home possui `main#conteudo` e `Footer` próprios. `RootLayout` fornece fontes, CSS, idioma, metadados e skip link, não um header global.

Criar o grupo `src/app/(institucional)/layout.tsx` somente para internas, usando `InstitutionalShell`. Esse shell tem Header com variante `page`, um único `main#conteudo` e Footer. Filhos retornam conteúdo, não outro main/header/footer. Home continua fora do grupo e conserva a sobreposição do header no hero. Não mover Header para RootLayout e deixá-lo também dentro de Hero.

A variante `page` fica em fluxo normal com eixo 1160px; herda a linguagem do header atual. Valores novos entram como extensão específica no design.json durante execução, com revisão de desktop/mobile. Não usar o hero 1840px/764px em todas as internas.

## 4. Interfaces propostas

Estas interfaces são decisões para execução, ainda não são arquivos implementados.

```ts
type CourseId = 'group' | 'individual';
type PublicationState = 'draft' | 'published';
type PageKey = 'group' | 'individual' | 'school' | 'englishDay' | 'contact' | 'content' | 'privacy';
type NavigationEntry =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'group'; label: string; children: readonly { label: string; href: string }[] };
type PageAvailability = Record<PageKey, PublicationState>;
type PageSEO = { title: string; description: string; pathname: string; image?: string };
type CoursePageData = {
  id: CourseId; status: PublicationState; seo: PageSEO;
  heading: string; introduction: string;
  practicalFacts: readonly { label: string; value: string }[];
  sections: readonly { id: string; title: string; paragraphs: readonly string[] }[];
  faq: readonly { question: string; answer: string }[];
  image?: { src: string; alt: string; credit?: string };
};
```

`src/content/evolution/types.ts` concentra essas definições. `availability.ts` exporta `pageAvailability: PageAvailability`. `navigation.ts` exporta `getInstitutionalNavigation(availability: PageAvailability): readonly NavigationEntry[]`, omitindo rascunhos e grupos vazios. `courses.ts` exporta `coursePages: Record<CourseId, CoursePageData>`.

`pageAvailability` é derivada dos estados dos registros de conteúdo, não uma segunda lista de estados editada independentemente. Metadados, acesso público, menu e sitemap devem consumir essa disponibilidade comum. Rascunho/publicado da proposta documental não é autorização automática de publicação.

`Header({ variant?: 'hero' | 'page'; entries?: readonly NavigationEntry[] })` preserva o padrão `hero`. `RouteNavigation({ entries: readonly NavigationEntry[] })` implementa estado por rota e disclosure, separado do `DesktopNavigation` atual por âncoras. O menu mobile aceita entradas de rota/disclosure sem consulta DOM de pathname.

`InstitutionalShell({ children: React.ReactNode })` fornece shell das internas. `EditorialHero({ heading: string; introduction?: string; image?: CoursePageData['image'] })` usa a escala editorial. `CoursePage({ course: CoursePageData })` organiza as duas ofertas sem duplicar estrutura e sem tornar o conteúdo igual.

`buildPageMetadata(seo: PageSEO, publication: ReturnType<typeof getPublicationConfig>): Metadata` define title, description, canonical e Open Graph próprios; nunca torna um ambiente não autorizado indexável. `getPublishedPathnames(availability: PageAvailability): string[]` fornece as rotas estáticas do sitemap; artigos/edições publicados acrescentam suas rotas.

## 5. Arquivos planejados

| Arquivo | Responsabilidade |
|---|---|
| `src/components/layout/InstitutionalShell.tsx` | Shell das internas |
| `src/components/ui/RouteNavigation.tsx` | Menu por rota/disclosures |
| `src/components/ui/EditorialHero.tsx` | Abertura editorial |
| `src/components/ui/FAQ.tsx` | Disclosures para perguntas confirmadas |
| `src/components/pages/CoursePage.tsx` | Estrutura compartilhada das ofertas |
| `src/content/evolution/types.ts`, `availability.ts`, `navigation.ts` | Interfaces e inventário de publicação |
| `src/content/evolution/courses.ts`, `school.ts`, `english-day.ts`, `contact.ts` | Conteúdo por função |
| `src/content/articles/index.ts` | Acervo editorial tipado, sem CMS inicial |
| `src/content/english-day-editions/index.ts` | Edições autorizadas futuras |
| `src/lib/page-metadata.ts` | Metadados por página |
| `src/app/(institucional)/layout.tsx` | Layout compartilhado |
| `src/app/(institucional)/cursos/ingles-em-grupo/page.tsx` | Oferta em grupo |
| `src/app/(institucional)/cursos/ingles-individual/page.tsx` | Oferta individual |
| `src/app/(institucional)/a-foxstage/page.tsx` | Instituição e equipe |
| `src/app/(institucional)/english-day/page.tsx` | Experiência |
| `src/app/(institucional)/contato/page.tsx` | Atendimento |
| `src/app/(institucional)/conteudos/page.tsx` e `conteudos/[slug]/page.tsx` | Índice e artigo |
| `src/app/(institucional)/english-day/[slug]/page.tsx` | Edição, quando houver acervo |
| `src/app/(institucional)/privacidade/page.tsx` | Texto aprovado de privacidade |

Não é proposto um CMS, painel administrativo, login ou banco para conteúdo nesta fase. O backend opcional guarda envios de formulários, não governa automaticamente as páginas editoriais.

## 6. English Day e artigos

English Day deve reutilizar a composição existente. Para uma interna com um H1, ampliar `EnglishDay({ headingLevel?: 1 | 2 })`, padrão 2 na home, mantendo classe/estilo do título compatível com ambas as tags e o mesmo gatilho de visibilidade. A página não deve adicionar outro H1 acima da mesma abertura nem duplicar IDs ou Players.

Artigos usam blocos tipados de texto, subtítulo, exemplo, atividade, imagem e vídeo, renderizados no servidor. Não aceitar HTML arbitrário de usuário. `slug` desconhecido ou não publicado retorna notFound em produção. Autor, revisão e datas vêm do registro editorial; não usar a data do build como data de publicação.

Rascunhos podem ter prévia local não indexável para revisão. Em publicação pública, a disponibilidade governa acesso às rotas, navegação e sitemap; rascunhos não ficam acessíveis por URL adivinhada. Definir e testar essa política antes de deploy, sem tratar `noindex` como autenticação.

## 7. Contato e conversão

Reutilizar `WhatsAppLink` e a validação em `src/lib/whatsapp.ts`. Acrescentar origens `group`, `individual`, `school`, `content` e `studentSupport` em `site.messages`, sem renomear as origens existentes. Mensagens novas são propostas editoriais, não mensagens enviadas nesta entrega.

O visitante pode ir direto de uma oferta ao WhatsApp. Contato organiza motivos e dúvidas; não se torna uma etapa obrigatória. Formulário persistente é opcional e só é exibido quando backend, aviso de tratamento e rotina de atendimento estiverem preparados.

Métricas planejadas: visita à oferta, clique por origem, conversa efetivamente iniciada/qualificada e matrícula atribuível. Um clique em WhatsApp não é uma matrícula. IDs de contato já existentes são aproveitados; seleção de analytics/CRM é uma decisão futura sujeita ao acervo O Setup.
