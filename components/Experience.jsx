import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { experience, releases } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeader path="/experience" title="git log --oneline" meta={`${experience.length} commits`} />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ol className="relative space-y-6 border-l border-line pl-6">
          {experience.map((e, i) => (
            <li key={e.hash} className="relative">
              <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent ring-2 ring-accent/30" aria-hidden />
              <Reveal delay={i * 70}>
                <div className="card p-5 transition-colors hover:border-accent/60">
                  <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                    <span className="text-amber">{e.hash}</span>
                    <span className="chip !py-0 text-violet">{e.branch}</span>
                    <span>{e.period}</span>
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted">{e.org}</p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-muted">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-2"><span className="text-ok">+</span>{pt}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div>
          <p className="mb-4 font-mono text-sm text-muted">$ git tag --list</p>
          <div className="space-y-3">
            {releases.map((r, i) => (
              <Reveal key={r.tag} delay={i * 70}>
                <div className="card p-4 transition-colors hover:border-violet/60">
                  <p className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-violet">⚑ {r.tag}</span>
                    <span className="text-muted">{r.period}</span>
                  </p>
                  <h3 className="mt-2 text-sm font-semibold leading-5">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted">{r.org}{r.note ? `, ${r.note}` : ""}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
