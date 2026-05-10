import { NextResponse } from "next/server";
import skillsJson from "@/utils/skills.json";

type SkillRow = {
  name: string;
  category?: string | null;
  level?: number | null;
};

function clampInt(value: string | null, fallback: number, min: number, max: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

const skills = skillsJson as SkillRow[];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = clampInt(url.searchParams.get("page"), 1, 1, 1000);
  const pageSize = clampInt(url.searchParams.get("pageSize"), 20, 5, 50);

  const sorted = [...skills].sort((a, b) => (b.level ?? 0) - (a.level ?? 0));
  const start = (page - 1) * pageSize;
  const slice = sorted.slice(start, start + pageSize);

  const items = slice.map((s, i) => ({
    id: start + i + 1,
    name: s.name,
    category: s.category ?? null,
    level: s.level ?? null,
  }));

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const nextPage = page < totalPages ? page + 1 : null;

  return NextResponse.json(
    {
      items,
      nextPage,
    },
    { status: 200 },
  );
}
