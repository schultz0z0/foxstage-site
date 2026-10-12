"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SignatureArtwork } from "./SignatureArtwork";
import { signature } from "@/remotion/config";

const SignaturePlayer = dynamic(() => import("./SignaturePlayer"), { ssr: false });
function subscribeMotion(update: () => void) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", update);
  return () => preference.removeEventListener("change", update);
}
const readMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const staticOnServer = () => true;

class MotionBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function SignatureMotion() {
  const reduced = useSyncExternalStore(subscribeMotion, readMotion, staticOnServer);
  const seat = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const element = seat.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const nearby = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setNear(true); }, { rootMargin: `${signature.preloadMarginPx}px` });
    const inView = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= signature.visibleThreshold), { threshold: [0, signature.visibleThreshold] });
    const mobile = matchMedia("(max-width: 767px)");
    const resize = () => setCompact(mobile.matches);
    resize();
    nearby.observe(element);
    inView.observe(element);
    mobile.addEventListener("change", resize);
    return () => { nearby.disconnect(); inView.disconnect(); mobile.removeEventListener("change", resize); };
  }, []);

  return <div className="signature-motion" ref={seat}>
    <p className="sr-only">Aprenda inglês. Fale inglês. Viva o inglês.</p>
    <div className="signature-poster" aria-hidden="true"><SignatureArtwork /></div>
    {near && !reduced && <MotionBoundary><SignaturePlayer visible={visible} compact={compact} hasStartedRef={hasStartedRef} /></MotionBoundary>}
  </div>;
}
