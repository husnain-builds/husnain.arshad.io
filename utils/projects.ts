import projectsJson from "@/utils/projects.json";

export type Project = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  agentic?: boolean;
  role: string;
  year: string;
  featured?: boolean;
  githubUrl?: string | null;
  liveUrl?: string | null;
};

const projects = projectsJson as Project[];

export function getAllProjects(): Project[] {
  return [...projects];
}

export function getFeaturedProjects(limit = 3): Project[] {
  const featured = projects.filter((p) => p.featured);
  const source = featured.length > 0 ? featured : projects;
  return source.slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null;
}

export const fallbackProjects = projects;
