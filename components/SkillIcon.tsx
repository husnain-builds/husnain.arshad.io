import {
  siBootstrap,
  siCss,
  siExpress,
  siGatsby,
  siGithub,
  siGitlab,
  siGit,
  siHtml5,
  siJavascript,
  siMaterialdesignicons,
  siMongodb,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siRedux,
  siStrapi,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siWordpress,
} from "simple-icons/icons";

type SimpleIcon = {
  title: string;
  hex: string;
  path: string;
};

function norm(input: string) {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}

const ICONS: Record<string, SimpleIcon> = {
  html: siHtml5,
  html5: siHtml5,
  css: siCss,
  css3: siCss,
  javascript: siJavascript,
  "java script": siJavascript,
  typescript: siTypescript,
  react: siReact,
  reactjs: siReact,
  "react.js": siReact,
  "react js": siReact,
  "next.js": siNextdotjs,
  nextjs: siNextdotjs,
  "next js": siNextdotjs,
  redux: siRedux,
  "material ui": siMui,
  mui: siMui,
  "tailwind css": siTailwindcss,
  tailwind: siTailwindcss,
  bootstrap: siBootstrap,
  gatsby: siGatsby,
  strapi: siStrapi,
  git: siGit,
  github: siGithub,
  gitlab: siGitlab,
  wordpress: siWordpress,
  "node.js": siNodedotjs,
  nodejs: siNodedotjs,
  "node js": siNodedotjs,
  express: siExpress,
  "express.js": siExpress,
  "express js": siExpress,
  supabase: siSupabase,
  mongodb: siMongodb,
  "mongo db": siMongodb,
  mongodbatlas: siMongodb,
  icons: siMaterialdesignicons,
};

export function SkillIcon({
  name,
  className = "",
  variant = "default",
}: {
  name: string;
  className?: string;
  /** `hero`: muted glass chip for orbit / decorative contexts */
  variant?: "default" | "hero";
}) {
  const icon = ICONS[norm(name)];
  if (!icon) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white/50 text-[10px] font-semibold text-zinc-700 dark:border-zinc-800/70 dark:bg-zinc-950/20 dark:text-zinc-200 ${className}`}
        aria-hidden="true"
      >
        {name.slice(0, 1).toUpperCase()}
      </span>
    );
  }

  if (variant === "hero") {
    return (
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/9 bg-zinc-950/55 text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/65 ${className}`}
        style={{
          color: `color-mix(in oklab, #${icon.hex} 72%, white)`,
        }}
        title={icon.title}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4.5 w-4.5 opacity-95"
          fill="currentColor"
          role="img"
          aria-label={icon.title}
        >
          <path d={icon.path} />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/15 text-white shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 ${className}`}
      style={{
        color: `#${icon.hex}`,
        backgroundColor: `color-mix(in oklab, #${icon.hex} 18%, transparent)`,
      }}
      title={icon.title}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        role="img"
        aria-label={icon.title}
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
}

