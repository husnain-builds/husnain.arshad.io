import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { getAllProjects } from "@/utils/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="relative min-h-dvh py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_circle_at_15%_0%,rgba(249,115,22,0.12),transparent_55%),radial-gradient(640px_circle_at_90%_20%,rgba(124,58,237,0.12),transparent_50%)]" />
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Work
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            Product surfaces, dashboards, and marketing sites—focused on clarity,
            performance, and maintainable software architecture.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.length === 0 ? (
            <Card className="border-zinc-200/80 bg-white/70 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                No projects in <code className="font-mono text-zinc-800 dark:text-zinc-200">utils/projects.json</code> yet.
              </p>
            </Card>
          ) : (
            projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:border-orange-300/50 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/45 dark:hover:border-orange-500/35"
              >
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {p.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.techStack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-200/80 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                  {p.techStack.length > 4 ? (
                    <span className="text-xs text-zinc-500">+{p.techStack.length - 4}</span>
                  ) : null}
                </div>
                <div className="mt-5 text-sm font-medium text-orange-600 transition group-hover:translate-x-0.5 dark:text-orange-400">
                  Case study →
                </div>
              </Link>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
