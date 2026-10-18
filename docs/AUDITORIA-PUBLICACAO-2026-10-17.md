# Auditoria técnica de publicação

Data local: 17/10/2026. Escopo: código e publicação da Foxstage, com os layouts aprovados preservados. A avaliação usa verificações reproduzíveis; não atribui selo ou nota subjetiva de “nível sênior”.

## Diagnóstico e correções

| Área | Situação encontrada | Resultado aplicado |
|---|---|---|
| 404 | Página já existente com marca e caminhos de retorno | Mantida; testados HTTP 404 real, `noindex`, uma área principal e retorno funcional |
| Erros | Sem boundaries próprios para falha de rota/raiz | `error.tsx` na raiz e no grupo institucional, `global-error.tsx` independente; usa `retry()` da versão 16.4 instalada; não mostra mensagem interna |
| Carregamento | Sem estado específico | Indicador acessível após 180ms em navegação interna; some ao mudar o caminho; skeleton reutilizável para futuros carregamentos de dados |
| Renderização | Páginas em HTML no servidor | Teste detectou regressão com `loading.tsx`/streaming sem JS; boundaries de loading de rota removidos antes da publicação. HTML continua visível sem JS |
| SEO | Títulos, descrições, canonical e JSON-LD já existiam | Revisados por rota; imagens OG reais, Twitter, idioma pt-BR, preview de imagem grande; verificação Google/Bing opcional em runtime |
| Descoberta | Sitemap e robots existentes | Sitemap de oito páginas reais; rascunho `/conteudos` excluído; `/api/` desaconselhado a crawlers; `llms.txt` factual com origem pública |
| Privacidade | Sem políticas nem preferência de cookies | `/privacidade`, `/politica-de-cookies`, rodapé e modal com análise/publicidade separados, recusa no primeiro nível e escolhas inicialmente desligadas |
| Medição | Nenhum ID configurado | Integrações opcionais GA4/Ads/Meta prontas e inativas; somente IDs validados chegam ao cliente; nada de tokens de API ou GTM paralelo |
| Segurança | Container isolado e TLS já existentes | Revisados whitelist de configuração, headers, proteção de arquivos privados e scanner; HSTS por um ano, sem `includeSubDomains`/preload que afetariam outros hosts |

## SEO por página

| Caminho | Função editorial e intenção |
|---|---|
| `/` | Curso online ao vivo e visão geral da oferta |
| `/cursos/ingles-em-grupo` | Formato em grupo; não repete a oferta individual |
| `/cursos/ingles-individual` | Ensino individual personalizado |
| `/a-foxstage` | Identidade institucional, escola e Felipe Pontes |
| `/english-day` | Experiência presencial no Rio e registro real do cinema |
| `/contato` | Canais de atendimento; não simula formulário |
| `/privacidade` | Tratamento de dados, direitos e canal de atendimento |
| `/politica-de-cookies` | Finalidades, armazenamento e revogação |

Todos têm título e descrição próprios, canonical HTTPS próprio, `og:url` correspondente, um `h1`, idioma português e links internos. A maioria usa o OG fotográfico da home em 1200×630; English Day conserva a foto real específica. Não foram adicionados keywords, traduções inexistentes, datas de modificação fictícias ou páginas locais artificiais.

## AIO e GEO

Conteúdo importante existe em texto HTML, inclusive sem JavaScript. `EducationalOrganization`, `WebSite`, `WebPage`/`AboutPage`/`ContactPage`, `BreadcrumbList` e `Course` onde pertinente usam a mesma origem e referências de entidade. Não há avaliação, endereço, credencial, preço, disponibilidade ou evento futuro inventado no schema.

