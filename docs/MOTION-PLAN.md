# Correção da assinatura Foxstage 2.1.1

O usuário pediu autoplay sem controles e movimento fluido e contínuo. A assinatura pública “Aprenda inglês. Fale inglês. Viva o inglês.” toca uma vez por montagem da página, ao atingir 40% de visibilidade. São 300 quadros a 60fps, cinco segundos, sem áudio ou loop. As três traduções se sobrepõem até 4,65s; termina no quadro 299, sem reinício automático.

O Player carrega perto do painel, aguarda o ref e as fontes e começa silenciado para não depender de interação que libere áudio. Fora de vista ou com documento oculto, pausa e retoma do mesmo ponto ao voltar. Não há botão ou controle de pausa/repetição. Preferência por movimento reduzido, falta de JavaScript e falha de carregamento mantêm a arte estática e o contato.

Verificar autoplay sem clique/teclado ao rolar e em navegação direta desktop/mobile, continuidade do deslocamento, parada final, ausência de controles, oito larguras, preferência por movimento reduzido e fallbacks. A ocultação de documento em Chromium headless é simulada e deve ser registrada assim.

Reaproveitamento: Remotion e Impeccable já instalados. Consulta setup-agent inconclusiva por OAuth; nenhum novo recurso foi instalado. Backup original validado: backups/2026-10-10_1639-pre-remotion.
