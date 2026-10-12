"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { EnglishDayArtwork } from "./EnglishDayArtwork";

const EnglishDayPlayer = dynamic(() => import("./EnglishDayPlayer"), { ssr: false });
function subscribeMotion(update: () => void) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", update);
  return () => preference.removeEventListener("change", update);
}
const readMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
class MotionBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

type MediaProps = {
  photo: { src: string; alt: string; caption: string };
  video: { src: string; poster: string; label: string; caption: string };
};

export function EnglishDayMedia({ photo, video }: MediaProps) {
  const seat = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const environmentPaused = useRef(false);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, readMotion, () => true);
  useEffect(() => {
    const element = media.current;
    if (!element) return;
    const pause = () => { if (!environmentPaused.current && !element.ended) userPaused.current = true; };
    const play = () => { userPaused.current = false; environmentPaused.current = false; };
    element.addEventListener("pause", pause); element.addEventListener("play", play);
    return () => { element.removeEventListener("pause", pause); element.removeEventListener("play", play); };
  }, []);
  useEffect(() => {
    const element = seat.current;
    const videoElement = media.current;
    if (!element || !videoElement || !("IntersectionObserver" in window)) return;
    const section = element.closest("#english-day");
    const heading = section?.querySelector(".section-heading");
    const nearby = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setNear(true); }, { rootMargin: "160px" });
    const scene = new IntersectionObserver(([entry]) => setSceneVisible(entry.isIntersecting));
    const entrance = new IntersectionObserver(([entry]) => { if (entry.intersectionRatio >= .35) { setEligible(true); entrance.disconnect(); } }, { threshold: .35 });
    // Observe the phone, not the taller mobile composition: the full video fits in view.
    const inView = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .35), { threshold: [0, .35] });
    const mobile = matchMedia("(max-width: 767px)");
    const resize = () => setCompact(mobile.matches);
    resize(); nearby.observe(section ?? element); scene.observe(section ?? element); entrance.observe(heading ?? element); inView.observe(videoElement); mobile.addEventListener("change", resize);
    return () => { nearby.disconnect(); scene.disconnect(); entrance.disconnect(); inView.disconnect(); mobile.removeEventListener("change", resize); };
  }, []);
  useEffect(() => {
    const videoElement = media.current;
    if (!videoElement) return;
    let disposed = false;
    const sync = () => {
      if (disposed) return;
      if (!visible || document.hidden || reduced) { environmentPaused.current = true; videoElement.pause(); return; }
      if (!reduced && !userPaused.current && !videoElement.ended) {
        environmentPaused.current = false;
        void videoElement.play().then(() => {
          if (disposed || document.hidden) { environmentPaused.current = true; videoElement.pause(); }
        }).catch(() => { /* Native controls remain the autoplay fallback. */ });
      }
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { disposed = true; document.removeEventListener("visibilitychange", sync); };
  }, [visible, reduced]);
  return <div className="english-day-stage" ref={seat}>
    <figure className="english-day-artwork" aria-label={photo.alt}>
      <div className="english-day-poster english-day-poster-desktop" aria-hidden="true"><EnglishDayArtwork photoSrc={photo.src} /></div>
      <div className="english-day-poster english-day-poster-mobile" aria-hidden="true"><EnglishDayArtwork photoSrc={photo.src} compact /></div>
      <figcaption className="sr-only">{photo.caption}</figcaption>
      {near && !reduced && <MotionBoundary><EnglishDayPlayer visible={sceneVisible} eligible={eligible} compact={compact} photoSrc={photo.src} /></MotionBoundary>}
    </figure>
    <figure className="english-day-phone">
      <div className="english-day-phone-frame">
        <div className="english-day-phone-camera" aria-hidden="true" />
        <video ref={media} controls muted playsInline preload="none" poster={video.poster} width={464} height={816} aria-label={video.label} aria-describedby="english-day-video-caption">
          <source src={video.src} type="video/mp4" />
          Seu navegador não reproduz este vídeo. <a href={video.src}>Abrir o vídeo do English Day.</a>
        </video>
      </div>
      <figcaption id="english-day-video-caption">{video.caption}<span>O vídeo inicia sem som.</span></figcaption>
    </figure>
  </div>;
}
