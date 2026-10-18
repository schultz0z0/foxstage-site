# Publicação da Foxstage na VPS

Implantação realizada em 17 de outubro de 2026, no fuso America/Sao_Paulo.

## Versão e destino

- Site público: `https://foxstage.com.br`.
- VPS confirmada por SSH: `solucoes-nexus`, IPv4 público `92.112.179.235`.
- Checkout dedicado: `/opt/foxstage-site`, clonado da branch `main` de `https://github.com/schultz0z0/foxstage-site.git`.
- Código da aplicação implantado: `26b693993287a44ca3b444d927aeaa5646db62bf`.
- Imagem construída na VPS: `foxstage-site:26b6939`.
- Projeto Compose: `foxstage`; serviço `web`; container `foxstage-web-1`; rede `foxstage-web`.
- `.env.production` local na VPS, fora do Git: tag `26b6939` e indexação habilitada. O Compose define `SITE_URL=https://foxstage.com.br` e desabilita a prévia de rascunhos.

Este registro substitui as pendências de execução descritas em `PRODUCAO-VPS.md`; esse arquivo continua como guia operacional. Commits posteriores apenas de documentação não exigem reconstruir a imagem validada da aplicação.

## Isolamento

O build foi executado por um builder próprio, `foxstage-build`, limitado a 1 CPU e 2 GiB de memória, sem swap adicional. O builder foi parado ao concluir a construção; seu cache permanece disponível para futuras atualizações. A aplicação tem limite próprio de 1 CPU/1 GiB, roda como UID/GID 1001 e mantém o filesystem somente leitura, com áreas temporárias de cache. Nenhuma porta da aplicação foi publicada no host.

Antes do apontamento, o container foi iniciado com a descoberta do Traefik desabilitada por um override guardado em `.git/preflight.compose.yaml`. Os testes passaram pelo endpoint interno. Depois, o Compose de produção foi aplicado sem esse override, ativando somente os routers Foxstage.

O Traefik compartilhado permaneceu no mesmo container, com zero reinicializações. Não houve edição de seu Compose, de seu volume ACME ou de regras globais. A comparação entre os 22 containers anteriores e o estado posterior confirmou os mesmos IDs, todos em execução, com início anterior ao deploy. Evidências operacionais estão no diretório `.git` do checkout da VPS, fora dos arquivos publicados.

## DNS e HTTPS

Na zona Hostinger de `foxstage.com.br`, somente o RRset `@ / A` foi substituído: de `2.57.91.91` para `92.112.179.235`, TTL 300. O CNAME de `www`, MX, SPF, DMARC e registros de verificação permaneceram idênticos ao estado anterior. O backup anterior da zona foi salvo localmente na área de trabalho ignorada pelo Git.

Certificado servido e validado sem desabilitar verificação TLS:

- Emissor: Let's Encrypt, intermediária YR1.
- Nomes cobertos: `foxstage.com.br` e `www.foxstage.com.br`.
- Validade retornada pelo certificado: de `2026-10-18 00:20:54 UTC` até `2027-01-16 00:20:53 UTC`.
- Emissão e renovação ficam sob o resolver `letsencrypt` já configurado no Traefik.

HTTP redireciona para HTTPS com 308. `https://www.foxstage.com.br/english-day?origem=teste` redireciona com 308 para o mesmo caminho e query no domínio sem `www`.

## Validação pública

`node scripts/verify-production.mjs https://foxstage.com.br` passou pelo domínio público, sem apontamento local alternativo ou exceção de certificado:

- Home, dois cursos, A Foxstage, English Day e Contato: HTTP 200.
- Canonical e links internos do domínio definitivo.
- Indexação habilitada, robots e sitemap com as seis URLs.
- Healthcheck, imagem social PNG 1200×630 e imagem otimizada pelo Next.js.
- Vídeo do English Day aceitando Range com HTTP 206.

A QA em navegador público conferiu as seis páginas, larguras 390 e 1440, imagens dos heroes, navegação desktop/mobile, um H1 por página e ausência de erros JavaScript. O teste específico da imagem social confirmou Open Graph e Twitter, fotografia presente e tamanho correto. O screenshot público foi inspecionado visualmente.

O container estava healthy após as verificações, sem erro de aplicação nos logs observados. As proteções de headers existentes (`nosniff`, política de referência, bloqueio de frame e permissões de dispositivos) permanecem ativas.

## Próximas atualizações

Seguir `PRODUCAO-VPS.md`. Sempre enviar o código à `main`, atualizar este checkout por fast-forward, construir uma nova imagem com outra tag e aplicar somente o serviço `web`. O builder próprio pode ser reutilizado explicitamente com `--builder foxstage-build --load`; isso não muda o builder padrão dos outros projetos.

Não executar comandos de limpeza global ou reiniciar o Traefik para atualizar a Foxstage. Preservar imagens anteriores para rollback. As credenciais temporárias usadas para a implantação não pertencem ao repositório.
