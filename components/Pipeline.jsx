"use client";
import { useState } from "react";

export default function Pipeline({ stages }) {
  const [i, setI] = useState(0);

  return (
    <div className="mt-5 rounded-md border border-line bg-bg p-4">
      <p className="mb-3 font-mono text-xs text-muted">Click a stage to inspect the workflow</p>
      <div role="tablist" aria-label="MATRA pipeline stages" className="flex flex-wrap items-center gap-1.5">
        {stages.map((s, idx) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <button
              role="tab"
              aria-selected={i === idx}
              onClick={() => setI(idx)}
              className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
                i === idx
                  ? "border-accent bg-accent/15 text-accent"
                  : idx < i
                  ? "border-ok/40 text-ok hover:border-ok"
                  : "border-line text-muted hover:border-muted hover:text-fg"
              }`}
            >
              {s.name}
            </button>
            {idx < stages.length - 1 && <span className="text-line" aria-hidden>›</span>}
          </div>
        ))}
      </div>
      <div className="mt-4 border-l-2 border-accent pl-3" role="tabpanel">
        <p className="font-mono text-xs text-accent">
          stage {i + 1} of {stages.length}
          {stages[i].name === "Review" && <span className="ml-2 rounded-full bg-amber/20 px-2 py-0.5 text-amber">human decision</span>}
        </p>
        <p className="mt-1 text-sm leading-6">{stages[i].detail}</p>
      </div>
    </div>
  );
}
