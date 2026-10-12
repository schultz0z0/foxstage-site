# Foxstage — Persistent Contact Forms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task-by-task when the user requests this optional backend. This delivery is documentation only; do not create databases, install drivers or run migrations now.

**Goal:** Permitir registrar solicitações de contato com confirmação real e atendimento restrito.

**Architecture:** Ilha cliente em Contato → POST JSON em Route Handler Node.js → validação/proteções → transação PostgreSQL → confirmação. Redis é apoio opcional, sem obrigação ou uso como único histórico de contatos.

**Tech Stack:** Next.js/TypeScript, validação compatível com Zod existente e PostgreSQL solicitado pelo usuário. Driver e apoio Redis dependem de consulta ao acervo O Setup/configuração futura.

**Spec:** [Persistência](../../evolucao/FORMULARIOS-E-PERSISTENCIA.md), [contrato comum](../../evolucao/CONTRATO-COMUM.md), [Contato](../../evolucao/prompts/foxstage-prompt-completo-contato-nextjs.md), [Privacidade](../../evolucao/prompts/foxstage-prompt-completo-privacidade-nextjs.md).

## Global Constraints

- Formulário fica desligado até backend, aviso, responsável e operação preparados; WhatsApp permanece disponível.
- Nenhum segredo NEXT_PUBLIC, conexão de banco no browser ou porta pública de banco.
- JSON, body máximo efetivo 16 KiB, origens explícitas, telefone normalizado e dados mínimos da especificação.
- Sucesso somente após commit; sem matrícula, WhatsApp ou e-mail enviados automaticamente.
- Idempotência por UUID único; telefone/e-mail não únicos; mesma chave com payload diferente retorna 409.
- Sem GET público de contatos, dashboard, autenticação de aluno ou CMS adicionados nesta fase.
- Consultar O Setup antes de dependência/ferramenta nova. Indisponibilidade do catálogo deve ser registrada sem presumir vazio.
- Migrações e testes usam banco de teste explicitamente identificado; nunca fixtures em registros reais.

## Review Focus

1. Dois envios concorrentes/retry não duplicam a solicitação; mudança de payload não sobrescreve a anterior.
2. Body UTF-8 grande, campo ausente/enum inválido e origem proibida não chegam à tabela de contatos.
3. Falha de banco/commit ou limitação crítica não produz confirmação e não apaga o conteúdo digitado.
4. Credencial não aparece no HTML/bundle/log, e nenhum endpoint público lista registros.
5. Backup, leitura restrita e rotina de atendimento existem; persistência local não é automaticamente disponibilidade pública.

## Mapa de arquivos e interfaces

| Arquivo futuro | Responsabilidade |
|---|---|
| `src/server/contact/types.ts` | DTOs, resultado de validação e respostas |
| `src/server/contact/validation.ts` | Normalização e validação de dados |
| `src/server/contact/repository.ts` | Transação/idempotência PostgreSQL |
| `src/server/contact/rate-limit.ts` | Contagem concorrente e expiração |
| `src/server/db.ts` | Conexão/pool somente no servidor |
| `src/app/api/contact/route.ts` | POST JSON, limites/origem/erros |
| `src/components/forms/ContactForm.tsx` | Campos, estados, retry e fallback |
| `db/migrations/001_contact_requests.sql` | Estrutura de contatos e limitação necessárias |
| `.env.example` | Nomes de configurações com placeholders; sem segredo real |
| Testes de validação, storage e navegador | Casos descritos nas tarefas |

Interfaces propostas:

```ts
type ContactKind = 'new_student' | 'student_support';
type ContactInterest = 'group' | 'individual' | 'undecided';
type NormalizedContactInput = {
  name: string; phone: string; email: string | null;
  kind: ContactKind; interest: ContactInterest | null;
  message: string | null; sourcePath: string; idempotencyKey: string;
};
type ContactValidation =
  | { ok: true; data: NormalizedContactInput }
  | { ok: false; fieldErrors: Partial<Record<keyof NormalizedContactInput, string>> };
type ContactInsertResult =
  | { kind: 'created' | 'replayed'; reference: string }
  | { kind: 'conflict' };
```

