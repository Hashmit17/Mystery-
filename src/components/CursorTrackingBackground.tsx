"use client";

import { useEffect, useRef } from "react";

export function CursorTrackingBackground() {
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const label = labelRef.current;
    if (!stage || !label || window.matchMedia("(pointer: coarse)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let fx = tx;
    let fy = ty;
    let px = tx;
    let py = ty;
    let frame = 0;

    const tick = () => {
      x += (tx - x) * 0.38;
      y += (ty - y) * 0.38;
      fx += (tx - fx) * 0.14;
      fy += (ty - fy) * 0.14;

      const dx = x - px;
      const dy = y - py;
      const speed = Math.min(Math.hypot(dx, dy), 28);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      px = x;
      py = y;

      stage.style.setProperty("--cx", `${x}px`);
      stage.style.setProperty("--cy", `${y}px`);
      stage.style.setProperty("--fx", `${fx}px`);
      stage.style.setProperty("--fy", `${fy}px`);
      stage.style.setProperty("--angle", `${angle}deg`);
      stage.style.setProperty("--stretch", `${1 + speed * .018}`);
      frame = requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      tx = event.clientX;
      ty = event.clientY;
      stage.dataset.active = "true";
    };

    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a,button,input,textarea,[role='button']") : null;
      stage.dataset.interactive = target ? "true" : "false";
      label.textContent = target?.getAttribute("data-cursor-label") ?? (target ? "OPEN" : "");
    };

    const down = () => { stage.dataset.pressed = "true"; };
    const up = () => { stage.dataset.pressed = "false"; };
    const leave = () => { stage.dataset.active = "false"; };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    stage.dataset.active = "true";
    stage.dataset.interactive = "false";
    stage.dataset.pressed = "false";
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={stageRef} aria-hidden="true" className="mystery-cursor-stage">
      <div className="mystery-cursor-wash" />
      <div className="mystery-cursor-follow"><span ref={labelRef} /></div>
      <div className="mystery-cursor-core" />
    </div>
  );
}
