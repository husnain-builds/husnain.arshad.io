import Link from "next/link";
import { Container } from "@/components/Container";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { SocialLinks } from "@/components/SocialLinks";
import { ProfileHeroMotion } from "@/components/ProfileHeroMotion";
import { Card } from "@/components/ui";
import {
  entityAttributes,
  getPosts,
  getProjects,
  isStrapiConfigured,
} from "@/lib/strapi";

export default function Home() {
  const configured = isStrapiConfigured();
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-50">
      <section className="relative overflow-hidden border-b border-zinc-800/70">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(900px_circle_at_70%_30%,rgba(124,58,237,0.18),transparent_55%),radial-gradient(900px_circle_at_60%_90%,rgba(59,130,246,0.14),transparent_60%)]" />
        <Container className="relative py-14 sm:py-20">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-sm font-medium text-zinc-300">
                Hello<span className="text-orange-400">.</span>
              </p>
              <div className="mt-3 grid gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="h-0.5 w-12 bg-orange-400/90" />
                  <p className="text-lg text-zinc-200">I&apos;m Husnain</p>
                </div>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                  Software Developer
                </h1>
              </div>

              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Frontend-focused developer building fast, modern interfaces with
                React, Next.js, and TypeScript—content managed in Strapi.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-orange-500 px-6 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-orange-400"
                >
                  Get in touch
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-white/10"
                >
                  My resume
                </Link>
              </div>

              <div className="mt-6">
                <SocialLinks />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative mx-auto aspect-square w-full max-w-95">
                <div className="absolute inset-0 overflow-hidden rounded-full border border-white/10 bg-zinc-950/35 shadow-xl">
                  <ProfileHeroMotion />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        {!configured ? (
          <Card className="border-white/10 bg-white/5 text-zinc-100">
            <h2 className="text-lg font-semibold">Connect Strapi</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Set <code className="font-mono">STRAPI_URL</code> in{" "}
              <code className="font-mono">my-app/.env.local</code> to start
              loading live content.
            </p>
          </Card>
        ) : (
          <HomeContent />
        )}
      </Container>
    </main>
  );
}

async function HomeContent() {
  const data = await loadHomeData();
  if (!data) {
    return (
      <Card className="border-white/10 bg-white/5 text-zinc-100">
        <h2 className="text-lg font-semibold">Unable to load content</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Make sure Strapi is running and that{" "}
          <code className="font-mono">STRAPI_URL</code> is correct.
        </p>
      </Card>
    );
  }

  const { featuredProjects, latestPosts } = data;
  return (
    <div className="flex flex-col gap-12">
      <section className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Services
            </p>
            <div className="mt-5 grid gap-4">
              <ServiceItem title="Website Development" />
              <ServiceItem title="App Development" />
              <ServiceItem title="Website Hosting" />
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-3xl font-semibold tracking-tight">About me</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
              I build scalable, user-focused web apps with modern frontend tools.
              I love turning complex ideas into clean interfaces and optimizing
              performance for real users.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <DarkStat label="Completed projects" value="10+" />
              <DarkStat label="Client satisfaction" value="95%" />
              <DarkStat label="Years experience" value="4+" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_30%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(900px_circle_at_90%_50%,rgba(124,58,237,0.16),transparent_55%)]" />
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Skills
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Tools I use daily
          </h2>
          <div className="mt-5">
            <SkillsMarquee />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-200 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
              Mark projects as <code className="font-mono">featured</code> in
              Strapi to show them here.
            </div>
          ) : (
            featuredProjects.map((p) => {
              const a = entityAttributes(p);
              return (
                <Link
                  key={p.id}
                  href={`/projects/${a.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <div className="text-lg font-semibold">{a.title}</div>
                  {a.summary ? (
                    <div className="mt-2 text-sm leading-6 text-zinc-300">
                      {a.summary}
                    </div>
                  ) : null}
                  <div className="mt-4 text-sm font-medium text-orange-300 transition group-hover:translate-x-0.5">
                    View details →
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      {/* <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Articles</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-200 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
              Add blog posts in Strapi to show them here.
            </div>
          ) : (
            latestPosts.map((post) => {
              const a = entityAttributes(post);
              return (
                <Link
                  key={post.id}
                  href={`/blog/${a.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <div className="text-sm text-zinc-400">
                    {a.publishedDate ?? "—"}
                  </div>
                  <div className="mt-2 text-lg font-semibold">{a.title}</div>
                  {a.excerpt ? (
                    <div className="mt-2 text-sm leading-6 text-zinc-300">
                      {a.excerpt}
                    </div>
                  ) : null}
                </Link>
              );
            })
          )}
        </div>
      </section> */}
    </div>
  );
}

function ServiceItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-300">
        <span className="h-2 w-2 rounded-full bg-orange-400" />
      </span>
      <div className="font-medium text-zinc-100">{title}</div>
    </div>
  );
}

function DarkStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
        {label}
      </div>
    </div>
  );
}

async function loadHomeData() {
  try {
    const [projectsRes, postsRes] = await Promise.all([
      getProjects(),
      getPosts(),
    ]);

    return {
      featuredProjects: projectsRes.data
        .filter((p) => Boolean(entityAttributes(p).featured))
        .slice(0, 3),
      latestPosts: postsRes.data.slice(0, 3),
    };
  } catch {
    return null;
  }
}
