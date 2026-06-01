"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { MobileMenuTrigger, MobileMenuPanel } from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const away = pathname !== "/";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const desktopLinks = [
    { href: "/projects", label: away ? "cd /projects" : "cd projects", external: false },
    { href: "/pictures", label: away ? "cd /pictures" : "cd pictures", external: false },
    { href: site.cvUrl,  label: away ? "cat ~/resume.txt" : "cat resume.txt", external: true },
  ];
  return (
    <>
      <nav
        id="site-nav"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm transition-colors duration-200 dark:bg-neutral-950/80"
      >
        <div className="mx-auto flex w-full max-w-screen-sm items-center justify-between px-2 py-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-2xl">
          <Link
            href="/"
            className="group relative z-50 pl-2 text-sm tracking-tight text-neutral-900 dark:text-neutral-100"
            onClick={() => {
              const toggle = document.getElementById("menu-toggle");
              if (toggle?.classList.contains("open")) toggle.click();
            }}
          >
            <span aria-label={site.shellPrompt}>{site.shellPrompt}</span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.85em] w-[0.55em] translate-y-[0.1em] bg-neutral-900 dark:bg-neutral-100 opacity-0 group-hover:opacity-100 cursor-blink"
            />
          </Link>

          <div className="hidden items-center gap-1 text-sm tracking-tight md:flex">
            {desktopLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="text-neutral-200 dark:text-neutral-700">/</span>
                )}
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-alias rounded px-2 py-1 font-mono text-xs text-neutral-400 transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="rounded px-2 py-1 font-mono text-xs text-neutral-400 transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </Link>
                )}
              </span>
            ))}
            <span className="ml-2 text-neutral-200 dark:text-neutral-700">/</span>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileMenuTrigger />
          </div>
        </div>
      </nav>

      <MobileMenuPanel />
    </>
  );
}
