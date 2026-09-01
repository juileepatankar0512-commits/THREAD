"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null); const isInView = useInView(ref, { once: true, margin: "-15%" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
