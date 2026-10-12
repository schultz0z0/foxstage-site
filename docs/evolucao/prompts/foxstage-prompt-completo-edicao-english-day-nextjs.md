# Foxstage — prompt completo: Edição do English Day

Planejamento 1.0.0, 12 de outubro de 2026. Baseline: design system 2.7.3 e manual B v1.0. Este documento é um roteiro para implementação posterior; sua existência não autoriza publicar, instalar recursos ou captar dados.

## Objetivo, escopo e personalização

Guardar o relato completo de uma edição quando houver material suficiente para um destino próprio, diferente da apresentação geral do English Day.

| Campo | Valor / estado |
|---|---|
| Rota | `/english-day/[slug]` |
| Função | Relato e experiência |
| Estado | Futuro condicionado a material próprio |
| H1 de partida | [[EDICAO_TITULO]] — proposta editorial, exceto texto já aprovado da home |
| Conteúdo planejado | `src/content/english-day-editions/index.ts: edição aprovada` |
| Implementação planejada | `src/app/(institucional)/english-day/[slug]/page.tsx` |
| Origem do contato | englishDay (existente) |
| Condição de publicação | Executar quando houver relato e mídias próprios suficientes ou coleção de edições; não publicar somente para aumentar quantidade de URLs. |

### Ficha específica

