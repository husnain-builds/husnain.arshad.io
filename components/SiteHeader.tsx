"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";

const nav = [
  { href: "/projects", label: "Projects" },
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

      <div className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md supports-backdrop-filter:bg-zinc-950/70">
        <div className="h-px bg-linear-to-r from-transparent via-orange-400/45 to-transparent" />
        <Container className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-zinc-50"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-orange-400/20 to-violet-500/15 text-xs font-bold text-orange-200">
              HA
            </span>
            <span className="hidden sm:inline">Husnain Arshad</span>
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
                        ? "bg-white/15 text-white"
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
