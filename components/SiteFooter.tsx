import Link from "next/link";
import { Container } from "@/components/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200/60 bg-white/40 py-10 text-sm text-zinc-600 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:text-zinc-400">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Husnain Arshad. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href="/">
            Home
          </Link>
          <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href="/projects">
            Projects
          </Link>
          <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href="/contact">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}
