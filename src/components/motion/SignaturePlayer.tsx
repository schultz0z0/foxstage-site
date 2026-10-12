"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { SignatureComposition } from "@/remotion/SignatureComposition";
import { signature } from "@/remotion/config";

type Status = "ready" | "playing" | "paused" | "ended";

export default function SignaturePlayer({ visible, compact, hasStartedRef }: { visible: boolean; compact: boolean; hasStartedRef: RefObject<boolean> }) {
  const player = useRef<PlayerRef>(null);
  const wanted = useRef(false);
  const completed = useRef(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<Status>("ready");
  const [failed, setFailed] = useState(false);
  const inputProps = useMemo(() => ({ compact }), [compact]);
  const attachPlayer = useCallback((instance: PlayerRef | null) => {
    player.current = instance;
    if (instance) setReady(true);
  }, []);

  useEffect(() => {
    const instance = player.current;
    if (!ready || !instance) return;
    const onPlay = () => { hasStartedRef.current = true; setStatus("playing"); };
    const onPause = () => setStatus(s => s === "ended" ? s : "paused");
    const onEnd = () => {
      if (completed.current) return;
      wanted.current = false;
      completed.current = true;
      instance.seekTo(signature.finalFrame);
      setStatus("ended");
    };
    const onError = () => { wanted.current = false; setFailed(true); };
    instance.addEventListener("play", onPlay);
    instance.addEventListener("pause", onPause);
    instance.addEventListener("ended", onEnd);
    instance.addEventListener("error", onError);
    return () => {
      instance.removeEventListener("play", onPlay);
      instance.removeEventListener("pause", onPause);
      instance.removeEventListener("ended", onEnd);
      instance.removeEventListener("error", onError);
      instance.pause();
    };
  }, [ready, hasStartedRef]);

  useEffect(() => {
    if (!ready) return;
    let disposed = false;
    const sync = () => {
      if (disposed) return;
      const instance = player.current;
      if (!instance || completed.current) return;
      if (hasStartedRef.current && !wanted.current) { completed.current = true; return; }
      if (!visible || document.hidden) { instance.pause(); return; }
      if (!hasStartedRef.current) wanted.current = true;
      if (wanted.current) instance.play();
    };
    void document.fonts.ready.then(sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ready, visible, hasStartedRef]);

  if (failed) return null;
  return <div className="signature-enhancement" data-motion-status={status} style={{ visibility: status === "ready" ? "hidden" : "visible" }}>
    <div className="signature-player" aria-hidden="true">
      <Player ref={attachPlayer} component={SignatureComposition} inputProps={inputProps} durationInFrames={signature.durationInFrames} fps={signature.fps} compositionWidth={signature.width} compositionHeight={signature.height} initialFrame={0} initiallyMuted overflowVisible moveToBeginningWhenEnded={false} loop={false} controls={false} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} numberOfSharedAudioTags={0} style={{ width: "100%", aspectRatio: `${signature.width} / ${signature.height}` }} errorFallback={() => null} />
    </div>
  </div>;
}
