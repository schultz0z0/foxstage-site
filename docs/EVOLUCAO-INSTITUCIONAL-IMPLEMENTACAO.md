# Evolução institucional — implementação 3.0.0

Registro de 12 de outubro de 2026. O planejamento em `docs/evolucao/` continua como referência de conteúdo e função de cada página. Os ajustes visuais solicitados posteriormente pelo usuário prevalecem sobre os pequenos heroes editoriais previstos naquele planejamento.

## Composição vigente

Todas as páginas internas reutilizam o hero fotográfico da home: menu branco em cápsula sobreposto no desktop, título condensado alinhado à esquerda e centralizado verticalmente, degradê sobre a imagem e um CTA. No celular, o menu precede o banner. A home conserva suas duas imagens, rotação de dez segundos e navegação manual.

O banner não encosta numa faixa preta. A primeira seção tem fundo branco e começa com o mesmo respiro da home: 48px no desktop e 40px no tablet/celular. Nas páginas dos cursos, a faixa de informações em creme permanece unida ao banner, como a extensão da home. O espaçamento até a apresentação branca começa depois dessa faixa.

| Página | Ordem das superfícies depois do hero |
|---|---|
| Inglês em grupo / individual | Apresentação branca, método preto, comparação em creme, English Day laranja, dúvidas em creme, painel de contato sobre creme, rodapé preto |
| A Foxstage | Apresentação branca do professor, método preto, comparação em creme, English Day laranja, painel de contato sobre creme, rodapé preto |
| English Day | Introdução branca, informações em preto, dúvidas em creme, composição animada laranja, painel de contato sobre creme, rodapé preto |
| Contato | Introdução branca, conversa e mockup em preto, Instagram em creme, rodapé preto |

O laranja destaca a experiência presencial. Não alternar cores apenas para preencher seções. Reutilizar os valores do manual B: laranja `#F65A0B`, preto `#101314`, creme `#F3EFE8`, creme claro `#FFF8EC` e branco `#FFFFFF`. A copy sobre laranja usa preto. Texto pequeno laranja sobre branco usa o tom de contraste previsto no sistema.

## Conteúdo e imagens

Os prompts completos utilizados são os de fundação multipágina, home, inglês em grupo, inglês individual, A Foxstage, English Day e contato em `docs/evolucao/prompts/`, junto ao prompt completo da raiz. Seus requisitos de conteúdo permanecem distintos; não replicar todas as seções da home em cada rota.

Fatos confirmados pelo usuário: sede no Rio de Janeiro/RJ; aulas online ao vivo para todo o Brasil; opção em grupo e opção individual personalizada; foco em conversação e situações reais; Felipe Pontes como professor. Sem biografia, credenciais, endereço comercial, preços, duração ou horários inventados.

O English Day acontece presencialmente na cidade do Rio de Janeiro, a cada quatro meses, organizado e custeado pela escola, com comunicação em inglês durante o dia. Sua página usa a foto real do cinema como fundo do hero. Mais abaixo, foto completa e vídeo real formam a composição com celular. A copy fica estática; Remotion atua somente na foto e no celular, executa uma vez e não trava com hover. O vídeo começa sem som quando visível, respeita pausa manual e movimento reduzido, e não repete automaticamente. A limitação de legendas selecionáveis já registrada para o vídeo continua válida.

Os mockups de notebook e WhatsApp são identificados como ilustrativos. Não representam uma plataforma própria, uma aula real com um professor identificado ou uma conversa já enviada. Fotografias de banco e a imagem gerada do hero mantêm seus créditos. Arquivos mestres da marca e mídias originais foram preservados.

## Rotas e publicação

Rotas implementadas: `/cursos/ingles-em-grupo`, `/cursos/ingles-individual`, `/a-foxstage`, `/english-day` e `/contato`. Estão disponíveis para revisão privada local. Os registros editoriais ainda são rascunhos; não houve autorização de publicação pública ou implantação em VPS nesta etapa.

`SITE_PREVIEW_DRAFTS=true` permite revisão privada somente sem `SITE_URL`. Com uma origem pública configurada, rascunhos retornam HTTP 404 mesmo que a flag de prévia esteja presente. Navegação, metadados, acesso, robots e sitemap são resolvidos no servidor por requisição para evitar que um artefato compilado em prévia exponha rascunhos após mudar de ambiente. A guarda em `src/proxy.ts` acontece antes da renderização e encaminha destinos bloqueados ao 404 institucional, sem mudar a URL do navegador; isso garante uma página de erro legível mesmo sem JavaScript. As guardas na página e nos metadados permanecem. Para liberar uma página, seu registro precisa ter estado publicado e todas as revisões editoriais aprovadas.

SEO em português brasileiro: títulos e descrições próprios, canonicals por rota quando houver domínio definitivo, metadados sociais, breadcrumbs e dados estruturados com Rio de Janeiro e atendimento Brasil. Sem endereço, avaliações, ofertas ou datas de eventos fictícios. `/conteudos`, artigos, edições futuras e privacidade permanecem condicionados a conteúdo aprovado. Não foram adicionados formulário persistente, banco ou CMS.

## Verificação

Build de produção, lint e 15 testes de unidade passaram. O navegador verificou as seis páginas, navegação por teclado e sem JavaScript, destinos de WhatsApp, uma única região principal/cabeçalho/título H1 e larguras de 320 a 1920px. O mesmo artefato foi testado nos perfis privado e de origem pública: prévias acessíveis apenas no primeiro; rascunhos retornando 404 no segundo.

Evidências atuais: `docs/evolution-private-preview-qa.json`, `docs/evolution-public-qa.json` e `docs/evolution-motion-qa.json`. O atalho “Pular para o conteúdo” leva a um alvo focável depois do menu; `main#conteudo` permanece para o rodapé. O ensaio de movimento verifica copy estática, foto completa, movimento do celular sob ponteiro/foco, reprodução única e comportamento do vídeo. Essas verificações não constituem auditoria integral de acessibilidade, medição de conversão, desempenho de campo ou indexação real no Google.

Código desenvolvido na branch `evolucao-institucional`; a baseline em `main` foi preservada.
