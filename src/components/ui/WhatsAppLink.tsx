import type { ReactNode } from "react";
import { site, type MessageOrigin } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "./Icon";

export function WhatsAppLink({ children, origin = "introduction", className = "button button-primary", arrow = true }: {
  children: ReactNode;
  origin?: MessageOrigin;
  className?: string;
  arrow?: boolean;
}) {
  return <a className={className} href={whatsappUrl(site.whatsapp, site.messages[origin])} target="_blank" rel="noopener noreferrer" data-contact-origin={origin}>
    {children}{arrow && <Icon name="arrow" />}<span className="sr-only"> (abre o WhatsApp em nova aba)</span>
  </a>;
}
