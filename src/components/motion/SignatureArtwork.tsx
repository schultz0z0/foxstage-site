import design from "../../../design.json";

export function SignatureArtwork({ offsets = [8, 8, 8], compact = false }: { offsets?: number[]; compact?: boolean }) {
  const line = (top: number, left: number): React.CSSProperties => ({ position: "absolute", top: `${top}%`, left: "8%", translate: `${left - 8}cqw 0`, display: "flex", alignItems: "baseline", gap: "2cqw", whiteSpace: "nowrap" });
  const word: React.CSSProperties = { fontFamily: 'var(--font-display, "Foxstage Display")', fontSize: "15.5cqw", fontWeight: 400, lineHeight: 1, textTransform: "uppercase" };
  const suffix: React.CSSProperties = { fontFamily: 'var(--font-body, "Foxstage Reading")', fontSize: compact ? "5cqw" : "var(--signature-suffix-size, 2.8cqw)", lineHeight: 1, color: design.tokens.primitive.color.cream50.$value };
  return <div className="signature-artwork" style={{ position: "relative", width: "100%", height: "100%", containerType: "inline-size", color: design.tokens.primitive.color.cream50.$value }}>
    <div style={line(4, offsets[0])}><span style={word}>Aprenda</span><span style={suffix}>inglês.</span></div>
    <div style={line(35, offsets[1])}><span style={{ ...word, color: design.tokens.primitive.color.orange500.$value }}>Fale</span><span style={suffix}>inglês.</span></div>
    <div style={line(66, offsets[2])}><span style={word}>Viva</span><span style={suffix}>o inglês.</span></div>
  </div>;
}
