import { NextResponse } from "next/server";
import { entityAttributes, getSkillsPage } from "@/lib/strapi";

function clampInt(value: string | null, fallback: number, min: number, max: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = clampInt(url.searchParams.get("page"), 1, 1, 1000);
    const pageSize = clampInt(url.searchParams.get("pageSize"), 20, 5, 50);

    const res = await getSkillsPage(page, pageSize);
    const items = res.data.map((e) => {
      const a = entityAttributes(e);
      return {
        id: e.id,
        name: a.name,
        category: a.category ?? null,
        level: a.level ?? null,
      };
    });

    const nextPage =
      res.pagination && res.pagination.page < res.pagination.pageCount
        ? res.pagination.page + 1
        : null;

    return NextResponse.json(
      {
        items,
        nextPage,
      },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

