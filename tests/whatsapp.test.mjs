import assert from "node:assert/strict";
import { test } from "node:test";

const contactModule = await import("../src/lib/whatsapp.ts").catch(() => ({}));

test("WhatsApp preserva acentos, quebra de linha e símbolos após uma decodificação", () => {
  assert.equal(typeof contactModule.whatsappUrl, "function", "helper de contato ainda não implementado");
  const message = "Olá! Inglês & comunicação + prática?\nGostaria de conhecer o curso.";
  const url = new URL(contactModule.whatsappUrl("5521989848517", message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/5521989848517");
  assert.equal(url.searchParams.get("text"), message);
});

test("WhatsApp recusa número que poderia alterar o destino", () => {
  assert.equal(typeof contactModule.whatsappUrl, "function", "helper de contato ainda não implementado");
  assert.throws(() => contactModule.whatsappUrl("5521/evil?x=1", "Olá"), /número/i);
  assert.throws(() => contactModule.whatsappUrl("", "Olá"), /número/i);
});
