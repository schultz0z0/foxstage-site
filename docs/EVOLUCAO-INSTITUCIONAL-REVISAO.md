# Revisão final da evolução institucional

Data: 12 de outubro de 2026. Revisão independente, somente leitura, da evolução em relação à baseline `feab66f7e3c2db926cc8b9c36b8df34fc198e6f1`.

Foram encontrados e corrigidos dois problemas:

- O 404 de rascunhos, em ambiente com origem pública, dependia de hidratação para exibir sua interface. A guarda anterior à renderização em `src/proxy.ts` agora usa o 404 institucional renderizado no servidor. As guardas de metadados e da página permanecem. As cinco rotas retornaram 404 com cabeçalho, main, H1 e rodapé, com e sem JavaScript, sem canonical de rascunho.
- O atalho “Pular para o conteúdo” focava o main antes do menu. O alvo `#conteudo-principal` agora fica depois do cabeçalho: no título das internas e da 404, e no container estável do carrossel na home. O Tab seguinte chega à ação do conteúdo. Verificado com e sem JavaScript.

O revisor confirmou as correções na prévia privada da porta 3001 e no ensaio de origem pública da porta 3004. Nenhum achado crítico ou importante permaneceu. A página de origem pública é apenas um perfil de teste; não houve implantação.

A revisão não incluiu artigos, privacidade, formulários persistentes ou conteúdo não confirmado, que continuam condicionais. Auditoria integral de acessibilidade, conversão, desempenho de campo e indexação real seguem fora das conclusões deste ensaio. A liberação editorial das páginas internas permanece pendente.

Evidências reproduzíveis: testes de unidade em `tests/evolution-*.test.mjs`, navegação em `tests/evolution-navigation.browser.mjs` e movimento em `tests/evolution-motion.browser.mjs`. Os scripts de navegador aceitam uma instalação disponível de Playwright através de `FOXSTAGE_PLAYWRIGHT_MODULE`; os caminhos locais de fallback não representam uma dependência instalada no projeto.

## Revisão das estruturas próprias — 3.1.0

Revisão independente posterior, em relação à versão `b6bdab5`. As cinco internas possuem funções e composições distintas, sem o pacote repetido de método, comparação e assinatura final. Nenhum achado crítico, importante ou menor foi confirmado. Foram verificados: escolha de objetivo por setas e Tab com/sem JavaScript, uma única resposta visível, contexto correto no WhatsApp, disclosures dos exemplos em grupo, oito larguras, respiro inicial, mínimos de logo e 404 público sem canonical. A aprovação vale para a entrega privada; publicação editorial permanece pendente. Trajetórias de mídia foram preservadas e testadas pelo ensaio de movimento do projeto.
