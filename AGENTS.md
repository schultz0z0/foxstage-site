@C:\Users\rapha\.codex\RTK.md

## Consulta obrigatória ao acervo O Setup

Antes de criar ou recomendar uma skill, plugin, servidor MCP, ferramenta, tutorial ou curso, consulte primeiro o servidor MCP `setup-agent` para verificar se já existe um recurso adequado no acervo O Setup.

Use `search_resources` para a busca inicial, `recommend_for_project` quando houver contexto de projeto, `list_by_kind` para inventariar uma categoria conhecida e `get_resource` para inspecionar o candidato escolhido antes de recomendar, instalar ou criar algo equivalente.

Só proponha criar uma solução do zero depois de consultar o acervo e concluir que nenhum recurso encontrado atende ao caso. Registre sucintamente o recurso reaproveitado ou a razão para criar um novo. Quando a autenticação estiver indisponível, registre a limitação sem presumir catálogo vazio.

## Contexto deste projeto

Leia `foxstage-prompt-completo-nextjs.md`, `design.md`, `design.json` e `docs/IMPLEMENTATION.md` antes de alterar a interface. O usuário aprovou a composição das referências; preserve esse contrato. `design.json` gera `src/app/tokens.css` por `npm run tokens`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
