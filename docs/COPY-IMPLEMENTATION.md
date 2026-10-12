# Aplicação da copy e English Day — 2.5.0

Entrega de 10 de outubro de 2026, após aprovação da auditoria editorial e da copy pelo usuário.

A copy aprovada foi aplicada aos dois banners, à apresentação do método, aos três destaques, aos atalhos, às aulas, ao contato, ao header e rodapé, aos metadados e à página 404. Os textos e mensagens estão centralizados em `src/content/site.ts`. A proposta aprovada permanece em `docs/copy-proposta.json`, agora marcada como aplicada; a auditoria original permanece registrada em `docs/AUDITORIA-COPY-FOXSTAGE.md`.

O English Day foi acrescentado depois das aulas e antes do contato final. A seção apresenta a frequência de quatro meses, o encontro presencial entre alunos organizado e custeado pela escola e a dinâmica de inglês durante todo o dia. A foto e o vídeo da edição no cinema foram utilizados juntos. A comunicação não atribui idioma ao filme nem promete próxima data, despesas específicas cobertas ou resultado de proficiência.

## Preservação da composição

As regras CSS de todas as regiões anteriores foram preservadas byte a byte após excluir o bloco novo `.english-day` na comparação. Tokens de cores, fontes, componentes e demais medidas do contrato são iguais aos da versão anterior. `tokens.css` acrescenta apenas seis variáveis de layout para a nova seção; as variáveis anteriores são idênticas.

O módulo novo usa creme `#F3EFE8`, tipografia, raios, container e botões existentes. Narrativa e foto à esquerda e vídeo vertical à direita no desktop; ordem narrativa, foto e vídeo no celular. A fotografia é apresentada inteira, sem recorte. Nenhum seletor de layout existente foi alterado. A altura ocupada por textos pode variar conforme as novas strings; foi conferido que não há overflow horizontal ou CTA cortado nas larguras testadas.

A rotação dos banners e a assinatura Remotion não foram modificadas. Os resultados anteriores de timing e movimento continuam históricos; não houve nova auditoria de performance de campo ou conversão nesta etapa.

## Mídias

- Originais preservados em `assets/english-day/`, conferidos por SHA-256 com os arquivos fornecidos nos Downloads.
- Foto publicada localmente em `public/images/foxstage/english-day-cinema.webp`, codificada em WebP sem recorte.
- Vídeo em `public/videos/foxstage/english-day-cinema.mp4`, remuxado com faststart; áudio AAC e vídeo H.264 preservados sem re-encode. Duração de 84,57 segundos e dimensões de 464 × 816 pixels.
- Poster em `public/images/foxstage/english-day-video-poster.webp`, extraído no segundo 1 do material original.
- Player HTML nativo: controles, playsInline, preload none, sem autoplay e sem nova biblioteca.
- O teste de rede não registrou download do MP4 antes da reprodução. Após clique no controle nativo de play, o vídeo apresentou avanço real, dimensões corretas e readyState 4. A requisição Range retornou HTTP 206.
- Textos alternativos e legendas identificam a edição no cinema. As legendas já gravadas no vídeo permanecem; não foi produzida transcrição integral de áudio ou faixa de legendas selecionável. Não alegar conformidade integral de acessibilidade do material.

Proveniência dos originais: `docs/english-day-assets.json`. Derivados: `docs/assets-manifest.json`.

## Verificação

Build final e TypeScript passaram, com 109 tokens resolvidos. ESLint passou. Os cinco testes existentes de configuração de publicação e codificação/validação de WhatsApp passaram.

O teste de navegador em `work/copy-implementation-qa.cjs` passou com **23 verificações** e os dois banners nas larguras **320, 360, 390, 430, 560, 767, 768, 1024, 1280, 1440 e 1920px**. Conferidos: copy e metadados, ordem das regiões, foto/vídeo e proporções, creme oficial, ausência de overflow horizontal, CTA dentro do hero e com largura pelo conteúdo, centralização vertical no desktop, distância do header, foco por teclado, mensagem contextual do English Day, reprodução real do vídeo, entrega parcial do arquivo e conteúdo disponível sem JavaScript.

Durante a preparação do teste, o foco por teclado passou a ser exercitado com Tab, o play passou a clicar no controle nativo em vez do centro do poster, e a comparação de tokens passou a excluir exclusivamente as novas variáveis do English Day. Eram ajustes no roteiro de verificação; não houve mudança de comportamento do foco ou do player para contornar esses resultados.

A evidência estruturada está em `docs/copy-implementation-qa.json`. Capturas finais estão em `work/copy-review/`: `english-day-desktop.png`, `english-day-mobile.png` e `hero-desktop.png`.

O aviso de metadataBase permanece porque o domínio de publicação não foi configurado. Esta é uma prévia local; não houve publicação externa, analytics novo ou prova de aumento de conversão.

## Backup e manutenção

Os 22 arquivos anteriores afetados ou relacionados à aplicação foram preservados em `backups/2026-10-10-pre-copy-english-day/`, com hashes no manifest. Componentes e mídias novos não existiam nesse snapshot. Para uma reversão, restaurar os arquivos do manifest em uma cópia de trabalho e retirar a referência ao módulo novo; não sobrepor arquivos em andamento sem verificar diferenças.

O contrato foi atualizado para 2.5.0 em `design.json`, `design.md`, `foxstage-prompt-completo-nextjs.md`, `docs/IMPLEMENTATION.md`, `PRODUCT.md` e README. O JSON visual continua gerando `src/app/tokens.css`; não editar o derivado manualmente.

Nenhuma dependência, skill, plugin, MCP ou serviço novo foi recomendado ou instalado. Foram reaproveitados o runtime do projeto, Sharp, FFmpeg e Playwright já disponíveis.
