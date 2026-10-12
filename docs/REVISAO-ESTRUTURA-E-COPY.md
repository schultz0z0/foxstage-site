# Revisão das páginas internas — 3.1.0

Pedido de 12 de outubro de 2026: preservar heroes, identidade e qualidade da home, sem reproduzir sua sequência de seções em cada página. A revisão 3.0.0 criou redundância ao repetir método, comparação, English Day, FAQ e assinatura final. Esta direção substitui aquela sequência fixa.

| Página | Pergunta que responde | Composição própria |
|---|---|---|
| Em grupo | Como é participar e conversar com outras pessoas? | Fotografia com uma frase de conversa; exemplos de uso cotidiano em linhas expansíveis; consulta sobre turma e horários |
| Individual | Como meu objetivo entra na conversa sobre as aulas? | Escolha de objetivo com mensagem contextual real para WhatsApp; fotografia de estudo e explicação curta do formato; link discreto para grupo |
| A Foxstage | Que escola é essa e quem ensina? | Declaração institucional tipográfica; identidade oficial e apresentação nominal de Felipe Pontes; registro real da comunidade |
| English Day | O que acontece no encontro e como posso saber sobre participação? | Fatos essenciais em faixa curta; relato do cinema com foto/celular/vídeo em destaque central; dúvidas de participação |
| Contato | Como chego ao assunto certo? | Três links diretos para grupo, individual e aluno atual; canais oficiais ao lado. Uma única seção depois do hero |

## Regras editoriais

Cada seção precisa acrescentar informação ou permitir uma decisão. Cortar paráfrases de conversação, cotidiano e medo de errar que apenas repetem o parágrafo anterior. A comparação completa fica na home; não repetir o painel animado final nas internas. Links entre páginas ficam contextuais e curtos. Não alongar páginas para completar uma quantidade arbitrária de seções.

Situações e frases em inglês são exemplos editoriais de uso, não uma ementa prometida, depoimentos ou conversas reais de alunos. Objetivos de viagem, trabalho e cotidiano não criam cursos adicionais. A opção individual permanece personalizada, sem inferir diagnóstico, liberdade de agenda, materiais ou adaptações operacionais ainda não confirmadas.

## Design e apoio utilizado

Paleta e fontes do manual B preservadas; heroes e home preservados. A diferença está na proporção das colunas, no papel das imagens, na densidade dos textos e na função de cada bloco. Branco após o hero conserva o respiro aprovado; não exigir branco/preto/creme/laranja em todas as rotas.

Skills de frontend-design e frontend-design-premium usadas para a crítica de estrutura e copy. Catálogo 21st consultado; fonte da referência [Image Stack Carousel](https://21st.dev/@ayushmxxn/components/image-stack-carousel) inspecionada. A hierarquia de imagens em camadas inspira a cena de conversa da página de grupo. Não importar seu código de arraste ou dependências: aqui a fotografia e o exemplo de frase são estáticos, legíveis sem JavaScript. Referências de Contact também consultadas; formulários e provas sociais desses exemplos não correspondem à operação confirmada da Foxstage.

O servidor setup-agent não está disponível entre as ferramentas desta sessão; isso não indica acervo vazio. Nenhuma ferramenta, skill ou plugin novo foi criado ou instalado. Figma permanece disponível para trabalho futuro com um arquivo de design; não foi criado um arquivo apenas para repetir o site existente.

## Verificação realizada

Build de produção, typecheck, lint e 15 testes de unidade passaram. A QA de navegador verificou as cinco internas e a home em oito larguras, de 320 a 1920px. As escolhas de objetivo exibem um único painel e preparam mensagens de aulas individuais com o contexto correto, inclusive sem JavaScript. Publicação privada/pública e 404 sem JavaScript passaram. O teste de movimento confirmou a copy estática, foto inteira, celular em movimento sob hover/foco, autoplay sem som e pausa manual respeitada.

A revisão independente não encontrou problemas críticos, importantes ou menores confirmados. Verificou por teclado as escolhas e exemplos, mediu o respiro de 40/48px e o uso de logo compacta/horizontal nos tamanhos mínimos do manual. Aprovação editorial e implantação continuam pendentes; os ensaios não equivalem a auditoria integral de acessibilidade, desempenho de campo ou medição de conversão.

Evidências: `docs/evolution-private-preview-qa.json`, `docs/evolution-public-qa.json`, `docs/evolution-motion-qa.json` e as capturas locais em `.impeccable/review/evolucao/`. As capturas carregam e decodificam também as imagens abaixo da dobra e retiram o foco de teclado antes da fotografia da interface; isso não altera o comportamento do site.


## English Day com vídeo em destaque — 3.1.1

Pedido de 12 de outubro de 2026: na página `/english-day`, a fotografia do cinema fica apenas no hero. A seção laranja usa copy estática à esquerda e vídeo vertical à direita, inspirado na apresentação de um Reels. Remover foto duplicada e mockup de celular desta seção. Não acrescentar contadores, comentários, curtidas ou botões sociais fictícios. Marca oficial e link real do Instagram identificam a origem.

O vídeo mantém proporção464:816, controles nativos, autoplay sem som quando35% dele está visível, pausa fora da tela ou com aba oculta, respeito à pausa manual e ausência de loop. Movimento reduzido impede autoplay; reprodução manual e poster permanecem. A home conserva sua composição foto/celular e coreografia Remotion. O comportamento de playback é compartilhado em `src/hooks/useViewportVideo.ts`. Teste específico em `tests/english-day-reel.browser.mjs`; evidência em `docs/english-day-reel-qa.json`.
