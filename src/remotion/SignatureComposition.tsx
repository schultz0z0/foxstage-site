import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SignatureArtwork } from "../components/motion/SignatureArtwork";
import { signature } from "./config";
import design from "../../design.json";

export type SignatureProps = { compact: boolean };

export function SignatureComposition({ compact }: SignatureProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shift = (start: number, end: number, from: number) => interpolate(frame, [start * fps, end * fps], [compact ? 8 + (from - 8) * signature.compactDisplacementRatio : from, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(.42, 0, .18, 1) });
  return <AbsoluteFill data-signature-frame={frame} style={{ background: design.tokens.primitive.color.ink950.$value }}>
    <SignatureArtwork compact={compact} offsets={[shift(0, 4.1, 4), shift(.12, 4.4, 44), shift(.24, 4.65, 30)]} />
  </AbsoluteFill>;
}
