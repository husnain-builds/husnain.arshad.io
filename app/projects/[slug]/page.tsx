import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { getProjectBySlug } from "@/utils/projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="relative min-h-dvh py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_circle_at_20%_0%,rgba(249,115,22,0.1),transparent_55%),radial-gradient(600px_circle_at_100%_30%,rgba(124,58,237,0.1),transparent_50%)]" />
      <Container className="relative flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Link
            href="/projects"
            className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
          >
            ← All projects
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="rounded-full border border-zinc-200/90 bg-white/60 px-3 py-1 text-sm text-zinc-700 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
              {project.role}
            </span>
            <span className="rounded-full border border-zinc-200/90 bg-white/60 px-3 py-1 text-sm text-zinc-700 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
              {project.year}
            </span>
            {project.agentic ? (
              <span className="rounded-full border border-orange-300/70 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-800 dark:border-orange-500/40 dark:text-orange-200">
                Agentic workflows
              </span>
            ) : null}
            {project.liveUrl ? (
              <a
                className="rounded-full border border-zinc-200/90 bg-white/60 px-3 py-1 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-50"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                className="rounded-full border border-zinc-200/90 bg-white/60 px-3 py-1 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-50"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <Card className="border-zinc-200/80 bg-white/75 leading-relaxed text-zinc-700 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-200">
          <div className="whitespace-pre-wrap">{project.longDescription}</div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-zinc-200/80 bg-white/75 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200/80 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>

          <Card className="border-zinc-200/80 bg-white/75 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Highlights</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </main>
  );
}
