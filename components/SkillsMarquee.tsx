"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SkillIcon } from "@/components/SkillIcon";

type SkillItem = {
  id: number;
  name: string;
  category: string | null;
  level: number | null;
};

type ApiResponse = {
  items: SkillItem[];
  nextPage: number | null;
};

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function SkillsMarquee({
  pageSize = 60,
}: {
  pageSize?: number;
}) {
  const reduce = useReducedMotion();
  const [items, setItems] = useState<SkillItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setError(null);
        const res = await fetch(`/api/skills?page=1&pageSize=${pageSize}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Request failed (${res.status})`);
        }
        const data = (await res.json()) as ApiResponse;
        if (!alive) return;
        setItems(data.items);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load skills");
      }
    }
    void run();
    return () => {
      alive = false;
    };
  }, [pageSize]);

  const rows = useMemo(() => {
    const safe = items.filter((x) => x?.name);
    if (safe.length <= 14) return [safe];
    return chunk(safe, Math.ceil(safe.length / 2));
  }, [items]);

  if (error) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Unable to load skills.
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading skills…</p>
    );
  }

  return (
    <div className="grid gap-3">
      {rows.slice(0, 2).map((row, idx) => (
        <MarqueeRow
          key={idx}
          items={row}
          direction={idx % 2 === 0 ? "left" : "right"}
          seconds={idx % 2 === 0 ? 26 : 34}
          reduceMotion={reduce}
        />
      ))}
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  seconds,
  reduceMotion,
}: {
  items: SkillItem[];
  direction: "left" | "right";
  seconds: number;
  reduceMotion: boolean | null;
}) {
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/40 px-3 py-3 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/15"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white/80 to-transparent dark:from-zinc-950/70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white/80 to-transparent dark:from-zinc-950/70" />

      <motion.div
        className="flex w-max items-center gap-2 will-change-transform"
        animate={
          reduceMotion
            ? undefined
            : direction === "left"
              ? { x: ["0%", "-50%"] }
              : { x: ["-50%", "0%"] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: seconds, ease: "linear", repeat: Infinity }
        }
      >
        {doubled.map((s, i) => (
          <span
            key={`${s.id}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/60 px-3 py-2 text-xs font-medium text-zinc-900 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/35 dark:text-zinc-50"
            title={
              s.category
                ? `${s.name} • ${s.category}${s.level ? ` • ${s.level}/100` : ""}`
                : `${s.name}${s.level ? ` • ${s.level}/100` : ""}`
            }
          >
            <SkillIcon name={s.name} />
            <span className="whitespace-nowrap">{s.name}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

