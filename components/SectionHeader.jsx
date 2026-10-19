export default function SectionHeader({ path, title, meta }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-sm text-muted">{path}</p>
      <h2 className="mt-1 flex flex-wrap items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
        {meta && <span className="chip">{meta}</span>}
      </h2>
    </div>
  );
}
