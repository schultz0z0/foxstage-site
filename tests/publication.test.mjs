import assert from "node:assert/strict";
import { test } from "node:test";
import { getPublicationConfig } from "../src/lib/publication.ts";

test("prévia sem domínio ou sem autorização de indexação permanece fora da busca", () => {
  assert.equal(getPublicationConfig({}).indexable, false);
  assert.equal(getPublicationConfig({ SITE_INDEXABLE: "true" }).indexable, false);
  assert.equal(getPublicationConfig({ SITE_URL: "https://foxstage.tld" }).indexable, false);
  assert.equal(getPublicationConfig({ SITE_URL: "não é URL", SITE_INDEXABLE: "true" }).url, undefined);
});

test("publicação rejeita localhost, HTTP e credenciais em URL", () => {
  for (const url of ["http://foxstage.tld", "https://localhost", "https://127.0.0.1", "https://user:password@foxstage.tld"]) {
    assert.equal(getPublicationConfig({ SITE_URL: url, SITE_INDEXABLE: "true" }).indexable, false);
  }
});

test("domínio HTTPS autorizado gera uma origem sem caminho nem dados de campanha", () => {
  const result = getPublicationConfig({ SITE_URL: "https://foxstage.tld/path?utm_source=test", SITE_INDEXABLE: "true" });
  assert.equal(result.indexable, true);
  assert.equal(result.url.href, "https://foxstage.tld/");
});
