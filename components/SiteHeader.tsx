"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";

const nav = [
  { href: "/projects", label: "Projects" },
  // { href: "/blog", label: "Blog" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-950 focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:ring-2 focus:ring-orange-400"
      >
        Skip to content
      </a>

      <div className="border-b border-zinc-800/60 bg-zinc-950/65 backdrop-blur supports-backdrop-filter:bg-zinc-950/50">
        <div className="h-px bg-linear-to-r from-transparent via-orange-400/40 to-transparent" />
        <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight text-zinc-50"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange-300">
            H
          </span>
          <span>Husnain Arshad</span>
        </Link>
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-zinc-300 md:flex">
              {nav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "rounded-full px-3 py-1.5 transition",
                      active
                        ? "bg-white/10 text-white"
                        : "hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-orange-400"
            >
              Contact
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}

