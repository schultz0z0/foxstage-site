import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/#inicio" aria-label="Foxstage, início" className={`brand ${footer ? "brand-footer" : ""}`}>
    <picture>
      {footer && <source media="(max-width: 479px)" srcSet={site.logoCompactReverse} />}
      <Image src={footer ? site.logoReverse : site.logoCompact} width={footer ? 945 : 729} height={footer ? 280 : 190} alt="" unoptimized />
    </picture>
  </Link>;
}
