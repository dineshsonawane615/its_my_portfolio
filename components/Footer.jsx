import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:px-6">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono text-xs">Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}
