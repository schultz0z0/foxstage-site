# Design system — Foxstage

**Complemento de publicação (17/10/2026):** políticas usam leitura editorial em branco; consentimento usa creme oficial, controles de mesma importância para aceite/recusa e diálogo nativo. Erros e carregamento reutilizam tipografia, cores e botões existentes. Consultar `docs/AUDITORIA-PUBLICACAO-2026-10-17.md`; não alterar heroes ou a composição das páginas por causa deste complemento.

**Conteúdo vigente:** versão 3.1.2, home preservada e páginas institucionais liberadas para publicação. Consultar a nota final desta versão antes de reutilizar especificações históricas.

**Versão:** 3.1.2
**Data:** 10 de outubro de 2026  
**Arquivos do contrato:** `design.md`, `design.json` e `foxstage-prompt-completo-nextjs.md`.  
**Status:** composição aprovada das referências, com a identidade B escolhida pelo usuário. O manual em `assets/Identidade visual Foxstage/manual-de-marca.pdf` governa a aplicação da marca. Não se atribui esse manual à pesquisa original do Instagram.

Este documento descreve composição, hierarquia e comportamento. `design.json` contém os valores, aliases, estados e a ordem das seções. O prompt contém a sequência de execução. Os três arquivos devem ser enviados juntos ao agente que desenvolverá o website.

## 1. Referências e decisões

As imagens foram preservadas em `assets/references/` para não depender de arquivos temporários da conversa.

| Referência | Arquivo | Leitura |
|---|---|---|
| Imagem 1, 752x752 | `assets/references/01-hero-reference.png` | Hero fotográfico, título condensado à esquerda e navegação branca em cápsula, sobreposta à parte superior da imagem. |
| Imagem 2, 752x752 | `assets/references/02-overview-reference.png` | Montagem de trechos que permite comparar o ritmo da página. Não é uma especificação de tablet ou mobile. |
| Imagem 3, 752x3547 | `assets/references/03-full-page-reference.png` | Página completa: institucional em duas colunas, faixa escura fotográfica, atalhos em creme, curso editorial, calendário, depoimento, CTA com colagem e rodapé compacto. |
| Marca atual B | `assets/Identidade visual Foxstage/logos/` | Mestres SVG em curvas, horizontais e compactos; cores e versões do manual aprovado. |
| Logo anterior | `assets/logo.png` | Arquivo histórico preservado; não utilizado na interface 2.2.0. |

As medidas das capturas não revelam diretamente pixels CSS, fonte exata ou breakpoints. As proporções abaixo são uma especificação para o novo site, orientada pela referência. Não alegar extração do código-fonte ou identificação da fonte original.

### O que preservar

- Hero com fotografia dominante, texto no lado esquerdo e pessoas ou assunto principal à direita.
- Header branco em cápsula, sobreposto ao hero no desktop, com sombra pequena para separação.
- Títulos altos, condensados, em caixa alta, contrastando com texto de leitura em família normal.
- Alternância de superfícies: branco no início, faixa preta, creme no conteúdo seguinte e preto no fechamento.
- Eixos alinhados e fotografias grandes; conteúdo institucional não vira uma sequência de cards iguais.
- Cards fotográficos na faixa escura e cards de ação na faixa clara, cada tipo com função distinta.
- Apresentação de curso em composição editorial: imagem ou colagem à esquerda, texto à direita.
- Painel de contato escuro, arredondado e recuado dentro da superfície creme.
- Rodapé escuro com grupos claros de marca, navegação e contato.

### O que adaptar ou excluir

| Elemento da referência | Decisão para a Foxstage |
|---|---|
| Vermelho | Substituir pelo laranja proposto; usar a variante escura para texto pequeno sobre fundo claro. |
| Fundo vermelho externo da Imagem 1 | É apresentação do mockup. Não implementar como fundo da página nem como uma grande moldura colorida. |
| Fotos de crianças e uniformes | Não reutilizar. Não presumir público infantil. Escolher material autorizado adequado à oferta confirmada. |
| Logo canadense e símbolo de folha | Substituir pelos mestres da direção B aprovada. Não reinterpretar a raposa nem adicionar símbolos nacionais. |
| Login, portal de pais, pagamentos e rematrícula | Não implementar. Os atalhos levam ao curso, ao funcionamento das aulas e ao perfil ou contato. |
| Quatro diferenciais | Usar os três temas derivados do posicionamento público, sujeitos a revisão de conteúdo. Não inventar um quarto. |
| Kindergarten, Elementary e High School | Não converter automaticamente em Kids, Teens ou Adults. Usar apenas catálogo confirmado. |
| Calendário acadêmico | Desligado. Se o processo de entrada for confirmado, apresentar passos simples; agenda só com serviço e dados reais. |
| Depoimentos de pais | Desligados até existir depoimento fiel e autorização de uso. |
| Faixas diagonais repetidas | Elemento opcional, desligado na primeira versão. Não criar marquee contínuo nem repetir slogan por preenchimento. |
| Arco de fotografias no CTA | Permitido com pelo menos cinco imagens distintas autorizadas e composição aprovada. Sem esse material, uma imagem coerente ou texto breve no painel escuro. |
| Newsletter | Desligada. Não criar uma segunda coleta de dados sem finalidade e operação definidas. |

