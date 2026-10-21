import assert from "node:assert/strict";

// Optional second argument allows checking an isolated server with the public canonical.
const origin = new URL(process.argv[2] || "https://foxstage.com.br");
const canonical = new URL(process.argv[3] || origin);
const paths = ["/", "/cursos/ingles-em-grupo", "/cursos/ingles-individual", "/a-foxstage", "/english-day", "/contato"];
const request = async pathname => {
  const response = await fetch(new URL(pathname, origin), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${pathname}: HTTP ${response.status}`);
  return response;
};

for (const pathname of paths) {
  const html = await (await request(pathname)).text();
  const canonicalHref = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  assert.ok(canonicalHref, `${pathname}: canonical ausente`);
  assert.equal(new URL(canonicalHref).href, new URL(pathname, canonical).href, `${pathname}: canonical`);
  assert.ok(!html.includes('content="noindex'), `${pathname}: indexação`);
  for (const destination of paths.slice(1)) assert.ok(html.includes(`href="${destination}"`), `${pathname}: link ${destination}`);
  console.log(`OK ${pathname}`);
}
const health = await request("/api/health");
assert.deepEqual(await health.json(), { status: "ok" });
const robots = await (await request("/robots.txt")).text();
assert.ok(robots.includes("Allow: /"));
assert.ok(robots.includes(new URL("/sitemap.xml", canonical).href));
const sitemap = await (await request("/sitemap.xml")).text();
for (const pathname of paths) assert.ok(sitemap.includes(`<loc>${new URL(pathname, canonical).href}</loc>`));
const image = await request("/opengraph-image/hero-20261020-brand-v11");
assert.ok(image.headers.get("content-type")?.includes("image/png"));
const png = Buffer.from(await image.arrayBuffer());
assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
const optimized = await request("/_next/image?url=%2Fimages%2Ffoxstage%2Fhero-ingles.webp&w=640&q=75");
assert.ok(optimized.headers.get("content-type")?.startsWith("image/"), "Otimização de imagens no container");
const video = await fetch(new URL("/videos/foxstage/english-day-cinema.mp4", origin), { headers: { Range: "bytes=0-1023" }, signal: AbortSignal.timeout(20000) });
assert.equal(video.status, 206, "Vídeo deve aceitar requisições parciais");
await video.body.cancel();
console.log("OK healthcheck, robots, sitemap, Open Graph, otimização de imagem e vídeo com Range.");
