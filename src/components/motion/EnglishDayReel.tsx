"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useVideoReducedMotion, useViewportVideo } from "@/hooks/useViewportVideo";

type ReelProps = { video: { src: string; poster: string; label: string }; logo: string; instagram: string };

export function EnglishDayReel({ video, logo, instagram }: ReelProps) {
  const media = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useVideoReducedMotion();
  useViewportVideo(media, visible, reduced);
  useEffect(() => {
    const element = media.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .35), { threshold: [0, .35] });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <figure className="day-reel dark-surface">
    <div className="reel-header"><Image src={logo} alt="Foxstage" width={729} height={190} unoptimized /><span>English Day</span></div>
    <video ref={media} controls muted playsInline preload="none" poster={video.poster} width={464} height={816} aria-label={video.label} aria-describedby="english-day-reel-caption">
      <source src={video.src} type="video/mp4" />
      Seu navegador não reproduz este vídeo. <a href={video.src}>Abrir o vídeo do English Day.</a>
    </video>
    <figcaption id="english-day-reel-caption"><span>Registro da edição no cinema</span><a href={instagram} target="_blank" rel="noopener noreferrer">@foxstage_<Icon name="instagram" /><span className="sr-only"> (perfil no Instagram, nova aba)</span></a></figcaption>
  </figure>;
}