`parseContactInput(value: unknown): ContactValidation`; `readJsonBodyLimited(request: Request, maxBytes: number): Promise<unknown>`; `saveContactRequest(input: NormalizedContactInput, noticeVersion: string): Promise<ContactInsertResult>`; `consumeContactLimit(key: string, now: Date): Promise<{ allowed: boolean; retryAfterSeconds: number }>`.

Falhas de infraestrutura são erros operacionais tratados pela camada HTTP, não resultados de sucesso. O segredo e derivação da chave técnica pertencem ao servidor e ao contexto de rede confiável do deployment, não ao DTO do visitante.

## Task 1: Configuração, modelo e critérios de ativação

**Files:** planejar db.ts, migração, types.ts e .env.example. **Consumes:** infraestrutura e responsáveis confirmados. **Produces:** esquema, conexão privada e configuração de feature desligada por padrão.

- [ ] Verificar ambiente real disponível e consultar O Setup antes de escolher/instalar driver ou ferramenta. Se indisponível, registrar a limitação e manter seleção explícita para a retomada; não alegar inexistência de recursos.
- [ ] Confirmar banco de desenvolvimento/teste, versão, endereço, permissões e armazenamento persistente; servidor publicado deve alcançar esse banco de forma privada.
- [ ] Registrar aviso/versão, retenção, responsável e rotina restrita de leitura/atendimento antes de habilitar captação pública.
- [ ] Criar migração correspondente ao modelo conceitual, restrição única de idempotência, timestamps e permissões limitadas. Contador de limitação deve suportar concorrência e expiração.
- [ ] Validar a migração em banco de teste e conferir que reinício não apaga um registro sintético. Não criar banco ou credenciais em produção por efeito colateral.
- [ ] Documentar configuração sem segredos e manter CONTACT_FORM_ENABLED desligado até as tarefas seguintes.

## Task 2: Validação e leitura limitada

**Files:** validation.ts, types.ts e testes `tests/contact-validation.test.mjs`. **Produces:** parseContactInput e readJsonBodyLimited com o contrato da especificação.

- [ ] Criar casos `missingNameRejected`, `unicodeNameAndApostropheAccepted`, `phoneCountryCodeNormalized`, `optionalEmailValidated`, `supportHasNoCourseInterest` e `unknownSourceRejected`.
- [ ] Criar `utf8BodyLimitCountsBytes`: body efetivo acima de 16384 bytes recebe limite mesmo com Content-Length ausente/menor; caracteres multibyte contam seus bytes.
- [ ] Criar `invalidEnumAndOverlongMessageRejected`: kind/interest fora da lista e mensagem maior que 2000 caracteres não passam. Não truncar silenciosamente os dados.
- [ ] Executar e confirmar falha dos casos antes de implementar as funções; usar runner TS compatível já disponível.
- [ ] Implementar validação/normalização, reaproveitando Zod se compatível; não bloquear nomes legítimos por conter apóstrofo.
- [ ] Executar os testes; resultado PASS para entradas válidas/invalidas/limites reais.

## Task 3: Transação, idempotência e limitação

**Files:** repository.ts, rate-limit.ts, db.ts; testes `tests/contact-storage.integration.mjs`. **Produces:** saveContactRequest e consumeContactLimit.

