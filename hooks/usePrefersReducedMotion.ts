"use client";

/**
 * Tracks `prefers-reduced-motion`, matching useReveal's handling: the query is
 * read inside an effect rather than during render, and a preference changed at
 * runtime is honoured live instead of only at the next load.
 *
 * The initial value is `true` — reduced until measured — so motion driven by
 * this hook can never run for the frames before the effect settles. Nothing
 * here affects markup, so there is no hydration difference either way.
 */

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return reduced;
}
