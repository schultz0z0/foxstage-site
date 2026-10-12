import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const design = JSON.parse(await readFile(new URL("../design.json", import.meta.url), "utf8"));
const dash = value => value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const tokens = new Map();
function collect(node, parts = []) {
  if (node && typeof node === "object" && "$value" in node) { tokens.set(parts.join("."), node); return; }
  for (const [key, value] of Object.entries(node)) collect(value, [...parts, key]);
}
collect(design.tokens, ["tokens"]);
function resolve(key, trail = []) {
  if (trail.includes(key)) throw new Error(`Cyclic token ${key}`);
  const token = tokens.get(key);
  if (!token) throw new Error(`Missing token ${key}`);
  const value = token.$value;
  if (typeof value === "string" && /^\{[^}]+\}$/.test(value)) return resolve(value.slice(1, -1), [...trail, key]);
  return { value, type: token.$type, key };
}
const declarations = [];
for (const key of tokens.keys()) {
  const { value, type, key: origin } = resolve(key);
  let css = Array.isArray(value) ? value.map(item => item === "sans-serif" ? item : `"${item}"`).join(", ") : String(value);
  if (type === "fontFamily") css = `var(--font-${origin.endsWith("display") ? "display" : "body"}, ${css})`;
  const name = key.replace("tokens.", "").split(".").map(dash).join("-");
  declarations.push(`  --${name}: ${css};`);
}
const numeric = /^(\d|clamp\(|minmax\(|linear-gradient\()/;
function collectLayout(node, parts) {
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === "object" && !Array.isArray(value)) collectLayout(value, [...parts, dash(key)]);
    else if (typeof value === "number" || (typeof value === "string" && numeric.test(value) && !key.startsWith("breakpoint") && !value.includes(" and ") && (value.startsWith("minmax(") || !value.includes("px,")))) {
      declarations.push(`  --${[...parts, dash(key)].join("-")}: ${value};`);
    }
  }
}
collectLayout(design.layout, ["layout"]);
collectLayout(design.typography, ["type"]);
await mkdir(path.join(process.cwd(), "src/app"), { recursive: true });
await writeFile(path.join(process.cwd(), "src/app/tokens.css"), `/* Generated from design.json by scripts/generate-tokens.mjs. Do not edit. */\n:root {\n${declarations.join("\n")}\n}\n`);
console.log(`Resolved ${tokens.size} design tokens; generated layout and typography values.`);
