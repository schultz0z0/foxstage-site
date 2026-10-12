# Qualidade, revisão e publicação

Aplicável a cada página e tarefa. A execução futura registra somente verificações realizadas, sem usar resultados históricos como aprovação automática de código novo.

## 1. Conteúdo e identidade

- [ ] Conteúdo da página tem uma função própria e acrescenta informações ao resumo da home.
- [ ] Fatos, professores, imagens, relatos, inclusões e condições estão aprovados.
- [ ] Não existem marcadores `[[...]]`, textos de preenchimento ou links vazios no HTML publicado.
- [ ] Logo, respiro, variantes, cores e fontes correspondem ao manual e aos tokens vigentes.
- [ ] Copy e CTA do English Day permanecem estáticos; não foram reintroduzidos recorte inicial ou bloqueio por hover/foco.
- [ ] Demais regiões da home preservam o contrato visual aprovado.

## 2. Navegação e acessibilidade

- [ ] Exatamente um header/footer e um `main#conteudo` por página; home não recebe shell duplicado.
- [ ] Logo, menu, submenu, rodapé, links contextuais e estado ativo funcionam por rotas.
- [ ] Links de pathname não são enviados a querySelector como âncoras.
- [ ] Rotas não publicadas não aparecem no menu/sitemap nem ficam abertas em produção.
- [ ] Um H1, subtítulos coerentes, alt/créditos, foco visível e skip link funcional.
- [ ] Teclado: Tab, Shift+Tab, Enter/Espaço nos controles apropriados e Escape no disclosure.
- [ ] Testar 320, 390, 768, 1024, 1440 e 1920px; incluir 767/768 e 1023/1024 quando a mudança tocar breakpoints.
- [ ] Sem overflow horizontal, sobreposição de controles ou recorte de rostos. Verificar zoom de 200% e movimento reduzido.
- [ ] Conteúdo essencial permanece acessível sem JavaScript; verificar estados condicionais de formulário e fallback de vídeo.

## 3. SEO e performance

- [ ] Title, description, canonical e Open Graph próprios por página, sem canonical `/` herdado nas internas.
- [ ] Preview mantém noindex conforme getPublicationConfig; publicação requer domínio HTTPS confirmado e autorização de indexação.
- [ ] Sitemap inclui somente rotas/itens publicados; slug inválido/rascunho retorna 404 pública.
- [ ] Dados estruturados correspondem ao conteúdo real e são serializados com o cuidado existente para `<`.
- [ ] Autor e datas de artigo/edição não são inventados ou derivados automaticamente do build.
- [ ] Imagens têm dimensões, sizes, recortes e carregamento adequados; não precarregar todos os cards/Players.
- [ ] Remotion carrega somente quando necessário; não carregar vídeo pesado automaticamente em uma listagem.
- [ ] Nenhuma credencial ou acesso de banco é incluído no bundle cliente.

## 4. Comandos e evidências

Ler scripts e disponibilidade do runner antes de executar; não presumir instalação de ferramenta nova. Prefixar shell com `rtk` conforme RTK.md.

```text
rtk proxy npm.cmd run tokens
rtk proxy npm.cmd run lint
rtk proxy npm.cmd run typecheck
rtk proxy npm.cmd test
rtk proxy npm.cmd run build
```

Typecheck e build podem ser agrupados quando o build já executa TypeScript e não existir outra exigência. Testes de navegação, publicação e backend são acrescentados para comportamento relevante, não para repetir valores CSS ou testar mudanças cosméticas reversíveis.

Registrar comando, data, resultado, screenshots de desktop/mobile, URLs verificadas, erros encontrados e limitações. Fazer uma revisão visual em lote e corrigir problemas identificados; não repetir auditorias completas sem mudança ou preocupação nova.

## 5. Formulários, quando ativados

- [ ] Testar input inválido, body acima do limite, envio repetido/concorrente, limitação de requisições e persistência indisponível.
- [ ] Sucesso somente após gravação confirmada; falha preserva conteúdo digitado e oferece contato alternativo real.
- [ ] Reenvio com a mesma chave não cria duplicata; chave igual com payload diferente não sobrescreve dados.
- [ ] Nenhum GET público lista contatos; leitura/exportação depende de acesso restrito.
- [ ] Operação tem responsável, aviso de tratamento, política de retenção e backup/restauração testados.
- [ ] A confirmação de gravação não afirma que uma mensagem, e-mail ou matrícula foi efetuada.

## 6. Handoff

Entregar página conectada em ambiente de revisão, conteúdo pendente identificado fora da interface pública, contratos atualizados e evidências. Publicação é etapa posterior explícita. Não declarar conformidade integral, ganho de conversão ou disponibilidade operacional apenas por build ou Lighthouse.
