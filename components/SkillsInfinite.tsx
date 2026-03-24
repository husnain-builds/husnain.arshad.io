"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

export function SkillsInfinite({
  pageSize = 20,
}: {
  pageSize?: number;
}) {
  const [items, setItems] = useState<SkillItem[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const canLoadMore = useMemo(
    () => nextPage !== null && !loading,
    [nextPage, loading],
  );

  const load = useCallback(
    async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/skills?page=${page}&pageSize=${pageSize}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as ApiResponse;
      setItems((prev) => {
        const seen = new Set(prev.map((x) => x.id));
        const merged = [...prev];
        for (const it of data.items) {
          if (!seen.has(it.id)) merged.push(it);
        }
        return merged;
      });
      setNextPage(data.nextPage);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load skills");
      setNextPage(null);
    } finally {
      setLoading(false);
    }
    },
    [pageSize],
  );

  useEffect(() => {
    if (items.length === 0 && nextPage === 1 && !loading) void load(1);
  }, [items.length, load, loading, nextPage]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!canLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (nextPage) void load(nextPage);
      },
      { root: el.parentElement, rootMargin: "200px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [canLoadMore, load, nextPage]);

  return (
    <div className="relative">
      <div className="max-h-56 overflow-y-auto pr-2">
        {items.length === 0 && loading ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Loading skills…
          </p>
        ) : null}

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {items.map((s) => (
            <span
              key={s.id}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/40 px-3 py-1 text-xs text-zinc-800 shadow-sm backdrop-blur transition hover:bg-white/70 dark:border-zinc-800/70 dark:bg-zinc-950/20 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
              title={
                s.category
                  ? `${s.name} • ${s.category}${s.level ? ` • ${s.level}/100` : ""}`
                  : `${s.name}${s.level ? ` • ${s.level}/100` : ""}`
              }
            >
              <span className="font-medium">{s.name}</span>
              {typeof s.level === "number" ? (
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  {Math.round(s.level / 10)}/10
                </span>
              ) : null}
            </span>
          ))}
        </div>

        <div ref={sentinelRef} className="h-8" />

        {loading && items.length > 0 ? (
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Loading more…
          </p>
        ) : null}
        {!loading && nextPage === null && items.length > 0 ? (
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            You’ve reached the end.
          </p>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white/80 to-transparent dark:from-zinc-950/60" />
    </div>
  );
}

