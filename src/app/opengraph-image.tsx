import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import design from "../../design.json";
import { site } from "@/content/site";

export const alt = site.openGraph.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(path.join(process.cwd(), "public/images/foxstage/brand/foxstage-horizontal-reverse.png"));
const display = await readFile(path.join(process.cwd(), "public/fonts/BebasNeue-400.ttf"));
const body = await readFile(path.join(process.cwd(), "public/fonts/SourceSans3-400.ttf"));

export default async function OpenGraphImage() {
  const palette = design.tokens.primitive.color;
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: 72, background: palette.ink950.$value, color: palette.cream50.$value }}>
    {/* Whole approved signature with external clear space. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`data:image/png;base64,${logo.toString("base64")}`} width={540} height={160} alt="" style={{ objectFit: "contain", marginBottom: 44 }} />
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bebas", fontSize: 82, lineHeight: 1.05 }}><span>INGLÊS PARA USAR</span><span>NO DIA A DIA.</span></div>
    <div style={{ fontFamily: "Source", fontSize: 26, marginTop: 24 }}>{site.openGraph.support}</div>
  </div>, { ...size, fonts: [
    { name: "Bebas", data: display, weight: 400, style: "normal" },
    { name: "Source", data: body, weight: 400, style: "normal" }
  ] });
}
