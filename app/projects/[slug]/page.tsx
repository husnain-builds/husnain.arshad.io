import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { getFallbackProjectBySlug, type FallbackProject } from "@/utils/projects";
import { entityAttributes, getProjectBySlug, isStrapiConfigured } from "@/lib/strapi";

export const revalidate = 60;

function FallbackProjectView({
  project,
}: {
  project: FallbackProject;
}) {
  return (
    <main className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-300"
          >
            ← Projects
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-300">
            {project.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <span className="rounded-full border border-zinc-200/70 px-3 py-1 dark:border-zinc-700">
              {project.role}
            </span>
            <span className="rounded-full border border-zinc-200/70 px-3 py-1 dark:border-zinc-700">
              {project.year}
            </span>
            {project.agentic ? (
              <span className="rounded-full border border-orange-300/70 px-3 py-1 text-orange-700 dark:border-orange-500/40 dark:text-orange-300">
                Agentic workflow
              </span>
            ) : null}
          </div>
        </div>

        <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
          <div className="whitespace-pre-wrap leading-7 text-zinc-700 dark:text-zinc-200">
            {project.longDescription}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
            <h2 className="text-lg font-semibold">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200/70 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>

          <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
            <h2 className="text-lg font-semibold">Key features</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallbackProject = getFallbackProjectBySlug(slug);

  if (!isStrapiConfigured()) {
    if (!fallbackProject) notFound();
    return <FallbackProjectView project={fallbackProject} />;
  }

  let projectEntity: Awaited<ReturnType<typeof getProjectBySlug>>["data"][number] | undefined;

  try {
    const res = await getProjectBySlug(slug);
    projectEntity = res.data[0];
  } catch (error) {
    void error;
    if (!fallbackProject) notFound();
    return <FallbackProjectView project={fallbackProject} />;
  }

  if (!projectEntity) notFound();
  const project = entityAttributes(projectEntity);

  return (
    <main className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-300"
          >
            ← Projects
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          {project.summary ? (
            <p className="max-w-2xl text-zinc-600 dark:text-zinc-300">
              {project.summary}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                className="text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live site →
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                className="text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub →
              </a>
            ) : null}
          </div>
        </div>

        <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
          {project.description ? (
            <div className="whitespace-pre-wrap leading-7 text-zinc-700 dark:text-zinc-200">
              {project.description}
            </div>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Add a description in Strapi to show it here.
            </p>
          )}
        </Card>
      </Container>
    </main>
  );
}

