import { Container } from "@/components/Container";
import { Card } from "@/components/ui";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "@/app/contact/ContactForm";

const PHONE_DISPLAY = "0332-4992333";
const PHONE_TEL = "+923324992333";

export default function ContactPage() {
  return (
    <main className="relative min-h-dvh py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_circle_at_20%_0%,rgba(249,115,22,0.08),transparent_55%),radial-gradient(640px_circle_at_90%_30%,rgba(124,58,237,0.08),transparent_50%)]" />
      <Container className="relative max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
              Get in touch
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
              Whether you are hiring, exploring a collaboration, or want to discuss a project,
              I would be glad to hear from you. Share a short note and I will follow up as soon as
              I can.
            </p>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <Card className="sticky top-24 rounded-3xl border-zinc-200/70 bg-white p-8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.1)] dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.4)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Direct
              </p>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Phone &amp; profiles
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Prefer a call or social? Use the number below or connect on any platform.
              </p>

              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-6 flex flex-col gap-1 rounded-2xl border border-zinc-200/80 bg-zinc-50 px-5 py-4 dark:border-zinc-700/80 dark:bg-zinc-950/60"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  Mobile / WhatsApp
                </span>
                <span className="font-mono text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {PHONE_DISPLAY}
                </span>
              </a>

              <div className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-800/80">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Online
                </p>
                <SocialLinks layout="stack" />
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </main>
  );
}
