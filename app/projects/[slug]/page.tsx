import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import {
  entityAttributes,
  getProjectBySlug,
  isStrapiConfigured,
} from "@/lib/strapi";

export const revalidate = 60;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isStrapiConfigured()) {
    return (
      <main className="py-10 sm:py-14">
        <Container className="flex flex-col gap-6">
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-300"
          >
            ← Projects
          </Link>
          <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
            <h1 className="text-lg font-semibold">Connect Strapi</h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Set <code className="font-mono">STRAPI_URL</code> in{" "}
              <code className="font-mono">my-app/.env.local</code> and restart
              the dev server.
            </p>
          </Card>
        </Container>
      </main>
    );
  }

  const { slug } = await params;
  const res = await getProjectBySlug(slug);
  const projectEntity = res.data[0];
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

