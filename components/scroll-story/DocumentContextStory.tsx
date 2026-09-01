"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { ExtractionCanvas } from "@/components/three/ExtractionCanvas";

export function DocumentContextStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 25,
    restDelta: 0.001,
  });

  // Narrative Stages:
  // 0 (0.00 - 0.15): LOOK — Pure document view. User is reading the ticket.
  // 1 (0.15 - 0.32): NOTICE — THREAD subtly highlights relevant fields (Saturday, 07:40 AM, NDLS->LKO).
  // 2 (0.32 - 0.52): EXTRACT — Particles and data streams physically emit from the fields and travel right.
  // 3 (0.52 - 0.72): UNDERSTAND — Streamed data assembles into structured context cards on the right.
  // 4 (0.72 - 0.84): RECOGNIZE — Narrative pause. THREAD recognizes the upcoming event.
  // 5 (0.84 - 0.94): SUGGEST — Light, friendly THREAD suggestion emerges: "Your train leaves Saturday · 07:40 AM".
  // 6 (0.94 - 1.00): ACT — One-tap "Add Reminder" action completes -> "Reminder created."
  const [stage, setStage] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    if (v < 0.15) setStage(0);
    else if (v < 0.32) setStage(1);
    else if (v < 0.52) setStage(2);
    else if (v < 0.72) setStage(3);
    else if (v < 0.84) setStage(4);
    else if (v < 0.94) setStage(5);
    else setStage(6);
  });

  // Title recedes cleanly into background as scroll advances — never overlaps or clips
  const titleOpacity = useTransform(smooth, [0, 0.16, 0.32], [1, 0.4, 0.05]);
  const titleBlur = useTransform(smooth, [0, 0.22], [0, 8]);
  const titleScale = useTransform(smooth, [0, 0.3], [1, 0.96]);
  const titleY = useTransform(smooth, [0, 0.3], [0, -25]);

  // Document subtle floating depth
  const docY = useTransform(smooth, [0, 0.35, 0.85], [15, 0, -15]);

  return (
    <section ref={containerRef} className="document-story-section" id="story-document">
      <div className="document-story-sticky">
        {/* Subtle 3D particle depth active during extraction */}
        <ExtractionCanvas active={stage >= 2 && stage <= 4} />

        {/* Narrative Title — Positioned cleanly in document flow above the canvas */}
        <motion.div
          className="doc-story-heading"
          style={{
            opacity: titleOpacity,
            filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
            scale: titleScale,
            y: titleY,
          }}
        >
          <span className="eyebrow">02 / CONTEXTUAL UNDERSTANDING</span>
          <h2>
            Things your phone should<br />
            <em>just understand.</em>
          </h2>
          <p className="story-lead">
            The user is viewing a travel reservation. THREAD notices the time-sensitive
            details directly from the screen and structures them into action.
          </p>
        </motion.div>

        {/* Main Editorial Canvas (Ticket on Left + Physical Extraction + Structured Context on Right) */}
        <motion.div className="doc-editorial-canvas" style={{ y: docY }}>
          {/* LEFT: Indian Railways Ticket (Direct on Canvas, NO Phone, NO App Window) */}
          <div className="ticket-document-wrapper">
            <div className={`ticket-canvas ${stage >= 1 ? "noticed-mode" : ""}`}>
              {/* Ticket Top Header */}
              <div className="ticket-header-band">
                <div className="ticket-logo-mark">
                  <b>INDIAN RAILWAYS</b>
                  <span>ELECTRONIC RESERVATION SLIP</span>
                </div>
                <div className="ticket-pnr-pill">
                  <span>PNR</span>
                  <b>482-9102844</b>
                </div>
              </div>

              {/* Station Route — Field 1 */}
              <div className={`ticket-route-section ${stage >= 1 ? "field-noticed field-route" : ""}`}>
                <div className="route-origin">
                  <span className="station-code">NDLS</span>
                  <span className="station-name">New Delhi</span>
                </div>

                <div className="route-connector">
                  <span className="train-id">12420 / GOMTI EXP</span>
                  <div className="track-rail">
                    <span className="rail-node left" />
                    <span className="rail-arrow">→</span>
                    <span className="rail-node right" />
                  </div>
                </div>

                <div className="route-dest">
                  <span className="station-code">LKO</span>
                  <span className="station-name">Lucknow NR</span>
                </div>

                {stage >= 1 && (
                  <motion.span
                    className="field-notice-pin"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    ROUTE
                  </motion.span>
                )}
              </div>

              {/* Grid Fields — Date, Departure, Seat, Status */}
              <div className="ticket-grid-fields">
                {/* Field 2: Date */}
                <div className={`ticket-grid-cell ${stage >= 1 ? "field-noticed field-date" : ""}`}>
                  <span className="cell-label">DATE OF JOURNEY</span>
                  <b className="cell-value">SATURDAY, 03 SEP</b>
                  {stage >= 1 && (
                    <motion.span
                      className="field-notice-pin"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      DATE
                    </motion.span>
                  )}
                </div>

                {/* Field 3: Departure Time */}
                <div className={`ticket-grid-cell ${stage >= 1 ? "field-noticed field-time" : ""}`}>
                  <span className="cell-label">DEPARTURE TIME</span>
                  <b className="cell-value">07:40 AM</b>
                  {stage >= 1 && (
                    <motion.span
                      className="field-notice-pin"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      TIME
                    </motion.span>
                  )}
                </div>

                {/* Field 4: Seat (Un-highlighted context) */}
                <div className="ticket-grid-cell dimmed-cell">
                  <span className="cell-label">CLASS & SEAT</span>
                  <b className="cell-value">CHAIR CAR · C2 / 41</b>
                </div>

                {/* Field 5: Booking Status */}
                <div className="ticket-grid-cell dimmed-cell">
                  <span className="cell-label">STATUS</span>
                  <b className="cell-value status-confirmed">CONFIRMED</b>
                </div>
              </div>

              {/* Barcode / Privacy Footer */}
              <div className="ticket-footer-band">
                <div className="barcode-graphic" />
                <span className="privacy-tag">ON-DEVICE VIEWPORT CONTEXT · ZERO CLOUD UPLOAD</span>
              </div>
            </div>
          </div>

          {/* MIDDLE: Physical Animated Extraction Flow Streams */}
          <div className="extraction-streams-channel">
            <svg
              className="extraction-flow-svg"
              width="100%"
              height="100%"
              viewBox="0 0 160 300"
              preserveAspectRatio="none"
            >
              {/* Stream 1: Route */}
              <motion.path
                d="M 10 50 C 70 50, 90 40, 150 40"
                stroke={stage >= 2 ? "var(--gold)" : "transparent"}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                animate={stage >= 2 ? { strokeDashoffset: [0, -16] } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />

              {/* Stream 2: Date */}
              <motion.path
                d="M 10 130 C 70 130, 90 100, 150 100"
                stroke={stage >= 2 ? "var(--gold)" : "transparent"}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                animate={stage >= 2 ? { strokeDashoffset: [0, -16] } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />

              {/* Stream 3: Departure */}
              <motion.path
                d="M 10 190 C 70 190, 90 160, 150 160"
                stroke={stage >= 2 ? "var(--gold)" : "transparent"}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                animate={stage >= 2 ? { strokeDashoffset: [0, -16] } : {}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </svg>

            {/* Traveling Data Pulses */}
            {stage >= 2 && (
              <>
                <motion.span
                  className="data-pulse pulse-1"
                  initial={{ left: "5%", top: "17%", opacity: 0 }}
                  animate={{ left: "95%", top: "13%", opacity: [0, 1, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                />
                <motion.span
                  className="data-pulse pulse-2"
                  initial={{ left: "5%", top: "43%", opacity: 0 }}
                  animate={{ left: "95%", top: "33%", opacity: [0, 1, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, delay: 0.25, ease: "easeInOut" }}
                />
                <motion.span
                  className="data-pulse pulse-3"
                  initial={{ left: "5%", top: "63%", opacity: 0 }}
                  animate={{ left: "95%", top: "53%", opacity: [0, 1, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, delay: 0.5, ease: "easeInOut" }}
                />
              </>
            )}
          </div>

          {/* RIGHT: Structured Context Convergence & THREAD Suggestion */}
          <div className="structured-context-column">
            {/* Header / State Caption — Only appears when extraction actually begins */}
            {stage >= 3 && (
              <motion.div
                className="structured-column-header"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="column-eyebrow">
                  {stage === 3 ? "ASSEMBLING STRUCTURED CONTEXT" : "STRUCTURED CONTEXT RESOLVED"}
                </span>
              </motion.div>
            )}

            {/* Assembled Structured Context Cards */}
            <div className="structured-cards-stack">
              {/* Structured Card 1: Route */}
              <motion.div
                className="structured-card"
                initial={false}
                animate={
                  stage >= 3
                    ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, x: 28, scale: 0.94, filter: "blur(5px)" }
                }
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.05 }}
              >
                <div className="card-key-val">
                  <span className="card-key">ROUTE</span>
                  <b className="card-val">NDLS → LKO (Lucknow NR)</b>
                </div>
                <span className="card-provenance">From Ticket #12420</span>
              </motion.div>

              {/* Structured Card 2: Travel Date */}
              <motion.div
                className="structured-card"
                initial={false}
                animate={
                  stage >= 3
                    ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, x: 28, scale: 0.94, filter: "blur(5px)" }
                }
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.15 }}
              >
                <div className="card-key-val">
                  <span className="card-key">TRAVEL DATE</span>
                  <b className="card-val">Saturday, Sep 3 (Tomorrow)</b>
                </div>
                <span className="card-provenance">Temporal proximity: 18h</span>
              </motion.div>

              {/* Structured Card 3: Departure */}
              <motion.div
                className="structured-card"
                initial={false}
                animate={
                  stage >= 3
                    ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, x: 28, scale: 0.94, filter: "blur(5px)" }
                }
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.25 }}
              >
                <div className="card-key-val">
                  <span className="card-key">DEPARTURE</span>
                  <b className="card-val">07:40 AM</b>
                </div>
                <span className="card-provenance">Alarm trigger window: 06:15 AM</span>
              </motion.div>
            </div>

            {/* Stage 4+: Context Recognized Banner */}
            <motion.div
              className="context-recognition-banner"
              initial={false}
              animate={
                stage >= 4
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 12, filter: "blur(4px)" }
              }
              transition={{ duration: 0.3 }}
            >
              <span className="recognition-dot" />
              <span className="recognition-text">THREAD recognizes upcoming train departure</span>
            </motion.div>

            {/* Stage 5+: Light, Friendly THREAD Suggestion Card */}
            <motion.div
              className="thread-suggestion-wrapper"
              initial={false}
              animate={
                stage >= 5
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 24, scale: 0.95, filter: "blur(6px)" }
              }
              transition={{ type: "spring", stiffness: 210, damping: 24 }}
            >
              <div className="thread-friendly-card">
                <div className="thread-card-header">
                  <div className="thread-pill-badge">
                    <span className="thread-sparkle-dot" />
                    <b>THREAD</b>
                    <span className="thread-subcaption">Contextual Suggestion</span>
                  </div>
                </div>

                <div className="thread-suggestion-content">
                  <h4>Your train leaves Saturday · 07:40 AM</h4>
                  <p>Want a departure reminder at 06:15 AM?</p>
                </div>

                <div className="thread-friendly-actions">
                  <motion.button
                    className={`btn-friendly-send ${stage >= 6 ? "sent" : ""}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {stage >= 6 ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Reminder created
                      </>
                    ) : (
                      "Add Reminder"
                    )}
                  </motion.button>
                  <button className="btn-friendly-dismiss">Dismiss</button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
