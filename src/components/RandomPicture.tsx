"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { pictures } from "@/data/pictures";

const ROTATE_MS = 8000;
const pool = pictures.filter((p) => p.orientation === "landscape");

export default function RandomPicture() {
  const [idx, setIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIdx(Math.floor(Math.random() * pool.length));
  }, []);

  useEffect(() => {
    if (pool.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => {
          let next = Math.floor(Math.random() * pool.length);
          while (next === prev) next = Math.floor(Math.random() * pool.length);
          return next;
        });
        setVisible(true);
      }, 500);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, []);

  if (idx === null) {
    return <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800" />;
  }

  const pic = pool[idx];
  return (
    <Link href="/pictures" className="group absolute inset-0">
      <Image
        src={pic.src}
        alt={pic.alt}
        fill
        sizes="25vw"
        className={`object-cover transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
        unoptimized
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-1 items-center justify-between px-4 py-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs font-medium uppercase tracking-widest text-white">Pictures</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
