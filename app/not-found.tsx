import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <main className="py-16">
      <Container className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-50"
        >
          Go home →
        </Link>
      </Container>
    </main>
  );
}

