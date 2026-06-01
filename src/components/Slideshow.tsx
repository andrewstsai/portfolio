"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BrowserMock from "./BrowserMock";
import type { Project } from "@/data/projects";

type Props = {
  projects: Project[];
  intervalMs?: number;
};

export default function Slideshow({ projects, intervalMs = 6000 }: Props) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const count = projects.length;

  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);

  const hoverRef = useRef(hovered);
  hoverRef.current = hovered;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!hoverRef.current) setActive((i) => (i + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs]);

  return (
    <div
      className="slideshow relative h-full w-full"
      role="region"
      aria-label="Projects slideshow"
      aria-live="polite"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {projects.map((p, i) => {
        const visible = i === active;
        return (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            inert={!visible}
            className={`group absolute inset-0 flex flex-col overflow-hidden p-4 transition-opacity duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="shrink-0">
              <p className="text-xs uppercase font-semibold tracking-widest text-neutral-800 dark:text-neutral-200">
                Featured Projects · {p.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs tracking-tight text-neutral-400 dark:text-neutral-500">
                {p.blurb}
              </p>
            </div>
            <div className="relative mt-4 min-h-0 flex-1 translate-y-8 transition-transform duration-200 ease-in-out group-hover:translate-y-6">
              <BrowserMock src={p.image} alt={p.title} priority={i === 0} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-20 md:block" />
            </div>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); prev(); }}
        aria-label="Previous project"
        className={`absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-neutral-600 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-neutral-900 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 ${
          hovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); next(); }}
        aria-label="Next project"
        className={`absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-neutral-600 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-neutral-900 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 ${
          hovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === active
                ? "bg-[var(--accent)]"
                : "bg-neutral-200 dark:bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
