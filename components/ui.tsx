import Link from "next/link";
import { type ReactNode } from "react";

export function ButtonLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-b from-zinc-900 to-zinc-800 px-5 text-sm font-medium text-zinc-50 shadow-sm transition hover:from-zinc-800 hover:to-zinc-700 dark:from-zinc-50 dark:to-zinc-200 dark:text-zinc-950 dark:hover:from-zinc-200 dark:hover:to-zinc-100"
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 ${className}`}
    >
      {children}
    </div>
  );
}

