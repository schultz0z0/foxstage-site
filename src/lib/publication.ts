export function getPublicationConfig(environment: Record<string, string | undefined>) {
  let url: URL | undefined;
  try {
    const candidate = environment.SITE_URL ? new URL(environment.SITE_URL) : undefined;
    if (candidate?.protocol === "https:" && !/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(candidate.hostname) && !candidate.username && !candidate.password) {
      url = new URL(candidate.origin);
    }
  } catch { /* A missing or invalid domain keeps the preview unindexed. */ }
  return { url, indexable: Boolean(url && environment.SITE_INDEXABLE === "true") };
}
