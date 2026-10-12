# Foxstage — planejamento da evolução institucional

**Versão do planejamento:** 1.0.0. **Data:** 12 de outubro de 2026. **Baseline visual:** design system 2.7.3 e manual B v1.0.

Este pacote documenta a implementação futura. Nenhuma página, formulário, banco, CMS, serviço ou publicação foi ativado nesta entrega. O website atual continua sendo a referência visual aprovada.

## Documentos e ordem de leitura

1. [Pesquisa de concorrentes](../PESQUISA-CONCORRENTES-ARQUITETURA.md): referências públicas e raciocínio da arquitetura.
2. [Contrato comum](CONTRATO-COMUM.md): identidade, qualidade, conteúdo e requisitos herdados por todos os prompts.
3. [Arquitetura e modelos](ARQUITETURA-E-MODELOS.md): rotas, navegação, componentes e divisão entre home e internas.
4. [Conteúdo e pendências](CONTEUDO-E-PENDENCIAS.md): fatos confirmados, variáveis e condições para publicar.
5. [Qualidade e publicação](QUALIDADE-E-PUBLICACAO.md): critérios e evidências exigidos por entrega.
6. [Plano de implementação do website](../superpowers/plans/2026-10-12-foxstage-evolucao-institucional.md): tarefas executáveis e dependências.
7. [Formulários e persistência](FORMULARIOS-E-PERSISTENCIA.md): PostgreSQL, Redis, contrato de envio e operação.
8. [Plano opcional dos formulários](../superpowers/plans/2026-10-12-foxstage-formularios-persistentes.md): fase de backend separada.
9. [Arquitetura legível por máquina](arquitetura.json): inventário de páginas e estados planejados.

## Prompts de implementação

Todos os prompts seguem a ficha de personalização, diretrizes permanentes e etapas 01–12 do prompt base, adaptadas à função de cada página. Enviar o contrato comum, o prompt da página, os documentos canônicos e o conteúdo confirmado juntos ao agente.

| Ordem | Prompt | Rota / função |
|---|---|---|
| 0 | [Fundação multipágina](prompts/foxstage-prompt-completo-fundacao-multipagina-nextjs.md) | Layouts, navegação, dados e metadados compartilhados |
| 1 | [Home — evolução](prompts/foxstage-prompt-completo-home-evolucao-nextjs.md) | `/`, preservando o visual atual |
| 2 | [Inglês em grupo](prompts/foxstage-prompt-completo-ingles-em-grupo-nextjs.md) | `/cursos/ingles-em-grupo` |
| 3 | [Inglês individual](prompts/foxstage-prompt-completo-ingles-individual-nextjs.md) | `/cursos/ingles-individual` |
| 4 | [A Foxstage](prompts/foxstage-prompt-completo-a-foxstage-nextjs.md) | `/a-foxstage` |
| 5 | [English Day](prompts/foxstage-prompt-completo-english-day-nextjs.md) | `/english-day` |
| 6 | [Contato](prompts/foxstage-prompt-completo-contato-nextjs.md) | `/contato`; WhatsApp disponível antes de backend |
| 7 | [Conteúdos — índice](prompts/foxstage-prompt-completo-conteudos-nextjs.md) | `/conteudos`, condicionado ao acervo |
| 8 | [Artigo / atividade](prompts/foxstage-prompt-completo-artigo-nextjs.md) | `/conteudos/[slug]` |
| Futuro | [Edição do English Day](prompts/foxstage-prompt-completo-edicao-english-day-nextjs.md) | `/english-day/[slug]`, condicionado a registro próprio |
| Backend | [Privacidade](prompts/foxstage-prompt-completo-privacidade-nextjs.md) | `/privacidade`, texto aprovado antes de captação persistente |

São dez prompts de páginas/modelos e um de fundação. A ordem identifica dependências; não obriga publicar todas as rotas juntas.

## Autoridade e referências transportadas

- [Design system humano](../../design.md) e [valores/aliases](../../design.json).
- [Prompt base completo](../../foxstage-prompt-completo-nextjs.md).
- [Implementação vigente](../IMPLEMENTATION.md).
- [Manual PDF](../../assets/Identidade%20visual%20Foxstage/manual-de-marca.pdf), [manual editável](../../assets/Identidade%20visual%20Foxstage/manual-de-marca.md) e [inventário da marca](../../assets/Identidade%20visual%20Foxstage/assets-index.json).
- Código atual em `src/`, mídias em `public/`, arquivos mestres no kit da marca e referências em `assets/references/`.
- `baseline-manifest.json` registra os arquivos da baseline e seus hashes. O ZIP inclui essas referências e o código atual, sem dependências instaladas, builds, credenciais ou bancos.

O pacote não estabelece uma segunda paleta. Se o projeto já tiver uma versão posterior aprovada, usar o contrato vivo do projeto, registrar a diferença e atualizar o planejamento antes de executar. O snapshot 2.7.3 é referência de origem, não uma ordem para reverter mudanças posteriores.

## Como executar posteriormente

1. Preencher a matriz de conteúdo com a escola e escolher a tarefa do plano.
2. Ler o contrato comum e o prompt correspondente; ler as notas finais dos documentos históricos.
3. Trabalhar no projeto existente, preservando o comportamento da home; não construir outro site paralelo.
4. Concluir a entrega em ambiente de revisão, registrar evidências e atualizar os contratos aplicáveis.
5. Publicar somente páginas com conteúdo aprovado e funcionalidades efetivamente conectadas.

Dados pendentes permitem construir uma prévia local; não permitem publicar fatos inventados, marcadores ou formulários que simulam sucesso. O formulário persistente é uma fase opcional, não uma dependência das páginas institucionais.
