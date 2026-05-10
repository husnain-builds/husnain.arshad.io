"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SkillIcon } from "@/components/SkillIcon";

/** Skills with icon mappings — evenly spaced on a calm orbit */
const HERO_ORBIT_SKILLS = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Git",
] as const;

export function ProfileHeroMotion() {
  const reduce = useReducedMotion();

  const ringSlow = reduce ? 0 : 56;
  const ringCounter = reduce ? 0 : 72;
  const orbitDuration = reduce ? 0 : 72;
  const innerGlow = reduce ? 0 : 96;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full">
      {/* soft base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.07),transparent_50%),radial-gradient(circle_at_72%_68%,rgba(249,115,22,0.06),transparent_52%),radial-gradient(circle_at_48%_50%,rgba(124,58,237,0.07),transparent_58%)]" />

      {/* outer aura — very low contrast */}
      <motion.div
        className="absolute -inset-5 rounded-full bg-[conic-gradient(from_200deg,rgba(249,115,22,0.14),rgba(124,58,237,0.12),rgba(59,130,246,0.08),rgba(249,115,22,0.14))] opacity-70 blur-[2px]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={
          reduce ? undefined : { duration: ringSlow, ease: "linear", repeat: Infinity }
        }
      />

      {/* fine outer ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-white/7"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={
          reduce ? undefined : { duration: ringCounter, ease: "linear", repeat: Infinity }
        }
      />

      {/* dashed orbit guide */}
      <div
        className="pointer-events-none absolute inset-[12%] rounded-full border border-dashed border-white/6"
        aria-hidden
      />

      {/* inner glass — subtle breathing only */}
      <motion.div
        className="absolute inset-[10%] z-0 rounded-full border border-white/8 bg-white/4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        animate={reduce ? undefined : { scale: [1, 1.008, 1] }}
        transition={
          reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <motion.div
          className="absolute inset-[20%] rounded-[42%] bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.12),transparent_58%),radial-gradient(circle_at_62%_72%,rgba(124,58,237,0.2),transparent_62%),radial-gradient(circle_at_50%_48%,rgba(249,115,22,0.08),transparent_55%)] opacity-[0.55]"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={
            reduce ? undefined : { duration: innerGlow, ease: "linear", repeat: Infinity }
          }
        />
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/5" />
      </motion.div>

      {/* skill chips — slow orbit, counter-rotated for upright marks */}
      <motion.div
        className="pointer-events-none absolute inset-[12%] z-20"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={
          reduce
            ? undefined
            : { duration: orbitDuration, ease: "linear", repeat: Infinity }
        }
        aria-hidden
      >
        {HERO_ORBIT_SKILLS.map((name, i) => {
          const step = 360 / HERO_ORBIT_SKILLS.length;
          const angle = step * i - 90;
          return (
            <div
              key={name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * clamp(3.1rem, 24.5vmin, 5.35rem)))`,
              }}
            >
              <motion.div
                animate={reduce ? undefined : { rotate: -360 }}
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: orbitDuration,
                        ease: "linear",
                        repeat: Infinity,
                      }
                }
              >
                <SkillIcon name={name} variant="hero" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
