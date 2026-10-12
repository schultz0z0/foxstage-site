import type { FAQItem } from "@/content/evolution/types";
export function FAQ({ items, title = "Perguntas sobre as aulas." }: { items: readonly FAQItem[]; title?: string }) {
  if (!items.length) return null;
  return <section className="section faq-section warm-surface"><div className="container editorial-split"><h2>{title}</h2><div className="faq-list">{items.map(item => <details key={item.question}><summary>{item.question}<span className="disclosure-chevron" aria-hidden="true" /></summary><p className="body-copy">{item.answer}</p></details>)}</div></div></section>;
}