- `[[EDICAO_SLUG]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[EDICAO_TITULO]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[EDICAO_RELATO]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[EDICAO_DATA]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[EDICAO_LOCAL]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[REGISTROS_ADICIONAIS_AUTORIZADOS]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[FALAS_AUTORIZADAS]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.

### Anexos e dependências obrigatórios

Ler [contrato comum](../CONTRATO-COMUM.md), [arquitetura](../ARQUITETURA-E-MODELOS.md), [conteúdo/pendências](../CONTEUDO-E-PENDENCIAS.md), [qualidade](../QUALIDADE-E-PUBLICACAO.md), [prompt base](../../../foxstage-prompt-completo-nextjs.md), [design humano](../../../design.md), [design numérico](../../../design.json), [implementação atual](../../IMPLEMENTATION.md) e [manual PDF](../../../assets/Identidade%20visual%20Foxstage/manual-de-marca.pdf). A fundação multipágina é pré-requisito para as internas. Para formulário, acrescentar [persistência](../FORMULARIOS-E-PERSISTENCIA.md) e o plano opcional.

## Diretrizes permanentes

Execute somente o escopo desta página quando houver solicitação de implementação. Preservar o código/contrato vivo do projeto; não substituir a identidade ou reconstruir a home. Ler notas finais para resolver instruções históricas. Reutilizar logo SVG, Bebas Neue 400, Source Sans 3 e tokens existentes; laranja #F65A0B, preto #101314, creme #F3EFE8. Não redigitar logo, amostrar cor de referência ou editar tokens.css manualmente.

Sem emojis, gradientes decorativos, vidro, brilhos, contadores, depoimentos/credenciais inventados, urgência falsa ou cards para cada parágrafo. Botões com largura pelo conteúdo. Copy explica o serviço; não promete fluência, duração, certificado, níveis ou inclusões sem confirmação. Personalização individual não é atribuída ao grupo.

Conteúdo inicial no servidor, H1 único e ações reais. Texto permanece quieto. English Day conserva movimento apenas das mídias, sem recorte e sem pausa por hover/foco. Recursos adicionais exigem consulta ao acervo O Setup e inspeção do candidato; não instalar bibliotecas ou serviços por hábito. Dados pendentes ficam na ficha editorial, fora da interface pública.

## 01 — Estrutura visual, header, abertura e confiança

**Anexar:** contrato, conteúdo da ficha, referências e shell compartilhado.

Implementar a abertura correspondente à função relato e experiência. Usar H1 de partida somente após revisão da copy, uma introdução curta e hierarquia editorial. Internas usam Header variante page em fluxo normal, um main#conteudo e Footer pelo shell; a home conserva Header dentro de Hero. Não duplicar landmarks, títulos ou logos. Não copiar o hero de tela grande/carrossel para cada página.

**Conferir:** um H1, largura do eixo, respiro da marca, menu operável, destino real e ausência de sobreposição. Somente evidências confirmadas compõem confiança.

## 02 — Conteúdo principal em composição editorial

**Anexar:** dados específicos aprovados e respectivas fontes.

- Abertura com título e resumo próprios; data/local somente confirmados. O slug não precisa incluir ano presumido.
- Contar a experiência em sequência editorial com registros reais e comentários aprovados, sem inventar falas, filme ou diálogos.
- Galeria usa imagens distintas, proporção apropriada, alt e legendas sem repetição; vídeo tem controles e contexto.
- Relacionar outras edições somente quando publicadas; manter retorno ao English Day geral.

**Conferir:** a página responde à sua pergunta principal, acrescenta conteúdo à home e não repete integralmente outra rota. Omitir módulos que dependam de dados ausentes, registrando a pendência para revisão.

## 03 — Ensino, experiência e evidências

**Anexar:** materiais reais, autorizações e conteúdo pedagógico revisado.

- Usar exclusivamente registros autorizados da edição, identificados por origem.
- Depoimentos exigem autorização e fidelidade; foto de grupo não comprova resultado pedagógico individual.

Usar composição correspondente ao material: lista editorial, foto, vídeo ou relato, e não uma grade obrigatória de três cards. Vídeos mantêm controle de áudio e acessibilidade; listagens não iniciam todas as mídias em autoplay.

## 04 — Quem ensina e contexto institucional

**Anexar:** nomes, papéis, história ou autoria confirmados quando aplicáveis.

- Situar a experiência dentro da proposta da escola com fatos, sem transformar relato em promessa de fluência.
- Não tratar evento realizado como inscrição aberta ou campanha futura.

**Conferir:** fotos ilustrativas não parecem registros da equipe e nenhum dado pessoal é extraído de imagem/DDD para completar a história. Links institucionais apontam somente a páginas publicadas.

## 05 — Contato, próximo passo e fechamento

**Anexar:** canais e origens de mensagens do projeto.

Registro de edição → entender English Day → conhecer aulas. Sem reserva, compra ou inscrição fictícia.

Reutilizar WhatsAppLink e whatsappUrl, registrando origens novas sem remover mensagens existentes. Link abre contato real e não envia mensagem sozinho. Fechamento adapta a linguagem vigente ao assunto, sem duplicar outro painel enorme por obrigação. Formulário persistente somente após backend, aviso e atendimento preparados; sem eles, o contato real continua pelo WhatsApp.

## 06 — Revisão visual, mobile e preparação técnica

Ler os guias da versão instalada de Next.js antes de escrever código; usar App Router/TypeScript e conteúdo no servidor. Conferir metadados próprios, canonical da rota e política getPublicationConfig. Rascunhos não entram em menu/sitemap nem ficam acessíveis na publicação pública. Slugs inválidos recebem 404. Não usar data de build como publicação.

Testar 320, 390, 768, 1024, 1440 e 1920px, zoom 200%, teclado e movimento reduzido. Usar semântica de links/botões, skip link, contraste e alt/créditos. Verificar renderização sem JavaScript das ações essenciais. Testes de comportamento cobrem riscos reais; não escrever testes que apenas espelham CSS.

- Rota não duplica o mesmo material da página geral sem acrescentar relato/acervo.
- Sem recorte de participantes, repetição artificial de fotos ou carrossel que exige JavaScript para todo o conteúdo.
- Datas e autoria são reais; rascunhos/slug desconhecido retornam 404 pública.

Rodar lint, testes pertinentes e build; registrar comandos, resultados, erros/limitações e screenshots. Sem afirmação de conformidade integral ou ganho de conversão por auditoria automática.

## 07 — Refinamento visual após a primeira implementação

Comparar desktop/mobile uma vez em lote com a baseline e com o propósito da página. Corrigir problemas observados de leitura, hierarquia, recorte, alinhamento ou CTA. Preservar identidade e escopo. Não fazer redesign ou acrescentar efeitos só porque a página interna é nova.

## 08 — Ajuste do espaçamento entre dobras

Respeitar a escala 80/64/48px e os gaps do sistema, ajustando somente quando o conteúdo real demonstrar um problema. A página não depende de altura fixa para caber. Parágrafos não usam margens grandes para simular profundidade; CTA e mídia mantêm respiro claro. Registrar extensão numérica específica no design.json antes de gerar tokens, sem modificar as medidas da home.

## 09 — Rodapé detalhado compartilhado

Reutilizar Footer pelo shell, uma única vez. Atualizar grupos/destinos com a disponibilidade das rotas. Marca invertida e variação compacta mobile seguem os mestres e respiro atuais. Não criar outro rodapé básico, newsletter, portal ou formulário adicional para preencher espaço.

## 10 — Briefs das fotografias e mídias

Não gerar fotografias de um evento que não aconteceu. Solicitar material real e autorizações. Mockup é referência de organização; não conta como prova de participação ou registro histórico.

Antes de produzir/usar mídia, registrar finalidade, origem, autorização, alt, crédito e recorte. Brief ilustrativo não comprova escola, equipe, alunos ou resultado. Logos e favicon usam os mestres existentes, não geração de imagem. Não executar geração de mídia automaticamente ao receber este documento de planejamento.

## 11 — Logo, ícone e favicon

Conservar o kit B atual, seus arquivos e variantes. Header compacta mínimo 160px; horizontal com descritor mínimo 360px; área de proteção um quarto da altura do símbolo. Favicon e Open Graph reutilizam a marca oficial sem efeitos. A página não redefine ícone, wordmark ou cor.

## 12 — Mockups e aprovação de implementação

Produzir prévia no website real e capturas de desktop/mobile quando a tarefa for executada. Se um mockup externo for necessário, levar o contrato e os assets; ele não substitui teste de comportamento. Não gerar maquete desconectada do código e chamá-la de implementação.

**SEO específico:** Metadados por edição; usar conteúdo editorial verificável. Não emitir Event de data futura ou avaliações/ratings sem confirmação.

**Entregar:** rota conectada em revisão, arquivos usados, conteúdo confirmado/pendente, integrações reais, evidências e atualização de contrato quando houver extensão. Publicação e ativação de captação são passos posteriores explícitos. Este prompt não deve ser marcado como implementado até esses resultados de desenvolvimento existirem.
