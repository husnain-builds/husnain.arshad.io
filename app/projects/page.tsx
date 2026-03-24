import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { entityAttributes, getProjects, isStrapiConfigured } from "@/lib/strapi";

export const revalidate = 60;

export default async function ProjectsPage() {
  if (!isStrapiConfigured()) {
    return (
      <main className="py-12">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <Card className="mt-6 border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
            <h2 className="text-lg font-semibold">Connect Strapi</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Set <code className="font-mono">STRAPI_URL</code> in{" "}
              <code className="font-mono">my-app/.env.local</code> (for example{" "}
              <code className="font-mono">http://localhost:1337</code>) and
              restart the dev server.
            </p>
          </Card>
        </Container>
      </main>
    );
  }

  const res = await getProjects();
  const projects = res.data;
  console.log(projects,"projects");

  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-300">
            A selection of work pulled dynamically from Strapi.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.length === 0 ? (
            <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                No projects yet. Create some in Strapi.
              </p>
            </Card>
          ) : (
            projects.map((p) => {
              const a = entityAttributes(p);
              return (
                <Link
                  key={p.id}
                  href={`/projects/${a.slug}`}
                  className="group rounded-2xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:bg-white/80 dark:border-zinc-800/70 dark:bg-zinc-900/35 dark:hover:bg-zinc-900/55"
                >
                  <div className="text-lg font-semibold">{a.title}</div>
                  {a.summary ? (
                    <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {a.summary}
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

