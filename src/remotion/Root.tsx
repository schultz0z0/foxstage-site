import { Composition, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import { SignatureComposition } from "./SignatureComposition";
import { EnglishDayComposition } from "./EnglishDayComposition";
import { DAY_FPS, DAY_FRAMES } from "./englishDayMotion";

void loadFont({ family: "Foxstage Display", url: staticFile("fonts/bebas-neue-latin-400-normal.woff2"), weight: "400" });
void loadFont({ family: "Foxstage Reading", url: staticFile("fonts/source-sans-3-latin-wght-normal.woff2"), weight: "400 700" });

export function RemotionRoot() {
  return <>
    <Composition id="FoxstageSignature" component={SignatureComposition} width={1000} height={640} fps={60} durationInFrames={300} defaultProps={{ compact: false }} />
    <Composition id="FoxstageSignatureMobile" component={SignatureComposition} width={1000} height={640} fps={60} durationInFrames={300} defaultProps={{ compact: true }} />
    <Composition id="FoxstageEnglishDay" component={EnglishDayComposition} width={680} height={570} fps={DAY_FPS} durationInFrames={DAY_FRAMES} defaultProps={{ compact: false, photoSrc: staticFile("images/foxstage/english-day-cinema.webp") }} />
    <Composition id="FoxstageEnglishDayMobile" component={EnglishDayComposition} width={360} height={810} fps={DAY_FPS} durationInFrames={DAY_FRAMES} defaultProps={{ compact: true, photoSrc: staticFile("images/foxstage/english-day-cinema.webp") }} />
  </>;
}
