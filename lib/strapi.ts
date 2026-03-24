export type StrapiEntityV4<T> = {
  id: number;
  attributes: T;
};

export type StrapiEntityV5<T> = {
  id: number;
  documentId?: string;
} & T;

export type StrapiEntity<T> = StrapiEntityV4<T> | StrapiEntityV5<T>;

export type StrapiCollectionResponse<T> = {
  data: Array<StrapiEntity<T>>;
  meta?: unknown;
};

export type StrapiSingleResponse<T> = {
  data: StrapiEntity<T> | null;
  meta?: unknown;
};

function isV4Entity<T>(entity: StrapiEntity<T>): entity is StrapiEntityV4<T> {
  return (
    typeof (entity as { attributes?: unknown }).attributes === "object" &&
    (entity as { attributes?: unknown }).attributes !== null
  );
}

export function entityAttributes<T>(entity: StrapiEntity<T>): T {
  return isV4Entity(entity) ? entity.attributes : (entity as StrapiEntityV5<T>);
}

function getStrapiUrl() {
  const url = process.env.STRAPI_URL;
  if (!url) return null;
  return url.replace(/\/+$/, "");
}

function summarizeResponseBody(body: string, maxLength = 180) {
  const normalized = body.replace(/\s+/g, " ").trim();
  if (!normalized) return "Empty response body";
  return normalized.length > maxLength
    ? `${normalized.slice(0, maxLength)}...`
    : normalized;
}

async function strapiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getStrapiUrl();
  if (!base) {
    throw new Error(
      "Missing STRAPI_URL. Set STRAPI_URL in my-app/.env.local (e.g. http://localhost:1337).",
    );
  }

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  const contentType = res.headers.get("content-type") ?? "";
  const text = await res.text().catch(() => "");

  if (!res.ok) {
    throw new Error(
      `Strapi request failed (${res.status}) for ${path}: ${summarizeResponseBody(text)}`,
    );
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error(
      `Strapi returned ${contentType || "an unknown content type"} for ${path} instead of JSON: ${summarizeResponseBody(text)}`,
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(
      `Strapi returned invalid JSON for ${path}: ${error instanceof Error ? error.message : "Unknown parse error"}`,
    );
  }
}

export type ProjectAttributes = {
  title: string;
  slug: string;
  summary?: string | null;
  description?: string | null;
  featured?: boolean | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  techStack?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
};

export type BlogPostAttributes = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featured?: boolean | null;
  publishedDate?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
};

export type SkillAttributes = {
  name: string;
  category?: string | null;
  level?: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

export async function getProjects() {
  return await strapiRequest<StrapiCollectionResponse<ProjectAttributes>>(
    "/api/projects?sort=publishedAt:desc&pagination[pageSize]=100",
  );
}

export async function getProjectBySlug(slug: string) {
  return await strapiRequest<StrapiCollectionResponse<ProjectAttributes>>(
    `/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`,
  );
}

export async function getPosts() {
  return await strapiRequest<StrapiCollectionResponse<BlogPostAttributes>>(
    "/api/blog-posts?sort=publishedDate:desc&pagination[pageSize]=100",
  );
}

export async function getPostBySlug(slug: string) {
  return await strapiRequest<StrapiCollectionResponse<BlogPostAttributes>>(
    `/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`,
  );
}

export async function getSkills() {
  return await strapiRequest<StrapiCollectionResponse<SkillAttributes>>(
    "/api/skills?sort=level:desc&pagination[pageSize]=200",
  );
}

type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getPagination(meta: unknown): StrapiPagination | null {
  if (!isRecord(meta)) return null;
  const paginationValue = meta.pagination;
  if (!isRecord(paginationValue)) return null;
  const page = Number(paginationValue.page);
  const pageSize = Number(paginationValue.pageSize);
  const pageCount = Number(paginationValue.pageCount);
  const total = Number(paginationValue.total);
  if (![page, pageSize, pageCount, total].every(Number.isFinite)) return null;
  return { page, pageSize, pageCount, total };
}

export type StrapiPagedCollectionResponse<T> = StrapiCollectionResponse<T> & {
  pagination: StrapiPagination | null;
};

export async function getSkillsPage(
  page: number,
  pageSize: number,
): Promise<StrapiPagedCollectionResponse<SkillAttributes>> {
  const res = await strapiRequest<StrapiCollectionResponse<SkillAttributes>>(
    `/api/skills?sort=level:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  );

  const pagination = getPagination(res.meta);
  return { ...res, pagination };
}

export async function createContactMessage(input: ContactMessageInput) {
  const token = process.env.STRAPI_API_TOKEN;
  if (!token) {
    throw new Error(
      "Missing STRAPI_API_TOKEN. Create a Strapi API token and set STRAPI_API_TOKEN in my-app/.env.local.",
    );
  }

  return await strapiRequest<{ data: { id: number } }>(
    "/api/contact-messages",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: input }),
      cache: "no-store",
    },
  );
}

export function isStrapiConfigured() {
  return Boolean(getStrapiUrl());
}

export function getStrapiErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Strapi content is temporarily unavailable.";
  }

  if (error.message.includes("Missing STRAPI_URL")) {
    return "Strapi is not configured right now.";
  }

  return "Strapi content is temporarily unavailable.";
}

