import Link from "next/link";
import Reveal from "./Reveal";
import { projects } from "@/data/portfolio";
import SkillBranches from "./SkillBranches";
import SectionHeader from "./SectionHeader";

function RepoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8V1.5Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Section header */}
      <div className="mb-8 flex items-center gap-3 border-b border-line pb-4">
        <span className="font-mono text-sm text-muted">/projects</span>
        <span className="h-4 w-px bg-line" />
        <h2 className="text-xl font-bold">Repositories</h2>
        <span className="ml-auto font-mono text-xs text-muted">{projects.length} pinned</span>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Reveal key={p.id}>
            <Link
              href={`/projects/${p.id}`}
              className="group block h-full rounded-xl border border-line bg-panel p-5 transition-all duration-200 hover:border-accent/70 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-accent group-hover:underline">
                  <RepoIcon />
                  <span className="font-mono font-semibold">{p.repoName || p.id}</span>
                </div>
                <span className="flex-shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">
                  Public
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-muted line-clamp-2">{p.summary}</p>

              {/* Tech chips */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-accent/30 px-2.5 py-0.5 font-mono text-[11px] text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Updated + Live Demo */}
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                  <ClockIcon />
                  Updated {p.updatedAgo}
                </span>
                <span
                  className="rounded-md border border-ok/50 bg-ok/10 px-3 py-1 font-mono text-xs text-ok transition-colors group-hover:bg-ok/20"
                >
                  Live Demo ↗
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* ── Skills Section ── */}
      <div className="mt-16">
        <div className="mb-8 flex items-center gap-3 border-b border-line pb-4">
          <span className="font-mono text-sm text-muted">/skills</span>
          <span className="h-4 w-px bg-line" />
          <h2 className="text-xl font-bold">Skill Branches</h2>
          <span className="ml-auto font-mono text-xs text-muted">git branch --list</span>
        </div>
        <SkillBranches />
      </div>
    </section>
  );
}
