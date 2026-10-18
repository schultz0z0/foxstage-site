# Publicação profissional da Foxstage

> **For agentic workers:** Use superpowers:executing-plans para executar as tarefas nesta sessão, sem delegação.

**Goal:** Completar privacidade, consentimento, indexação e recuperação de falhas sem alterar a composição aprovada.

**Architecture:** Configuração de medição validada no servidor e enviada ao cliente somente com IDs públicos. Consentimento separado por finalidade e carregamento básico bloqueado antes da escolha. Rotas legais, estados nativos do App Router e arquivos de descoberta compartilham a identidade atual.

**Tech Stack:** Next.js 16.4, React, TypeScript, CSS tokens existentes, node:test e Playwright já disponível no ambiente.

**Spec:** Solicitação do usuário de 17/10/2026; `design.md`, `design.json`, `docs/IMPLEMENTATION.md` e `foxstage-prompt-completo-nextjs.md`.

## Global Constraints

- Preservar home, navegação, mídia e movimento aprovados.
- Não publicar CNPJ fictício, resultados garantidos ou IDs de terceiros inventados.
- Nenhum pedido a provedores de medição sem consentimento para a finalidade correspondente.
- Nenhuma configuração privada no bundle; apenas IDs públicos explicitamente permitidos.
- Teste emulado não equivale a teste em Android/iPhone físico.
- O setup-agent não está exposto nesta sessão; catálogo não consultável. Reutilizar recursos locais existentes sem instalar ferramentas.

## Review Focus

- Consentimento ausente, inválido ou vencido deve bloquear terceiros.
- Revogação deve interromper tags carregadas, apagar cookies conhecidos e persistir a escolha.
- Navegação SPA deve medir somente caminhos públicos, sem parâmetros ou dados do WhatsApp.
- Falha no layout raiz deve oferecer saída utilizável sem depender de componentes do servidor.
- Prévia sem domínio público deve continuar sem indexação e sem URLs locais em llms.txt.

### Task 1: Consentimento e medição

**Files:** `src/lib/consent.ts`, `src/lib/measurement.ts`, `src/components/privacy/*`, `src/app/layout.tsx`, `src/components/layout/Footer.tsx`, `compose.yaml`, `.env.example`.

**Interfaces:** `parseConsent(string): Consent | null`; `getMeasurementConfig(env): MeasurementConfig`; provider com preferências acessíveis pelo rodapé.

- [ ] Testar validade, expiração, IDs permitidos e bloqueio por categoria com node:test.
- [ ] Implementar diálogo nativo com aceitar, recusar e salvar seleção; foco e Escape; fallback sem JavaScript.
- [ ] Implementar GA4, Ads e Pixel opcionais, sem GTM paralelo nem conversão de matrícula fictícia.
- [ ] Verificar rede antes/depois da escolha e após revogação no navegador.

### Task 2: Conteúdo legal e descoberta

**Files:** páginas `/privacidade`, `/politica-de-cookies`, `src/app/llms.txt/route.ts`, sitemap, metadata, testes de publicação.

**Interfaces:** lista de rotas legais independente do menu de cursos; configurações Google/Bing somente por IDs públicos.

- [ ] Criar políticas factuais sobre infraestrutura, contato externo, preferências e categorias opcionais.
- [ ] Incluir páginas reais no sitemap e rodapé; preservar bloqueio de conteúdo não publicado.
- [ ] Adicionar llms.txt com fatos confirmados e links absolutos somente em origem pública indexável.
- [ ] Conferir canonical, OG, JSON-LD, robots e status em todas as rotas.

### Task 3: Recuperação e segurança

**Files:** `src/app/error.tsx`, `global-error.tsx`, `loading.tsx`, componentes de estado, scanner de segredos e testes.

**Interfaces:** `retry()` da versão instalada do Next.js; erro sem mensagem interna na interface.

- [ ] Implementar recuperação de falha, carregamento acessível e revisar 404 existente.
- [ ] Executar falha controlada em fixture local, sem endpoint público de teste.
- [ ] Examinar arquivos rastreados, histórico, assets e bundle cliente sem imprimir possíveis segredos.

### Task 4: Validação e operação

**Files:** `docs/PUBLICACAO-CHECKLIST.md`, registro de QA e instruções de configuração.

- [ ] Rodar lint, tipos, testes, build e navegador em larguras móveis e desktop.
- [ ] Registrar Android/Chrome e iPhone/Safari físicos como pendência do responsável.
- [ ] Documentar ativação de GA4/Ads/Meta, Search Console/Bing e confirmação cadastral.
- [ ] Publicar somente o serviço Foxstage e validar domínio HTTPS, preservando outros projetos da VPS.
