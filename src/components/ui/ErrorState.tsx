"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Hard navigation recovers a broken router. */
export function ErrorState({retry}: {retry:()=>void}) {
  return <section className="system-state container" aria-labelledby="error-title"><p className="eyebrow">Falha temporária</p><h1 id="error-title">Não foi possível abrir esta página.</h1><p>Você pode tentar novamente ou voltar ao início. Se precisar falar sobre suas aulas, use o nosso contato.</p><div className="hero-actions"><button type="button" className="button button-primary" onClick={retry}>Tentar novamente</button><a href="/" className="button button-outline">Voltar ao início</a><a href="/contato" className="text-link">Falar com a escola</a></div></section>;
}
