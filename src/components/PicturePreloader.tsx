"use client";

import { useEffect } from "react";

const warmed = new WeakSet<HTMLImageElement>();

export default function PicturePreloader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const warm = (img: HTMLImageElement) => {
      if (warmed.has(img) || img.complete) return;
      warmed.add(img);
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
      { rootMargin: "1500px 0px" }
    );

    document
      .querySelectorAll<HTMLElement>("figure[data-index]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
