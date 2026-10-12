# Conteúdo, variáveis e condições de publicação

Nenhuma pendência deve ser transformada em afirmação comercial. O documento é a ficha editorial da expansão; não é texto a publicar na interface.

## Confirmado

| Fato | Fonte / autoridade | Uso |
|---|---|---|
| Nome Foxstage e identidade B | Aprovação humana e manual B v1.0 | Marca, identidade e aplicações |
| Aulas online ao vivo em grupo | Confirmação do usuário na conversa | Oferta de grupo |
| Aulas individuais personalizadas | Confirmação do usuário | Oferta individual |
| Foco em conversação, cotidiano e situações reais | Confirmação do usuário | Explicação do ensino |
| Espaço para errar durante a prática | Confirmação do usuário | Tom acolhedor, sem garantir resultado |
| English Day presencial a cada quatro meses, organizado e custeado pela escola | Confirmação do usuário | Apresentação da experiência |
| Comunicação em inglês durante o dia | Confirmação do usuário | Proposta do English Day; não afirma idioma do filme |
| Edição registrada no cinema | Foto e vídeo fornecidos | Registro desse encontro |
| WhatsApp e Instagram do contrato | Pesquisa de 10/10/2026 e design.json | Contato; reconferir no lançamento |

Não inferir data/local do evento a partir do nome do arquivo, DDD ou identificação visual incidental. A associação de Felipe Pontes ao perfil não confirma cargo, formação ou condição de fundador.

## Matriz de pendências

| Variável | Destino | Efeito enquanto pendente |
|---|---|---|
| `[[GRUPO_FREQUENCIA]]`, `[[GRUPO_DURACAO_AULA]]`, `[[GRUPO_TAMANHO]]` | Oferta de grupo | Omitir números/rotina específica |
| `[[GRUPO_NIVEIS]]`, `[[GRUPO_PUBLICO]]`, `[[GRUPO_MATERIAIS]]` | Oferta de grupo | Não criar faixas etárias, currículo ou inclusões |
| `[[INDIVIDUAL_PERSONALIZACAO_PRATICA]]` | Oferta individual | Exige descrição concreta antes de divulgar processo detalhado |
| `[[INDIVIDUAL_AGENDAMENTO]]`, `[[INDIVIDUAL_DURACAO]]`, `[[INDIVIDUAL_MATERIAIS]]` | Oferta individual | Omitir condições específicas |
| `[[ACOMPANHAMENTO_PROGRESSO]]` | Ambas as ofertas | Não afirmar diagnósticos, relatórios, avaliações ou CEFR |
| `[[CONDICOES_VALORES]]`, `[[COMO_COMECAR]]` | Ofertas e Contato | Manter consulta real à escola; não inventar matrícula automática |
| `[[HISTORIA_ESCOLA]]`, `[[RESPONSAVEIS]]` | A Foxstage | Página fica em revisão até haver conteúdo próprio substancial |
| `[[PROFESSORES_AUTORIZADOS]]`, `[[FOTOS_EQUIPE]]`, `[[FORMACAO_CONFIRMADA]]` | A Foxstage | Não publicar perfil fictício ou imagem gerada como equipe |
| `[[ENGLISH_DAY_PARTICIPACAO]]`, `[[ENGLISH_DAY_LOCALIDADE]]` | Experiência e ofertas | Não prometer participação irrestrita a qualquer plano/aluno |
| `[[EDICAO_RELATO]]`, `[[EDICAO_DATA]]`, `[[EDICAO_LOCAL]]` | Registro do cinema / futuras edições | Não gerar datas, roteiro ou falas dos alunos |
| `[[DEPOIMENTOS_AUTORIZADOS]]` | Evidências | Módulo omitido se vazio |
| `[[ARTIGOS_REVISADOS]]`, `[[AUTORES]]` | Conteúdos | Índice/menu não entram sem acervo aprovado |
| `[[HORARIO_ATENDIMENTO]]`, `[[EMAIL_ESCOLA]]` | Contato | Omitir canais/horários não confirmados |
| `[[DOMINIO_HTTPS]]`, `[[AUTORIZACAO_INDEXACAO]]` | Publicação | Preview sem indexação e canonical público |
| `[[AVISO_TRATAMENTO]]`, `[[RESPONSAVEL_DADOS]]`, `[[RETENCAO]]` | Formulários / Privacidade | Bloquear captação persistente pública enquanto não definidos |
| `[[DESTINO_ATENDIMENTO]]`, `[[ACESSO_RESTRITO_DADOS]]` | Backend opcional | Não ativar formulário sem rotina de atendimento |

## Ficha por informação

Cada dado editorial deve registrar: valor, fonte, responsável por confirmar, estado (`pendente`, `confirmado`, `aprovado_para_publicacao`), data da confirmação e local de uso. Informação confirmada mas sem autorização de imagem/depoimento não está pronta para publicação.

Os nomes acima são marcadores, não propriedades obrigatórias no frontend. Os dados publicados devem ser valores concretos em módulos tipados. A ficha de pendências acompanha o projeto e não é enviada como parte do HTML ao visitante.

## Regras para copy

- Home resume; interna acrescenta detalhes. Não repetir os mesmos dois parágrafos em todas as páginas.
- Personalização é exclusiva do formato individual até confirmação adicional.
- Grupo significa aula ao vivo com colegas; não significa automaticamente turma pequena ou professor fixo.
- Exemplos de atividades devem ser identificados como exemplos; só apresentar como prática da escola após revisão do professor.
- Proibir “fluência em X meses”, “método cientificamente comprovado”, “professores nativos”, estatísticas e resultados sem fonte própria.
- Não publicar lista de espera, promoção, teste ou aula experimental somente porque aparece em concorrentes.
- Condições, cancelamento, preços e certificados exigem informações aprovadas e documentos pertinentes.

## Acervo inicial de conteúdos

Planejar três materiais autorais revisados antes de divulgar o índice: um assunto de linguagem cotidiana, uma situação prática e uma atividade de escuta/conversação. Os títulos, exemplos, áudios, autoria e revisão dependem da escola. Não gerar três artigos genéricos para cumprir uma quota. Se houver somente um material, publicar seu destino útil quando aprovado e aguardar um acervo para abrir o índice no menu.

## Registro editorial mínimo

| Campo | Exigência |
|---|---|
| `slug`, `title`, `summary` | Únicos e correspondentes ao conteúdo |
| `authorName`, `reviewedBy` | Pessoas confirmadas; revisão linguística real |
| `publishedAt`, `updatedAt` | Datas reais; updatedAt apenas para revisão real |
| `status` | Rascunho não publicado em produção |
| `blocks` | Conteúdo completo, incluindo exemplos/atividade quando proposto |
| `media` | Origem, autorização, alt, crédito e dimensões |
| `relatedCourse` | `group`, `individual` ou ausente; sem forçar toda matéria a vender |

## Condições mínimas por lançamento

Ofertas: descrição verdadeira, formato, próximo passo e contato válidos; qualquer detalhe citado deve estar aprovado. Institucional: história/pessoas/ensino com informações e imagens próprias autorizadas. English Day: narrativa própria e condições claras. Conteúdos: materiais revisados, autores e datas reais. Contato: canais reais. Formulário: gravação real, tratamento definido, controles operacionais e forma restrita de ler os envios.
