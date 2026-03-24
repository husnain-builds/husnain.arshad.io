import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { fallbackProjects } from "@/utils/projects";
import { getProjects, isStrapiConfigured } from "@/lib/strapi";

export const revalidate = 60;

type ProjectListItem = {
  id: number | string;
  slug: string;
  title: string;
  summary: string | null;
};

export default async function ProjectsPage() {
  let projects: ProjectListItem[] = [];
  let usingFallback = !isStrapiConfigured();

  if (usingFallback) {
    projects = fallbackProjects.map((project) => ({
      id: project.slug,
      slug: project.slug,
      title: project.title,
      summary: project.description,
    }));
  } else {
    try {
      const res = await getProjects();
      projects = res.data.map((project) => ({
        id: project.id,
        slug:
          "attributes" in project ? project.attributes.slug : project.slug,
        title:
          "attributes" in project ? project.attributes.title : project.title,
        summary:
          "attributes" in project
            ? project.attributes.summary ?? null
            : project.summary ?? null,
      }));
    } catch (error) {
      void error;
      usingFallback = true;
      projects = fallbackProjects.map((project) => ({
        id: project.slug,
        slug: project.slug,
        title: project.title,
        summary: project.description,
      }));
    }
  }

  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-300">
            A selection of recent work and case studies.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.length === 0 ? (
            <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                No projects available yet.
              </p>
            </Card>
          ) : (
            projects.map((p) => {
              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group rounded-2xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:bg-white/80 dark:border-zinc-800/70 dark:bg-zinc-900/35 dark:hover:bg-zinc-900/55"
                >
                  <div className="text-lg font-semibold">{p.title}</div>
                  {p.summary ? (
                    <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {p.summary}
                    </div>
                  ) : null}
                  <div className="mt-4 text-sm font-medium text-zinc-900 transition group-hover:translate-x-0.5 dark:text-zinc-50">
                    View details →
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </Container>
    </main>
  );
}

