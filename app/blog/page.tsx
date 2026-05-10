import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { getBlogPosts } from "@/utils/blog";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="relative min-h-dvh py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_circle_at_80%_0%,rgba(124,58,237,0.1),transparent_50%)]" />
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Writing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            Notes and longer-form posts live in{" "}
            <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800/80">
              utils/blog.json
            </code>
            .
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {posts.length === 0 ? (
            <Card className="border-zinc-200/80 bg-white/70 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                No posts yet. Add objects to{" "}
                <code className="font-mono text-zinc-800 dark:text-zinc-200">utils/blog.json</code>{" "}
                to list them here.
              </p>
            </Card>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:border-violet-300/50 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/45 dark:hover:border-violet-500/35"
              >
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {post.publishedDate ?? "—"}
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {post.title}
                </div>
                {post.excerpt ? (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {post.excerpt}
                  </p>
                ) : null}
                <div className="mt-4 text-sm font-medium text-violet-700 transition group-hover:translate-x-0.5 dark:text-violet-300">
                  Read →
                </div>
              </Link>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
