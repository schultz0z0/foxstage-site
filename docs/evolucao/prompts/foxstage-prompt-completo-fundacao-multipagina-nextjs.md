# Foxstage — prompt completo: fundação multipágina

Planejamento 1.0.0, 12 de outubro de 2026. Executar somente mediante solicitação futura de implementação. Baseline 2.7.3 e manual B v1.0.

## Objetivo e ficha

Preparar rotas internas, conteúdo tipado, navegação, metadados e shell compartilhado sem alterar o visual da home. O escopo não cria banco, formulário, CMS, portal, conteúdo fictício ou páginas publicadas com dados pendentes.

Variáveis: [[PAGINAS_APROVADAS]], [[DISPONIBILIDADE_POR_ROTA]], [[DOMINIO_HTTPS]], [[AUTORIZACAO_INDEXACAO]]. Registrar estados de rascunho/publicado; não preencher conteúdo faltante para completar menu.

Ler [contrato](../CONTRATO-COMUM.md), [arquitetura/interfaces](../ARQUITETURA-E-MODELOS.md), [matriz de conteúdo](../CONTEUDO-E-PENDENCIAS.md), [qualidade](../QUALIDADE-E-PUBLICACAO.md), [prompt base](../../../foxstage-prompt-completo-nextjs.md), [design.md](../../../design.md), [design.json](../../../design.json), [implementação](../../IMPLEMENTATION.md) e [manual](../../../assets/Identidade%20visual%20Foxstage/manual-de-marca.pdf).

## Diretrizes permanentes

Preservar logo/cores/fontes/medidas/movimento 2.7.3 e comportamento atual. Novos tokens partem de design.json; não editar tokens.css. Consultar docs da versão instalada de Next.js, AGENTS.md e RTK.md. Reutilizar recursos existentes; seleção de dependência exige acervo O Setup. Nesta tarefa, construir apenas a infraestrutura necessária às páginas escolhidas.

## 01 — Estrutura visual, header e shell

Mapear a posição atual de Header dentro de Hero e de main/Footer na home. Criar InstitutionalShell e layout do grupo (institucional) somente para internas. Header recebe variante hero/page, padrão hero. Não inserir Header global em RootLayout causando duplicação. No modo page, header em fluxo normal; home mantém cápsula sobreposta e geometria aprovadas.

## 02 — Conteúdo tipado e registro das ofertas

Criar src/content/evolution/types.ts, availability.ts e courses.ts com as interfaces da arquitetura. Usar group/individual como CourseId. Separar dados confirmados de pendências editoriais. Criar CoursePage e EditorialHero reutilizáveis, com conteúdo próprio por oferta. Não acoplar um banco ao conteúdo institucional.

## 03 — Navegação por rotas

Criar getInstitutionalNavigation e RouteNavigation. Cursos abre disclosure com os destinos publicados, sem href falso; grupos vazios são omitidos. Logo leva ao início. Estado ativo por pathname, inclusive descendentes, com aria-current=page no destino final.

Não usar document.querySelector para /cursos/...: DesktopNavigation atual é por âncoras. MobileMenu distingue hash e pathname, fecha ao navegar e mantém Escape/foco. Preservar links antigos da home e sua semântica enquanto houver referências.

## 04 — Instituição, autorização e estados editoriais

Definir a disponibilidade comum usada por menu, renderização pública e sitemap. Rascunhos podem ter prévia local não indexável; em produção, retornam notFound. Noindex não é autenticação. Professor, artigo ou edição inexistentes não são fabricados para comprovar uma rota.

## 05 — Contatos e origens

Acrescentar group, individual, school, content e studentSupport às mensagens, mantendo as atuais. WhatsAppLink continua usando helper validado e destinos confirmados. Contato não exige banco. Formulário/analytics/CRM permanecem desligados até seu escopo próprio.

## 06 — Metadados, mobile e verificações técnicas

Criar buildPageMetadata(seo, publication), mantendo getPublicationConfig como autoridade. Cada interna possui title, description, canonical e Open Graph próprios. Remover herança acidental de canonical /; usar sitemap somente com domínio autorizado e rotas publicadas. Fonte/ícones globais continuam no RootLayout. Params dinâmicos são assíncronos na baseline instalada.

Verificar header/main/footer únicos, skip link, disclosure por teclado, ausência de querySelector inválido, slug desconhecido/rascunho, preview noindex e canonical específico. Comparar home em 320/390/768/1024/1440/1920px. Rodar checks pertinentes e build.

## 07 — Refinamento visual

Registrar a variante interna como extensão consistente, não redesign da home. Conferir uma interna representativa e a home na mesma largura; corrigir problemas observados em lote. Sem ícones, sombras, cards ou animações adicionados por preenchimento.

## 08 — Espaçamento

Manter eixos 1200/1160px, escala de seções e raios por função. Header interno não força sobreposição; hero da home mantém posição. Novos valores específicos entram no contrato vivo antes de geração de tokens.

## 09 — Rodapé compartilhado

Atualizar Footer com links publicados, incluindo Contato. Na home continua uma instância; nas internas vem do shell. Não duplicar markup ou estilos por página. Não adicionar newsletter ou portal.

## 10 — Fotografias

Não produzir novas mídias nesta fundação. Levar assets e referências aprovados às páginas posteriores, registrando créditos. Não trocar imagens, fontes ou logo para demonstrar navegação.

## 11 — Logo e favicon

Preservar Brand e arquivos atuais. Confirmar logo compacta no header, variantes do footer, respiro e favicon/ícones em todas as rotas. A fundação não redesenha marca.

## 12 — Prévia e handoff

Entregar home preservada e shell interno demonstrável em ambiente de revisão, com estados editoriais conectados, rotas escolhidas, metadados, evidências de teclado/mobile e checks. Protótipo técnico temporário não vira página vazia pública. A tarefa está pronta para receber os prompts de conteúdo; não afirmar que todas as internas já foram implementadas.
