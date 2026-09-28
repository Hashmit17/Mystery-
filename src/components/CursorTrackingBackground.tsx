"use client";

import { useEffect, useRef } from "react";

export function CursorTrackingBackground() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.36;
    let x = targetX;
    let y = targetY;
    let trailX = targetX;
    let trailY = targetY;
    let haloX = targetX;
    let haloY = targetY;
    let frame = 0;

    const paint = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      trailX += (targetX - trailX) * 0.075;
      trailY += (targetY - trailY) * 0.075;
      haloX += (targetX - haloX) * 0.12;
      haloY += (targetY - haloY) * 0.12;

      stage.style.setProperty("--cursor-x", `${x}px`);
      stage.style.setProperty("--cursor-y", `${y}px`);
      stage.style.setProperty("--trail-x", `${trailX}px`);
      stage.style.setProperty("--trail-y", `${trailY}px`);
      stage.style.setProperty("--halo-x", `${haloX}px`);
      stage.style.setProperty("--halo-y", `${haloY}px`);
      stage.style.setProperty(
        "--grid-x",
        `${((x / Math.max(window.innerWidth, 1)) - 0.5) * 26}px`
      );
      stage.style.setProperty(
        "--grid-y",
        `${((y / Math.max(window.innerHeight, 1)) - 0.5) * 26}px`
      );
      frame = requestAnimationFrame(paint);
    };

    const setTarget = (clientX: number, clientY: number) => {
      targetX = clientX;
      targetY = clientY;
      stage.dataset.active = "true";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch") setTarget(event.clientX, event.clientY);
    };
    const onMouseMove = (event: MouseEvent) => setTarget(event.clientX, event.clientY);
    const onLeave = () => {
      stage.dataset.active = "false";
    };
    const onEnter = (event: MouseEvent) => setTarget(event.clientX, event.clientY);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    stage.dataset.active = "true";
    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={stageRef} aria-hidden="true" className="mystery-cursor-stage">
      <div className="mystery-cursor-aurora mystery-cursor-aurora-one" />
      <div className="mystery-cursor-aurora mystery-cursor-aurora-two" />
      <div className="mystery-cursor-grid" />
      <div className="mystery-cursor-trail" />
      <div className="mystery-cursor-primary" />
      <div className="mystery-cursor-halo" />
      <div className="mystery-cursor-ring" />
      <div className="mystery-cursor-vignette" />
    </div>
  );
}
