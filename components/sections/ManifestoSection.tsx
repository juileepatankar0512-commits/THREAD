"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

export function ManifestoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Multi-plane parallax, scale, opacity, and blur transforms
  // Layer 1: "AI already knows"
  const l1Opacity = useTransform(smooth, [0, 0.2, 0.45], [0.3, 1, 0.15]);
  const l1Blur = useTransform(smooth, [0, 0.2, 0.45], [4, 0, 8]);
  const l1Y = useTransform(smooth, [0, 0.45], [50, -40]);
  const l1Scale = useTransform(smooth, [0, 0.45], [0.95, 1.05]);

  // Layer 2: "how to understand."
  const l2Opacity = useTransform(smooth, [0.1, 0.3, 0.52], [0, 0.9, 0.1]);
  const l2Blur = useTransform(smooth, [0.1, 0.3, 0.52], [6, 0, 10]);
  const l2Y = useTransform(smooth, [0.1, 0.52], [70, -60]);

  // Layer 3: "The hard part"
  const l3Opacity = useTransform(smooth, [0.35, 0.58, 0.85], [0, 1, 0.4]);
  const l3Blur = useTransform(smooth, [0.35, 0.58, 0.85], [6, 0, 2]);
  const l3Y = useTransform(smooth, [0.35, 0.85], [60, -20]);
  const l3Scale = useTransform(smooth, [0.35, 0.58], [0.92, 1.02]);

  // Layer 4: "is making it"
  const l4Opacity = useTransform(smooth, [0.48, 0.72, 0.92], [0, 1, 0.6]);
  const l4Y = useTransform(smooth, [0.48, 0.92], [50, -10]);

  // Layer 5: "USEFUL." — Dominant final word
  const l5Opacity = useTransform(smooth, [0.65, 0.88, 1], [0, 1, 1]);
  const l5Scale = useTransform(smooth, [0.65, 0.92], [0.85, 1.12]);
  const l5Blur = useTransform(smooth, [0.65, 0.85], [10, 0]);
  const l5Y = useTransform(smooth, [0.65, 1], [80, 0]);

  return (
    <section ref={containerRef} className="manifesto-cinematic-section">
      <div className="manifesto-sticky-wrapper">
        <div className="manifesto-typography-stage">
          {/* Phase 1: Understanding */}
          <div className="manifesto-phrase-group phrase-1">
            <motion.h2
              className="manifesto-line line-quiet"
              style={{
                opacity: l1Opacity,
                filter: useTransform(l1Blur, (v) => `blur(${v}px)`),
                y: l1Y,
                scale: l1Scale,
              }}
            >
              AI already knows
            </motion.h2>
            <motion.h2
              className="manifesto-line line-serif-shift"
              style={{
                opacity: l2Opacity,
                filter: useTransform(l2Blur, (v) => `blur(${v}px)`),
                y: l2Y,
              }}
            >
              <em>how to understand.</em>
            </motion.h2>
          </div>

          {/* Phase 2: The Hard Part & Useful */}
          <div className="manifesto-phrase-group phrase-2">
            <motion.h2
              className="manifesto-line line-forward"
              style={{
                opacity: l3Opacity,
                filter: useTransform(l3Blur, (v) => `blur(${v}px)`),
                y: l3Y,
                scale: l3Scale,
              }}
            >
              The hard part
            </motion.h2>

            <motion.h2
              className="manifesto-line line-mid"
              style={{
                opacity: l4Opacity,
                y: l4Y,
              }}
            >
              is making it
            </motion.h2>

            <motion.div
              className="manifesto-focal-word"
              style={{
                opacity: l5Opacity,
                scale: l5Scale,
                filter: useTransform(l5Blur, (v) => `blur(${v}px)`),
                y: l5Y,
              }}
            >
              <h1 className="focal-gold">USEFUL.</h1>
            </motion.div>
          </div>
        </div>

        {/* Ambient subtle editorial rule */}
        <div className="manifesto-bottom-marker">
          <span className="marker-dot" />
          <span className="marker-label">IQOO HACKATHON 2026 · INTERACTION THESIS</span>
        </div>
      </div>
    </section>
  );
}
