import { useCurrentFrame, useVideoConfig } from "remotion";
import { EnglishDayArtwork } from "../components/motion/EnglishDayArtwork";
import { dayPhotoPose } from "./englishDayMotion";

export function EnglishDayComposition({ compact = false, photoSrc }: { compact?: boolean; photoSrc: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return <EnglishDayArtwork compact={compact} photoSrc={photoSrc} pose={dayPhotoPose(frame, fps, compact)} />;
}
