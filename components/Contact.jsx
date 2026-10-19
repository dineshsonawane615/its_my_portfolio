"use client";
import { useState } from "react";

import Reveal from "./Reveal";
import { profile } from "@/data/portfolio";

/* ── Icons ── */
function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

const socialCards = [
  {
    id: "github",
    label: "GitHub",
    handle: `@${profile.handle}`,
    href: profile.github,
    icon: <GithubIcon />,
    color: "#e6edf3",
    bg: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/dinesh-sonawanee",
    href: profile.linkedin,
    icon: <LinkedInIcon />,
    color: "#0a66c2",
    bg: "rgba(10,102,194,0.10)",
    border: "rgba(10,102,194,0.35)",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    handle: `@${profile.handle}`,
    href: profile.leetcode || "https://leetcode.com/dineshsonawane615",
    icon: <LeetCodeIcon />,
    color: "#ffa116",
    bg: "rgba(255,161,22,0.08)",
    border: "rgba(255,161,22,0.35)",
  },
  {
    id: "email",
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: <EmailIcon />,
    color: "#3fb950",
    bg: "rgba(63,185,80,0.08)",
    border: "rgba(63,185,80,0.35)",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [charCounts, setCharCounts] = useState({ name: 0, email: 0, subject: 0, message: 0 });

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setCharCounts((c) => ({ ...c, [k]: e.target.value.length }));
  };

  const submit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n${form.name}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {}
  };

  const field =
    "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-center gap-3 border-b border-line pb-4">
        <span className="font-mono text-sm text-muted">/contact</span>
        <span className="h-4 w-px bg-line" />
        <h2 className="text-xl font-bold">Get In Touch</h2>
      </div>

      {/* ── Row 1: Social Cards (4 across) ──
      <Reveal>
        <div className="mb-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
          {socialCards.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target={s.id !== "email" ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: s.bg,
                borderColor: s.border,
                boxShadow: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ color: s.color }} className="transition-transform duration-200 group-hover:scale-110">
                {s.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">{s.label}</p>
                <p className="mt-0.5 text-xs text-muted truncate">{s.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal> */}

      {/* ── Row 2: Two-column — Quick Contact (left) + Email copy (right) ── */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Contact form — GitHub "New Message" style */}
        <Reveal>
          <form onSubmit={submit} className="rounded-xl border border-line bg-panel overflow-hidden">
            {/* Form title bar */}
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-muted" aria-hidden="true">
                <path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM8 6.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8 6.5ZM6.5 8.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" />
              </svg>
              <p className="font-mono text-sm text-fg font-semibold">
                New Message — <span className="text-accent">dineshsonawane615</span>
              </p>
            </div>

            <div className="space-y-4 p-5">
              {/* Name + Email row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <span className="font-mono text-[11px] text-muted">{charCounts.name}/100</span>
                  </div>
                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={set("name")}
                    className={field}
                    placeholder="Ada Lovelace"
                  />
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <span className="font-mono text-[11px] text-muted">{charCounts.email}/254</span>
                  </div>
                  <input
                    required
                    type="email"
                    maxLength={254}
                    value={form.email}
                    onChange={set("email")}
                    className={field}
                    placeholder="ada@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <span className="font-mono text-[11px] text-muted">{charCounts.subject}/100</span>
                </div>
                <input
                  required
                  maxLength={100}
                  value={form.subject}
                  onChange={set("subject")}
                  className={field}
                  placeholder="Internship opportunity"
                />
              </div>

              {/* Message */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium">Message (Markdown supported)</label>
                  <span className="font-mono text-[11px] text-muted">{charCounts.message}/5000</span>
                </div>
                <textarea
                  required
                  rows={5}
                  maxLength={5000}
                  value={form.message}
                  onChange={set("message")}
                  className={`${field} resize-none`}
                  placeholder="Tell me about the role or the problem you're solving."
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3">
                <button type="submit" className="btn btn-primary flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.56A.25.25 0 0 1 6 10.56V5.44a.25.25 0 0 1 .379-.214Z" />
                  </svg>
                  Submit
                </button>
                <span className="text-xs text-muted">I typically respond within 24 hours</span>
              </div>
            </div>
          </form>
        </Reveal>

        {/* Right column: Quick contact info + Open to work */}
        <div className="space-y-4">
          {/* Quick Contact */}
          <Reveal delay={80}>
            <div className="rounded-xl border border-line bg-panel divide-y divide-line">
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-fg">Quick Contact</p>
              </div>

              {/* Email copy row */}
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="min-w-0 truncate text-sm text-muted hover:text-accent transition-colors"
                >
                  {profile.email}
                </a>
                <button
                  onClick={copy}
                  className="btn !px-3 !py-1 text-xs shrink-0"
                  aria-live="polite"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>

              {/* Social links */}
              {[
                {
                  label: "GitHub",
                  sub: `@${profile.handle}`,
                  href: profile.github,
                  icon: <GithubIcon />,
                  color: "#e6edf3",
                },
                {
                  label: "LinkedIn",
                  sub: "in/dinesh-sonawanee",
                  href: profile.linkedin,
                  icon: <LinkedInIcon />,
                  color: "#0a66c2",
                },
                {
                  label: "LeetCode",
                  sub: `@${profile.handle}`,
                  href: profile.leetcode || "https://leetcode.com/dineshsonawane615",
                  icon: <LeetCodeIcon />,
                  color: "#ffa116",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-line/30 group"
                >
                  <span style={{ color: item.color }} className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-fg">{item.label}</p>
                    <p className="text-xs text-muted">{item.sub}</p>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="ml-auto text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Open to work badge */}
          <Reveal delay={160}>
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "rgba(63,185,80,0.4)", background: "rgba(63,185,80,0.06)" }}
            >
              <p className="flex items-center gap-2 font-semibold text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-ok animate-pulseDot" aria-hidden />
                <span className="text-ok">Open to Work</span>
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Currently available for full-time roles, freelance projects, and interesting collaborations.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
