export function buildLlmsText(origin: URL): string {
  const url=(path:string)=>new URL(path,origin).href;
  return `# Foxstage

> Escola de inglês do Rio de Janeiro/RJ com aulas online ao vivo para todo o Brasil. Foco em conversação e situações reais do dia a dia.

## Aulas e escola
- [Início](${url("/")}): apresentação da proposta de ensino e formas de contato.
- [Inglês em grupo](${url("/cursos/ingles-em-grupo")}): aulas online ao vivo em grupo.
- [Inglês individual](${url("/cursos/ingles-individual")}): aulas individuais com ensino personalizado.
- [A Foxstage](${url("/a-foxstage")}): escola e professor Felipe Pontes.
- [English Day](${url("/english-day")}): encontro presencial entre alunos no Rio de Janeiro, organizado e custeado pela Foxstage a cada quatro meses, com comunicação em inglês durante o dia. A edição registrada no site foi ao cinema.
- [Contato](${url("/contato")}): canais oficiais para consultar horários, valores e condições atuais.

## Privacidade
- [Política de privacidade](${url("/privacidade")})
- [Política de cookies](${url("/politica-de-cookies")})

## Limites das informações
O site não publica garantia de fluência, preços, certificações ou duração total de curso. Não informa endereço de escola presencial aberta ao público. English Day é uma atividade presencial; as aulas são online. Consulte a escola para disponibilidade e condições.

## Referências técnicas
- [Sitemap](${url("/sitemap.xml")})
- [Robots](${url("/robots.txt")})
`;
}
