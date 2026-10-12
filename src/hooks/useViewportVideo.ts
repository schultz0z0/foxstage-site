"use client";

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";

function subscribeMotion(update: () => void) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", update);
  return () => preference.removeEventListener("change", update);
}
export function useVideoReducedMotion() {
  return useSyncExternalStore(subscribeMotion, () => matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
}

/** Native controls own manual playback; visibility only manages autoplay. */
export function useViewportVideo(media: RefObject<HTMLVideoElement | null>, visible: boolean, reduced: boolean) {
  const userPaused = useRef(false);
  const environmentPaused = useRef(false);
  useEffect(() => {
    const element = media.current;
    if (!element) return;
    const pause = () => { if (!environmentPaused.current && !element.ended) userPaused.current = true; };
    const play = () => { userPaused.current = false; environmentPaused.current = false; };
    element.addEventListener("pause", pause); element.addEventListener("play", play);
    return () => { element.removeEventListener("pause", pause); element.removeEventListener("play", play); };
  }, [media]);
  useEffect(() => {
    const videoElement = media.current;
    if (!videoElement) return;
    let disposed = false;
    const sync = () => {
      if (disposed) return;
      if (!visible || document.hidden || reduced) { environmentPaused.current = true; videoElement.pause(); return; }
      if (!userPaused.current && !videoElement.ended) {
        environmentPaused.current = false;
        void videoElement.play().then(() => {
          if (disposed || document.hidden) { environmentPaused.current = true; videoElement.pause(); }
        }).catch(() => { /* Native controls remain the autoplay fallback. */ });
      }
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { disposed = true; document.removeEventListener("visibilitychange", sync); };
  }, [media, visible, reduced]);
}
