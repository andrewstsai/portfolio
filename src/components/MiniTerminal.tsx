"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";

type Line = { type: "input" | "output" | "error"; text: string };

const ALL_COMMANDS = [
  "help",
  "ls",
  "clear",
  "cat skills.txt",
  "cat contact.txt",
  "cat resume.txt",
  "cd projects",
  "cd pictures",
];

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "available commands:",
    "  ls              — list files",
    "  cat skills.txt  — tech stack",
    "  cat contact.txt — get in touch",
    "  cat resume.txt  — open résumé PDF",
    "  cd projects     — go to projects page",
    "  cd pictures     — go to pictures page",
    "  clear           — clear the terminal",
  ],
  ls: () => [
    "skills.txt   contact.txt",
    "resume.txt   projects/    pictures/",
  ],
  "cat skills.txt": () => [
    "languages  · Python, Java, TypeScript, JavaScript, SQL",
    "frontend   · React, Next.js, Angular, Tailwind",
    "backend    · Node.js, NestJS, Spring Boot, FastAPI",
    "infra      · AWS, GCP, Docker, Redis, PostgreSQL",
  ],
  "cat contact.txt": () => [
    `email  · ${site.email}`,
    "github · github.com/andrewstsai",
    "li     · linkedin.com/in/andrew-s-tsai",
  ],
};

const PROMPT = `${site.shortName}@home:~$`;

export default function MiniTerminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'type "help" to see commands' },
  ]);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Command history — refs so navigation doesn't trigger re-renders
  const historyRef = useRef<string[]>([]);
  const historyPosRef = useRef(-1); // -1 = not browsing
  const draftRef = useRef("");     // saved input before ArrowUp

  useEffect(() => {
    // Scroll the terminal's internal container only — NOT the page.
    // `scrollIntoView` would bubble up and scroll the document.
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Update ghost-text suggestion whenever input changes
  useEffect(() => {
    const lower = input.toLowerCase();
    if (!lower) {
      setSuggestion(null);
      return;
    }
    const match = ALL_COMMANDS.find(
      (c) => c.startsWith(lower) && c !== lower
    );
    setSuggestion(match ?? null);
  }, [input]);

  const submit = (override?: string) => {
    const cmd = (override ?? input).trim().toLowerCase();
    if (!cmd) return;

    // Record in history (skip duplicate of the most recent entry)
    if (historyRef.current[historyRef.current.length - 1] !== cmd) {
      historyRef.current.push(cmd);
    }
    historyPosRef.current = -1;
    draftRef.current = "";

    const newLines: Line[] = [{ type: "input", text: cmd }];

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    // Navigation commands
    if (cmd === "cd projects" || cmd === "cd pictures") {
      const path = cmd === "cd projects" ? "/projects" : "/pictures";
      newLines.push({ type: "output", text: `navigating to ${path}...` });
      setLines((prev) => [...prev, ...newLines]);
      setInput("");
      setTimeout(() => router.push(path), 400);
      return;
    }
    if (cmd === "cat resume.txt") {
      newLines.push({ type: "output", text: "opening résumé..." });
      setLines((prev) => [...prev, ...newLines]);
      setInput("");
      setTimeout(() => window.open(site.cvUrl, "_blank"), 400);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      handler().forEach((t) => newLines.push({ type: "output", text: t }));
    } else {
      newLines.push({ type: "error", text: `command not found: ${cmd}` });
    }

    setLines((prev) => [...prev, ...newLines]);
    setInput("");
  };

  return (
    <div
      className="flex h-full w-full cursor-text flex-col overflow-hidden rounded-lg bg-neutral-900 p-4 font-mono dark:bg-neutral-800"
      onClick={() => inputRef.current?.focus()}
    >
      <p className="mb-3 shrink-0 text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        Terminal
      </p>

      <div ref={scrollRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto text-xs leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.type === "input" && (
              <>
                <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                  {PROMPT}
                </span>
                <span className="text-neutral-100">{line.text}</span>
              </>
            )}
            {line.type === "output" && (
              <span className="text-neutral-400 dark:text-neutral-300">
                {line.text}
              </span>
            )}
            {line.type === "error" && (
              <span className="text-red-400">{line.text}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="mt-2 flex shrink-0 items-center gap-2 border-t border-neutral-800 pt-2 dark:border-neutral-700">
        <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
          {PROMPT}
        </span>

        {/* Typed text + cursor + ghost completion, all inline */}
        <div className="flex min-w-0 flex-1 items-center overflow-hidden">
          {/* Hide the browser caret; size exactly to typed text (monospace = 1ch/char) */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                if (suggestion) setInput(suggestion);
              } else if (e.key === "Enter") {
                submit(suggestion ?? undefined);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const hist = historyRef.current;
                if (!hist.length) return;
                if (historyPosRef.current === -1) draftRef.current = input;
                const next = historyPosRef.current + 1;
                if (next < hist.length) {
                  historyPosRef.current = next;
                  setInput(hist[hist.length - 1 - next]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const hist = historyRef.current;
                const next = historyPosRef.current - 1;
                if (next < 0) {
                  historyPosRef.current = -1;
                  setInput(draftRef.current);
                } else {
                  historyPosRef.current = next;
                  setInput(hist[hist.length - 1 - next]);
                }
              }
            }}
            style={{ width: `${input.length}ch` }}
            className="shrink-0 bg-transparent text-xs text-neutral-100 caret-transparent outline-none"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          {/* Ghost text: completion suffix — whitespace-pre preserves the leading space */}
          {suggestion && (
            <span
              className="shrink-0 select-none whitespace-pre text-xs text-neutral-600 dark:text-neutral-600"
              aria-hidden="true"
            >
              {suggestion.slice(input.length)}
            </span>
          )}
          {/* Block cursor at the end of the full suggestion (or typed text if no suggestion) */}
          <span className="cursor-blink inline-block h-[0.85em] w-[0.45em] shrink-0 bg-neutral-400 dark:bg-neutral-400" />
        </div>
      </div>
    </div>
  );
}