## 2. Direção visual

O site deve parecer uma página de curso com fotografia e informação editorial, seguindo a composição anexada. A marca aparece na raposa, no laranja e no contraste com preto e creme. O conteúdo explica o ensino e encaminha ao contato.

Não transformar essa direção em um dashboard, catálogo de cards genéricos ou landing page de software. Não adicionar gradientes de fundo, vidro, brilhos, formas abstratas, contadores ou depoimentos fictícios.

Os títulos condensados são uma decisão específica da referência. A leitura dos parágrafos e dos controles permanece em fonte normal, com tamanho confortável. A caixa alta fica restrita a títulos curtos e eyebrows, sem parágrafos em maiúsculas.

## 3. Paleta e papéis

As sete cores de marca correspondem ao **manual B v1.0 aprovado pelo usuário**. Neutros funcionais, erros e estados de interação continuam como tokens da interface; não são variantes cromáticas da logo. Não aplicar o laranja a toda a página: ele marca ações e pontos de hierarquia.

| Cor de marca ou token funcional | Valor | Papel |
|---|---|---|
| Laranja principal | `#F65A0B` | CTA principal, card de ação em destaque e pequenos detalhes. |
| Laranja de interação | `#DE4A06` | Hover e active do CTA, com texto preto. |
| Laranja escuro | `#A83A08` | Eyebrows e links pequenos em branco ou creme. |
| Laranja claro | `#FFB077` | Acento textual sobre preto. |
| Preto | `#101314` | Títulos, faixa de prática, painel final e rodapé. |
| Preto secundário | `#242B2E` | Variante de superfície ou borda escura quando necessária. |
| Cinza de leitura | `#555A5D` | Parágrafos secundários sobre superfície clara. |
| Cinza de campos | `#6B7174` | Borda identificável de controles. |
| Cinza sobre preto | `#A6ABAD` | Texto secundário do rodapé e de áreas escuras. |
| Borda discreta | `#D9D5CF` | Divisórias e limites que não identificam sozinhos um controle. |
| Creme | `#F3EFE8` | Atalhos, apresentação editorial de curso e região de fechamento. |
| Creme claro | `#FFF8EC` | Texto sobre preto e assento neutro da logo quando necessário. |
| Branco | `#FFFFFF` | Página inicial, header, fotos com borda e cards de ação. |

### Contraste calculado dos pares sólidos

| Par | Relação aproximada | Uso |
|---|---|---|
| Preto sobre branco | 18,66:1 | Texto principal. |
| Cinza de leitura sobre creme | 6,09:1 | Texto secundário. |
| Laranja escuro sobre branco | 6,41:1 | Texto pequeno de destaque. |
| Laranja escuro sobre creme | 5,60:1 | Texto pequeno de destaque. |
| Preto sobre laranja principal | 5,67:1 | Texto do botão e do card em destaque. |
| Preto sobre laranja de interação | 4,52:1 | Hover e active do botão, sem transparência adicional. |
| Creme claro sobre preto | 17,68:1 | Título e texto de áreas escuras. |
| Cinza sobre preto | 8,04:1 | Texto secundário do rodapé. |
| Laranja claro sobre preto | 10,42:1 | Eyebrow ou link em área escura. |

**Branco sobre o laranja principal tem aproximadamente 3,29:1. Não usar essa combinação em texto pequeno.** O botão principal terá texto preto. O contraste de fotografia com overlay precisa ser conferido no recorte real; a tabela não certifica o hero ou os cards fotográficos.

## 4. Tipografia

### Família de títulos

