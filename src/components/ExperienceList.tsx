"use client";

import { useState } from "react";
import { experience } from "@/data/experience";

export default function ExperienceList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="mt-3 flex flex-col border-b border-neutral-200 dark:border-neutral-700">
      {experience.map((e, i) => {
        const isOpen = openIndex === i;
        return (
          <li key={i} className="border-t border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-baseline justify-between gap-4 py-3 text-left"
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-sm tracking-tight text-neutral-800 dark:text-neutral-200">
                  {e.company}
                </span>
                <span className="block text-xs tracking-tight text-neutral-500 dark:text-neutral-400">
                  {e.role}
                </span>
              </span>
              <span className="shrink-0 text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
                {e.period}
              </span>
              <span
                className={`ml-2 shrink-0 text-neutral-400 transition-transform duration-200 dark:text-neutral-500 ${
                  isOpen ? "rotate-180" : "rotate-0"
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
                  <li key={j} className="flex items-start gap-2">
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
