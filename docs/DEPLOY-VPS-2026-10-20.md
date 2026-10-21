# Deploy do olho aprovado da Foxstage

Concluído em 20/10/2026, às 22:07, America/Sao_Paulo.

- Domínio: https://foxstage.com.br.
- Repositório: `schultz0z0/foxstage-site`, branch `main`.
- Marca e website: commit `311eab2`; verificador de produção atualizado no commit `51136b7`.
- Checkout da VPS: `/opt/foxstage-site`, atualizado por `git pull --ff-only origin main`.
- Imagem em produção: `foxstage-site:51136b7`.
- Digest da imagem: `sha256:32badaea625652bc8e7381b560d585004b9eea5c5ada43f596000393f060649a`.

O builder isolado `foxstage-build`, limitado a 1 CPU e 2 GiB, construiu a imagem sem parar o site anterior. Após o build, somente `web` do projeto Compose `foxstage` foi atualizado. O container `foxstage-web-1` está healthy; os 22 containers anteriores dos outros projetos mantiveram os mesmos IDs e horários de início. O builder foi parado ao concluir. Não houve alteração de DNS, certificado ou Traefik.

O kit B v1.1 inclui o olho vetorial aprovado em logos, ícones, avatares, favicons e manual. As cópias públicas foram conferidas por SHA-256. A imagem de compartilhamento usa `/opengraph-image/hero-20261020-brand-v11`.

Verificação pública por HTTPS concluída:

- Seis páginas principais, canonical, indexação, robots e sitemap.
- Healthcheck, imagem social PNG 1200×630, imagem otimizada e vídeo com HTTP 206.
- Navegador em 320, 390, 768, 1024 e 1440 px; sete páginas internas, menus, retorno pela logo e 404.
- Nove assets públicos com os hashes locais esperados; nenhum erro JavaScript observado.
- Build Docker/TypeScript concluído; lint e 21 testes unitários locais passaram.

Rollback preservado: imagem anterior `foxstage-site:bd71d20` e arquivo de ambiente em `.git/brand-eye-env-before` na VPS. Evidências operacionais em `.git/brand-eye-deploy-before.json`, `.git/brand-eye-build.log` e `.git/brand-eye-deploy-after.json`. Credenciais temporárias ficam fora do repositório e são revogadas ao concluir.
