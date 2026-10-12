import type { CourseId, CoursePageData } from "./types.ts";

export const coursePages: Record<CourseId, CoursePageData> = {
  group: {
    id: "group", status: "draft",
    review: { factsConfirmed: true, copyApproved: false, mediaApproved: true },
    seo: {
      title: "Curso de inglês online em grupo",
      description: "Aulas de inglês online ao vivo em grupo, com conversação e situações do dia a dia. Conheça a Foxstage, do Rio de Janeiro para todo o Brasil.",
      pathname: "/cursos/ingles-em-grupo",
    },
    heading: "Inglês ao vivo. Em grupo.",
    titleLines: ["Inglês ao vivo.", "Em grupo."],
    introduction: "Aprender com outras pessoas e colocar o inglês em uso. Nas aulas online ao vivo da Foxstage, a conversação faz parte do aprendizado.",
    cta: "Conhecer aulas em grupo",
    practicalFacts: [
      { label: "Modalidade", value: "Online ao vivo" },
      { label: "Formato", value: "Em grupo" },
      { label: "Foco", value: "Conversação e inglês do dia a dia" },
      { label: "Atendimento", value: "Todo o Brasil" },
    ],
    image: { src: "/images/foxstage/curso-ingles.jpg", alt: "Pessoas conversando com caderno e notebook; fotografia ilustrativa de banco de imagens.", credit: "Fotografia ilustrativa", position: "center" },
    sections: [
      { id: "como-sao-as-aulas", title: "A conversa faz parte da aula.", paragraphs: [
        "As aulas são online, ao vivo e em grupo. O foco do método Foxstage é usar o idioma em situações reais, com prática de fala e escuta.",
        "Estudar uma língua também é participar: ouvir outras pessoas, tentar se expressar e continuar a conversa. A proposta é dar espaço para essa prática, sem medo de errar.",
      ] },
      { id: "ingles-do-dia-a-dia", title: "Inglês para o seu cotidiano.", paragraphs: [
        "O objetivo é aproximar o que você aprende do inglês que quer usar fora da aula. Conversação e situações do dia a dia orientam a proposta de ensino.",
        "Você não precisa esperar para falar um inglês perfeito. O erro faz parte do aprendizado e da prática do idioma.",
      ] },
      { id: "espaco-para-praticar", title: "O erro tem espaço.", paragraphs: ["Tentar se expressar faz parte da prática. A proposta da Foxstage é usar o inglês sem medo de errar: falar, ouvir e seguir participando da conversa."] },
    ],
    faq: [
      { question: "As aulas são gravadas?", answer: "O formato apresentado aqui é de aulas online ao vivo em grupo. Para tirar dúvidas sobre a rotina das aulas e os materiais, fale com a Foxstage." },
      { question: "Posso estudar de outra cidade?", answer: "Sim. As aulas online ao vivo atendem alunos de todo o Brasil. Os encontros presenciais do English Day acontecem na cidade do Rio de Janeiro." },
      { question: "Como consulto horários e valores?", answer: "Fale com a escola pelo WhatsApp para conhecer as condições das aulas em grupo e tirar suas dúvidas." },
      { question: "Existe a opção de aula individual?", answer: "Sim. A Foxstage também oferece aulas individuais personalizadas. Você pode conhecer esse formato na página de inglês individual." },
    ],
  },
  individual: {
    id: "individual", status: "draft",
    review: { factsConfirmed: true, copyApproved: false, mediaApproved: true },
    seo: {
      title: "Aulas individuais de inglês online",
      description: "Conheça as aulas individuais de inglês da Foxstage, com ensino personalizado, conversação e situações reais. Atendimento online em todo o Brasil.",
      pathname: "/cursos/ingles-individual",
    },
    heading: "Seu inglês. Aula individual.",
    titleLines: ["Seu inglês.", "Aula individual."],
    introduction: "Um formato individual, com ensino personalizado para você. Converse com a Foxstage sobre o inglês que quer usar e conheça a proposta das aulas.",
    cta: "Conhecer aulas individuais",
    practicalFacts: [
      { label: "Modalidade", value: "Online ao vivo" },
      { label: "Formato", value: "Individual" },
      { label: "Ensino", value: "Personalizado" },
      { label: "Atendimento", value: "Todo o Brasil" },
    ],
    image: { src: "/images/foxstage/hero-ingles.webp", alt: "Duas pessoas fictícias conversando e estudando; imagem ilustrativa gerada por IA.", credit: "Imagem ilustrativa gerada por IA", position: "center" },
    sections: [
      { id: "aula-individual", title: "Um formato voltado a você.", paragraphs: [
        "A opção individual é a modalidade de ensino personalizado da Foxstage. Em vez de participar de uma aula em grupo, você escolhe um formato individual.",
        "Conte à escola o que você quer aprender e em quais situações gostaria de usar o inglês. Essa conversa ajuda você a entender a proposta antes de escolher suas aulas.",
      ] },
      { id: "pratica-e-conversacao", title: "O foco continua sendo usar o inglês.", paragraphs: [
        "A conversação, a fala e a escuta em situações reais fazem parte do método Foxstage. No formato individual, o ensino é personalizado para a pessoa.",
        "Praticar inclui tentar, errar e tentar de novo. A proposta da escola é criar espaço para usar o idioma durante o aprendizado.",
      ] },
      { id: "seu-objetivo", title: "Comece pelo que você quer usar.", paragraphs: ["No dia a dia, em uma viagem ou no trabalho: conte à escola em quais situações gostaria de usar o inglês. Essa conversa ajuda você a conhecer a proposta do formato individual e tirar suas dúvidas."] },
    ],
    faq: [
      { question: "Qual é a diferença para as aulas em grupo?", answer: "No grupo, você participa de aulas online ao vivo com outras pessoas. A opção individual tem formato individual e ensino personalizado." },
      { question: "Como funciona a personalização?", answer: "A Foxstage oferece ensino personalizado nas aulas individuais. Converse com a escola sobre seu objetivo para conhecer como esse formato pode atender ao que você quer aprender." },
      { question: "Como combino as aulas?", answer: "O primeiro contato é pelo WhatsApp. Fale com a Foxstage para consultar horários, valores e condições do formato individual." },
    ],
  },
};
