import { Easing, interpolate } from "remotion";

export const DAY_FPS = 60;
export const DAY_FRAMES = 360;
const ease = Easing.bezier(.22, 1, .36, 1);
const arc = Easing.bezier(.45, 0, .25, 1);

function track(seconds: number, times: number[], values: number[], easing = arc) {
  return interpolate(seconds, times, values, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
}

export function dayPhotoPose(frame: number, fps: number, compact: boolean) {
  const t = frame / fps;
  return {
    x: track(t, [.15, 2.2, 4.8], [compact ? -28 : -94, 8, 0]),
    y: track(t, [.15, 2.2, 4.8], [compact ? 54 : 100, -12, 0]),
    rotation: track(t, [.15, 2.2, 4.8], [compact ? -9 : -18, compact ? 2 : -1, compact ? 0 : -6]),
    scale: track(t, [.15, 2.2, 4.8], [.78, 1.025, 1]),
    opacity: track(t, [.15, 1.2], [.35, 1], ease),
  };
}

export function dayPhonePose(frame: number, fps: number, compact: boolean) {
  const t = frame / fps;
  return {
    x: track(t, [.25, 2.5, 5.5], [compact ? 28 : 92, -8, 0]),
    y: track(t, [.25, 2.5, 5.5], [-48, 10, 0]),
    rotation: track(t, [.25, 2.5, 5.5], [11, -4, 0]),
    depth: track(t, [.25, 2.5, 5.5], [-18, 5, 0]),
    scale: track(t, [.25, 2.5, 5.5], [.88, 1.015, 1]),
  };
}

