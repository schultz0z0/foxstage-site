# Publicação: tarefas finais e configuração

Revisão: 17/10/2026. Base técnica: [auditoria de publicação](AUDITORIA-PUBLICACAO-2026-10-17.md). Não há formulário, cadastro, cobrança ou banco de dados nesta versão. O contato leva ao WhatsApp.

## Antes das campanhas

- [ ] Confirmar razão social e CNPJ reais. `Foxstage LTDA` é apenas a sugestão provisória do responsável; CNPJ fictício não foi publicado nem inserido no schema. Atualizar `src/content/privacy.ts` e a seção 1 de `/privacidade` após confirmação.
- [ ] Confirmar que `atendimento@foxstage.com.br` recebe mensagens e definir quem responde a pedidos de titulares. O código não cria a caixa postal.
- [ ] Aprovar as políticas com o responsável pela operação: prazos efetivos de atendimento, retenção, fornecedores e transferências internacionais. Os textos descrevem esta implementação; não constituem certificação de conformidade de toda a empresa.
- [ ] Executar o roteiro em Android/Chrome e iPhone/Safari físicos abaixo.
- [ ] Criar as contas/propriedades de medição, conferir suas configurações e só então preencher os IDs públicos. Por enquanto todas as integrações ficam desligadas.

## Google Analytics 4

1. Na conta da Foxstage, criar uma propriedade GA4 com fluxo Web para `https://foxstage.com.br`, fuso de São Paulo e idioma adequado à operação.
2. Copiar o ID de medição `G-…`. Não é chave privada.
3. Desligar a medição otimizada automática do fluxo, pois o site controla `page_view` e `whatsapp_click`. Isso evita eventos extras, duplicidade em SPA e captura automática de URLs de saída. Não ativar User-ID, coleta de dados fornecidos pelo usuário ou Google Signals nesta configuração.
4. Definir e registrar a retenção de eventos na propriedade (por exemplo, 2 meses) e revisar a política caso mude a operação. O cookie de preferência dura até 180 dias; isso é diferente da retenção dos eventos no Google e dos cookies do próprio GA.
5. Preencher `GA4_ID` em `/opt/foxstage-site/.env.production`. Não usar `NEXT_PUBLIC_` nem colocar credenciais no repositório.
6. Após recriar somente o serviço `web`, abrir janela anônima. Antes da escolha e após recusa, não deve existir pedido para `googletagmanager.com/gtag/js`. Autorizar apenas análise deve carregar GA e manter Meta/Ads desligados.
7. Conferir Tempo real/DebugView usando as ferramentas oficiais. Em debug, evitar dados pessoais nas URLs. A integração não ativa debug em produção por padrão.

Eventos implementados: `page_view` em mudança de caminho e `whatsapp_click` em links de contato. O segundo não comprova mensagem enviada, matrícula ou compra. O código não envia o texto do WhatsApp, nome, telefone ou e-mail como parâmetros desses eventos. Parâmetros de URL e referrer são omitidos nos eventos Google controlados pelo site.

## Meta Pixel e Google Ads

1. No Gerenciador de Eventos da Meta, criar/selecionar o conjunto de dados da Foxstage e copiar somente o ID numérico do Pixel para `META_PIXEL_ID`.
2. Manter correspondência avançada e a captura automática de eventos desligadas também no painel. O código envia `PageView` e o evento personalizado `WhatsAppClick`, após consentimento de publicidade. Não usa CAPI, token de acesso, compra ou `Lead` fictício.
3. O Pixel é conservador: não inicializa nem envia os eventos controlados pelo site em URLs com query string ou fragmento. Isso reduz a cobertura de atribuição de campanhas com UTM; não remover a proteção sem revisar o tratamento de dados. O GA utiliza o caminho limpo. Não colocar nome, e-mail ou telefone em URLs de campanhas.
4. No Google Ads, copiar o ID `AW-…` para `GOOGLE_ADS_ID`. Para medir clique no WhatsApp, criar uma ação com essa finalidade e copiar seu rótulo para `GOOGLE_ADS_WHATSAPP_LABEL`. Sem rótulo não há envio de conversão Ads no clique.
5. Não configurar o mesmo clique como conversão importada do GA e como tag direta simultaneamente. Avaliar resultados como intenção de contato, separadamente de matrícula confirmada.
6. Testar publicidade autorizada, recusada e revogada. O painel deve identificar o evento como clique. Nenhuma campanha foi criada ou ativada por este trabalho.

