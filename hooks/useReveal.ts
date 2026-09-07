"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll entrance: fires once on intersect, then disconnects. Never replays.
 * Under prefers-reduced-motion, resolves visible immediately without ever
 * creating an observer — the CSS side also forces the final state so there
 * is no hidden frame even before this effect runs.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -80px 0px") {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // CSS alone already forces the final, visible state under reduced motion
    // (never hidden, never removed) — skip creating an observer entirely.
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = media.matches ? null : new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer?.disconnect();
        }
      },
      { rootMargin }
    );
    observer?.observe(el);
    // A changed preference must never leave previously readable content hidden.
    const onMotionChange = () => {
      setVisible(true);
      observer?.disconnect();
    };
    media.addEventListener("change", onMotionChange);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", onMotionChange);
    };
  }, [rootMargin]);

  return { ref, visible };
}