“GEO” aqui compreende clareza para mecanismos generativos e a localização real: Rio de Janeiro/RJ para a escola e English Days; Brasil para atendimento online. O resumo `llms.txt` distingue atividades presenciais de aulas online e explicita limites das informações. Não é diretiva de autorização, mecanismo de segurança ou requisito de inclusão no Google. Seguindo a [documentação oficial do Google](https://developers.google.com/search/docs/appearance/ai-features), não há uma marcação especial adicional obrigatória para aparecer em AI Overviews/AI Mode. HTML útil, rastreável e consistente continua sendo a base.

Não foi declarada indexação confirmada, aprovação de rich results ou presença em respostas de IA. Search Console e Bing exigem acesso às contas e submissão posterior.

## Consentimento e fluxo de dados

- Cookie próprio `foxstage_consent`, versão 1, validade máxima 180 dias, SameSite=Lax e Secure em HTTPS. Valor inválido, futuro, vencido ou sem tipos corretos é recusado.
- Necessários permanecem ativos. Análise e publicidade são independentes e opcionais, com recusa tão acessível quanto aceite. Fechar o modal não equivale a aceitar.
- Scripts só são inseridos após consentimento da categoria e ID válido. Sem JavaScript não há medição opcional. Acesso às páginas e WhatsApp independe do aceite.
- Consent Mode básico: primeiro bloqueio completo; defaults Google negados antes da configuração. Não há intenção de enviar pings sem consentimento.
- Revogação atualiza os provedores ativos, apaga cookies conhecidos acessíveis neste domínio e recarrega a página. Não promete apagar dados já enviados ou cookies de terceiros inacessíveis.
- Eventos de contato significam clique, não matrícula. Não se envia texto do WhatsApp, e-mail, nome ou telefone nos eventos controlados pelo site. Meta é bloqueado em URLs com parâmetros/fragmentos, com impacto de atribuição documentado.
- Preferência fica neste navegador; não há um banco central de consentimento nesta implementação. Abrir outro navegador/aparelho exige nova escolha. Abas do mesmo site sincronizam alterações via BroadcastChannel; navegadores sem esse recurso conferem a escolha ao recuperar foco/visibilidade. Consentimento expirado é negado também nessa conferência.

## Evidências reproduzíveis

- `npm test`: 21 testes de conteúdo, descoberta, configuração de publicação, consentimento e WhatsApp.
- `npm run lint`, `npm run typecheck` e `npm run build`: verificações obrigatórias antes de commit.
- `tests/publication-readiness.browser.mjs`: oito páginas × oito larguras (320, 360, 390, 430, 768, 1024, 1440, 1920), sem overflow horizontal; metadata, imagens, schema, no-JS visível, consentimento e arquivo privado inacessível. Rodado com IDs de fixture interceptados localmente e sem IDs. Nenhum dado de teste é enviado a Google/Meta.
- `tests/menu-media.browser.mjs`: hover integral, teclado, Escape, navegação sem JS e ausência dos avisos de mídia que o usuário removeu.
- `tests/prepare-error-fixture.mjs` + `tests/error-states.browser.mjs`: aplicação Next isolada em `work/`, construída em produção com os componentes reais; falha de rota, retry, retorno, loading e falha de layout raiz. Nenhum gatilho de falha é implantado no site público.
- `scripts/audit-secrets.mjs`: arquivos rastreados, patches de todo histórico alcançável, `public` e `.next/static`; saída contém somente local/regra, nunca o conteúdo de possível credencial. Varredura inicial sem achados; executar novamente após staging.
- `npm audit --omit=dev`: zero vulnerabilidades conhecidas reportadas nesta revisão. Não equivale a pentest ou garantia de ausência de falhas desconhecidas.
- `scripts/verify-production.mjs`: canonical e links, healthcheck, robots, sitemap, OG 1200×630, otimização de imagem e vídeo com Range 206.

Em streaming, uma falha após o início da resposta pode manter HTTP 200; a interface de erro não pode alterar headers já enviados. O teste de URL inexistente exige 404 efetivo. Não foi criada uma página `/500` que responda 200 fingindo ser falha: a recuperação é acionada por erros reais do framework.

O build sem `SITE_URL` avisa sobre o fallback de metadataBase usado para prévia. As verificações em runtime com a origem pública conferem que canonical, OG e sitemap usam `https://foxstage.com.br`, sem localhost. Prévia não indexável não publica URLs locais no `llms.txt`.

## Limites e pendências

Identificação jurídica ainda provisória e e-mail sem entrega verificada. Android/iPhone físicos serão testados pelo responsável; emulação não foi registrada como teste físico. GA4, Ads e Meta sem IDs; Search Console/Bing sem confirmação de conta. Retenção no provedor de análise deve ser definida antes da ativação. Não foi feita auditoria integral dos outros projetos, da conta de hospedagem ou da operação administrativa da escola.

Instruções e tarefas restantes: [checklist de publicação](PUBLICACAO-CHECKLIST.md).

## Resultado da publicação

Aplicação publicada na imagem `foxstage-site:a2bc5fb`, a partir da `main`. Testes repetidos em https://foxstage.com.br: oito páginas × oito larguras, políticas, consentimento, revogação entre abas, HTML visível sem JavaScript, 404 real, arquivos privados inacessíveis e arquivos de descoberta passaram. Evidência: [QA da publicação](publication-readiness-qa.json).

TLS 1.3 verificado com cadeia autorizada Let's Encrypt, SAN para domínio e www, certificado válido até 16/01/2027 UTC. HTTP e www redirecionam para a origem HTTPS canônica; headers HSTS, nosniff e proteção contra enquadramento verificados. Healthcheck saudável, usuário 1001:1001, raiz somente leitura, sem portas publicadas. Os 22 outros containers conservaram IDs e horários de início; Traefik preservado. Builder dedicado limitado foi parado após gerar a imagem. Imagem anterior 9bceeb2 e backup do ambiente em .git foram preservados para rollback.

Scanner final: 406 arquivos rastreados e 53 arquivos públicos/de cliente examinados, além dos patches do histórico alcançável, sem os padrões de segredos procurados. IDs de medição continuam vazios em produção. A chave de acesso usada para a implantação é temporária e deve ser removida ao encerrar a verificação, preservando as outras chaves.
