import { site } from "@/content/site";
import { DesktopNavigation } from "@/components/ui/DesktopNavigation";
import { Brand } from "@/components/ui/Brand";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { RouteNavigation } from "@/components/ui/RouteNavigation";
import { getPageNavigation } from "@/lib/institutional-navigation";
import type { NavigationEntry } from "@/content/evolution/types";

export function Header({ variant = "hero", entries }: { variant?: "hero" | "page"; entries?: readonly NavigationEntry[] }) {
  const routes = entries ?? getPageNavigation();
  const routeMode = variant === "page" || routes.length > 0;
  const navigation = routes.length ? routes : [{ kind: "link" as const, label: "Início", href: "/" }];
  return <header className={`site-header${variant === "page" ? " site-header-page" : ""}`}>
    <div className="header-row">
      <Brand />
      {routeMode ? <RouteNavigation entries={navigation} /> : <DesktopNavigation />}
      <WhatsAppLink className="button button-primary header-contact" arrow={false}>{site.header.cta}</WhatsAppLink>
    </div>
    {routeMode ? <MobileMenu entries={navigation} /> : <MobileMenu links={site.navigation} />}
  </header>;
}
