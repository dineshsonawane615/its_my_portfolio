"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { skills, learning } from "@/data/portfolio";

/* ── Radar axes: one per skill branch, value = proficiency % ───────── */
const AXIS_CONFIG = {
  backend:  { value: 85, label: "Backend Dev"  },
  frontend: { value: 78, label: "Frontend Dev" },
  ai:       { value: 72, label: "AI / NLP"     },
  data:     { value: 70, label: "Data & DB"    },
  tooling:  { value: 75, label: "Tooling"      },
};

/* Legend group colours (matched to axes) */
const GROUP_COLORS = {
  backend:  "#58a6ff",
  frontend: "#bc8cff",
  ai:       "#3fb950",
  data:     "#f78166",
  tooling:  "#d29922",
};

/* ── Geometry helpers ──────────────────────────────────────────────── */
const TWO_PI = Math.PI * 2;

function polar(cx, cy, r, angleRad) {
  return {
    x: cx + r * Math.sin(angleRad),
    y: cy - r * Math.cos(angleRad),
  };
}

function polygonPoints(cx, cy, r, values, maxVal = 100) {
  const n = values.length;
  return values
    .map((v, i) => {
      const pt = polar(cx, cy, (v / maxVal) * r, (TWO_PI * i) / n);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");
}

function labelPos(cx, cy, r, i, n) {
  const angle = (TWO_PI * i) / n;
  const pad = 28;
  const pt = polar(cx, cy, r + pad, angle);
  const sinA = Math.sin(angle);
  const cosA = Math.cos(angle);
  const textAnchor = sinA < -0.1 ? "end" : sinA > 0.1 ? "start" : "middle";
  const dy = cosA > 0.1 ? "-0.4em" : cosA < -0.1 ? "1.1em" : "0.35em";
  return { x: pt.x, y: pt.y, textAnchor, dy };
}

/* ── Component ─────────────────────────────────────────────────────── */
export default function SkillMatrix() {
  /* Build axes array from data — preserve branch order */
  const axes = skills.map((g) => ({
    branch: g.branch,
    label: AXIS_CONFIG[g.branch]?.label ?? g.branch,
    value: AXIS_CONFIG[g.branch]?.value ?? 70,
    color: GROUP_COLORS[g.branch] ?? "#58a6ff",
    items: g.items,
    core: g.core,
  }));

  const CX = 230;
  const CY = 220;
  const R  = 160;
  const RINGS = 4;
  const n  = axes.length;

  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered]   = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const values      = axes.map((a) => (animated ? a.value : 0));
  const outerPoints = axes.map((_, i) => polar(CX, CY, R, (TWO_PI * i) / n));

  const gradFillId   = "radarFill";
  const gradStrokeId = "radarStroke";
  const glowId       = "radarGlow";

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeader path="/skills" title="skill.matrix()" meta="radar view" />

      <Reveal>
        {/* Glowing border wrapper */}
        <div
          ref={ref}
          className="relative rounded-2xl p-px overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #58a6ff55, #bc8cff55, #ff6ac155)",
          }}
        >
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgb(13 17 23)" }}>

            {/* Title */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-fg tracking-tight">My Skill Matrix</h2>
              <p className="mt-1 text-sm text-muted">
                A visual breakdown of my core technical disciplines.
              </p>
            </div>

            {/* Chart + Legend layout */}
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-center">

              {/* ── SVG Radar ── */}
              <svg
                viewBox="0 0 460 440"
                className="w-full max-w-sm shrink-0 lg:max-w-md"
                aria-label="Skill radar chart"
              >
                <defs>
                  <linearGradient id={gradFillId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#00e5ff" stopOpacity="0.55" />
                    <stop offset="50%"  stopColor="#bc8cff" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#ff4ddb" stopOpacity="0.55" />
                  </linearGradient>
                  <linearGradient id={gradStrokeId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#00e5ff" />
                    <stop offset="50%"  stopColor="#bc8cff" />
                    <stop offset="100%" stopColor="#ff4ddb" />
                  </linearGradient>
                  <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid rings */}
                {Array.from({ length: RINGS }, (_, ri) => {
                  const rr  = (R * (ri + 1)) / RINGS;
                  const pts = Array.from({ length: n }, (__, i) => {
                    const p = polar(CX, CY, rr, (TWO_PI * i) / n);
                    return `${p.x},${p.y}`;
                  }).join(" ");
                  return (
                    <polygon key={ri} points={pts} fill="none"
                      stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  );
                })}

                {/* Axis spokes */}
                {outerPoints.map((pt, i) => (
                  <line key={i} x1={CX} y1={CY} x2={pt.x} y2={pt.y}
                    stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                ))}

                {/* Filled polygon */}
                <polygon
                  points={polygonPoints(CX, CY, R, values)}
                  fill={`url(#${gradFillId})`}
                  filter={`url(#${glowId})`}
                  style={{ transition: "all 1.1s cubic-bezier(0.34,1.2,0.64,1)" }}
                />

                {/* Stroke polygon */}
                <polygon
                  points={polygonPoints(CX, CY, R, values)}
                  fill="none"
                  stroke={`url(#${gradStrokeId})`}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  filter={`url(#${glowId})`}
                  style={{ transition: "all 1.1s cubic-bezier(0.34,1.2,0.64,1)" }}
                />

                {/* Vertex dots */}
                {axes.map((ax, i) => {
                  const pt = polar(CX, CY, (values[i] / 100) * R, (TWO_PI * i) / n);
                  return (
                    <circle key={i} cx={pt.x} cy={pt.y}
                      r={hovered === i ? 7 : 5}
                      fill="#00e5ff"
                      stroke="rgba(0,229,255,0.5)"
                      strokeWidth={hovered === i ? 4 : 2}
                      filter={`url(#${glowId})`}
                      style={{
                        transition: "r 0.25s ease, stroke-width 0.25s ease, cx 1.1s cubic-bezier(0.34,1.2,0.64,1), cy 1.1s cubic-bezier(0.34,1.2,0.64,1)",
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className="cursor-pointer"
                    />
                  );
                })}

                {/* Axis labels */}
                {axes.map((ax, i) => {
                  const lp = labelPos(CX, CY, R, i, n);
                  return (
                    <text key={i} x={lp.x} y={lp.y} dy={lp.dy}
                      textAnchor={lp.textAnchor}
                      fontSize="12" fontWeight="600"
                      fill={hovered === i ? "#00e5ff" : "rgba(230,237,243,0.9)"}
                      fontFamily="inherit"
                      style={{ transition: "fill 0.25s" }}
                    >
                      {ax.label}
                    </text>
                  );
                })}

                {/* Hover tooltip */}
                {hovered !== null && (() => {
                  const ax = axes[hovered];
                  const pt = polar(CX, CY, (values[hovered] / 100) * R, (TWO_PI * hovered) / n);
                  return (
                    <g>
                      <rect x={pt.x - 30} y={pt.y - 28} width="60" height="22" rx="6"
                        fill="rgba(22,27,34,0.95)" stroke="rgba(0,229,255,0.4)" strokeWidth="1" />
                      <text x={pt.x} y={pt.y - 13} textAnchor="middle"
                        fontSize="11" fontWeight="700" fill="#00e5ff" fontFamily="monospace">
                        {ax.value}%
                      </text>
                    </g>
                  );
                })()}
              </svg>

              {/* ── Legend: all skills from portfolio data ── */}
              <div className="flex flex-col gap-4 w-full lg:max-w-xs">
                {axes.map((ax) => (
                  <div
                    key={ax.branch}
                    className="rounded-xl border p-4"
                    style={{
                      background: "rgba(22,27,34,0.85)",
                      borderColor: `${ax.color}30`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Branch header */}
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest"
                       style={{ color: ax.color }}>
                      {ax.label}
                    </p>
                    {/* All skill chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {ax.items.map((item) => {
                        const isCore = ax.core.includes(item);
                        return (
                          <span
                            key={item}
                            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
                            style={
                              isCore
                                ? {
                                    background: `${ax.color}22`,
                                    border: `1px solid ${ax.color}70`,
                                    color: "rgba(230,237,243,0.95)",
                                  }
                                : {
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "rgba(139,148,158,0.9)",
                                  }
                            }
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Learning / in-progress */}
                <div
                  className="rounded-xl border p-4"
                  style={{
                    background: "rgba(22,27,34,0.85)",
                    borderColor: "rgba(210,153,34,0.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400"
                     style={{ color: "#d29922" }}>
                    Learning
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {learning.map((item) => (
                      <span
                        key={item}
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          background: "rgba(210,153,34,0.10)",
                          border: "1px dashed rgba(210,153,34,0.45)",
                          color: "rgba(139,148,158,0.85)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Footer note */}
            <p className="mt-6 font-mono text-xs text-muted text-center">
              Highlighted chips = skills used most in projects · Dashed chips = in progress
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
