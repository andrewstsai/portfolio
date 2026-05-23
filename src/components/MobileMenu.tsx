"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

function Trigger() {
  return (
    <button
      id="menu-toggle"
      className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[7px] md:hidden"
      aria-label="Toggle menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
      type="button"
    >
      <span
        aria-hidden="true"
        className="hamburger-bar block h-[2px] w-6 origin-center rounded-full bg-neutral-900 transition-all duration-300 dark:bg-neutral-100"
      />
      <span
        aria-hidden="true"
        className="hamburger-bar block h-[2px] w-6 origin-center rounded-full bg-neutral-900 transition-all duration-300 dark:bg-neutral-100"
      />
    </button>
  );
}

function Panel() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const away = pathname !== "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const entries = [
    { href: "/projects", label: away ? "cd /projects" : "cd projects", external: false },
    { href: "/pictures", label: away ? "cd /pictures" : "cd pictures", external: false },
    { href: site.cvUrl,  label: away ? "cat ~/resume.txt" : "cat resume.txt", external: true },
  ];

  useEffect(() => {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    const close = () => setOpen(false);
    const onToggle = () => {
      if (toggle.classList.contains("open")) close();
      else setOpen(true);
    };

    toggle.addEventListener("click", onToggle);
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    window.addEventListener("closemobilemenu", close);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      toggle.removeEventListener("click", onToggle);
      window.removeEventListener("closemobilemenu", close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    if (open) {
      toggle.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      menu.removeAttribute("inert");
      document.body.classList.add("menu-open");
    } else {
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      menu.setAttribute("inert", "");
      document.body.classList.remove("menu-open");
    }
  }, [open]);

  return (
    <div
      id="mobile-menu"
      className="pointer-events-none fixed inset-0 z-30 flex flex-col bg-white opacity-0 transition-[opacity,background-color] duration-200 dark:bg-neutral-950"
      aria-hidden="true"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* Spacer to clear the nav bar */}
      <div className="h-[57px] shrink-0" />

      <nav aria-label="Site navigation" className="flex flex-col px-6 pt-8">
        {entries.map((entry) =>
          entry.external ? (
            <a
              key={entry.href}
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link border-t border-neutral-200 py-4 font-mono text-2xl font-medium tracking-tight text-neutral-800 transition-colors duration-200 hover:text-neutral-500 dark:border-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-400"
            >
              {entry.label}
            </a>
          ) : (
            <Link
              key={entry.href}
              href={entry.href}
              className="menu-link border-t border-neutral-200 py-4 font-mono text-2xl font-medium tracking-tight text-neutral-800 transition-colors duration-200 hover:text-neutral-500 dark:border-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-400"
            >
              {entry.label}
            </Link>
          )
        )}
        <div className="border-t border-neutral-200 dark:border-neutral-800" />
      </nav>
    </div>
  );
}

export { Trigger as MobileMenuTrigger, Panel as MobileMenuPanel };
