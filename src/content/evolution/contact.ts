import type { EditorialRecord, PageSEO } from "./types.ts";
export const contactPage = {
  status: "published", review: { factsConfirmed: true, copyApproved: true, mediaApproved: true },
  seo: { title: "Contato com a Foxstage", description: "Fale com a Foxstage pelo WhatsApp. Tire dúvidas sobre aulas de inglês online em grupo ou individuais e sobre o English Day no Rio de Janeiro.", pathname: "/contato" } satisfies PageSEO,
  heading: "Vamos falar do seu inglês?",
  introduction: "Conte o que você quer aprender. Pelo WhatsApp, você pode conhecer os formatos das aulas e consultar horários, valores e condições com a escola.",
} satisfies EditorialRecord & { seo: PageSEO; heading: string; introduction: string };
