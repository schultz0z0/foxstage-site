# Foxstage em produção: VPS Linux e Traefik existente

Preparação de 17 de outubro de 2026. Domínio canônico aprovado: `https://foxstage.com.br`. Este documento não declara que a VPS ou o DNS já foram alterados.

## Integração com a infraestrutura fornecida

O Traefik do usuário roda em um Compose separado, com `network_mode: host`, Docker provider ativo, `exposedbydefault=false`, entrada HTTPS `websecure` e certResolver `letsencrypt`. A entrada `web` já redireciona HTTP para HTTPS e atende o desafio ACME HTTP-01.

O `compose.yaml` deste projeto cria somente o serviço `web` e a rede bridge `foxstage-web`, no projeto Compose `foxstage`. Na VPS Linux, o Traefik em modo host acessa o IP privado dessa bridge. A label `traefik.docker.network` escolhe essa rede e o backend usa a porta interna 3000. Não é necessário colocar o Traefik nessa rede, publicar a porta no host, editar seu Compose ou reiniciá-lo.

Antes da implantação, confirmar que os nomes `foxstage`, `foxstage-web` e `foxstage-site` não estão sendo usados por outra aplicação. Os routers, serviço e middleware têm prefixo Foxstage; nenhuma configuração global é criada. Se a política de firewall do host bloquear tráfego do próprio host para a bridge, investigar apenas essa conexão; não alterar regras globais sem revisar o impacto nos demais projetos.

O router aceita somente `foxstage.com.br` e `www.foxstage.com.br`. O middleware próprio redireciona `www` permanentemente para o domínio sem `www`, conservando caminho e query. O redirecionamento HTTP/HTTPS continua a cargo da configuração existente. O volume ACME e o Docker socket pertencem apenas ao Traefik; a aplicação não recebe acesso a eles.

## Arquivos e execução

- `Dockerfile`: Node 24 em Debian slim, instalação por lockfile, build Next.js e runtime `standalone`, com `public` e `.next/static` copiados.
- `.dockerignore`: exclui Git, dependências locais, arquivos `.env`, documentação, referências, backups e evidências de trabalho do contexto de build.
- `compose.yaml`: serviço sem `ports`, usuário UID/GID 1001, raiz somente leitura, cache e `/tmp` em tmpfs, capacidades removidas, limite de 1 GiB/1 CPU/128 processos e logs rotacionados. O consumo de tmpfs entra no limite de memória.
- `deploy/production.env.example`: exemplo público, sem credenciais, para `.env.production` na VPS. `SITE_INDEXABLE=true` libera indexação; o Compose sem esse arquivo mantém indexação desativada.
- `/api/health`: resposta mínima `{"status":"ok"}`, sem cache e fora da indexação. Docker e Traefik verificam esse endpoint.
- `scripts/verify-production.mjs`: confere as seis páginas, canonical, links, robots, sitemap, imagem social e requisições parciais do vídeo.

Não há banco de dados, Redis ou credencial de aplicação necessários à versão atual. Os contatos abrem o WhatsApp. O site não simula envio de formulários.

## Preparação na VPS

Usar um checkout dedicado, por exemplo `/opt/foxstage`, da branch `main`. Confirmar acesso de leitura ao GitHub e Docker Engine com Compose v2. A instalação de Docker ou alteração do servidor não faz parte destes arquivos.

Antes de executar, inspecionar os projetos existentes, o modo de rede do Traefik e recursos disponíveis:

```bash
docker compose ls
docker network ls
docker ps --format 'table {{.Names}}\t{{.Networks}}\t{{.Ports}}'
free -h
df -h
```

Copiar `deploy/production.env.example` para `.env.production` nesse checkout. Definir `IMAGE_TAG` como o hash do commit que será construído. Esse arquivo fica fora do Git e fora da imagem. `SITE_URL=https://foxstage.com.br` já está definido no Compose e só é usado em runtime; a imagem pode ser validada antes de apontar o DNS.

Validar o Compose e construir a imagem sem derrubar nenhum container:

```bash
docker compose --env-file .env.production config --quiet
docker compose --env-file .env.production build web
```

A construção pode consumir mais recursos que o runtime. Como esta VPS hospeda outros projetos, verificar folga de memória/CPU antes de construir. Outra opção é construir a mesma imagem Linux em uma máquina de build e transferi-la com `docker image save`/`docker image load`, mantendo a tag. A imagem deve corresponder à arquitetura da VPS. Não executar limpeza global de imagens, containers, redes ou volumes.

Subir apenas este serviço, depois que imagem e configuração estiverem verificadas:

```bash
docker compose --env-file .env.production up -d --no-build --wait --wait-timeout 90 web
docker compose --env-file .env.production ps
docker compose --env-file .env.production logs --tail 100 web
```

Não usar comandos no diretório do Traefik ou de outro projeto. Não usar `docker system prune`, `network prune`, `volume prune`, `down -v`, nem comandos que parem todos os containers. O healthcheck marca falhas, mas `restart: unless-stopped` não reinicia automaticamente um processo que continua vivo porém unhealthy; nesse caso verificar os logs.

## DNS e certificado

Falta confirmar o IP público e acesso à VPS antes de executar a implantação. Na zona DNS autoritativa, configurar somente os registros do site:

