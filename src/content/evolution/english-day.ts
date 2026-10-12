import type { EditorialRecord, PageSEO, FAQItem } from "./types.ts";
export const englishDayPage = {
  status: "draft", review: { factsConfirmed: true, copyApproved: false, mediaApproved: true },
  seo: { title: "English Day: inglês na prática no Rio de Janeiro", description: "Um dia inteiro em inglês no Rio de Janeiro. Conheça o encontro presencial da Foxstage, realizado a cada quatro meses, e veja os registros da edição no cinema.", pathname: "/english-day", image: "/images/foxstage/english-day-cinema.webp" } satisfies PageSEO,
  heroDescription: "Um encontro presencial no Rio de Janeiro para conviver com outros alunos e usar o inglês em situações reais. Organizado e custeado pela Foxstage, a cada quatro meses.",
  mediaTitle: "O inglês. Fora da tela.",
  mediaParagraphs: ["Uma edição no cinema, com os alunos reunidos e a comunicação em inglês durante todo o dia. A foto e o vídeo mostram esse encontro real da Foxstage.", "O English Day é uma oportunidade de conversar, conviver com outras pessoas e colocar o idioma em uso fora das aulas. A atividade muda a cada edição."],
  details: [
    { label: "Onde acontece", value: "Rio de Janeiro/RJ" },
    { label: "Quando acontece", value: "A cada quatro meses" },
    { label: "Quem organiza", value: "A Foxstage organiza e custeia o encontro" },
    { label: "Como se conversa", value: "Em inglês durante todo o dia" },
  ],
  faq: [
    { question: "Preciso morar no Rio para fazer as aulas?", answer: "Não. As aulas online ao vivo atendem todo o Brasil. O English Day é um encontro presencial na cidade do Rio de Janeiro." },
    { question: "A atividade é sempre a mesma?", answer: "Não. A Foxstage define a atividade de cada edição. O encontro registrado na foto e no vídeo desta página foi no cinema." },
    { question: "Como sei as condições para participar?", answer: "Converse com a Foxstage para saber sobre participação e detalhes do encontro. Esta página apresenta a experiência; não é uma inscrição para uma próxima edição." },
  ] satisfies readonly FAQItem[],
} satisfies EditorialRecord & { seo: PageSEO; heroDescription: string; mediaTitle: string; mediaParagraphs: readonly string[]; details: readonly { label: string; value: string }[]; faq: readonly FAQItem[] };
