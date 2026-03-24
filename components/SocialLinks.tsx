import Link from "next/link";
import { siGithub, siGitlab, siGmail, siX } from "simple-icons/icons";

type SimpleIcon = {
  title: string;
  hex: string;
  path: string;
};

const linkedInIcon: SimpleIcon = {
  title: "LinkedIn",
  hex: "0A66C2",
  // Simplified LinkedIn mark (safe inline SVG path)
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.86V9h2.954v11.452z",
};

type Item = {
  label: string;
  href: string;
  icon: SimpleIcon;
};

function IconBadge({ icon }: { icon: SimpleIcon }) {
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/70 bg-white/60 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/20"
      style={{
        color: `#${icon.hex}`,
        backgroundColor: `color-mix(in oklab, #${icon.hex} 14%, transparent)`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" role="img">
        <path d={icon.path} />
      </svg>
    </span>
  );
}

export function SocialLinks({
  github = "https://github.com/husnain-builds",
  linkedin = "https://www.linkedin.com/in/husnain-arshad-2aba941b5/",
  email = "mailto:husnainarshad674@gmail.com",
  gitlab,
  x,
}: {
  github?: string;
  linkedin?: string;
  email?: string;
  gitlab?: string;
  x?: string;
}) {
  const items: Item[] = [
    { label: "GitHub", href: github, icon: siGithub },
    { label: "LinkedIn", href: linkedin, icon: linkedInIcon },
    { label: "Email", href: email, icon: siGmail },
    ...(gitlab ? [{ label: "GitLab", href: gitlab, icon: siGitlab }] : []),
    ...(x ? [{ label: "X", href: x, icon: siX }] : []),
  ];

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      {items.map((item) => {
        const isExternal = item.href.startsWith("http");
        const common =
          "group inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/50 px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white/80 dark:border-zinc-800/70 dark:bg-zinc-950/20 dark:text-zinc-50 dark:hover:bg-zinc-900/50";

        return isExternal ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={common}
          >
            <IconBadge icon={item.icon} />
            <span>{item.label}</span>
          </a>
        ) : (
          <Link key={item.label} href={item.href} className={common}>
            <IconBadge icon={item.icon} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

