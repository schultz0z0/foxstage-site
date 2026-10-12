# Foxstage — prompt completo: Inglês individual

Planejamento 1.0.0, 12 de outubro de 2026. Baseline: design system 2.7.3 e manual B v1.0. Este documento é um roteiro para implementação posterior; sua existência não autoriza publicar, instalar recursos ou captar dados.

## Objetivo, escopo e personalização

Explicar de maneira concreta o formato individual personalizado, permitindo avaliar a adequação ao objetivo do visitante.

| Campo | Valor / estado |
|---|---|
| Rota | `/cursos/ingles-individual` |
| Função | Oferta e decisão |
| Estado | Planejada; personalização prática pendente |
| H1 de partida | Inglês individual, personalizado. — proposta editorial, exceto texto já aprovado da home |
| Conteúdo planejado | `src/content/evolution/courses.ts: coursePages.individual` |
| Implementação planejada | `src/app/(institucional)/cursos/ingles-individual/page.tsx + CoursePage` |
| Origem do contato | individual (nova origem a registrar) |
| Condição de publicação | Confirmar o que a personalização realmente altera, como as aulas são combinadas e próximo passo. Não publicar uma página inteira sustentada apenas pelo adjetivo personalizado. |

### Ficha específica

- `[[INDIVIDUAL_PERSONALIZACAO_PRATICA]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[INDIVIDUAL_AGENDAMENTO]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[INDIVIDUAL_DURACAO]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[INDIVIDUAL_MATERIAIS]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[ACOMPANHAMENTO_PROGRESSO]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.
- `[[COMO_COMECAR]]`: consultar a matriz editorial, registrar fonte e aprovação; não publicar marcador ou valor presumido.

### Anexos e dependências obrigatórios

Ler [contrato comum](../CONTRATO-COMUM.md), [arquitetura](../ARQUITETURA-E-MODELOS.md), [conteúdo/pendências](../CONTEUDO-E-PENDENCIAS.md), [qualidade](../QUALIDADE-E-PUBLICACAO.md), [prompt base](../../../foxstage-prompt-completo-nextjs.md), [design humano](../../../design.md), [design numérico](../../../design.json), [implementação atual](../../IMPLEMENTATION.md) e [manual PDF](../../../assets/Identidade%20visual%20Foxstage/manual-de-marca.pdf). A fundação multipágina é pré-requisito para as internas. Para formulário, acrescentar [persistência](../FORMULARIOS-E-PERSISTENCIA.md) e o plano opcional.

## Diretrizes permanentes

Execute somente o escopo desta página quando houver solicitação de implementação. Preservar o código/contrato vivo do projeto; não substituir a identidade ou reconstruir a home. Ler notas finais para resolver instruções históricas. Reutilizar logo SVG, Bebas Neue 400, Source Sans 3 e tokens existentes; laranja #F65A0B, preto #101314, creme #F3EFE8. Não redigitar logo, amostrar cor de referência ou editar tokens.css manualmente.

Sem emojis, gradientes decorativos, vidro, brilhos, contadores, depoimentos/credenciais inventados, urgência falsa ou cards para cada parágrafo. Botões com largura pelo conteúdo. Copy explica o serviço; não promete fluência, duração, certificado, níveis ou inclusões sem confirmação. Personalização individual não é atribuída ao grupo.

Conteúdo inicial no servidor, H1 único e ações reais. Texto permanece quieto. English Day conserva movimento apenas das mídias, sem recorte e sem pausa por hover/foco. Recursos adicionais exigem consulta ao acervo O Setup e inspeção do candidato; não instalar bibliotecas ou serviços por hábito. Dados pendentes ficam na ficha editorial, fora da interface pública.

## 01 — Estrutura visual, header, abertura e confiança

**Anexar:** contrato, conteúdo da ficha, referências e shell compartilhado.

Implementar a abertura correspondente à função oferta e decisão. Usar H1 de partida somente após revisão da copy, uma introdução curta e hierarquia editorial. Internas usam Header variante page em fluxo normal, um main#conteudo e Footer pelo shell; a home conserva Header dentro de Hero. Não duplicar landmarks, títulos ou logos. Não copiar o hero de tela grande/carrossel para cada página.

**Conferir:** um H1, largura do eixo, respiro da marca, menu operável, destino real e ausência de sobreposição. Somente evidências confirmadas compõem confiança.

## 02 — Conteúdo principal em composição editorial

**Anexar:** dados específicos aprovados e respectivas fontes.

- Abertura editorial com H1, formato confirmado e contato específico; manter um único objetivo comercial principal.
- Mostrar o que pode ser personalizado com exemplos aprovados: temas, ritmo ou materiais somente se esses itens fizerem parte da operação real.
- Explicar combinação das aulas, duração, inclusões e acompanhamento conforme dados fornecidos. Não criar diagnóstico, plano formal ou agenda livre sem confirmação.
- FAQ específica do individual e comparação breve com grupo, orientada por características verdadeiras.

**Conferir:** a página responde à sua pergunta principal, acrescenta conteúdo à home e não repete integralmente outra rota. Omitir módulos que dependam de dados ausentes, registrando a pendência para revisão.

## 03 — Ensino, experiência e evidências

**Anexar:** materiais reais, autorizações e conteúdo pedagógico revisado.

- Apresentação do professor e uma atividade autorizada ajudam a explicar o ensino; casos de aluno exigem relato fiel e autorização.
- Uma fala gravada pelo responsável sobre personalização pode substituir um bloco de afirmações abstratas.

Usar composição correspondente ao material: lista editorial, foto, vídeo ou relato, e não uma grade obrigatória de três cards. Vídeos mantêm controle de áudio e acessibilidade; listagens não iniciam todas as mídias em autoplay.

## 04 — Quem ensina e contexto institucional

**Anexar:** nomes, papéis, história ou autoria confirmados quando aplicáveis.

- Vincular a equipe real à oferta, sem alegar professor nativo, especialista ou certificação não confirmados.
- A individualidade da aula é confirmada; os mecanismos de personalização precisam de descrição da escola.

**Conferir:** fotos ilustrativas não parecem registros da equipe e nenhum dado pessoal é extraído de imagem/DDD para completar a história. Links institucionais apontam somente a páginas publicadas.

## 05 — Contato, próximo passo e fechamento

**Anexar:** canais e origens de mensagens do projeto.

Objetivo do visitante → compreensão da personalização → WhatsApp com origem individual. A conversa não é apresentada como avaliação gratuita automática.

Reutilizar WhatsAppLink e whatsappUrl, registrando origens novas sem remover mensagens existentes. Link abre contato real e não envia mensagem sozinho. Fechamento adapta a linguagem vigente ao assunto, sem duplicar outro painel enorme por obrigação. Formulário persistente somente após backend, aviso e atendimento preparados; sem eles, o contato real continua pelo WhatsApp.

## 06 — Revisão visual, mobile e preparação técnica

Ler os guias da versão instalada de Next.js antes de escrever código; usar App Router/TypeScript e conteúdo no servidor. Conferir metadados próprios, canonical da rota e política getPublicationConfig. Rascunhos não entram em menu/sitemap nem ficam acessíveis na publicação pública. Slugs inválidos recebem 404. Não usar data de build como publicação.

Testar 320, 390, 768, 1024, 1440 e 1920px, zoom 200%, teclado e movimento reduzido. Usar semântica de links/botões, skip link, contraste e alt/créditos. Verificar renderização sem JavaScript das ações essenciais. Testes de comportamento cobrem riscos reais; não escrever testes que apenas espelham CSS.

- Cada afirmação de personalização corresponde a uma ação confirmada.
- Nenhum preço, disponibilidade, calendário ou garantia é presumido.
- Conteúdo difere do grupo pela experiência e pelas condições reais, mantendo componentes compartilhados.

Rodar lint, testes pertinentes e build; registrar comandos, resultados, erros/limitações e screenshots. Sem afirmação de conformidade integral ou ganho de conversão por auditoria automática.

## 07 — Refinamento visual após a primeira implementação

Comparar desktop/mobile uma vez em lote com a baseline e com o propósito da página. Corrigir problemas observados de leitura, hierarquia, recorte, alinhamento ou CTA. Preservar identidade e escopo. Não fazer redesign ou acrescentar efeitos só porque a página interna é nova.

## 08 — Ajuste do espaçamento entre dobras

Respeitar a escala 80/64/48px e os gaps do sistema, ajustando somente quando o conteúdo real demonstrar um problema. A página não depende de altura fixa para caber. Parágrafos não usam margens grandes para simular profundidade; CTA e mídia mantêm respiro claro. Registrar extensão numérica específica no design.json antes de gerar tokens, sem modificar as medidas da home.

## 09 — Rodapé detalhado compartilhado

Reutilizar Footer pelo shell, uma única vez. Atualizar grupos/destinos com a disponibilidade das rotas. Marca invertida e variação compacta mobile seguem os mestres e respiro atuais. Não criar outro rodapé básico, newsletter, portal ou formulário adicional para preencher espaço.

## 10 — Briefs das fotografias e mídias

Preferir registro autorizado de aula individual. Alternativa ilustrativa: pessoa conversando com professor por videochamada, fotografia natural, enquadramento discreto de notebook e caderno; não inventar interface de plataforma própria nem identificar personagens gerados como professores Foxstage.

Antes de produzir/usar mídia, registrar finalidade, origem, autorização, alt, crédito e recorte. Brief ilustrativo não comprova escola, equipe, alunos ou resultado. Logos e favicon usam os mestres existentes, não geração de imagem. Não executar geração de mídia automaticamente ao receber este documento de planejamento.

## 11 — Logo, ícone e favicon

Conservar o kit B atual, seus arquivos e variantes. Header compacta mínimo 160px; horizontal com descritor mínimo 360px; área de proteção um quarto da altura do símbolo. Favicon e Open Graph reutilizam a marca oficial sem efeitos. A página não redefine ícone, wordmark ou cor.

## 12 — Mockups e aprovação de implementação

Produzir prévia no website real e capturas de desktop/mobile quando a tarefa for executada. Se um mockup externo for necessário, levar o contrato e os assets; ele não substitui teste de comportamento. Não gerar maquete desconectada do código e chamá-la de implementação.

**SEO específico:** Title proposto: Aulas individuais de inglês. Descrição de formato individual personalizado, com consulta à escola; canonical próprio.

**Entregar:** rota conectada em revisão, arquivos usados, conteúdo confirmado/pendente, integrações reais, evidências e atualização de contrato quando houver extensão. Publicação e ativação de captação são passos posteriores explícitos. Este prompt não deve ser marcado como implementado até esses resultados de desenvolvimento existirem.
