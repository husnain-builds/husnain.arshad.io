import postsJson from "@/utils/blog.json";

export type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  publishedDate?: string | null;
};

const posts = postsJson as BlogPost[];

export function getBlogPosts(): BlogPost[] {
  return [...posts].sort((a, b) => {
    const da = a.publishedDate ?? "";
    const db = b.publishedDate ?? "";
    return db.localeCompare(da);
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return posts.find((p) => p.slug === slug) ?? null;
}
