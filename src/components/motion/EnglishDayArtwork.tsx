import type { CSSProperties } from "react";

export type EnglishDayArtworkProps = { compact?: boolean; photoSrc: string; pose?: { x: number; y: number; rotation: number; scale: number; opacity: number } };

/** Shared final artwork keeps SSR, reduced motion and the Player in the same composition. */
export function EnglishDayArtwork({ compact = false, photoSrc, pose }: EnglishDayArtworkProps) {
  const width = compact ? 360 : 680;
  const height = compact ? 810 : 570;
  const x = compact ? 12 : 34;
  const y = compact ? 490 : 162;
  const photoWidth = compact ? 336 : 350;
  const photoHeight = photoWidth * 3 / 4;
  const { x: offsetX, y: offsetY, rotation, scale, opacity } = pose ?? { x: 0, y: 0, rotation: compact ? 0 : -6, scale: 1, opacity: 1 };
  const centerX = x + photoWidth / 2;
  const centerY = y + photoHeight / 2;
  const reading: CSSProperties = { fontFamily: 'var(--semantic-font-reading, "Foxstage Reading", sans-serif)' };
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" fill="none" style={{ overflow: "visible" }}>
    <g opacity={opacity} transform={`translate(${offsetX} ${offsetY}) translate(${centerX} ${centerY}) rotate(${rotation}) scale(${scale}) translate(${-centerX} ${-centerY})`}>
      <rect x={x - 10} y={y - 10} width={photoWidth + 20} height={photoHeight + 58} rx="3" fill="var(--primitive-color-cream50, #FFF8EC)" />
      <image href={photoSrc} x={x} y={y} width={photoWidth} height={photoHeight} preserveAspectRatio="xMidYMid meet" />
      <text x={x + 5} y={y + photoHeight + 30} fontSize="17" fontWeight="600" fill="var(--semantic-color-text, #101314)" style={reading}>English Day: edição no cinema.</text>
    </g>
  </svg>;
}
