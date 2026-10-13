# Publicação da versão institucional na Vercel

## Liberação de 13 de outubro de 2026

O usuário autorizou publicar a versão atual completa para apresentação ao cliente em `https://foxstage-site.vercel.app`, pela branch `main` do repositório `schultz0z0/foxstage-site`.

As páginas abaixo passam a ter estado `published` e revisão de copy aprovada nos respectivos registros de conteúdo:

- `/cursos/ingles-em-grupo`
- `/cursos/ingles-individual`
- `/a-foxstage`
- `/english-day`
- `/contato`

O menu desktop, o menu mobile e o rodapé usam esses registros. As páginas devem responder HTTP 200 em produção, mesmo sem `SITE_URL`. Conteúdos e Privacidade continuam sem implementação e não entram na navegação.

## Causa da diferença entre localhost e Vercel

O GitHub já tinha o desenvolvimento completo no commit `231fc8b`. As páginas estavam marcadas como rascunho e com `copyApproved: false`; a prévia local permitia acesso, enquanto o ambiente de produção ocultava os links e devolvia 404. A correção é a liberação dos registros aprovados, sem remover a proteção de futuros rascunhos.

## Deploy e indexação

O projeto da Vercel está integrado ao GitHub e reportou deploy concluído para a versão anterior. Esta correção deve ser entregue por um novo commit e push em `main`. Confirmar o novo deploy acessando as seis rotas, incluindo a home, e conferindo os links do menu.

A disponibilidade das páginas é independente da indexação. Sem `SITE_URL` HTTPS válida e `SITE_INDEXABLE=true`, a apresentação ao cliente continua com `noindex` e sem canonical público. Quando houver domínio definitivo autorizado, configurar essas variáveis na Vercel; o sitemap incluirá automaticamente todas as páginas publicadas. Não habilitar `SITE_PREVIEW_DRAFTS` em hospedagem pública.

## Regressão

`tests/evolution-content.test.mjs` verifica que todos os registros implementados estão publicados, acessíveis em produção e presentes no menu e na lista de URLs. O teste foi observado falhando antes da liberação e passando depois. `tests/evolution-navigation.browser.mjs` verifica o mesmo contrato em servidor de produção com e sem JavaScript, além de canonical e sitemap quando a indexação está configurada.

Esta nota substitui as restrições históricas de prévia privada para estas cinco páginas nos documentos de planejamento e implementação. Layout, copy, assets e animações permanecem como aprovados.

Validação local da liberação: build de produção e lint concluídos, 16 testes unitários passando. A QA de produção em `http://127.0.0.1:3005` confirmou HTTP 200 nas cinco páginas, menu completo, leitura sem JavaScript e canonical/sitemap corretos para a origem HTTPS de teste. Evidência em `evolution-public-qa.json`.
