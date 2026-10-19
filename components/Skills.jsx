import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { skills, learning } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeader path="/skills" title="git branch --list" meta={`${skills.length + 1} branches`} />
      <Reveal className="card divide-y divide-line">
        {skills.map((g, i) => (
          <div key={g.branch} className="grid gap-3 p-5 sm:grid-cols-[11rem_1fr]">
            <p className="font-mono text-sm">
              <span className="text-muted">{i === 0 ? "* " : "  "}</span>
              <span className="text-ok">feature/{g.branch}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent ${
                    g.core.includes(s) ? "border-accent/50 bg-accent/10 text-fg" : "border-line text-muted"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="grid gap-3 p-5 sm:grid-cols-[11rem_1fr]">
          <p className="font-mono text-sm">
            <span className="text-muted">  </span>
            <span className="text-amber">wip/learning</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {learning.map((s) => (
              <span key={s} className="rounded-full border border-dashed border-amber/50 px-3 py-1 text-sm text-muted">{s}</span>
            ))}
          </div>
        </div>
      </Reveal>
      <p className="mt-3 font-mono text-xs text-muted">Highlighted chips are the skills I used most in my projects. Dashed chips are in progress.</p>
    </section>
  );
}
