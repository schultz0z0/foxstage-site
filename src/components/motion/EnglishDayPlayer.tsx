"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EnglishDayComposition } from "@/remotion/EnglishDayComposition";
import { DAY_FPS, DAY_FRAMES, dayPhonePose } from "@/remotion/englishDayMotion";

export default function EnglishDayPlayer({ visible, eligible, compact, photoSrc }: { visible: boolean; eligible: boolean; compact: boolean; photoSrc: string }) {
  const player = useRef<PlayerRef>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const finished = useRef(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("ready");
  const inputProps = useMemo(() => ({ compact, photoSrc }), [compact, photoSrc]);
  const attach = useCallback((instance: PlayerRef | null) => { player.current = instance; if (instance) setReady(true); }, []);
  useEffect(() => {
    const instance = player.current;
    if (!ready || !instance) return;
    const section = wrapper.current?.closest("#english-day");
    const phone = section?.querySelector<HTMLElement>(".english-day-phone");
    // Only the native phone follows the Remotion photo clock; copy remains static HTML.
    const update = (frame: number) => {
      wrapper.current?.setAttribute("data-motion-frame", String(frame));
      if (phone) {
        const pose = dayPhonePose(frame, DAY_FPS, compact);
        phone.style.setProperty("--day-transform", `perspective(1000px) translate3d(${pose.x}px, ${pose.y}px, 0) rotate(${pose.rotation}deg) rotateY(${pose.depth}deg) scale(${pose.scale})`);
      }
    };
    const reset = () => phone?.style.removeProperty("--day-transform");
    const frame = ({ detail }: { detail: { frame: number } }) => update(detail.frame);
    const play = () => { started.current = true; update(instance.getCurrentFrame()); setStatus("playing"); };
    const end = () => { if (finished.current) return; finished.current = true; instance.seekTo(DAY_FRAMES - 1); reset(); setStatus("ended"); };
    const error = () => { reset(); setStatus("failed"); };
    instance.addEventListener("play", play);
    instance.addEventListener("ended", end);
    instance.addEventListener("error", error);
    instance.addEventListener("frameupdate", frame);
    if (finished.current) update(DAY_FRAMES - 1);
    return () => { instance.removeEventListener("play", play); instance.removeEventListener("ended", end); instance.removeEventListener("error", error); instance.removeEventListener("frameupdate", frame); instance.pause(); reset(); };
  }, [ready, compact]);
  useEffect(() => {
    let disposed = false;
    const sync = () => {
      if (disposed || !player.current || finished.current) return;
      if (visible && (eligible || started.current) && !document.hidden) player.current.play(); else player.current.pause();
    };
    void document.fonts.ready.then(sync);
    document.addEventListener("visibilitychange", sync);
    return () => { disposed = true; document.removeEventListener("visibilitychange", sync); };
  }, [ready, visible, eligible, compact]);
  return <div ref={wrapper} className="english-day-enhancement" data-motion-status={status} aria-hidden="true" style={{ visibility: status === "ready" || status === "failed" ? "hidden" : "visible" }}>
    <Player ref={attach} component={EnglishDayComposition} inputProps={inputProps} compositionWidth={compact ? 360 : 680} compositionHeight={compact ? 810 : 570} fps={DAY_FPS} durationInFrames={DAY_FRAMES} overflowVisible initiallyMuted controls={false} loop={false} moveToBeginningWhenEnded={false} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} numberOfSharedAudioTags={0} style={{ width: "100%", height: "100%" }} errorFallback={() => null} />
  </div>;
}
