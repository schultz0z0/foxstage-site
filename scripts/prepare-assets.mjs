import { mkdir, copyFile, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const directory = path.join(root, "public/images/foxstage");
await mkdir(directory, { recursive: true });
await copyFile(path.join(root, "assets/logo.png"), path.join(directory, "logo.png"));
const photos = [
  { name: "sobre-foxstage.jpg", id: "8199667", author: "Yan Krukau", slug: "man-and-woman-studying-while-writing-on-a-notebook", width: 1200, role: "about", alt: "Duas pessoas consultam materiais de estudo em uma biblioteca; fotografia ilustrativa." },
  { name: "pratica-idioma.jpg", id: "8374299", author: "AI25.Studio AI GENERATIVE (identificador exibido na página de origem em 2026-10-10)", slug: "a-woman-reading-a-book", width: 1000, role: "practice", alt: "Pessoa estudando e fazendo anotações em uma mesa; imagem de banco ilustrativa." },
  { name: "ensino-personalizado.jpg", id: "6549594", author: "Tima Miroshnichenko", slug: "a-woman-researching-and-writing-on-her-notebook", width: 1000, role: "practice", alt: "Detalhe de anotações e livros durante o estudo; fotografia ilustrativa." },
  { name: "comunicacao-oral.jpg", id: "6321929", author: "cottonbro studio", slug: "man-and-woman-sitting-at-table-having-a-conversation", width: 1200, role: "practice", alt: "Pessoa conversando à mesa com um computador; fotografia ilustrativa." },
  { name: "curso-ingles.jpg", id: "6147045", author: "Keira Burton", slug: "diverse-young-students-discussing-education-at-table-with-laptop", width: 1400, role: "course", alt: "Pessoas trocando ideias com caderno e notebook; fotografia ilustrativa." }
];
const results = await Promise.all(photos.map(async photo => {
  const url = `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=${photo.width}&q=85`;
  const response = await fetch(url);
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`Photo download failed ${photo.id}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(directory, photo.name), bytes);
  return { ...photo, source: `https://www.pexels.com/photo/${photo.slug}-${photo.id}/`, download: url, license: "https://www.pexels.com/license/", use: "Fotografia de banco, ilustrativa; não representa alunos, equipe ou instalações da Foxstage.", bytes: bytes.length, retrievedAt: "2026-10-10" };
}));
await mkdir(path.join(root, "docs"), { recursive: true });
const manifestPath = path.join(root, "docs/assets-manifest.json");
const existing = await readFile(manifestPath, "utf8").then(JSON.parse).catch(error => {
  if (error.code === "ENOENT") return {};
  throw error;
});
await writeFile(manifestPath, JSON.stringify({ ...existing, logo: { source: "assets/logo.png", treatment: "Original raster copied without edits" }, photos: results }, null, 2) + "\n");
console.log(`Prepared original logo and ${results.length} licensed illustrative photos.`);
