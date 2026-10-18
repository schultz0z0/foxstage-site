import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { legalReviewDate } from "@/content/privacy";
export function LegalPage({title,description,children}:{title:string;description:string;children:ReactNode}) {
  return <><Header variant="page" /><article className="legal-page container"><header className="legal-intro"><p className="eyebrow">Privacidade na Foxstage</p><h1 id="conteudo-principal" tabIndex={-1}>{title}</h1><p className="body-copy">{description}</p><p>Última atualização: {legalReviewDate}.</p></header><div className="legal-content">{children}</div></article></>;
}
