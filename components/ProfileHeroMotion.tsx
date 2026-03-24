"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ProfileHeroMotion() {
  const reduce = useReducedMotion();

  const slow = reduce ? 0 : 28;
  const slower = reduce ? 0 : 38;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(249,115,22,0.10),transparent_55%),radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.12),transparent_60%)]" />

      {/* rotating gradient ring */}
      <motion.div
        className="absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,rgba(249,115,22,0.55),rgba(124,58,237,0.40),rgba(96,165,250,0.35),rgba(249,115,22,0.55))] opacity-80 blur-[1px]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={
          reduce
            ? undefined
            : { duration: slower, ease: "linear", repeat: Infinity }
        }
      />

      {/* orbital ring */}
      <motion.div
        className="absolute inset-3 rounded-full border border-white/10"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={
          reduce ? undefined : { duration: slow, ease: "linear", repeat: Infinity }
        }
        style={{
          transform: "rotateX(22deg) rotateZ(12deg)",
        }}
      />

      {/* floating dots */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={
          reduce ? undefined : { duration: 22, ease: "linear", repeat: Infinity }
        }
        style={{ transformOrigin: "50% 50%" }}
      >
        {[
          { top: "16%", left: "62%", s: 10, o: "bg-orange-400/90" },
          { top: "26%", left: "18%", s: 8, o: "bg-violet-400/80" },
          { top: "62%", left: "78%", s: 7, o: "bg-blue-300/80" },
          { top: "72%", left: "24%", s: 9, o: "bg-orange-300/80" },
        ].map((d, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${d.o}`}
            style={{
              top: d.top,
              left: d.left,
              width: d.s,
              height: d.s,
              filter: "drop-shadow(0 0 12px rgba(249,115,22,0.35))",
            }}
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 2.8 + i * 0.35, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </motion.div>

      {/* inner glass */}
      <motion.div
        className="absolute inset-[10%] rounded-full border border-white/10 bg-white/5 shadow-xl"
        animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
        transition={
          reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* inner shape */}
        <motion.div
          className="absolute inset-[18%] rounded-[40%] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_60%_70%,rgba(124,58,237,0.55),transparent_60%),radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.35),transparent_55%)] opacity-90"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={
            reduce
              ? undefined
              : { duration: 18, ease: "linear", repeat: Infinity }
          }
          style={{ filter: "blur(0.5px)" }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
      </motion.div>
    </div>
  );
}

