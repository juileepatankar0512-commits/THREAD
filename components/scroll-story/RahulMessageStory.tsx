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

  // Track the narrative stage
  // 0: Empty Conversation + Title
  // 1: Rahul Message Arrives
  // 2: 3-Dot Typing Indicator
  // 3: THREAD Contextual Intervention
  // 4: Send Triggered / Sent State
  const [stage, setStage] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.18) setStage(0);
    else if (latest < 0.38) setStage(1);
    else if (latest < 0.58) setStage(2);
    else if (latest < 0.82) setStage(3);
    else setStage(4);
  });

  // Title transforms as scroll progresses: fades, blurs, and shifts back
  const titleOpacity = useTransform(smoothProgress, [0, 0.22, 0.38], [1, 0.4, 0.08]);
  const titleBlur = useTransform(smoothProgress, [0, 0.25], [0, 8]);
  const titleScale = useTransform(smoothProgress, [0, 0.35], [1, 0.94]);
  const titleY = useTransform(smoothProgress, [0, 0.35], [0, -30]);

  // Viewport messaging UI positioning & elevation
  const chatY = useTransform(smoothProgress, [0, 0.3, 0.85], [40, 0, -20]);

  return (
    <section ref={containerRef} className="rahul-story-section" id="story-flagship">
      <div className="rahul-story-sticky">
        {/* Spatial background context nodes */}
        <ContextField />

        {/* Narrative Title (Left / Upper Region) - Never clipped */}
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
            Rahul asks for a document without giving the exact filename or location.
            THREAD resolves the meaning before you even switch apps.
          </p>
        </motion.div>

        {/* The Direct Viewport Messaging Interface (Canvas IS the screen) */}
        <motion.div
          className="viewport-messaging-canvas"
          style={{ y: chatY }}
        >
          {/* Conversation Top Header */}
          <div className="msg-header">
            <div className="msg-recipient">
              <div className="msg-avatar">
                <span>R</span>
                <span className="msg-online-dot" />
              </div>
              <div className="msg-recipient-info">
                <b>Rahul Sharma</b>
                <span className="msg-meta">Active now · Mobile</span>
              </div>
            </div>
            <div className="msg-header-pills">
              <span className="msg-pill">TODAY · 19:18</span>
              <span className="msg-pill live">CONTEXT CONNECTED</span>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="msg-stream">
            {/* Timestamp */}
            <div className="msg-date-divider">
              <span>Today 19:18</span>
            </div>

            {/* State 2+: Rahul's Incoming Message */}
            <motion.div
              className="msg-bubble-row incoming"
              initial={false}
              animate={
                stage >= 1
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 24, scale: 0.95, filter: "blur(4px)" }
              }
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              <div className="msg-bubble incoming-bubble">
                <p className="msg-text">Can you send me that hackathon PDF?</p>
                <span className="msg-time">19:18</span>
              </div>
            </motion.div>

            {/* State 3: Three Sequential Animated Dots Typing Indicator */}
            <motion.div
              className="msg-typing-indicator-row"
              initial={false}
              animate={
                stage === 2
                  ? { opacity: 1, height: "auto", y: 0 }
                  : { opacity: 0, height: 0, y: 8 }
              }
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <div className="typing-bubble">
                <span className="typing-dot dot-1" />
                <span className="typing-dot dot-2" />
                <span className="typing-dot dot-3" />
              </div>
              <span className="typing-label">THREAD resolving contextual reference...</span>
            </motion.div>

            {/* State 4+: THREAD OS Contextual Intervention */}
            <motion.div
              className="thread-intervention-container"
              initial={false}
              animate={
                stage >= 3
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 32, scale: 0.96 }
              }
              transition={{ type: "spring", stiffness: 240, damping: 25 }}
            >
              <div className="thread-os-card">
                {/* Intervention Header */}
                <div className="os-card-header">
                  <div className="os-badge">
                    <span className="os-pulse" />
                    <b>THREAD</b>
                    <span className="os-subtag">CONTEXT ENGINE</span>
                  </div>
                  <span className="os-confidence-tag">HIGH CONFIDENCE · 98%</span>
                </div>

                {/* Intent resolution summary */}
                <p className="os-intent-text">I found the PDF you meant.</p>

                {/* Detected Document Attachment */}
                <div className="os-file-chip">
                  <div className="os-file-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className="os-file-details">
                    <b className="os-file-name">iQOO_Hackathon_Guide.pdf</b>
                    <span className="os-file-meta">Recent context · Hackathon · 2.4 MB</span>
                  </div>
                  <span className="os-file-origin">Downloads / Today 18:45</span>
                </div>

                {/* Actions */}
                <div className="os-actions">
                  <motion.button
                    className={`os-btn-send ${stage >= 4 ? "sent-active" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {stage >= 4 ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Sent
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send PDF to Rahul
                      </>
                    )}
                  </motion.button>
                  <button className="os-btn-dismiss">Dismiss</button>
                </div>
              </div>
            </motion.div>

            {/* State 5: Final Sent Outgoing Bubble */}
            <motion.div
              className="msg-bubble-row outgoing"
              initial={false}
              animate={
                stage >= 4
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.95 }
              }
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              <div className="msg-bubble outgoing-bubble">
                <div className="sent-file-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>iQOO_Hackathon_Guide.pdf</span>
                </div>
                <div className="sent-status-footer">
                  <span>Sent · 19:19</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sticky Progress Indicator Footer */}
          <div className="story-scroll-telemetry">
            <span className="telemetry-node">
              <i className={stage >= 1 ? "active" : ""} /> MESSAGE DETECTED
            </span>
            <span className="telemetry-arrow">→</span>
            <span className="telemetry-node">
              <i className={stage >= 2 ? "active" : ""} /> TEMPORAL GRAPH
            </span>
            <span className="telemetry-arrow">→</span>
            <span className="telemetry-node">
              <i className={stage >= 3 ? "active" : ""} /> NEEDLE 2 TOOL PREP
            </span>
            <span className="telemetry-arrow">→</span>
            <span className="telemetry-node">
              <i className={stage >= 4 ? "active" : ""} /> ACTION COMPLETED
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