| Nome | Tipo | Destino |
| --- | --- | --- |
| `@` | A | IPv4 público confirmado da VPS |
| `www` | CNAME | `foxstage.com.br` |

Publicar AAAA somente se o IPv6 informado atender a mesma aplicação nas portas 80/443. Rever registros A/AAAA conflitantes somente desses nomes. Preservar MX, SPF, DKIM, DMARC, TXT e demais subdomínios de outros serviços. Se houver CAA restritivo, confirmar que permite a emissão pelo Let's Encrypt. Não substituir a zona inteira nem alterar nameservers sem necessidade.

O desafio HTTP-01 exige que o domínio público chegue ao Traefik na porta 80. Depois da propagação, o resolver existente emite o certificado. Não criar outro armazenamento ACME, não recriar o volume existente e não solicitar certificados repetidamente durante a preparação.

## Validação depois do apontamento

```bash
node scripts/verify-production.mjs https://foxstage.com.br
curl -I http://foxstage.com.br/
curl -I https://www.foxstage.com.br/english-day
curl -I https://foxstage.com.br/english-day
```

Esperado: HTTP redireciona para HTTPS; `www` redireciona para `https://foxstage.com.br/english-day`; as seis páginas canônicas respondem 200. Conferir certificado, menu desktop/mobile, WhatsApp, fontes, imagens e reprodução do English Day no navegador. Conferir também que os demais projetos continuam acessíveis. O runtime usa as variáveis para gerar canonical, Open Graph absoluto, robots e sitemap do domínio definitivo.

A Vercel permanece como hospedagem anterior. Não adicionar `noindex` ou redirecionamento nela durante esta preparação: isso poderia aparecer na VPS por engano. Depois de validar o domínio definitivo, decidir separadamente se o endereço Vercel ficará como prévia sem indexação ou redirecionará; essa configuração é específica do ambiente.

## Atualizações e retorno

Registrar a tag da imagem em uso antes de atualizar. Fazer `git pull --ff-only origin main` no checkout dedicado, construir uma nova imagem com outra `IMAGE_TAG` e executar `up` somente no serviço `web`. A troca de uma única instância pode causar uma breve interrupção; não é uma implantação de indisponibilidade zero.

Para retornar, restaurar no `.env.production` a tag anterior, que deve continuar armazenada na VPS, e executar o mesmo `up -d --no-build --wait web`. Se o Compose da versão anterior também era diferente, recuperar seu arquivo do commit correspondente em uma cópia separada antes da troca. Não apagar a imagem anterior antes de concluir a validação. Nenhum volume de negócio ou dado de aluno está envolvido na versão atual.

## Preview de compartilhamento

`src/app/opengraph-image.tsx` usa a fotografia original do primeiro banner da home, a assinatura oficial intacta, fontes locais e o degradê do hero, em 1200×630. O WebP original é decodificado por Sharp para ser embutido no renderizador; não há chamada externa para gerar a imagem. A URL versionada é `/opengraph-image/hero-20261017`, usada também no Twitter Card. A fotografia continua identificada como ilustrativa gerada por IA.

O preview é uma imagem estática: não executa carrossel, vídeo ou animação. WhatsApp e outras plataformas podem conservar previews antigos em cache. A URL nova da imagem favorece uma nova coleta; links já enviados podem manter a miniatura anterior. Depois da publicação, testar um novo compartilhamento do domínio definitivo.

## Reuso e limites

Foram reaproveitados Next.js, Docker já instalado no ambiente de trabalho, Sharp já presente como dependência transitiva (agora explícita) e o Traefik fornecido pelo usuário. O MCP `setup-agent` não está exposto nesta sessão; isso não foi interpretado como catálogo vazio. Nenhuma ferramenta, skill, plugin, servidor MCP ou serviço novo foi criado/instalado para a VPS.

Referências técnicas: [Next.js standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), [Traefik Docker](https://doc.traefik.io/traefik/reference/routing-configuration/other-providers/docker/), [Docker Compose services](https://docs.docker.com/reference/compose-file/services/).

## Verificação da preparação

Validação local em Docker Linux concluída em 17 de outubro de 2026:

- Build multistage com Next.js/TypeScript concluído; 17 testes unitários e lint passando.
- Compose validado; container standalone com os mesmos limites e permissões passou no healthcheck e serviu todas as páginas.
- Um container temporário em `--network host` conseguiu acessar o healthcheck pelo IP privado do container web: HTTP 200. Isso verifica o caminho de rede necessário ao Traefik fornecido.
- Domínio canônico em runtime, indexação, robots, sitemap, fontes, imagem otimizada por Next.js e vídeo com resposta HTTP 206 conferidos.
- Teste de navegador verificou os metadados Open Graph/Twitter, PNG 1200×630 e presença efetiva da fotografia. A imagem final foi inspecionada visualmente.
- O teste local publicou somente `127.0.0.1:3005` por um override de QA, com descoberta Traefik desabilitada. O Compose de produção continua sem portas publicadas.

A emissão real do certificado, regras do firewall da VPS, resolução DNS e integração com o Traefik remoto ainda precisam ser validadas na implantação. Nenhum servidor ou registro DNS remoto foi alterado nesta etapa.
