import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { getBlogPostBySlug } from "@/utils/blog";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-dvh py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_circle_at_10%_0%,rgba(124,58,237,0.1),transparent_50%)]" />
      <Container className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/blog"
            className="text-sm font-medium text-violet-700 hover:underline dark:text-violet-300"
          >
            ← Blog
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {post.publishedDate ?? "—"}
          </p>
        </div>

        <Card className="border-zinc-200/80 bg-white/75 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/50">
          {post.content ? (
            <article className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => {
                    void node;
                    return (
                      <h1
                        className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
                        {...props}
                      />
                    );
                  },
                  h2: ({ node, ...props }) => {
                    void node;
                    return (
                      <h2
                        className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
                        {...props}
                      />
                    );
                  },
                  h3: ({ node, ...props }) => {
                    void node;
                    return (
                      <h3
                        className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
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
              Add a <code className="font-mono">content</code> field (Markdown) to this post in{" "}
              <code className="font-mono">utils/blog.json</code>.
            </p>
          )}
        </Card>
      </Container>
    </main>
  );
}
