import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import design from "../../design.json";
import { site } from "@/content/site";

export const alt = "Foxstage: inglês para usar no dia a dia, com a fotografia do hero do site.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(path.join(process.cwd(), "public/images/foxstage/brand/foxstage-horizontal-reverse.png"));
const hero = site.hero.banners[0];
// ImageResponse does not embed the site's WebP source reliably; decode it locally.
const photograph = await sharp(await readFile(path.join(process.cwd(), "public", hero.image))).resize(1200, 630, { fit: "cover" }).png().toBuffer();
const display = await readFile(path.join(process.cwd(), "public/fonts/BebasNeue-400.ttf"));
const body = await readFile(path.join(process.cwd(), "public/fonts/SourceSans3-400.ttf"));

// A new URL also lets sharing crawlers request the photographic version afresh.
export function generateImageMetadata() {
  return [{ id: "hero-20261017-v2", alt, size, contentType }];
}

export default async function OpenGraphImage() {
  const palette = design.tokens.primitive.color;
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", background: palette.ink950.$value, color: palette.cream50.$value, position: "relative", overflow: "hidden" }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`data:image/png;base64,${photograph.toString("base64")}`} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover", objectPosition: "center" }} />
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(90deg, rgba(16,19,20,0.98) 0%, rgba(16,19,20,0.91) 27%, rgba(16,19,20,0.52) 47%, rgba(16,19,20,0.08) 72%)" }} />
    <div style={{ position: "absolute", top: 38, bottom: 54, left: 54, width: 510, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {/* Whole approved signature, including its clear space, at its minimum horizontal width. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width={360} height={107} alt="" style={{ objectFit: "contain", marginBottom: 24 }} />
      <div style={{ fontFamily: "Source", fontSize: 17, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 12 }}>{hero.eyebrow}</div>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bebas", fontSize: 88, lineHeight: 1.02, textTransform: "uppercase" }}>
        <span>Inglês para</span><span>usar no</span><span>dia a dia.</span>
      </div>
      <div style={{ fontFamily: "Source", fontSize: 23, lineHeight: 1.3, width: 360, marginTop: 20 }}>{site.openGraph.support}</div>
    </div>
  </div>, { ...size, fonts: [
    { name: "Bebas", data: display, weight: 400, style: "normal" },
    { name: "Source", data: body, weight: 400, style: "normal" }
  ] });
}
