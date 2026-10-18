export function getPublicationConfig(environment: Record<string, string | undefined>) {
  let url: URL | undefined;
  try {
    const candidate = environment.SITE_URL ? new URL(environment.SITE_URL) : undefined;
    const host=candidate?.hostname ?? "";
    const publicHostname=host.includes(".") && !host.includes(":") && !/^\d+(?:\.\d+){3}$/.test(host) && !/(?:^|\.)(?:localhost|local|internal)$/.test(host);
    if (candidate?.protocol === "https:" && publicHostname && !candidate.username && !candidate.password) {
      url = new URL(candidate.origin);
    }
  } catch { /* A missing or invalid domain keeps the preview unindexed. */ }
  return { url, indexable: Boolean(url && environment.SITE_INDEXABLE === "true") };
}
