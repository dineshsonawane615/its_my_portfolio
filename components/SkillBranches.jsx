"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const branches = [
  {
    id: "frontend",
    label: "feature/frontend",
    color: "#58a6ff",
    dot: "#58a6ff",
    active: true,
    skills: [
      { name: "React / Next.js", pct: 88 },
      { name: "JavaScript / ES6+", pct: 90 },
      { name: "TypeScript", pct: 80 },
      { name: "Tailwind CSS", pct: 85 },
      { name: "HTML / CSS", pct: 92 },
    ],
  },
  {
    id: "backend",
    label: "feature/backend",
    color: "#3fb950",
    dot: "#3fb950",
    skills: [
      { name: "Java", pct: 90 },
      { name: "Spring Boot", pct: 88 },
      { name: "Spring Security", pct: 80 },
      { name: "REST API Design", pct: 85 },
      { name: "Hibernate / JPA", pct: 78 },
    ],
  },
  {
    id: "database",
    label: "feature/database",
    color: "#bc8cff",
    dot: "#bc8cff",
    skills: [
      { name: "SQL", pct: 88 },
      { name: "MySQL", pct: 85 },
      { name: "PostgreSQL", pct: 78 },
      { name: "SQLite", pct: 80 },
    ],
  },
  {
    id: "devops",
    label: "feature/devops",
    color: "#d29922",
    dot: "#d29922",
    skills: [
      { name: "Git / GitHub", pct: 92 },
      { name: "Docker", pct: 72 },
      { name: "redis", pct: 56 },

    ],
  },
];

const levels = [
  { label: "60–75%", desc: "Familiar" },
  { label: "75–90%", desc: "Proficient" },
  { label: "90%+", desc: "Expert" },
];

function ProgressBar({ pct, color, animated }) {
  return (
    <div className="h-2 w-full rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div
        className="h-2 rounded-full"
        style={{
          width: animated ? `${pct}%` : "0%",
          background: `linear-gradient(90deg, ${color}cc, ${color})`,
          boxShadow: `0 0 8px ${color}66`,
          transition: "width 0.9s cubic-bezier(0.34,1.1,0.64,1)",
        }}
      />
    </div>
  );
}

export default function SkillBranches() {
  const [active, setActive] = useState("frontend");
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef(null);

  // Trigger animation once when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset + re-animate bars every time the active branch changes
  const switchBranch = (id) => {
    setAnimated(false);
    setActive(id);
    // tiny delay so React paints the 0% width first, then springs to target
    setTimeout(() => setAnimated(true), 40);
  };

  const cur = branches.find((b) => b.id === active);

  return (
    <Reveal>
      <div
        ref={containerRef}
        className="rounded-2xl border border-line overflow-hidden"
        style={{ background: "rgb(13,17,23)" }}
      >
        {/* Top header bar */}
        <div
          className="flex items-center gap-1.5 border-b border-line px-4 py-2.5"
          style={{ background: "rgba(22,27,34,0.95)" }}
        >
          <span className="font-mono text-xs text-muted">/skills</span>
          <span className="font-mono text-xs text-muted px-1">·</span>
          <span className="font-mono text-xs font-semibold text-fg">git branch --list</span>
        </div>

        <div className="flex min-h-[320px] flex-col sm:flex-row">
          {/* ── Left: branch list ── */}
          <div
            className="w-full sm:w-64 shrink-0 border-b sm:border-b-0 sm:border-r border-line p-4 flex flex-col gap-1"
            style={{ background: "rgba(13,17,23,0.9)" }}
          >
            <p className="font-mono text-xs text-muted mb-2">$ git branch --list</p>
            {branches.map((b) => {
              const isActive = b.id === active;
              return (
                <button
                  key={b.id}
                  onClick={() => switchBranch(b.id)}
                  className="w-full text-left rounded-md px-3 py-2 font-mono text-sm transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(88,166,255,0.12)" : "transparent",
                    color: isActive ? b.color : "rgba(139,148,158,0.9)",
                    borderLeft: isActive ? `3px solid ${b.color}` : "3px solid transparent",
                  }}
                >
                  <span style={{ color: isActive ? b.color : "#3fb950", marginRight: 6 }}>•</span>
                  {isActive && (
                    <span style={{ color: b.color, fontWeight: 700 }}>* </span>
                  )}
                  {b.label}
                </button>
              );
            })}
            <p className="mt-3 font-mono text-[11px] text-muted">{branches.length} branches total</p>
          </div>

          {/* ── Right: skill bars ── */}
          <div className="flex-1 p-6" style={{ background: "rgb(13,17,23)" }}>
            {/* Branch header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: cur.color, boxShadow: `0 0 6px ${cur.color}` }}
                />
                <span className="font-semibold text-fg">{cur.id.charAt(0).toUpperCase() + cur.id.slice(1)}</span>
              </div>
              <span
                className="rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold"
                style={{
                  background: `${cur.color}22`,
                  border: `1px solid ${cur.color}55`,
                  color: cur.color,
                }}
              >
                {cur.label}
              </span>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              {cur.skills.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium text-fg">{s.name}</span>
                    <span className="font-mono text-xs" style={{ color: cur.color }}>{s.pct}%</span>
                  </div>
                  <ProgressBar pct={s.pct} color={cur.color} animated={animated} />
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 border-t border-line pt-4">
              {levels.map((l) => (
                <span key={l.label} className="font-mono text-[11px] text-muted">
                  <span className="text-fg font-semibold">{l.label}</span> {l.desc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
