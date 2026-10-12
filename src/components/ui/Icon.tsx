type IconName = "arrow" | "diagonal" | "message" | "book" | "instagram" | "up" | "play" | "pause" | "replay";

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    play: <path d="m9 5 10 7-10 7Z" />,
    pause: <path d="M9 5v14M15 5v14" />,
    replay: <><path d="M5 7a8 8 0 1 1-1 8M5 3v5h5" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
    up: <><path d="m6 13 6-6 6 6M12 7v12" /></>,
    message: <><path d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-3.5-.8L4 20l1.3-4.5A9 9 0 0 1 4.5 12a8 8 0 0 1 8-8 7.5 7.5 0 0 1 7.5 7.5Z" /><path d="M9 10h6M9 14h4" /></>,
    book: <><path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v14" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>
  };
  return <svg className={`icon icon-${name} ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
