"use client";

/**
 * Reports whether the element is currently intersecting, for work that should
 * stop while it is off screen. Unlike useReveal — which fires once and
 * disconnects because an entrance must never replay — this stays observed for
 * the life of the component so it can report leaving as well as entering.
 *
 * Starts `true` so the first frames are not withheld while the observer
 * resolves; the callback fires almost immediately and corrects it. The default
 * margin resumes work slightly before the element scrolls back into view.
 */

import { useEffect, useRef, useState } from "react";

export function useInViewport<T extends HTMLElement>(rootMargin = "200px 0px 200px 0px") {
  const ref = useRef<T | null>(null);
  const [inViewport, setInViewport] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inViewport };
}