- [ ] Usar somente dados sintéticos no banco de teste. Consultas parametrizadas devem armazenar conteúdo textual como dado, não executar SQL inserido no campo.
- [ ] Criar `sameKeyConcurrentRequestsCreateOneRow`: duas chamadas simultâneas geram uma solicitação e devolvem a mesma referência.
- [ ] Criar `sameKeyDifferentPayloadConflicts`: nenhuma sobrescrita; nova chave para novo contato é permitida inclusive com o mesmo telefone.
- [ ] Criar `transactionFailureReturnsNoSuccess`: falha no commit/evento reverte a transação; não persistir metade do fluxo.
- [ ] Criar `limitIsAtomic`: dez tentativas na janela permitida, décima primeira limitada, concorrência não ultrapassa o limite; janela expirada libera novamente.
- [ ] Implementar restrições/transações e contador conforme o banco escolhido. Redis opcional exige atomicidade e política de falha; não substituir a gravação final por uma fila que pode expirar.
- [ ] Executar `rtk proxy node tests/contact-storage.integration.mjs` contra configuração de teste explícita. Resultado: integridade e limitação passam; logs não contêm PII.

## Task 4: Endpoint público restrito ao envio

**Files:** src/app/api/contact/route.ts e testes de integração HTTP. **Consumes:** validação, limite e repository. **Produces:** POST /api/contact com respostas da especificação.

- [ ] Criar `originAndMediaTypeEnforced`: origem fora da lista/ausente é 403; conteúdo incompatível é 415; método sem implementação é 405.
- [ ] Criar `httpResultMatchesCommit`: created 201, replay 200, conflito 409, input inválido 400, body grande 413, limite 429 com Retry-After, infraestrutura indisponível 503.
- [ ] Criar `publicGetCannotListContacts`: nenhuma leitura de registros por endpoint público; respostas não expõem payload pessoal ou erro SQL.
- [ ] Implementar runtime Node.js e validação antes de persistir; contar tentativas pela política definida, incluindo inválidas. Não confiar em headers de rede não autenticados para derivar chave/origem.
- [ ] Executar os casos HTTP e conferir que respostas de falha não mostram referência de registro inexistente.

## Task 5: Formulário e mensagens verdadeiras

**Files:** ContactForm.tsx, rota Contato e conteúdo de aviso/privacidade; teste `tests/contact-form.browser.mjs`. **Consumes:** POST real e feature flag. **Produces:** estados de envio com fallback de WhatsApp.

- [ ] Implementar campos mínimos, labels, mensagens por campo, loading e alternativa de contato com os tokens existentes.
- [ ] Gerar chave por tentativa; manter em retry de payload inalterado, renovar quando usuário edita ou inicia outro contato após sucesso.
- [ ] Criar `pendingDoesNotClearInputs`, `unavailablePreservesInputs`, `retryUsesSameKey`, `confirmedMeansStoredOnly` e `noJavaScriptOffersRealWhatsApp`.
- [ ] Verificar botão com largura adequada e loading estável; não fazer a copy ou campos entrarem em animação.
- [ ] Conectar aviso aprovado e respeitar feature desligada sem backend/operação prontos. Não acrescentar marketing/newsletter ao consentimento de contato.
- [ ] Executar casos de navegador, teclado/mobile, reduced motion e falhas de rede/banco, sem mensagens reais a terceiros.

## Task 6: Operação e ativação posterior

**Files:** documentação de operação e configurações de deployment; não criar painel público automaticamente. **Produces:** procedimento verificável de atendimento e recuperação.

- [ ] Definir e testar o acesso restrito para consultar solicitações e registrar atendimento; responsável identificado.
- [ ] Testar backup/restauração em outro banco de teste. Registrar procedimento e retenção; não imprimir credenciais ou dados pessoais na evidência.
- [ ] Conferir que segredo/conexão não aparecem no bundle ou logs, e que banco não depende de acesso do navegador à máquina pessoal.
- [ ] Rodar lint, TypeScript/build e testes pertinentes. Documentar comportamento com Redis indisponível quando esse apoio tiver sido escolhido.
- [ ] Habilitar captação pública somente após condições de infraestrutura, operação e tratamento estarem satisfeitas e quando a execução/ativação for solicitada. Não confundir migração aplicada com formulário pronto para uso público.

## Handoff

Pode executar o website institucional sem esta fase. Esta entrega apenas responde à viabilidade e prepara decisões, interfaces e verificações; não instala Postgres/Redis, não executa migrações e não pede credenciais agora.
