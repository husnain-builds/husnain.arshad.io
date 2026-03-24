import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { entityAttributes, getPosts, isStrapiConfigured } from "@/lib/strapi";

export const revalidate = 60;

export default async function BlogPage() {
  if (!isStrapiConfigured()) {
    return renderBlogPage([]);
  }

  try {
    const res = await getPosts();
    return renderBlogPage(res.data);
  } catch {
    return renderBlogPage([]);
  }
}

function renderBlogPage(posts: Awaited<ReturnType<typeof getPosts>>["data"]) {
  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-300">
            Notes, articles, and experiments.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {posts.length === 0 ? (
            <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                No posts yet. Create some in Strapi.
              </p>
            </Card>
          ) : (
            posts.map((p) => {
              const a = entityAttributes(p);
              return (
                <Link
                  key={p.id}
                  href={`/blog/${a.slug}`}
                  className="group rounded-2xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:bg-white/80 dark:border-zinc-800/70 dark:bg-zinc-900/35 dark:hover:bg-zinc-900/55"
                >
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {a.publishedDate ?? "—"}
                  </div>
                  <div className="mt-1 text-lg font-semibold">{a.title}</div>
                  {a.excerpt ? (
                    <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {a.excerpt}
                    </div>
                  ) : null}
                  <div className="mt-4 text-sm font-medium text-zinc-900 transition group-hover:translate-x-0.5 dark:text-zinc-50">
                    Read →
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

