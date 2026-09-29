"use client";

import { useEffect, useRef } from "react";

export function CursorTrackingBackground() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(pointer: coarse)").matches) return;

    let tx = window.innerWidth * 0.5;
    let ty = window.innerHeight * 0.42;
    let x = tx;
    let y = ty;
    let sx = tx;
    let sy = ty;
    let frame = 0;

    const tick = () => {
      x += (tx - x) * 0.085;
      y += (ty - y) * 0.085;
      sx += (tx - sx) * 0.042;
      sy += (ty - sy) * 0.042;

      stage.style.setProperty("--aurora-x", `${x}px`);
      stage.style.setProperty("--aurora-y", `${y}px`);
      stage.style.setProperty("--aurora-soft-x", `${sx}px`);
      stage.style.setProperty("--aurora-soft-y", `${sy}px`);

      frame = requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      tx = event.clientX;
      ty = event.clientY;
      stage.dataset.active = "true";
    };

    const leave = () => {
      stage.dataset.active = "false";
    };

    const enter = () => {
      stage.dataset.active = "true";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    stage.dataset.active = "true";
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div ref={stageRef} aria-hidden="true" className="mystery-cursor-stage">
      <div className="mystery-aurora mystery-aurora-primary" />
      <div className="mystery-aurora mystery-aurora-secondary" />
      <div className="mystery-aurora mystery-aurora-haze" />
    </div>
  );
}
