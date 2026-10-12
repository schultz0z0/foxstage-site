# English Day — composição 2.6.0

Implementado em 11 de outubro de 2026, conforme a solicitação de tornar esta seção mais expressiva. A copy aprovada e os arquivos reais fornecidos continuam intactos.

## Direção

O fundo laranja `#F65A0B` cria uma pausa na sequência de superfícies creme. Texto e CTA usam o preto `#101314`; a fotografia recebe uma moldura de creme claro `#FFF8EC`. Cores e fontes vêm do manual B. O celular tem acabamento preto simples, sem marca de fabricante ou elementos que cubram o vídeo.

No desktop, a narrativa à esquerda fica alinhada ao conjunto foto/celular à direita. O registro do grupo mantém o quadro 4:3 completo, com leve inclinação de três graus. A legenda “Edição no cinema” identifica uma experiência confirmada. Em tablet, o conjunto vem abaixo do texto; no celular, o vídeo vem antes da foto, com espaço reservado para as legendas e controles.

## Movimento e reprodução

A entrada Remotion aproxima a foto da posição final e apresenta o título da edição. A curva desacelera continuamente, sem quique. O deslocamento máximo é 52 unidades do canvas e a entrada termina em 1,6 segundo; o Player tem 120 quadros a 60fps e para no quadro 119. Não há loop ou controles para essa animação.

O vídeo é HTML nativo, independente da linha do tempo Remotion. Isso permite assistir ao registro inteiro depois que a entrada termina. Inicia sem som quando 35% do vídeo entra na tela, pausa fora da tela ou com a aba oculta e termina sem loop. Os controles nativos continuam permitindo pausa, som e tela cheia. A pausa manual permanece ao sair e voltar. Se o navegador bloquear a reprodução automática, os controles e o poster continuam disponíveis.

O Player é carregado perto da seção, a 160px. O vídeo usa `preload="none"`; sua reprodução passa a requisitar a mídia quando entra na tela. Movimento reduzido desliga o Player e o autoplay, preservando reprodução manual. A mesma arte final aparece no servidor, sem JavaScript e caso a melhoria Remotion falhe. A fotografia nunca depende exclusivamente do carregamento da animação.

## Arquivos

- `src/components/sections/EnglishDay.tsx`: conteúdo e CTA no servidor.
- `src/components/motion/EnglishDayMedia.tsx`: observadores, vídeo e preferência de movimento.
- `src/components/motion/EnglishDayArtwork.tsx`: arte compartilhada estática e animada.
- `src/components/motion/EnglishDayPlayer.tsx`: entrada única e parada final.
- `src/remotion/EnglishDayComposition.tsx`: interpolação por quadro.
- `src/remotion/Root.tsx`: composições desktop e mobile disponíveis no Studio.

Reaproveitados os plugins Remotion e Impeccable já instalados; nenhuma dependência, skill ou ferramenta nova foi criada ou instalada. A consulta histórica ao Setup continua registrada como indisponível por autenticação, sem presumir catálogo vazio.

## Validação

Build, TypeScript, lint e os cinco testes existentes passaram. `work/english-day-qa.cjs` verificou autoplay do MP4 real, som inicialmente desligado, pausa fora da tela, retomada, pausa manual, execução única do Remotion, ausência de erros de execução, ausência de JavaScript e movimento reduzido. Também verificou 12 larguras entre 320 e 1920px, sem rolagem horizontal ou sobreposição entre foto e legenda do celular. Resultado em `docs/english-day-motion-qa.json`; capturas em `work/english-day-motion/desktop.png` e `mobile.png`.

O CSS das demais regiões foi comparado ao backup e permaneceu igual. Backup com hashes em `backups/2026-10-10-pre-english-day-motion/manifest.json`. As composições foram abertas no Studio e o caminho de importação compartilhado foi verificado em ambos os ambientes.

A verificação de reprodução foi feita em Chromium. As restrições de autoplay de cada navegador continuam atendidas pelo modo sem som e pelo controle nativo de reprodução. As legendas gravadas no vídeo original foram preservadas; não foi criada uma transcrição integral ou faixa de legendas selecionável.
