"use client";

import { useEffect } from "react";

// Track which <img> elements have already been warmed in this session.
// WeakSet so unmounted elements can be GC'd; HTTP cache handles real dedup.
const warmed = new WeakSet<HTMLImageElement>();

export default function PicturePreloader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const warm = (img: HTMLImageElement) => {
      if (warmed.has(img) || img.complete) return;
      warmed.add(img);
      // Build a parallel Image with the SAME srcset/sizes/src that Next.js
      // Image rendered, so the browser fetches the exact /_next/image URL
      // the visible <img> will use and the HTTP cache hits when it appears.
      const w = new window.Image();
      if (img.sizes) w.sizes = img.sizes;
      if (img.srcset) w.srcset = img.srcset;
      w.src = img.src;
    };

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLImageElement>("figure[data-index] img")
        .forEach(warm);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const img = entry.target.querySelector<HTMLImageElement>("img");
          if (img) warm(img);
          observer.unobserve(entry.target);
        }
      },
      // Big lookahead — start the fetch well before native lazy loading
      // (~1250px in Chrome) so the image is ready by the time it scrolls in.
      { rootMargin: "1500px 0px" }
    );

    document
      .querySelectorAll<HTMLElement>("figure[data-index]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
