# Aplicação do manual de marca — Foxstage 2.2.0

Revisão de 10 de outubro de 2026, após autorização do usuário para aplicar a direção B. Referência: `assets/Identidade visual Foxstage/manual-de-marca.pdf`, com 12 páginas, e os arquivos do mesmo kit. O PDF foi lido e suas páginas renderizadas foram conferidas visualmente. Seu conteúdo corresponde ao kit emitido anteriormente em `assets/brand/foxstage-b-v1/`.

## Resultado

A aplicação atual atende aos parâmetros de marca verificados: geometria, versões cromáticas, proporção, tamanho mínimo, área de proteção, paleta, famílias tipográficas e tratamento de imagens. O layout editorial aprovado permanece: hero, apresentação, prática, atalhos, curso, contato e rodapé. A aprovação da nova marca pertence a este projeto; não é atribuída à pesquisa original do Instagram.

| Parâmetro do manual | Aplicação no website | Verificação |
| --- | --- | --- |
| Mestre em curvas, sem redigitar o nome | `Brand` exibe a assinatura completa em SVG; retirados emblema raster circular e nome separado em CSS. | SVGs públicos copiados sem alteração; hashes no manifesto de assets. |
| Assinatura principal, mínimo de 360px | Rodapé horizontal invertido a 360px; compartilhamento horizontal invertido a 540px. | Dimensões reais de navegador e imagem Open Graph de 1200x630. |
| Compacta, mínimo de 160px | Header a 200px no desktop/tablet e 160px no celular. Rodapé a 240px abaixo de 480px de viewport. | Variante escolhida pelo navegador e largura renderizada, em 12 larguras. |
| Proteção mínima: 1/4 da altura visível do símbolo | Padding externo de 12px no header desktop/tablet, 10px no celular; 22px no rodapé horizontal e 16px no compacto. | Padding superior ao mínimo proporcional em todas as aplicações verificadas; canvas transparente não substitui esse padding. |
| Escala proporcional; sem filtros, recortes ou efeitos na logo | Imagem com largura definida e altura automática; sem círculo, máscara, sombra ou recoloração. | Razão de aspecto, estilos calculados e capturas desktop/mobile. A sombra do header pertence ao recipiente, não à arte. |
| Variante colorida no claro, invertida no preto | Header e área principal da 404 coloridos; rodapé e Open Graph invertidos. | Inspeção visual das superfícies e arquivos utilizados. |
| Paleta aprovada | Laranja `#F65A0B`, preto `#101314`, creme `#F3EFE8`, creme claro `#FFF8EC`, branco `#FFFFFF`, destaque de leitura `#A83A08`; apoio `#FFB077` conforme tokens do kit. | Valores do kit comparados a `design.json`; botão e fundo do rodapé conferidos no CSS calculado. |
| Texto escuro sobre laranja | CTAs usam preto sobre laranja. Texto pequeno de destaque em superfície clara usa laranja de leitura. | O manual registra 5,67:1 para preto sobre laranja e 5,6:1 para laranja de leitura sobre creme; inspeção dos tokens e dos botões reais. |
| Source Sans 3 na leitura; Bebas Neue 400 nos títulos | Fontes locais originais preservadas; Open Graph também usa os TTFs do kit. Logo permanece em curvas. | Arquivos e configuração `next/font/local`, fontes carregadas e tipografia das capturas. |
| Favicon e ícones de sistema | ICO 16/32/48 e SVG do microícone; PNG 512 e Apple 180 com avatar laranja e símbolo padrão. | Respostas HTTP 200 e hashes idênticos aos arquivos locais; Apple obtido por redução proporcional. |
| Fotografias e conteúdo | Legendas ilustrativas e proveniência mantidas. Nenhuma logo foi aplicada a roupas ou objetos para sugerir vínculo com a escola. | Conferência da página; conteúdo e imagens não foram substituídos. |

Os neutros funcionais e a cor de hover `#DE4A06` são estados da interface já aprovados no contrato, não novas cores para recolorir a logo. Não foi necessário trocar a paleta principal ou as famílias tipográficas, pois já correspondiam ao kit.

## Ajustes realizados

- Substituição da marca antiga no header, rodapé, página 404, referência de logo nos dados estruturados e imagem de compartilhamento.
- Aplicação dos ícones de aba, SVG, PNG e toque por convenções de arquivos do Next.js instalado.
- Rodapé com coluna de marca de pelo menos 404px no desktop, incluindo proteção externa. No tablet, a marca ocupa ambas as colunas; no celular, os grupos ficam empilhados.
- Gerador de tokens atualizado para aceitar a expressão `minmax()` da coluna de marca, mantendo `design.json` como fonte das medidas.
- Prompt e arquivos de design atualizados para 2.2.0, com regras atuais e preservação dos registros históricos.

## Evidências e limites

`docs/brand-qa.json` registra 320, 360, 390, 430, 479, 480, 768, 1024, 1150, 1280, 1440 e 1920px, variantes, proporções, proteção, ausência de overflow, menus, colunas do rodapé, ícones, Open Graph e 404. Não foram registrados erros JavaScript. Capturas revisadas: `work/brand-site-review/site-320.png`, `site-390.png`, `site-1440.png` e `opengraph.png`.

Build de produção, TypeScript incluído no build, lint e os cinco testes de domínio/WhatsApp passaram. `npm run test:motion` passou após a migração: autoplay sem interação, progressão contínua, ausência de controles, parada final, larguras e fallbacks. O relatório de movimento atual está em `docs/motion-qa.json`.

Esta revisão verifica a aplicação digital da marca; não certifica acessibilidade integral, impressão ou novos resultados de Core Web Vitals. A prévia continua local e sem indexação. O aviso de `metadataBase` depende da configuração do domínio real e já existia antes desta aplicação.

O kit fornecido, o PDF e seus manifestos não foram alterados. A nota do manual que descreve a migração como etapa futura registra a situação na emissão da versão 1.0; esta auditoria registra sua execução posterior no website 2.2.0. A logo antiga e os backups anteriores continuam preservados.
