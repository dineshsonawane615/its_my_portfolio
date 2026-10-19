import { projects, profile } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return {};
  return {
    title: `${project.title} | Dinesh Sonawane`,
    description: project.description || project.summary,
  };
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z" />
    </svg>
  );
}

function RepoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8V1.5Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 font-mono text-sm text-muted" aria-label="Breadcrumb">
          <Link
            href="/#projects"
            className="flex items-center gap-1.5 transition-colors hover:text-fg"
          >
            <ArrowLeftIcon />
            All projects
          </Link>
          <span className="text-line">/</span>
          <span className="text-fg">{project.repoName || project.id}</span>
        </nav>

        {/* Tech chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-accent/30 px-2.5 py-0.5 font-mono text-xs text-accent"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Title + meta */}
        <div className="flex items-start gap-3">
          <RepoIcon />
          <h1 className="text-3xl font-bold leading-tight">{project.title}</h1>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-sm text-muted">
          <span>Updated {project.updatedAgo}</span>
          <span className="text-line">·</span>
          <span className="rounded-full border border-line px-2 py-0.5 text-[11px]">Public</span>
          {project.badge && (
            <>
              <span className="text-line">·</span>
              <span className="rounded-full border border-amber/40 px-2 py-0.5 text-[11px] text-amber">
                {project.badge}
              </span>
            </>
          )}
        </div>

        <hr className="my-6 border-line" />

        {/* Summary quote */}
        <blockquote className="border-l-2 border-accent pl-4 font-mono text-sm italic text-muted leading-7">
          {project.summary}
        </blockquote>

        {/* Preview placeholder */}
        <div
          className="mt-8 flex min-h-[220px] items-center justify-center rounded-xl border border-line"
          style={{ background: "#0d1117" }}
        >
          <div className="text-center">
            <div className="mb-3 text-3xl opacity-30">⬛</div>
            <p className="font-mono text-xs text-muted opacity-50">Preview coming soon</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="mb-2 font-semibold text-fg">Description</h2>
          <p className="text-sm leading-7 text-muted">{project.description || project.summary}</p>
        </div>

        {/* Key Features + Tech Stack side by side */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 font-semibold text-fg">Key Features</h2>
            <ul className="space-y-2.5 text-sm text-muted">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-0.5 flex-shrink-0 font-bold text-ok">+</span>
                  <span className="leading-6">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-semibold text-fg">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-accent/30 px-2.5 py-0.5 font-mono text-xs text-accent"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Pipeline / Architecture if present */}
            {project.pipeline && (
              <div className="mt-6">
                <h3 className="mb-2 font-mono text-xs text-muted uppercase tracking-wider">Pipeline</h3>
                <ol className="space-y-1.5">
                  {project.pipeline.map((stage, i) => (
                    <li key={stage.name} className="flex items-start gap-2 text-xs text-muted">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full border border-line flex items-center justify-center font-mono text-[10px]">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-semibold text-fg">{stage.name}</span>
                        {" — "}
                        <span>{stage.detail}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {project.architecture && (
              <div className="mt-6">
                <h3 className="mb-2 font-mono text-xs text-muted uppercase tracking-wider">Request Path</h3>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {project.architecture.map((a, i) => (
                    <span key={a} className="flex items-center gap-2">
                      <span className="rounded-md border border-line px-2.5 py-1 transition-colors hover:border-accent hover:text-accent">
                        {a}
                      </span>
                      {i < project.architecture.length - 1 && (
                        <span className="text-muted" aria-hidden>→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-8">
          <a
            href={project.githubUrl || profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn flex items-center gap-2"
          >
            <GithubIcon />
            View Code
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary flex items-center gap-2"
            >
              Live Demo ↗
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-md border border-ok/30 bg-ok/5 px-4 py-2 text-sm font-medium text-ok/50 cursor-not-allowed select-none">
              Live Demo ↗ <span className="font-mono text-[10px] opacity-60">(coming soon)</span>
            </span>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
