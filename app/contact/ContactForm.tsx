"use client";

import { useState } from "react";

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(formData: FormData) {
    setState({ status: "submitting" });
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }
      setState({ status: "success" });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return (
    <form
      action={onSubmit}
      className="mt-6 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="name">
          Name
        </label>
        <input
          className="h-11 rounded-xl border border-zinc-300 bg-transparent px-4 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:ring-zinc-600"
          id="name"
          name="name"
          required
          minLength={2}
          disabled={state.status === "submitting"}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          className="h-11 rounded-xl border border-zinc-300 bg-transparent px-4 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:ring-zinc-600"
          id="email"
          name="email"
          type="email"
          required
          disabled={state.status === "submitting"}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          className="min-h-36 resize-y rounded-xl border border-zinc-300 bg-transparent p-4 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:ring-zinc-600"
          id="message"
          name="message"
          required
          minLength={10}
          disabled={state.status === "submitting"}
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        disabled={state.status === "submitting"}
      >
        {state.status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {state.status === "success" ? (
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          Message sent. Thanks!
        </p>
      ) : null}
      {state.status === "error" ? (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

