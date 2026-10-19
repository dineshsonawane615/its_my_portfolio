"use client";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/data/portfolio";

const links = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-sm font-semibold">
          <img src="/profile.jpg" alt="Dinesh Sonawane" className="h-7 w-7 rounded-full object-cover object-top" />
          <span className="hidden sm:inline">{profile.handle}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-panel hover:text-fg">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/dineshsonawane615"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="GitHub Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>
          <ThemeToggle />
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line bg-bg px-4 py-2 md:hidden">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-panel hover:text-fg">
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
