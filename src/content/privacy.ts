export const privacyContact = "atendimento@foxstage.com.br";
export const legalReviewDate = "17 de outubro de 2026";
// Identificação cadastral provisória solicitada pelo responsável: NÃO publicar como fato.
export const pendingLegalIdentity = { legalName: "Foxstage LTDA", cnpj: "PENDENTE", confirmed: false };
export const privacyRecord = {status:"published" as const,review:{factsConfirmed:true,copyApproved:true,mediaApproved:true}};
export const legalPages = {
  privacy: {title:"Política de privacidade",description:"Como a Foxstage trata dados de navegação, contatos e preferências de cookies. Conheça seus direitos e nosso canal de atendimento.",pathname:"/privacidade"},
  cookies: {title:"Política de cookies",description:"Conheça o armazenamento necessário e escolha se autoriza análise de visitas e publicidade no site da Foxstage.",pathname:"/politica-de-cookies"},
};