Manual B aprovado: **Bebas Neue, peso real 400**. Sua forma condensada preserva a hierarquia editorial sem comprimir letras artificialmente. Não é uma identificação da fonte das capturas de referência. A versão aberta é documentada pelo [autor da família](https://github.com/dharmatype/Bebas-Neue).

Usar em H1, H2 e títulos curtos dos cards. Não usar em parágrafos, labels, navegação ou avisos de formulário. Não simular peso 700 ou condensação por `transform: scaleX()`.

### Família de leitura

Manual B aprovado: **Source Sans 3**, pesos 400, 600 e 700. Usar em texto, navegação, botões, labels, legendas e política. A família e sua distribuição são documentadas pela [Adobe](https://github.com/adobe-fonts/source-sans).

Carregar arquivos licenciados compatíveis com Next.js ou usar o mecanismo de fonte adequado ao projeto. Conferir os caracteres de “inglês”, “prática”, “comunicação” e “aulas”. Não substituí-los por letras sem acento para evitar problema de fonte.

| Estilo | Tamanho / regra | Entrelinha | Restrição |
|---|---|---|---|
| H1 | `clamp(2.75rem, 7.8vw, 7rem)` | 0,98 | Até três linhas no desktop e quatro no mobile, conforme copy aprovada. |
| H2 | `clamp(2rem, 4.2vw, 4rem)` | 1,04 | Título curto, idealmente até dez palavras. |
| Título de card | `clamp(1.5rem, 2.2vw, 2rem)` | 1,10 | Sem descrição longa dentro do título. |
| Texto principal | 18px desktop; 16px mobile | 1,60 | Linha com até aproximadamente 62 caracteres em bloco amplo. |
| Navegação | 14px, peso 600 | Natural | Caixa normal; não copiar o texto microscópico da referência. |
| Eyebrow | 13px, peso 700, tracking 0,04em | 1,40 | Caixa alta; cor específica para o fundo. |
| Botão | 16px, peso 600 | Natural | Texto em caixa normal. |
| Legenda | 14px | 1,45 | Não usar para informação principal. |
| Campo mobile | Pelo menos 16px | Natural | Labels visíveis, sem redução para caber. |

Um único termo do título pode receber o acento, como na referência, usando o token adequado ao fundo. Não alternar cor em várias palavras nem aplicar gradiente ao título.

## 5. Grid, espaçamento e superfícies

| Parâmetro | Valor |
|---|---|
| Conteúdo principal | Máximo de 1200px, centralizado. |
| Hero externo | Máximo de 1840px, com margem lateral mínima de 24px no desktop. |
| Cápsula do header | Máximo de 1160px. |
| Margem externa desktop | 40px. |
| Margem externa tablet | 24px. |
| Margem externa mobile | 16px no hero; conteúdo com 24px, reduzível a 20px em 320px. |
| Espaço vertical padrão | 80px desktop, 64px tablet e 48px mobile. |
| Gap de grid | 24px. |
| Eyebrow até título | 12px. |
| Título até conteúdo | 32px, ajustável à região. |

Não somar 80px de padding inferior de uma seção com 80px superior de um wrapper vazio da próxima. As transições de cor organizam a página, sem precisar de separadores decorativos em todas as dobras.

A sequência de superfície principal será: **hero fotográfico e institucional em branco; prática em preto; atalhos e curso em creme; contato em painel preto dentro do creme; rodapé preto**.

## 6. Ordem final da página

A ordem visual é diferente da ordem de construção dos componentes. Isso permite manter a numeração do template sem obrigar o site a seguir a sequência visual antiga do exemplo de esquadrias.

| Ordem | Região / ID | Posição e função | Condição |
|---|---|---|---|
| 1 | Hero / `#inicio` | Foto, header flutuante, apresentação do curso e contato. | Ativo. |
| 2 | Sobre / `#sobre` | Texto à esquerda e fotografia à direita, como na referência. | Ativo com descrição factual breve. |
| 3 | Inglês na prática / `#como-funciona` | Fundo preto e três cards fotográficos dos temas confirmáveis. | Ativo; detalhamento sujeito a revisão. |
| 4 | Atalhos / `#atendimento` | Fundo creme, cards de conhecer o curso, entender as aulas e ver o perfil. | Ativo; destinos reais. |
| 5 | Curso / `#cursos` | Conteúdo editorial em duas colunas, sobre creme. | Uma apresentação geral ou ofertas realmente confirmadas. |
| 6 | Processo de entrada / `#primeiros-passos` | Passos reais, sem calendário genérico. | Desligado até confirmação. |
| 7 | Depoimentos / `#depoimentos` | Composição editorial de relato autorizado. | Desligado até existir material. |
| 8 | FAQ / `#duvidas` | Respostas objetivas em disclosures. | Desligado até aprovação. |
| 9 | Contato / `#contato` | Painel preto recuado no creme, com CTA e fotografia ou colagem autorizada. | Ativo. |
| 10 | Rodapé | Marca, navegação e WhatsApp; base legal real. | Um único rodapé; variante detalhada por padrão. |

Não criar espaço vazio para uma seção desligada. Não deixar âncora ou link de navegação para um módulo inexistente. A faixa de confiança isolada fica desligada por padrão, pois os temas já aparecem na faixa fotográfica de prática. Não repetir os mesmos benefícios em dois blocos consecutivos.

## 7. Especificações dos componentes

### Header flutuante

No desktop, cápsula branca de 72px de altura, no topo do shell do hero. O shell começa 16px abaixo do topo da página; a fotografia começa 16px abaixo do topo do shell. Assim, o header atravessa visualmente a borda superior da imagem, sem margem negativa para corrigir defeito.

Logo à esquerda, navegação ao centro e CTA à direita. Usar a assinatura compacta colorida em SVG a 200px, com 12px de proteção externa. Nome e símbolo permanecem juntos no mestre, sem redigitação, recorte, filtro ou assento circular. A versão com descritor exige 360px e não cabe neste header compacto.

Navegação de até cinco links: Início, Sobre, Como funciona, O curso e Contato, ajustada aos módulos reais. CTA: “Conhecer o curso”, no WhatsApp. Sem login.

No desktop, o link da seção em leitura recebe `aria-current="location"` e um indicador laranja. O indicador muda de posição e largura com translate/scale em 220ms; a atualização do estado continua disponível sem transição em movimento reduzido. As setas de ação se deslocam 3px no hover ou foco em 160ms, sem mover o botão; esse deslocamento é desligado em movimento reduzido.

Abaixo de 1024px, usar header em fluxo normal acima do hero e menu expansível. No celular, altura mínima de 64px, assinatura compacta a 160px com 10px de proteção externa e controles de pelo menos 44px. Não fixar o header sobre a imagem no mobile.

Não tornar o header sticky por padrão. A sobreposição desktop é composição deliberada; não autoriza usar transforms ou overflow global para disfarçar problemas de largura.

### Hero

Fotografia contida, raio de 24px e altura fluida no desktop: 664px até 1440px de viewport, crescendo para 724px em 1728px e 764px em 1920px, com raiz padrão de 16px. Expressão canônica: `clamp(41.5rem, calc(20.833333vw + 22.75rem), 47.75rem)`. O shell pode ser mais largo que o conteúdo interno; alinhar o texto ao eixo de 1200px usado nas demais dobras.

Título no lado esquerdo, largura máxima de 520px. Proposta editorial: “Inglês para usar no dia a dia.” A frase pública do perfil também pode ser usada se aprovada, sem transformá-la em promessa de prazo ou resultado.

Descrição curta em fonte de leitura e um único CTA laranja com texto preto por banner. Eyebrow informativo e pequeno. O assunto principal da foto fica à direita, com espaço calmo atrás da copy. Dois banners definidos em `site.hero.banners`; rotação automática a cada 10 segundos, indicadores clicáveis, teclado e gesto lateral.

Overlay único, horizontal no desktop, mais escuro no lado esquerdo. O JSON define os pontos iniciais; ajustar pela foto real. Sobreposições fotográficas são a única aplicação de gradiente prevista.

Mobile: altura por conteúdo, ponto inicial mínimo de 620px, foto de 460px com máscara vertical que chega a transparente antes da borda inferior. Overlay vertical e texto abaixo do assunto. Um CTA com largura ajustada ao texto e indicadores ao lado; em 320px, os indicadores descem para a base. Não usar `100vh` rígido nem cortar CTA quando o texto aumenta. O recorte é configurado por banner: primeiro em 85% (78% abaixo de 360px), segundo em 35% no eixo horizontal. A seleção de resolução considera os 820px de largura da foto necessários para o recorte com `object-fit: cover`.

### Sobre

Texto à esquerda e imagem à direita, em colunas `0.95fr 1.05fr`, gap de 64px no desktop. Fotografia quadrada, raio de 12px, borda branca de 6px e sombra pequena. O bloco é branco.

No mobile, manter texto antes da imagem, sem comprimir as duas colunas. Usar a descrição confirmada da escola. Não inventar história, fundador, formação, sede ou equipe. Retrato real só com vínculo e autorização confirmados.

### Cards fotográficos de prática

Faixa preta de largura total; conteúdo no container. Eyebrow em laranja claro e título claro, alinhados à esquerda. Três cards no desktop, dois no tablet e um no mobile.

Temas propostos a partir do posicionamento público: Prática do idioma; Ensino personalizado; Comunicação oral. Os textos operacionais são aprovados separadamente. Não criar um item de certificação ou fluência garantida.

Cards com fotografia 4:5, raio de 12px, overlay na base, título visível e descrição curta quando necessária. Não esconder texto no hover. Não usar sombra externa no fundo preto. Ícone simples é opcional e deve ter função, sem emoji.

Se não existirem três imagens autorizadas, manter os temas em texto ou usar menos imagens. Não repetir uma pessoa em diferentes recortes para fabricar uma galeria de alunos.

### Atalhos de contato

Superfície creme, título à esquerda e até três cards. O destaque laranja corresponde ao contato para conhecer o curso; os demais ficam brancos. Cada card contém título, explicação breve e link real, com alinhamento de ações no desktop.

Destinos iniciais: WhatsApp; `#como-funciona`; Instagram. Nada de portal, mensalidade ou rematrícula. Área interna de 24px, raio de 12px e sombra discreta. O card laranja usa texto preto, inclusive no botão ou link interno.

Se dois cards executarem a mesma ação sem informar algo distinto, reduzir a quantidade. Não tornar toda a superfície clicável quando já contém um botão ou link que produziria interação aninhada.

### Apresentação editorial do curso

Superfície creme e duas colunas. Título no topo; imagens à esquerda e descrição à direita. Com três imagens autorizadas, usar uma grande acima de duas pequenas; com uma imagem, usar apenas essa imagem. Recorte inicial 3:2, preservando o assunto em cada tamanho.

A primeira versão pode apresentar o curso de inglês de forma geral, sem inventar segmentos. Só criar seletor quando existirem pelo menos duas ofertas confirmadas. Usar tabs com comportamento de teclado completo, ou links/lista simples quando não houver necessidade de painel interativo.

Não copiar a trilha de níveis da referência como Kids, Teens e Adults. Não exibir uma fatia de próximo slide cortada nem adicionar navegação de carrossel sem conteúdo. O curso atual deve estar completo e legível.

### Painel de contato final

Painel preto com raio de 24px dentro do container creme. Altura inicial de 400px desktop, definida por conteúdo no mobile. Título curto e CTA de WhatsApp sempre em área calma.

A extensão 2.1.1 aprovada usa a assinatura pública “Aprenda inglês. Fale inglês. Viva o inglês.” à esquerda e o contato à direita, em duas colunas iguais no desktop, com padding de 48px; no mobile, assinatura e contato ficam em uma coluna. O gesto tipográfico usa as mesmas fontes e cores do site, sem acrescentar promessa de resultado. A assinatura estática permanece legível e reserva o espaço antes do carregamento do Player; o CTA real fica fora da camada animada.

A composição Remotion dura cinco segundos, a 60fps (300 quadros), termina no quadro 299 e executa automaticamente uma vez quando pelo menos 40% da área está visível. Não tem áudio nem loop. Não oferece controles de pausa, continuação ou repetição. O Player inicia silenciado, sem depender de clique ou teclado; as três traduções se sobrepõem até 4,65s e então mantêm a arte final. Pausa fora de vista ou com o documento oculto e não reinicia automaticamente depois de concluir. No mobile, o deslocamento é um quarto do desktop. Com movimento reduzido, sem JavaScript ou quando o carregamento falha, conservar a arte final estática e o contato.

O arco fotográfico da referência pode ser adaptado com pelo menos cinco fotos distintas autorizadas. Limitar rotações a aproximadamente 10 graus, sem cortar rostos nem colocar título sobre bordas movimentadas. A colagem é decorativa, não prova de quantidade de alunos.

Na implementação 2.1.1, o fallback sem fotos é a assinatura tipográfica aprovada junto ao contato breve. A alternativa de imagem ou colagem permanece condicionada a material e composição aprovados; não substituir a assinatura silenciosamente. Não fabricar depoimentos, desenhar estrelas ou repetir fotografias. Não usar “futuro do seu filho” enquanto o público infantil estiver sem confirmação.

### Rodapé

Um rodapé preto com três grupos no desktop: marca; navegação; contato. Colunas `minmax(404px, 1.2fr) 0.7fr 1fr`, reservando largura para a assinatura principal e sua proteção. No tablet, marca em linha inteira e os demais grupos em duas colunas; celular em uma coluna. Padding superior de 64px desktop e 48px mobile. Texto claro e texto secundário cinza; links em tamanho legível.

Não copiar newsletter, pagamento, portal, endereço ou e-mail da referência. Instagram e WhatsApp são os canais conhecidos. Política e localização entram somente quando houver conteúdo confirmado. A logo usa a horizontal invertida do kit a 360px, com 22px de proteção externa. Abaixo de 480px de viewport, usar compacta invertida a 240px com 16px de proteção. No tablet, o grupo da marca ocupa ambas as colunas.

### Botões, campos e estados

Botões em cápsula, altura de 48px, padding horizontal de 24px e texto de 16px. Primário laranja com preto; secundário branco com preto. Sem sombra, salto ou brilho. Hover do primário usa `#DE4A06`, preservando texto preto.

Foco de 2px e offset de 3px, com cor adequada ao fundo. Estado de carregamento só existe em operação assíncrona real. Desabilitado deve ser semanticamente verdadeiro, sem parecer uma ação disponível.

Formulário está desligado na versão inicial. Se aprovado, usar campos de pelo menos 48px de altura, raio de 8px, borda `#6B7174`, labels visíveis, erros associados e estados reais. Não misturar o contraste discreto de uma divisória com o contraste necessário para identificar um campo.

## 8. Responsividade, acesso e movimento

Desktop começa em 1024px; tablet em 768px; mobile abaixo de 768px. Verificar 320, 360, 390, 430, 768, 1024, 1440 e 1920px.

No tablet, Sobre e curso podem continuar em duas colunas enquanto texto e fotos mantiverem espaço suficiente; abaixo de 768px, empilhar conforme a ordem de cada componente. Se o conteúdo exigir empilhamento antes disso, ajustar o breakpoint do componente e registrar a decisão, sem alterar os três ranges gerais. Cards de prática e atalhos seguem 3/2/1 colunas; no tablet com três itens, o último ocupa uma célula, sem item fictício para completar a linha.

O menu mobile é navegação expansível em fluxo normal. A implementação usa `<details>/<summary>` e seu estado nativo `open` para a semântica de expansão, com `aria-controls`; não duplicar `aria-expanded` literal que possa ficar incorreto sem JavaScript. A melhoria no cliente fecha por Escape e devolve o foco ao acionador. Não usar focus trap nesse padrão não modal. Se a implementação escolher um padrão modal diferente, precisa alterar e validar o contrato de interação.

Conteúdo aparece sem animação de entrada. Além da assinatura única no painel final, o movimento fica restrito a transições de cor e borda de 160–220ms, indicador desktop de 220ms, feedback de setas de 3px em 160ms e eventual zoom de foto até 1,02, contido no recorte. Desligar movimento não essencial com `prefers-reduced-motion`; manter a assinatura final sem baixar o Player.

Além da assinatura única, o usuário aprovou dois banners com rotação a cada 10 segundos e navegação manual. Não criar outros carrosséis automáticos, marquee, parallax, cursor próprio, áudio ou vídeo automático. A referência visual não comprova o comportamento dessas interações; não inferi-las a partir de botões ou fotografias estáticas.

Carregar o Player dinamicamente somente quando a assinatura se aproximar da viewport (margem de 200px); iniciar a reprodução apenas com a visibilidade de 40% atendida. Preservar conteúdo institucional no servidor, fontes locais existentes e fallback estático. O Studio é uma entrada separada para revisão, não parte do carregamento inicial do site.

Validar hierarquia, teclado, foco, textos alternativos, zoom de 200%, reflow de 320px e labels. Fotografias precisam de contraste medido por recorte. O alvo de toque de 44px é uma escolha do projeto, não uma alegação sobre o mínimo universal de AA.

## 9. Tokens e uso pelo agente de desenvolvimento

`design.json` usa três camadas:

1. **Primitive:** cores, famílias, espaçamento, raios, sombras e duração.
2. **Semantic:** papel da cor, fonte ou espaço na interface.
3. **Component:** aplicação em header, hero, botão, card, campo e painel.

O formato é um contrato local com `$type` e `$value`; não há alegação de validação em um padrão externo de tokens. Um alias como `{tokens.semantic.color.accent}` precisa ser resolvido antes de virar CSS. Não publicar os marcadores de alias como valores CSS.

Mapeamento recomendado das variáveis do prompt:

| Variável do prompt | Valor deste contrato |
|---|---|
| `[[COR_ACENTO]]` | `#F65A0B` |
| `[[COR_ACENTO_TEXTO]]` | `#A83A08` para fundo claro; `#FFB077` para escuro |
| `[[COR_ESCURO]]` | `#101314` |
| `[[COR_CLARO]]` | Branco inicial `#FFFFFF`; superfícies seguintes em `#F3EFE8` |
| `[[FONTE]]` | Separar em `[[FONTE_TITULOS]]` e `[[FONTE_TEXTO]]` |
| `[[FONTE_TITULOS]]` | Bebas Neue 400 |
| `[[FONTE_TEXTO]]` | Source Sans 3, pesos 400/600/700 |
| `[[LOGO_PRINCIPAL]]` | `assets/Identidade visual Foxstage/logos/horizontal/foxstage-horizontal-color.svg`; compacta para header e áreas menores |
| `[[RODAPE_VERSAO]]` | `detalhado` |

A tradução para CSS pode usar tokens semânticos do projeto. Não é necessário instalar uma biblioteca visual para obter essa composição. Antes de recomendar ou instalar recursos adicionais, seguir a consulta ao acervo O Setup definida pelo usuário.

## 10. Integração com as etapas do prompt

| Etapa | O que construir ou verificar |
|---|---|
| 01 | Header e hero deste sistema. Faixa de confiança isolada permanece desligada por padrão. |
| 02 | Componente editorial de curso; posição final depois dos atalhos. |
| 03 | Faixa preta de prática com os temas confirmáveis; posição depois de Sobre. |
| 04 | Sobre em branco, texto à esquerda e foto à direita; posição depois do hero. |
| 05 | Atalhos, painel de contato com assinatura Remotion 2.1.1 e composição da página; um rodapé básico apenas se escolhido. |
| 09 | Rodapé detalhado padrão; substitui o básico. |
| 06 | Verificar depois de as seções e o rodapé escolhido estarem compostos; incluir autoplay sem interação, ausência de controles, pausa por visibilidade, quadro final, movimento reduzido, fallback e carregamento adiado. |
| 07 e 08 | Ajustes somente para diferenças demonstradas, respeitando os valores deste contrato. |
| 10 | Fotos coerentes com os recortes e regiões deste sistema. |
| 11 | Variantes da marca e favicon a partir do ativo real, sem redesenho. |
| 12 | Mockups com esta ordem, fontes, cores e geometria. |

Fatos confirmados e instruções explícitas do usuário prevalecem sobre qualquer proposta visual. Nos aspectos numéricos, `design.json` é a autoridade; na composição e no comportamento, usar este documento. Se aparecer conflito com o texto antigo do prompt, corrigir o documento antes de implementar uma mistura de sistemas.

## 11. Critérios contra conteúdo e layout genéricos

- A primeira dobra identifica um curso de inglês, a Foxstage e a ação de contato.
- O header em cápsula, o título condensado e a composição fotográfica permanecem reconhecíveis.
- Os blocos variam de função e estrutura: institucional, foto, atalhos, editorial e contato.
- O laranja aparece em ações e acentos; não como decoração indiscriminada.
- Não há emojis, frases vazias, números sem fonte, selos ou depoimentos inventados.
- O layout não copia crianças, calendário, pagamentos ou portal da escola de referência.
- O texto não anuncia modalidades, preços, níveis, certificado ou aula experimental ausentes do briefing confirmado.
- Não há foto da referência publicada como foto da Foxstage, nem captura de tela usada como interface.
- A versão mobile é reorganizada, sem miniaturização do desktop, imagens sem assunto ou texto escondido.
- Não há quantidade artificial de cards, galeria repetida, curso fictício ou módulo vazio.
- Raios e sombras têm função específica; nem tudo é cápsula e nem todo bloco é um card.
- Fontes são carregadas em pesos reais, sem compressão artificial ou substituição silenciosa.

## 12. Evidências e pendências

**Registro histórico da especificação 2.0.0:** os parágrafos seguintes descrevem o estado anterior à execução do website. O estado implementado está registrado na nota de acabamento ao final desta seção.

Esta entrega analisa imagens e especifica um sistema. Não foi implementado um website, renderizado um mockup próprio ou realizado teste de navegador da futura página.

Foi conferida a sintaxe do JSON, a existência das referências preservadas, a resolução dos aliases e o contraste dos pares sólidos listados. A verificação não certifica contraste sobre fotos ou conformidade integral de acessibilidade.

Permanecem pendentes: material fotográfico real autorizado, catálogo, público e demais informações operacionais registradas no prompt. A logo, as variantes, a paleta e a tipografia agora seguem o manual B aprovado.

A consulta ao servidor `setup-agent` foi novamente tentada e encontrou exigência de autenticação OAuth. O catálogo não foi consultado com sucesso; não foi criada skill, plugin ou servidor MCP.

**Nota de implementação — 2.0.1, 10 de outubro de 2026:** a prévia local foi implementada preservando a direção, os arquivos canônicos e a estrutura deste contrato; não houve substituição por um novo sistema visual. `design.json` continua sendo a fonte canônica, traduzida em `src/app/tokens.css` pelo gerador de tokens. Dois ajustes de implementação já registrados no JSON acomodam o conteúdo real: `layout.hero.copyPaddingTopDesktop` passou de 160px para 64px para respeitar a altura desktop de 640px, e `layout.hero.mobilePhotoHeight` ficou em 360px para preservar os rostos acima do texto no recorte móvel. A logo original foi mantida; o hero fictício gerado por IA e as cinco imagens de banco são identificados como ilustrativos e têm proveniência em `docs/assets-manifest.json`. A revisão visual independente retornou `ship`, sem correções materiais, sobre capturas desktop e mobile. Mapeamento, evidências e limites estão em `docs/IMPLEMENTATION.md` e `docs/VERIFICATION.md`; domínio, dados operacionais e validações de lançamento continuam pendentes. A paleta e as fontes permanecem proposta de marca para este website, não manual oficial.

**Extensão de movimento — 2.1.0, 10 de outubro de 2026 (histórico):** assinatura Remotion no painel final, indicador de seção desktop e feedback de setas aprovados após backup validado. O conteúdo factual, a logo, as fontes, a paleta, as imagens e a ordem da página foram preservados. A revisão em `docs/motion-visual-review.md` retornou `ship` sem achados materiais nesse estado, cuja QA permanece descrita em `docs/VERIFICATION.md`. O relatório `docs/motion-qa.json` acompanha a execução mais recente e não é um snapshot imutável de 2.1.0. `behavior.motion.signature` e `layout.closingPanel` em `design.json` registram o contrato atual. O resultado histórico não representa publicação ou nova comprovação de Core Web Vitals ou conformidade integral de acessibilidade. Os plugins Remotion e Impeccable já instalados foram reaproveitados; a consulta ao acervo O Setup continuou inconclusiva por OAuth, sem presumir catálogo vazio.

**Correção de reprodução — 2.1.1, 10 de outubro de 2026:** conforme a revisão do usuário, retirar todos os controles visíveis, iniciar automaticamente sem ativação por clique ou teclado, usar composição a 60fps com traduções sobrepostas e congelar no quadro 299 após uma execução. O Player começa silenciado para não aguardar a liberação de áudio do navegador. Movimento reduzido e os fallbacks conservam a assinatura estática.

A revisão inicial em `docs/motion-autoplay-review.md` apontou `fix` para a primeira linha mobile. O ajuste preserva o deslocamento proporcional de 7 até 8 e seu início sem recorte; a QA posterior e o probe mobile passaram. O parecer final encerrou somente essa correção #1 com `ship` e Disposer `pass`, sem recertificar a página inteira ou transferir o `ship` histórico para 2.1.1.


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

O hero mantém menu em cápsula sobreposto no desktop, degradê, título alinhado à esquerda e centralizado verticalmente e um CTA. A seção seguinte é branca, com respiro de 48px desktop e 40px tablet/mobile; o preto não encosta na base do banner. A extensão em creme dos cursos permanece unida ao hero. A ordem completa por página está em `design.json > layout.institutional.surfaceSequences` e em [Implementação institucional](docs/EVOLUCAO-INSTITUCIONAL-IMPLEMENTACAO.md). O laranja oficial fica reservado ao destaque do English Day.

A home conserva sua composição e seus movimentos. A página English Day usa a foto real no hero e a composição foto/celular/vídeo numa seção laranja posterior, com copy estática e movimento somente nas mídias. As demais páginas usam fotografias existentes e mockups identificados, sem dados comerciais ou credenciais fictícios.

Os prompts completos de cada página em `docs/evolucao/prompts/` continuam como base de conteúdo, junto a este contrato. Localização confirmada: Rio de Janeiro/RJ, atendimento online em todo o Brasil; English Days presenciais na cidade do Rio; professor Felipe Pontes. As cinco novas páginas são prévias privadas e dependem de aprovação editorial para publicação pública. Não houve implantação em VPS.


## Estrutura própria por página — 3.1.0

Revisão solicitada em 12 de outubro de 2026: a home é referência da marca, não um molde de seções. Esta nota substitui a sequência fixa das internas descrita na 3.0.0. Heroes, home, fontes, cores oficiais e trajetórias de mídia permanecem.

Grupo: cena de conversa, exemplos cotidianos e consulta sobre turma. Individual: objetivo escolhido pelo visitante com mensagem contextual no WhatsApp, seguido de uma explicação breve do formato com fotografia. A Foxstage: posicionamento institucional, identidade oficial, professor confirmado e comunidade real. English Day: fatos essenciais, registro do cinema com mídias centrais e participação. Contato: uma seção de destinos e canais oficiais.

Não repetir em todas as internas o bloco de método, a comparação completa, o destaque laranja de English Day e a assinatura final da home. A quantidade e as cores das seções seguem o conteúdo da página. Detalhes em [Revisão de estrutura e copy](docs/REVISAO-ESTRUTURA-E-COPY.md). Valores e funções atualizados em `design.json`; conteúdo das aulas em `src/content/evolution/courses.ts`. As páginas continuam como prévias privadas para revisão editorial.


## English Day com vídeo em destaque — 3.1.1

Pedido de 12 de outubro de 2026: na página `/english-day`, a fotografia do cinema fica apenas no hero. A seção laranja usa copy estática à esquerda e vídeo vertical à direita, inspirado na apresentação de um Reels. Remover foto duplicada e mockup de celular desta seção. Não acrescentar contadores, comentários, curtidas ou botões sociais fictícios. Marca oficial e link real do Instagram identificam a origem.

O vídeo mantém proporção464:816, controles nativos, autoplay sem som quando35% dele está visível, pausa fora da tela ou com aba oculta, respeito à pausa manual e ausência de loop. Movimento reduzido impede autoplay; reprodução manual e poster permanecem. A home conserva sua composição foto/celular e coreografia Remotion. O comportamento de playback é compartilhado em `src/hooks/useViewportVideo.ts`. Teste específico em `tests/english-day-reel.browser.mjs`; evidência em `docs/english-day-reel-qa.json`.


## Liberação das páginas institucionais — 13 de outubro de 2026

O usuário autorizou disponibilizar a versão completa na Vercel para apresentação ao cliente. As duas páginas de cursos, A Foxstage, English Day e Contato estão publicadas nos registros de conteúdo e devem aparecer no menu em produção. Esta autorização substitui as restrições históricas de prévia privada dessas páginas. Layout, copy e sistema visual permanecem como aprovados. Consulte [Publicação na Vercel](docs/PUBLICACAO-VERCEL.md) para causa, configuração e validação.


## Avisos de mídia e submenu — 3.1.2

Pedido explícito de 17 de outubro de 2026: retirar da interface e do preview social os avisos de fotografia ilustrativa, imagem gerada por IA e equivalentes. Descrições alternativas permanecem objetivas sobre o conteúdo das imagens; não atribuir fotos de composição a alunos ou professores reais. A proveniência fica no manifesto interno de assets. Esta decisão substitui instruções históricas que exigiam avisos públicos.

O submenu desktop de Cursos usa links com largura completa, área mínima de 44px, cantos pequenos e transição apenas de cor e fundo na duração rápida existente. As regras são específicas para o submenu, evitando que o estilo geral inline-flex do menu reduza o destaque à largura do texto. Clique de ponteiro não deixa anel de foco; teclado, Escape e navegação sem JavaScript permanecem. A imagem social sem aviso usa a URL versionada `/opengraph-image/hero-20261017-v2`. O teste `tests/menu-media.browser.mjs` cobre a regressão.
