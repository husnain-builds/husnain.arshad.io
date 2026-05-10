import Link from "next/link";
import { Container } from "@/components/Container";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { SocialLinks } from "@/components/SocialLinks";
import { ProfileHeroMotion } from "@/components/ProfileHeroMotion";
import { Card } from "@/components/ui";
import { getFeaturedProjects } from "@/utils/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects(3);

  return (
    <main className="min-h-dvh">
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-zinc-950 text-zinc-50">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.45))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_15%,rgba(249,115,22,0.22),transparent_55%),radial-gradient(800px_circle_at_85%_25%,rgba(124,58,237,0.2),transparent_52%),radial-gradient(700px_circle_at_55%_95%,rgba(59,130,246,0.12),transparent_58%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                Open to opportunities
              </p>

              <div className="mt-6 space-y-2">
                <p className="text-lg text-zinc-300 sm:text-xl">
                  Hello — I&apos;m Husnain,{" "}
                  <span className="font-medium text-zinc-100">Software Engineer</span>
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.05]">
                  I build{" "}
                  <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-violet-300 bg-clip-text text-transparent">
                    reliable software solutions and web applications.
                  </span>
                </h1>
              </div>

              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
                From services and data layers to polished product surfaces—shipping features
                customers feel, with React, Next.js, TypeScript, Node, and solid engineering
                practices.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-orange-500 px-7 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-900/25 transition hover:bg-orange-400"
                >
                  Get in touch
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View selected work
                </Link>
              </div>

              <div className="mt-8">
                <SocialLinks />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-none">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-orange-500/25 via-transparent to-violet-500/20 blur-2xl" />
                <div className="relative mx-auto aspect-square w-full max-w-[min(100%,22rem)] overflow-hidden rounded-full border border-white/10 bg-zinc-950/40 shadow-2xl shadow-black/50 lg:max-w-md">
                  <ProfileHeroMotion />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="flex flex-col gap-16">
          <section className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-5">
              <Card className="h-full border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/40">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Focus
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  What I ship
                </h2>
                <div className="mt-6 grid gap-3">
                  <FocusRow
                    title="Features & systems"
                    detail="End-to-end delivery—from APIs and persistence to the UI customers use."
                  />
                  <FocusRow
                    title="Quality & performance"
                    detail="Thoughtful architecture, observability, and measurable improvements where it matters."
                  />
                  <FocusRow
                    title="Collaboration"
                    detail="Clear communication with product, design, and peers across the stack."
                  />
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="h-full border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/40">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  About
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
                  I work as a software engineer across the stack: designing and implementing
                  features, integrating services, and caring about how software behaves in
                  production. I like turning ambiguous problems into maintainable systems and
                  interfaces people trust.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <Stat label="Projects shipped" value="10+" />
                  <Stat label="Years in software" value="4+" />
                  <Stat label="Core stack" value="TS / Node" />
                </div>
              </Card>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white/90 to-zinc-50/90 p-6 shadow-sm dark:border-zinc-800/80 dark:from-zinc-900/60 dark:to-zinc-950/80 sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_0%_40%,rgba(249,115,22,0.12),transparent_55%),radial-gradient(600px_circle_at_100%_60%,rgba(124,58,237,0.12),transparent_55%)]" />
            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Skills
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Tools &amp; practices
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-300">
                Curated list in{" "}
                <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800/80">
                  utils/skills.json
                </code>
                — edit there to update the marquee.
              </p>
              <div className="mt-6">
                <SkillsMarquee />
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Portfolio
                </p>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  Featured projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-sm font-semibold text-orange-600 hover:underline dark:text-orange-400"
              >
                All projects →
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-orange-300/60 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/45 dark:hover:border-orange-500/40"
                >
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-2 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {p.title}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {p.description}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-orange-600 group-hover:translate-x-0.5 dark:text-orange-400">
                    Case study →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

function FocusRow({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-700/70 dark:bg-zinc-950/30">
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
      <div>
        <div className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</div>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{detail}</div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-700/70 dark:bg-zinc-950/30">
      <div className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
    </div>
  );
}
