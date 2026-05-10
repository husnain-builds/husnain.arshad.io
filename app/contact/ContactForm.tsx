"use client";

import { useState } from "react";

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function contactEmail() {
  const raw = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "husnainarshad674@gmail.com";
  return raw.replace(/^mailto:/i, "").trim();
}

const field =
  "h-12 w-full rounded-xl border border-zinc-200/90 bg-white px-4 text-sm text-zinc-900 shadow-sm transition placeholder:text-zinc-400 outline-none focus:border-orange-400/70 focus:ring-4 focus:ring-orange-500/12 disabled:cursor-not-allowed disabled:opacity-55 dark:border-zinc-700/90 dark:bg-zinc-950/50 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-orange-400/50 dark:focus:ring-orange-400/10";

const label =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400";

export function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  function onSubmit(formData: FormData) {
    setState({ status: "submitting" });
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2) {
      setState({ status: "error", message: "Please enter your full name." });
      return;
    }
    if (!email.includes("@")) {
      setState({ status: "error", message: "Please enter a valid email address." });
      return;
    }
    if (message.length < 10) {
      setState({
        status: "error",
        message: "Please add a few more details so I can respond meaningfully.",
      });
      return;
    }

    const to = contactEmail();
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Husnain,\n\n${message}\n\n— ${name}\n${email}\n`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setState({ status: "success" });
  }

  return (
    <form
      action={onSubmit}
      className="mt-10 rounded-3xl border border-zinc-200/70 bg-white p-8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.12)] dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]"
      noValidate
    >
      <div className="border-b border-zinc-100 pb-6 dark:border-zinc-800/80">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Send a message
        </h2>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Completing the form opens your email client with a ready-to-send draft.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        <div className="grid gap-2">
          <label className={label} htmlFor="name">
            Full name
          </label>
          <input
            className={field}
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            required
            minLength={2}
            disabled={state.status === "submitting"}
          />
        </div>

        <div className="grid gap-2">
          <label className={label} htmlFor="email">
            Work email
          </label>
          <input
            className={field}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            disabled={state.status === "submitting"}
          />
        </div>

        <div className="grid gap-2">
          <label className={label} htmlFor="message">
            How can I help?
          </label>
          <textarea
            className={`${field} min-h-38 resize-y py-3 leading-relaxed`}
            id="message"
            name="message"
            placeholder="Share context on the opportunity, timeline, or stack—whatever helps."
            required
            minLength={10}
            disabled={state.status === "submitting"}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="order-2 text-xs leading-relaxed text-zinc-500 sm:order-1 dark:text-zinc-500">
          Typical response within a few business days.
        </p>
        <button
          type="submit"
          className="order-1 inline-flex h-12 min-w-42 shrink-0 items-center justify-center rounded-xl bg-zinc-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 dark:bg-orange-500 dark:text-zinc-950 dark:hover:bg-orange-400 sm:order-2"
          disabled={state.status === "submitting"}
        >
          {state.status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-zinc-950/30 dark:border-t-zinc-950"
                aria-hidden
              />
              Preparing…
            </span>
          ) : (
            "Send message"
          )}
        </button>
      </div>

      <div className="mt-6" role="status" aria-live="polite">
        {state.status === "success" ? (
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100">
            <p className="font-medium">Draft opened in your mail app.</p>
            <p className="mt-1 text-emerald-800/90 dark:text-emerald-200/90">
              If nothing opened, email{" "}
              <a className="font-medium underline underline-offset-2" href={`mailto:${contactEmail()}`}>
                {contactEmail()}
              </a>{" "}
              directly.
            </p>
          </div>
        ) : null}
        {state.status === "error" ? (
          <div className="rounded-xl border border-red-200/90 bg-red-50/90 px-4 py-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-950/25 dark:text-red-100">
            {state.message}
          </div>
        ) : null}
      </div>
    </form>
  );
}
