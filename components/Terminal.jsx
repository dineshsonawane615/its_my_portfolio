"use client";
import { useEffect, useState } from "react";
import { terminal } from "@/data/portfolio";

/* ── typing cost per row ── */
const costs = terminal.map((r) => (r.type === "cmd" ? r.text.length + 2 : 4));
const starts = costs.reduce(
  (acc, c, i) => [...acc, i === 0 ? 0 : acc[i - 1] + costs[i - 1]],
  []
);
const total = costs.reduce((a, b) => a + b, 0);

/* ── git branch icon SVG ── */
function BranchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="inline-block mr-1 -mt-0.5">
      <path d="M11.75 2.5a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zm.75 2.242a2.25 2.25 0 1 1 0-4.484 2.25 2.25 0 0 1 0 4.484zM4.25 13.5a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zm.75 2.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5zM4.25 2.5a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zM5 4.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5zm6.75 7a.25.25 0 0 1-.25.25H8.06a4.992 4.992 0 0 0 .69-1.5h3.5a1.75 1.75 0 0 0 1.75-1.75V6.5a1.75 1.75 0 0 0-1.75-1.75h-.25V3.25h.25A3.25 3.25 0 0 1 15.25 6.5v3.25A3.25 3.25 0 0 1 12 13H9a4 4 0 0 0-3.5-2.07V9.44a3.251 3.251 0 0 0-.693-.19 4 4 0 0 0 .693-.19V6.56c.25-.06.49-.14.71-.24V8.5h.79a4.992 4.992 0 0 0-.69 1.5H5V13A2.25 2.25 0 0 1 5 8.5V6a2.25 2.25 0 0 1 0-4.5 2.25 2.25 0 0 1 0 4.5v2.5a2.24 2.24 0 0 1 0 4.5v.5h6.75z" />
    </svg>
  );
}

export default function Terminal() {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(total);
      return;
    }
    const id = setInterval(() => {
      setPos((p) => {
        if (p >= total) { clearInterval(id); return p; }
        return p + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, []);

  const done = pos >= total;

  return (
    <div
      className="overflow-hidden rounded-xl shadow-2xl shadow-black/40"
      style={{ background: "#0d1117", border: "1px solid #30363d" }}
      role="img"
      aria-label="Terminal summarising Dinesh's focus areas"
    >
      {/* ── Title bar ── */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="mx-auto font-mono text-xs"
          style={{ color: "#8b949e" }}
        >
          ~/portfolio — zsh
        </span>
      </div>

      {/* ── Terminal body ── */}
      <div
        className="min-h-[20rem] space-y-0.5 p-4 font-mono text-[13px] leading-[1.7]"
        style={{ background: "#0d1117" }}
      >
        {terminal.map((row, i) => {
          const p = pos - starts[i];
          if (p <= 0) return null;

          if (row.type === "cmd") {
            const visibleText = row.text.slice(0, Math.min(p, row.text.length));
            return (
              <div key={i} className="flex flex-wrap items-baseline gap-0">
                {/* prompt */}
                <span style={{ color: "#3fb950" }} className="mr-1 select-none">
                  dinesh@portfolio
                </span>
                <span style={{ color: "#8b949e" }} className="mr-1 select-none">~</span>
                <span style={{ color: "#bc8cff" }} className="mr-2 select-none">%</span>
                {/* command */}
                <span style={{ color: "#e6edf3" }} className="font-semibold">
                  {visibleText}
                </span>
              </div>
            );
          }

          if (row.type === "ok") {
            return (
              <div key={i} style={{ color: "#3fb950" }} className="pl-4">
                ✓ {row.text}
              </div>
            );
          }

          /* out */
          return (
            <div key={i} style={{ color: "#8b949e" }} className="pl-4">
              {row.text}
            </div>
          );
        })}

        {/* blinking cursor */}
        <span
          className={`inline-block h-[14px] w-[8px] translate-y-0.5 rounded-[1px] ${done ? "animate-blink" : ""}`}
          style={{ background: "#58a6ff" }}
          aria-hidden
        />
      </div>

      {/* ── Status bar ── */}
      <div
        className="flex items-center gap-3 px-4 py-2 font-mono text-[11px]"
        style={{ background: "#161b22", borderTop: "1px solid #30363d", color: "#8b949e" }}
      >
        {/* branch */}
        <span className="flex items-center gap-1" style={{ color: "#c9d1d9" }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="inline-block flex-shrink-0">
            <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
          </svg>
          main
        </span>

        {/* commit hash badge */}
        <span
          className="rounded px-1.5 py-0.5"
          style={{ background: "#21262d", color: "#58a6ff", border: "1px solid #30363d" }}
        >
          a8c1f3e
        </span>

        <span style={{ color: "#30363d" }}>·</span>
        <span>3 commits ahead</span>
      </div>
    </div>
  );
}
