import { site } from "@/content/site";
import { DesktopNavigation } from "@/components/ui/DesktopNavigation";
import { Brand } from "@/components/ui/Brand";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Header() {
  return <header className="site-header">
    <div className="header-row">
      <Brand />
      <DesktopNavigation />
      <WhatsAppLink className="button button-primary header-contact" arrow={false}>{site.header.cta}</WhatsAppLink>
    </div>
    <MobileMenu links={site.navigation} />
  </header>;
}
