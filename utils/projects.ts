import projectsJson from "@/utils/projects.json";

export type FallbackProject = (typeof projectsJson)[number];

export const fallbackProjects: FallbackProject[] = projectsJson;

export function getFallbackProjectBySlug(slug: string) {
  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}
