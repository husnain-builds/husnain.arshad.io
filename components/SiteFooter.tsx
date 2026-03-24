import Link from "next/link";
import { Container } from "@/components/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200/50 bg-white/30 py-10 text-sm text-zinc-500 backdrop-blur dark:border-zinc-800/50 dark:bg-zinc-950/20 dark:text-zinc-400">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Portfolio. Powered by Next.js + Strapi.</p>
        <div className="flex items-center gap-4">
          <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href="/">
            Home
          </Link>
          <Link
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
            href="/projects"
          >
            Projects
          </Link>
          {/* <Link
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
            href="/blog"
          >
            Blog
          </Link> */}
        </div>
      </Container>
    </footer>
  );
}

