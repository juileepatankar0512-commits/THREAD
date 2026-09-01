"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { ContextField } from "@/components/three/ContextField";

export function RahulMessageStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Narrative stages:
  // 0: Empty Canvas + Dominant Title
  // 1: Rahul Message Bubble Enters
  // 2: Typing Indicator (• • •)
  // 3: Light, Friendly THREAD Suggestion
  // 4: Send Triggered -> Sent State
  const [stage, setStage] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.16) setStage(0);
    else if (latest < 0.36) setStage(1);
    else if (latest < 0.56) setStage(2);
    else if (latest < 0.80) setStage(3);
    else setStage(4);
  });

  // Title smoothly recedes: fades, blurs, and shifts back into background
  const titleOpacity = useTransform(smoothProgress, [0, 0.18, 0.35], [1, 0.35, 0.04]);
  const titleBlur = useTransform(smoothProgress, [0, 0.25], [0, 10]);
  const titleScale = useTransform(smoothProgress, [0, 0.35], [1, 0.92]);
  const titleY = useTransform(smoothProgress, [0, 0.35], [0, -40]);

  // Subtle floating parallax for the conversation elements
  const streamY = useTransform(smoothProgress, [0, 0.35, 0.85], [30, 0, -25]);

  return (
    <section ref={containerRef} className="rahul-story-section" id="story-flagship">
      <div className="rahul-story-sticky">
        {/* Spatial background depth */}
        <ContextField />

        {/* Narrative Title — Left / Upper region, recedes as scroll drives the conversation */}
        <motion.div
          className="rahul-story-heading"
          style={{
            opacity: titleOpacity,
            filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
            scale: titleScale,
            y: titleY,
          }}
        >
          <span className="eyebrow">01 / A NORMAL REQUEST</span>
          <h2>
            One simple request<br />
            <em>to manage.</em>
          </h2>
          <p className="story-lead">
            Rahul asks for a document without providing an exact filename or location.
          </p>
        </motion.div>

        {/* Floating Motion Graphic Conversation Canvas — NO phone, NO container, NO rectangle */}
        <motion.div
          className="floating-conversation-canvas"
          style={{ y: streamY }}
        >
          {/* State 1+: Rahul Sender Badge & Incoming Message Bubble */}
          <motion.div
            className="floating-message-unit"
            initial={false}
            animate={
              stage >= 1
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: 36, scale: 0.92, filter: "blur(6px)" }
            }
            transition={{
              type: "spring",
              stiffness: 190,
              damping: 22,
              mass: 0.8,
            }}
          >
            {/* Minimal floating sender label */}
            <div className="floating-sender-tag">
              <span className="sender-avatar">R</span>
              <span className="sender-name">RAHUL</span>
              <span className="sender-time">19:18</span>
            </div>

            {/* Rahul's Chat Bubble */}
            <div className="floating-bubble rahul-bubble">
              <p className="bubble-content">Can you send me that hackathon PDF?</p>
            </div>
          </motion.div>

          {/* State 2: Three Sequential Animated Dots Typing Indicator (• • •) */}
          <motion.div
            className="floating-typing-wrapper"
            initial={false}
            animate={
              stage === 2
                ? { opacity: 1, height: "auto", y: 0, filter: "blur(0px)" }
                : { opacity: 0, height: 0, y: 12, filter: "blur(4px)" }
            }
            transition={{ duration: 0.26, ease: "easeInOut" }}
          >
            <div className="floating-typing-indicator">
              <span className="typing-dot dot-1" />
              <span className="typing-dot dot-2" />
              <span className="typing-dot dot-3" />
            </div>
          </motion.div>

          {/* State 3+: Light, Friendly, Contextual THREAD Suggestion */}
          <motion.div
            className="floating-thread-unit"
            initial={false}
            animate={
              stage >= 3
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: 32, scale: 0.94, filter: "blur(6px)" }
            }
            transition={{
              type: "spring",
              stiffness: 210,
              damping: 24,
              mass: 0.85,
            }}
          >
            <div className="thread-friendly-card">
              {/* Card Header: Light, quiet, friendly indicator */}
              <div className="thread-card-header">
                <div className="thread-pill-badge">
                  <span className="thread-sparkle-dot" />
                  <b>THREAD</b>
                  <span className="thread-subcaption">Contextual Suggestion</span>
                </div>
              </div>

              {/* Natural friendly intent */}
              <p className="thread-friendly-intent">I found the PDF you meant.</p>

              {/* Document Preview Chip */}
              <div className="thread-friendly-file">
                <div className="file-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div className="file-info-text">
                  <b className="file-title">iQOO_Hackathon_Guide.pdf</b>
                  <span className="file-subtext">Recent context · Hackathon</span>
                </div>
              </div>

              {/* Compact, Friendly Action Buttons */}
              <div className="thread-friendly-actions">
                <motion.button
                  className={`btn-friendly-send ${stage >= 4 ? "sent" : ""}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {stage >= 4 ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Sent
                    </>
                  ) : (
                    "Send"
                  )}
                </motion.button>
                <button className="btn-friendly-dismiss">Dismiss</button>
              </div>
            </div>
          </motion.div>

          {/* State 4: Sent Confirmation Bubble */}
          <motion.div
            className="floating-sent-unit"
            initial={false}
            animate={
              stage >= 4
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: 20, scale: 0.94, filter: "blur(4px)" }
            }
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
            }}
          >
            <div className="floating-bubble sent-bubble">
              <div className="sent-file-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>iQOO_Hackathon_Guide.pdf</span>
              </div>
              <span className="sent-time-tag">Sent · 19:19</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
