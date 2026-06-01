"use client";

import { useState } from "react";
import { experience } from "@/data/experience";

export default function ExperienceList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul
      className="
        relative mt-3 flex flex-col pl-6
        before:absolute before:left-[9px] before:top-3 before:bottom-3 before:w-px
        before:bg-neutral-200 dark:before:bg-neutral-700
      "
    >
      {experience.map((e, i) => {
        const isOpen = openIndex === i;
        const isCurrent = e.period.includes("Present");
        return (
          <li key={i} className="relative">
            <span
              aria-hidden="true"
              className={`absolute left-[-18.5px] top-[19px] h-2 w-2 rounded-full ${
                isCurrent
                  ? "bg-[var(--accent)] animate-[pulse-accent_2s_ease-in-out_infinite]"
                  : "bg-neutral-300 dark:bg-neutral-600"
              }`}
            />

            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="
                -mx-2 flex w-[calc(100%+1rem)] items-baseline justify-between gap-4
                rounded-md px-2 py-3 text-left transition-colors
                hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50
              "
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 text-left">
                <span className="flex items-center gap-2">
                  <span className="block text-[15px] text-neutral-800 dark:text-neutral-100">
                    {e.company}
                  </span>
                </span>
                <span className="block text-xs tracking-tight text-neutral-500/90 dark:text-neutral-400/80">
                  {e.role}
                </span>
              </span>
              <span className="shrink-0 text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
                {e.period}
              </span>
              <span
                className={`ml-2 shrink-0 transition-all duration-200 ${
                  isOpen
                    ? "rotate-180 text-[var(--accent)]"
                    : "rotate-0 text-neutral-400 dark:text-neutral-500"
                }`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-2 pb-3 pl-0 pr-6">
                {e.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{ transitionDelay: isOpen ? `${j * 60 + 80}ms` : "0ms" }}
                    className={`flex items-start gap-2 transition-all duration-300 ease-out ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                    }`}
                  >
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    <span className="text-xs leading-relaxed tracking-tight text-neutral-500 dark:text-neutral-400">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
