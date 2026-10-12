import type { EditorialRecord, PageSEO } from "./types.ts";
export const schoolPage = {
  status: "draft", review: { factsConfirmed: true, copyApproved: false, mediaApproved: true },
  seo: { title: "Escola de inglês Foxstage no Rio de Janeiro", description: "Conheça a Foxstage: escola de inglês do Rio de Janeiro, com aulas online ao vivo em todo o Brasil, conversação e English Day presencial no Rio.", pathname: "/a-foxstage" } satisfies PageSEO,
  heading: "Do Rio, para o seu dia a dia.",
  introduction: "A Foxstage é uma escola de inglês do Rio de Janeiro. Nossas aulas online ao vivo chegam a todo o Brasil, com foco em conversação e uso do idioma em situações reais.",
  teacher: { name: "Felipe Pontes", role: "Professor de inglês", description: "Felipe Pontes ensina na Foxstage. A proposta das aulas é praticar conversação e usar o inglês em situações reais, com opção de ensino individual personalizado." },
  principles: [
    { title: "Usar o que você aprende.", text: "Falar, ouvir e participar de situações do cotidiano são o centro da nossa proposta. O inglês é uma ferramenta para conversar." },
    { title: "Ter espaço para tentar.", text: "O erro faz parte do aprendizado. A proposta da Foxstage é praticar sem medo de errar, para que você participe e siga usando o idioma." },
    { title: "Escolher seu formato.", text: "As aulas acontecem online ao vivo em grupo, com opção individual personalizada. São duas formas de estudar, com a mesma atenção ao inglês em uso." },
  ],
} satisfies EditorialRecord & { seo: PageSEO; heading: string; introduction: string; teacher: { name: string; role: string; description: string }; principles: readonly { title: string; text: string }[] };
