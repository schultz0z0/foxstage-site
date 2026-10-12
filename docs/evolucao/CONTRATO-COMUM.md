# Contrato comum dos prompts de evolução

Planejamento 1.0.0, 12 de outubro de 2026. Vinculado à baseline 2.7.3, manual B v1.0 e decisões humanas mais recentes.

## 1. Autoridade

Ordem: instruções e fatos confirmados pelo usuário; manual da marca vigente; `design.json` nos valores; `design.md` na composição/comportamento; prompt base e notas finais; implementação atual; proposta de evolução.

Ler `foxstage-prompt-completo-nextjs.md`, `design.md`, `design.json`, `docs/IMPLEMENTATION.md` e o manual em `assets/Identidade visual Foxstage/` antes de executar. Trechos históricos do prompt ainda citam dados então não confirmados e a identidade anterior. A confirmação posterior de aulas online ao vivo, direção B e English Day prevalece. `assets/logo.png` é histórico; não é a logo vigente.

Novos valores devem ampliar o `design.json` existente com justificativa e escopo. `npm run tokens` gera `src/app/tokens.css`; não editar esse derivado à mão. Este planejamento não altera os tokens ou a versão visual do site.

## 2. Identidade e marca

| Papel | Valor / regra vigente |
|---|---|
| Laranja principal | `#F65A0B` |
| Preto | `#101314` |
| Creme | `#F3EFE8`, cor do manual, não amostrada de mockup |
| Creme claro | `#FFF8EC` |
| Branco | `#FFFFFF` |
| Laranja para leitura em claro | `#A83A08` |
| Laranja claro em escuro | `#FFB077` |
| Hover do botão principal | Token funcional `#DE4A06`, texto preto |
| Títulos | Bebas Neue 400, frases curtas; sem condensação artificial |
| Leitura e controles | Source Sans 3 400/600/700, fontes locais |
| Logo | Mestre SVG em curvas; nunca redigitar ou reconstruir |

Header: compacta, mínimo de 160px. Horizontal com descritor: mínimo de 360px. Símbolo: 32px; microfavicon próprio: 16px. Área de proteção mínima: um quarto da altura visível do símbolo ao redor de toda a arte. Usar variantes prontas colorida/invertida/monocromática conforme o suporte. Proibido deformar, girar, espelhar, cortar, modificar contorno, acrescentar mascote ou aplicar efeito à logo.

Preto sobre laranja nos controles; evitar branco/creme claro em texto pequeno sobre laranja. Eyebrow escuro sobre creme/branco e acento claro sobre preto. Conferir contraste nas fotos e em todos os estados; tabelas do manual não certificam a interface completa.

## 3. Composição e escala

Conteúdo até 1200px; header até 1160px; hero da home até 1840px. Breakpoints: mobile 0–767, tablet 768–1023, desktop a partir de 1024px. Espaço vertical padrão de seções: 80/64/48px; grids com gap 24px quando não houver medida específica do componente.

Parágrafos: 18px desktop, 16px mobile, entrelinha 1,6, medida máxima 62ch. Navegação: 14px, peso 600. Controles: 16px, peso 600. Títulos de seção: `clamp(2rem, 4.2vw, 4rem)`, entrelinha 1,04. Títulos editoriais curtos, normalmente até dez palavras.

Nas páginas internas, começar com abertura editorial proporcional ao conteúdo, usando a escala de seção. O H1 não deve herdar automaticamente o tamanho ou altura do hero da home. Header interno em fluxo normal, com a mesma marca, cores, proporções e linguagem. Essa variante deve ser registrada como extensão na futura implementação; não deslocar o header da home.

Botões com largura pelo conteúdo e alvos confortáveis; não ocupar toda a coluna por hábito. Raios por função: hero/painel 24px, cards 12px, controles em cápsula conforme o sistema. Usar fotos e hierarquia editorial; não transformar cada parágrafo em card.

## 4. Home e movimento que devem permanecer

- Hero de dois banners, troca automática a cada 10 segundos e navegação manual; um CTA por banner; regras atuais de pausa e movimento reduzido do carrossel preservadas.
- Menu em cápsula no desktop, eixo da copy e degradê mobile aprovados. A variante de navegação por rotas muda destinos, não o desenho do hero.
- Faixa de objetivos em creme do manual, fora do carrossel.
- English Day laranja, foto integral 4:3 e vídeo real em celular; Remotion 60fps, 360 quadros, execução única e quadro final 359.
- Texto e CTA do English Day ficam estáticos. Foto e celular continuam animados com hover e foco; manter `overflowVisible` no Player e overflow visível no SVG para evitar o recorte inicial.
- Vídeo independente da linha do tempo, autoplay sem som quando visível, controles nativos, pausa manual respeitada, sem loop. Movimento reduzido desativa entrada e autoplay.
- Assinatura Remotion do painel final e seus fallbacks atuais preservados.
- Páginas internas e textos não recebem novas entradas, parallax, marquees ou movimentos contínuos por padrão. Mídias adicionais exigem função clara e revisão específica.

## 5. Conteúdo, voz e credibilidade

