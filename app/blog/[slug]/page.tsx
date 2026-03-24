import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { entityAttributes, getPostBySlug, isStrapiConfigured } from "@/lib/strapi";

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isStrapiConfigured()) {
    return (
      <main className="py-10 sm:py-14">
        <Container className="flex flex-col gap-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-300"
          >
            ← Blog
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
  const res = await getPostBySlug(slug);
  const postEntity = res.data[0];
  if (!postEntity) notFound();
  const post = entityAttributes(postEntity);

  return (
    <main className="py-10 sm:py-14">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-300"
          >
            ← Blog
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {post.publishedDate ?? "—"}
          </p>
        </div>

        <Card className="border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35">
          {post.content ? (
            <article className="space-y-4 leading-7 text-zinc-700 dark:text-zinc-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => {
                    void node;
                    return (
                      <h1
                        className="text-2xl font-semibold tracking-tight"
                        {...props}
                      />
                    );
                  },
                  h2: ({ node, ...props }) => {
                    void node;
                    return (
                      <h2
                        className="text-xl font-semibold tracking-tight"
                        {...props}
                      />
                    );
                  },
                  h3: ({ node, ...props }) => {
                    void node;
                    return (
                      <h3
                        className="text-lg font-semibold tracking-tight"
                        {...props}
                      />
                    );
                  },
                  a: ({ node, ...props }) => {
                    void node;
                    return (
                      <a
                        className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                        {...props}
                      />
                    );
                  },
                  ul: ({ node, ...props }) => {
                    void node;
                    return <ul className="list-disc pl-5" {...props} />;
                  },
                  ol: ({ node, ...props }) => {
                    void node;
                    return <ol className="list-decimal pl-5" {...props} />;
                  },
                  code: ({ node, ...props }) => {
                    void node;
                    return (
                      <code
                        className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800/60"
                        {...props}
                      />
                    );
                  },
                  pre: ({ node, ...props }) => {
                    void node;
                    return (
                      <pre
                        className="overflow-x-auto rounded-xl bg-zinc-100 p-4 text-sm dark:bg-zinc-800/60"
                        {...props}
                      />
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Add content in Strapi to show it here.
            </p>
          )}
        </Card>
      </Container>
    </main>
  );
}