Google Consent Mode é usado no modo básico: tags bloqueadas até a finalidade ser aceita; defaults negados antes de `config`. Não há pings de medição sem aceite. GTM não está instalado: inserir outro contêiner ou plugin por fora deste fluxo exige nova auditoria para não duplicar tags ou contornar consentimento.

## Configuração na VPS

Somente IDs públicos nestes campos; senhas/tokens continuam fora do Git:

```dotenv
GA4_ID=
GOOGLE_ADS_ID=
GOOGLE_ADS_WHATSAPP_LABEL=
META_PIXEL_ID=
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
```

Editar `/opt/foxstage-site/.env.production` com permissão `600`. Com o `IMAGE_TAG` da versão já construída preservado, aplicar:

```bash
cd /opt/foxstage-site
docker compose --env-file .env.production up -d --no-build --wait --wait-timeout 90 web
docker compose --env-file .env.production ps web
```

IDs são lidos em runtime: não precisam de novo build. Não executar `down`, prune global, nem reiniciar o Traefik ou projetos vizinhos. Para mudanças de código, seguir `docs/PRODUCAO-VPS.md`: push main, pull fast-forward, imagem versionada, atualizar `IMAGE_TAG`, subir apenas `web` e validar. Manter a imagem anterior para rollback.

## Google Search Console e Bing

1. Adicionar a propriedade de domínio `foxstage.com.br` no Search Console. Publicar somente o TXT de verificação fornecido pela conta, sem substituir MX, SPF ou outros registros. Se usar propriedade por prefixo, o conteúdo da meta de verificação pode ser colocado em `GOOGLE_SITE_VERIFICATION`.
2. Adicionar o site no Bing Webmaster Tools, por importação autorizada do Search Console ou pela verificação própria. Para verificação por meta, preencher apenas o valor de `msvalidate.01` em `BING_SITE_VERIFICATION`.
3. Enviar `https://foxstage.com.br/sitemap.xml` aos dois painéis. Conferir robots público com `Allow: /`; manter `/api/` fora da descoberta.
4. Inspecionar as seis páginas comerciais e as duas políticas, verificar canonical HTTPS sem `www`, cobertura e renderização. Pedir indexação das páginas principais quando necessário.
5. Monitorar indexação, desempenho e Core Web Vitals com dados reais. A presença do sitemap não comprova indexação. Não há garantia de posicionamento ou citação em respostas de IA.

`llms.txt` é um resumo complementar solicitado pelo projeto, não uma exigência do Google, nem substituto de HTML, links, sitemap ou robots. SEO local descreve a escola no Rio e as aulas online no Brasil; não foi inventado endereço ou perfil de estabelecimento físico. Não criar páginas de cidades sem conteúdo/oferta real.

## Teste físico: Android e iPhone

Não realizado pelo agente: nenhum aparelho físico acessível foi identificado. O responsável informou que possui ambos para testar depois. Registrar modelo, versão do sistema, navegador, data e resultado; testes do navegador automatizado permanecem identificados como emulação.

Em cada aparelho, usar `https://foxstage.com.br` em aba anônima e conferir:

- [ ] Menu, submenu de cursos, todas as páginas e retorno pelo navegador.
- [ ] Hero nos dois banners, troca automática de 10 segundos, troca manual, texto sem corte e um CTA.
- [ ] Retrato e paisagem, zoom/texto ampliado, sem rolagem lateral.
- [ ] Cookie banner: recusar, reabrir pelo rodapé, escolher apenas análise, escolher publicidade e revogar. Modal rola e fecha, foco não fica preso após sair.
- [ ] English Day: vídeo toca sem som quando permitido, controle de som funciona, pausa manual respeitada e mudança de aba interrompe reprodução. iOS/Android podem restringir autoplay por economia de energia/dados; controles manuais devem continuar funcionando.
- [ ] WhatsApp abre o destino correto, sem enviar mensagem automaticamente.
- [ ] Página inexistente mostra 404 com retorno funcional.
- [ ] Conexão HTTPS sem aviso e preview social do hero após atualização do cache do aplicativo de compartilhamento.

## Referências oficiais

- [Google: recursos de IA e sites](https://developers.google.com/search/docs/appearance/ai-features).
- [Google: Consent Mode básico](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic).
- [ANPD: guia de cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais).
- [Bing: diretrizes para webmasters](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).
- [Proposta llms.txt](https://llmstxt.org/).