Voz simples, direta e próxima. Sem emojis, slogans de preenchimento, urgência inventada, números decorativos ou promessas de fluência. Títulos explicam o assunto; parágrafos respondem à pergunta do visitante. CTA deve indicar a ação real.

Fatos confirmados: aulas online ao vivo em grupo; opção individual personalizada; conversação e situações reais do cotidiano; espaço para praticar sem medo de errar; English Day presencial entre alunos a cada quatro meses, organizado e custeado pela Foxstage, com inglês durante o dia; registro fornecido de uma edição no cinema.

Não estender personalização individual para todos os grupos, presumir professores nativos, definir tamanho das turmas, inventar níveis/CEFR, carga horária, materiais, certificados, gratuidade, garantias ou prazos. Não presumir curso infantil, Business, exames, idiomas adicionais, unidades físicas ou um portal.

`[[CAMPO]]` representa dado pendente. Na prévia local, manter a pendência na ficha editorial separada da interface pública. Na publicação, preencher com aprovação ou omitir o módulo. Não publicar um marcador ou substituir por texto genérico para preencher a composição.

## 6. Mídias e prompts visuais

Preferir registros reais autorizados. Guardar origem, autorização de uso, alt, crédito e dimensões. Foto gerada ou de banco permanece ilustrativa; nunca apresentar pessoas geradas como professores, alunos, fundador ou depoimento.

Os briefs da etapa 10 são alternativas ilustrativas, não ordens para substituir o acervo real. O English Day usa os arquivos fornecidos e não recebe substituições artificiais. Animação não pode recortar participantes nem impedir controles. Vídeo com som depende de ação do visitante.

## 7. Requisitos técnicos

Next.js App Router e TypeScript existentes. Baseline consultada: Next.js 16.4.0, React 19.3.0, Remotion 4.0.534. Antes de implementar, verificar `package.json`, lockfile e os guias pertinentes em `node_modules/next/dist/docs/`; versões futuras podem mudar APIs. Não atualizar dependências como efeito colateral.

Conteúdo institucional renderizado no servidor; ilhas cliente restritas a navegação e interações necessárias. Na documentação instalada, `params` de rotas dinâmicas é assíncrono; aguardar sua resolução. Metadados e canonical próprios por página. Não herdar canonical `/` nas internas.

O helper `getPublicationConfig` governa domínio e indexação. Preview permanece sem indexação. Sitemap inclui somente conteúdo publicado com origem válida; páginas sem dados não recebem metadados ou dados estruturados fictícios. Artigos usam autor e datas reais. JSON-LD segue dados verificáveis e serialização segura existente.

Manter conteúdo inicial e ações essenciais utilizáveis sem JavaScript. Formulário, se implementado, tem comportamento próprio no documento de persistência e alternativa de contato real. Não carregar banco/segredo, Player ou biblioteca desnecessária no bundle da página editorial.

## 8. Acessibilidade e validação

Um H1 por página, hierarquia coerente, um landmark principal com `id="conteudo"`, skip link funcional, foco visível de teclado, leitura e reflow a 320px, zoom de 200%. Navegação expandida por disclosure, operável por teclado, com Escape e retorno de foco; sem foco preso como modal. Não remover outline de teclado para resolver efeito de clique.

Formulários usam labels, mensagens associadas ao campo e estado de envio real. Vídeos mantêm descrição e controles; avaliar legendas e transcrição com conteúdo fiel. O vídeo atual contém legendas gravadas, mas não possui faixa selecionável/transcrição integral verificada: não alegar conformidade integral por esse fato.

## 9. Recursos e execução

Reutilizar código, mídias, Remotion e tokens atuais. Não instalar plugin, MCP, skill, driver, ORM, analytics ou CMS por preferência. Antes de recomendar recurso adicional, consultar `setup-agent` conforme AGENTS.md. Nesta sessão, suas operações não estão expostas nos tools; o histórico registra OAuth pendente. O catálogo não foi consultado com sucesso e não é presumido vazio.

Nenhuma skill, plugin ou MCP novo é entregue aqui. Prompts são documentos de projeto. Não há autorização nesta entrega para criar banco, executar migrações, captar contatos, enviar mensagens a terceiros ou publicar. Uma solicitação futura de implementação define a execução dentro do escopo escolhido.


## Ajustes aprovados durante a execução — 3.0.0

A implementação posterior usa o hero fotográfico da home em todas as páginas internas, substituindo a abertura editorial menor. A primeira seção é branca e mantém respiro depois do banner; preto é usado no método, creme nas informações e laranja no destaque do English Day. Consulte [a composição vigente e os estados de publicação](../EVOLUCAO-INSTITUCIONAL-IMPLEMENTACAO.md). As instruções posteriores do usuário e o contrato canônico 3.0.0 prevalecem sobre as regras visuais anteriores deste pacote.


## Estruturas próprias — 3.1.0

A sequência universal de superfícies da revisão anterior foi rejeitada por gerar páginas redundantes. Cada página usa sua função para decidir conteúdo, proporção e quantidade de seções. Heroes e marca permanecem; copiar a composição completa da home não é requisito. Consulte [a direção vigente](../REVISAO-ESTRUTURA-E-COPY.md) e as notas finais dos cinco prompts implementados.
