"use client";

import { useEffect } from "react";

/**
 * Mount once on a page. Finds every `.reveal` element and toggles `.visible`
 * via IntersectionObserver, with a small stagger per element.
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? "0");
          window.setTimeout(() => el.classList.add("visible"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el, i) => {
      el.dataset.revealDelay = String(i * 60);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
