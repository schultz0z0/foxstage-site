# Foxstage — plano de implementação

**Objetivo:** implementar a primeira versão local completa do site institucional já especificado e autorizado pelo usuário.

**Arquitetura:** conteúdo renderizado no servidor, configuração tipada e componentes por seção. Apenas o menu precisa de estado no cliente. `design.json` gera os tokens CSS; não manter uma segunda paleta manual.

**Stack:** Next.js 16.4.0, React 19.3.0, TypeScript, CSS, fontes locais licenciadas. Nenhuma biblioteca de animação é necessária para os movimentos permitidos pelo contrato.

**Especificação:** `foxstage-prompt-completo-nextjs.md`, `design.md`, `design.json`. Execução nesta sessão, conforme pedido explícito do usuário. A numeração do template define a construção; a ordem do JSON define a página.

## Restrições globais

- Preservar a logo original; fotografias de banco identificadas como ilustrativas.
- Não publicar automaticamente nem anunciar fatos ausentes.
- Sem formulários, analytics, cookies não essenciais, newsletter, depoimentos ou ofertas inventadas.
- Header desktop em cápsula; Sobre após o hero; prática preta; atalhos e curso em creme; painel e rodapé escuros.

## Construção e verificação

- [x] Base: configuração do framework, conteúdo centralizado, tokens e helper de WhatsApp. Mensagem em português com caracteres especiais e número inválido testados; nenhuma mensagem enviada.
- [x] Header e hero: navegação sem links mortos; menu expansível com Escape e foco restaurado; foto com assunto preservado e identificação ilustrativa.
- [x] Seções: Sobre, prática, atalhos, curso editorial, contato e rodapé único. Nenhum módulo desligado deixa espaço vazio.
- [x] SEO: metadata e imagem social própria; noindex por padrão; canonical/sitemap condicionados ao domínio configurado; 404 útil.
- [x] Verificação: cinco testes, tipos, lint e build passaram; navegador nas oito larguras do contrato, teclado, menu sem JavaScript, movimento reduzido, imagens e fontes conferidos; ajustes observados aplicados e revisão independente `ship`.
- [ ] Teste de zoom nativo de navegador e leitura com tecnologia assistiva. O reflow equivalente a 200% passou; não substituir essa evidência por uma certificação.

## Pontos de revisão

- Em 320px, título, menu e botões não extrapolam o documento.
- Escape devolve foco ao botão de menu; navegação não exige JavaScript para conteúdo principal.
- Mensagens com acentos e símbolos preservam o texto após uma única decodificação.
- Ausência de domínio mantém preview fora de indexação, sem canonical fictício.
- Fotos de banco não parecem prova de alunos ou ambientes próprios.

## Consulta ao acervo

O servidor `setup-agent` continua exigindo OAuth e não expôs operações de pesquisa. Não presumir catálogo vazio. A implementação usa o framework solicitado e capacidades já disponíveis; nenhuma skill, plugin ou MCP novo será instalado. O catálogo 21st foi consultado para apoio à navegação, sem importar um template que altere a composição aprovada.
