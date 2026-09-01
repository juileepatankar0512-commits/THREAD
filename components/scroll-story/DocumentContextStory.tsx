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

  // Stage 0: Raw Document View (Indian Railways ticket)
  // Stage 1: Tokens Highlight & Particles Flow
  // Stage 2: Structured Context Columns Form on Right
  // Stage 3: THREAD Proactive Train Reminder
  // Stage 4: Implicit Reference Mode ("Remind me to submit this Friday" -> Hackathon doc link)
  const [stage, setStage] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    if (v < 0.20) setStage(0);
    else if (v < 0.42) setStage(1);
    else if (v < 0.65) setStage(2);
    else if (v < 0.85) setStage(3);
    else setStage(4);
  });

  const isImplicitMode = stage >= 4;

  const headerOpacity = useTransform(smooth, [0, 0.2, 0.4], [1, 0.7, 0.2]);
  const implicitBannerY = useTransform(smooth, [0.8, 0.9], [40, 0]);

  return (
    <section ref={containerRef} className="document-story-section" id="story-document">
      <div className="document-story-sticky">
        {/* Ambient 3D Particle Extraction Layer */}
        <ExtractionCanvas active={stage >= 1 && stage <= 3} />

        {/* Section Header */}
        <motion.div className="doc-section-header" style={{ opacity: headerOpacity }}>
          <span className="eyebrow">02 / DOCUMENT CONTEXT & IMPLICIT REFERENCE</span>
          <h2>
            The screen is the context.<br />
            <em>No copy-pasting required.</em>
          </h2>
        </motion.div>

        {/* Main Split Interface Workbench */}
        <div className="doc-workbench-grid">
          {/* LEFT / CENTER: The Large Document Viewer (No phone shell) */}
          <div className="doc-viewer-column">
            <div className="doc-viewer-frame">
              {/* Document Window Header */}
              <div className="doc-window-bar">
                <div className="doc-window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="doc-file-indicator">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>{isImplicitMode ? "iQOO_Hackathon_Submission_Guide.pdf" : "IRCTC_E-Ticket_12420.pdf"}</span>
                </div>
                <span className="doc-live-tag">ACTIVE VIEWPORT</span>
              </div>

              {/* Dynamic Document Content */}
              {!isImplicitMode ? (
                /* Indian Railways E-Ticket */
                <div className="ticket-document-canvas">
                  <div className="ticket-top-band">
                    <div className="ticket-emblem">
                      <b>INDIAN RAILWAYS</b>
                      <span>ELECTRONIC RESERVATION SLIP (ERS)</span>
                    </div>
                    <div className="ticket-pnr-badge">
                      <span>PNR</span>
                      <b>482-9102844</b>
                    </div>
                  </div>

                  <div className="ticket-route-display">
                    <div className="station-node">
                      <span className="station-code">NDLS</span>
                      <span className="station-city">New Delhi</span>
                    </div>
                    <div className="route-arrow-track">
                      <span className="train-meta">TRAIN 12420 / GOMTI EXP</span>
                      <div className="track-line">
                        <span className="track-dot start" />
                        <span className="track-dot end" />
                      </div>
                    </div>
                    <div className="station-node right">
                      <span className="station-code">LKO</span>
                      <span className="station-city">Lucknow NR</span>
                    </div>
                  </div>

                  <div className="ticket-grid-fields">
                    <div className={`ticket-field ${stage >= 1 ? "token-highlight" : ""}`}>
                      <span className="field-label">DATE OF JOURNEY</span>
                      <b className="field-value">SATURDAY, 03 SEP</b>
                      {stage >= 1 && <span className="token-tag">EXTRACT: DATE</span>}
                    </div>

                    <div className={`ticket-field ${stage >= 1 ? "token-highlight" : ""}`}>
                      <span className="field-label">SCHEDULED DEPARTURE</span>
                      <b className="field-value">07:40 AM</b>
                      {stage >= 1 && <span className="token-tag">EXTRACT: TIME</span>}
                    </div>

                    <div className={`ticket-field ${stage >= 1 ? "token-highlight" : ""}`}>
                      <span className="field-label">CLASS / SEAT</span>
                      <b className="field-value">CHAIR CAR · C2 / 41</b>
                      {stage >= 1 && <span className="token-tag">EXTRACT: SEAT</span>}
                    </div>

                    <div className="ticket-field">
                      <span className="field-label">BOOKING STATUS</span>
                      <b className="field-value status-confirmed">CONFIRMED</b>
                    </div>
                  </div>

                  <div className="ticket-barcode-footer">
                    <div className="mock-barcode" />
                    <span>AUTHORIZED LOCAL APP CONTEXT · PRIVACY PRESERVED</span>
                  </div>
                </div>
              ) : (
                /* iQOO Hackathon Document for Implicit Reference */
                <div className="hackathon-document-canvas">
                  <div className="doc-paper-header">
                    <span className="doc-category-badge">iQOO HACKATHON 2026</span>
                    <h3>Official Submission & Prototype Guidelines</h3>
                    <p className="doc-subtitle">Productivity & Contextual On-Device AI Category</p>
                  </div>

                  <div className="doc-paper-body">
                    <div className={`doc-target-block ${isImplicitMode ? "active-target" : ""}`}>
                      <div className="target-indicator-pin">
                        <span className="target-pulse" />
                        <b>TARGET CONTEXT</b>
                      </div>
                      <p>
                        Final project submission deadline is this <strong>Friday, 23:59 IST</strong>.
                        Include the repository link, architecture diagrams, and the Needle 2 runtime telemetry.
                      </p>
                    </div>

                    <div className="doc-skeleton-lines">
                      <span className="sk-line w-full" />
                      <span className="sk-line w-80" />
                      <span className="sk-line w-90" />
                      <span className="sk-line w-60" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Implicit Reference Spoken / Text Prompt Bar */}
            {isImplicitMode && (
              <motion.div
                className="implicit-input-bar"
                style={{ y: implicitBannerY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="voice-wave-indicator">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="implicit-command-text">
                  <span className="command-speaker">USER VOICE PROMPT:</span>
                  <p>
                    “Remind me to submit <strong className="ref-word-this">this</strong> <strong className="ref-word-time">Friday</strong>.”
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Structured Processing Area & THREAD Action */}
          <div className="doc-processing-column">
            <div className="processing-panel">
              <div className="processing-panel-header">
                <div className="os-badge small">
                  <span className="os-pulse" />
                  <b>THREAD</b>
                  <span className="os-subtag">
                    {isImplicitMode ? "IMPLICIT RESOLVER" : "CONTEXT PARSER"}
                  </span>
                </div>
                <span className="flow-step-tag">
                  {stage === 0 && "IDLE"}
                  {stage === 1 && "STREAMING TOKENS"}
                  {stage === 2 && "STRUCTURED GRAPH"}
                  {stage === 3 && "ACTION PREPARED"}
                  {stage >= 4 && "RESOLVED BINDING"}
                </span>
              </div>

              {/* Structured Extracted Tokens */}
              {!isImplicitMode ? (
                <div className="extracted-tokens-stream">
                  <span className="stream-caption">DOCUMENT → STRUCTURED CONTEXT</span>

                  <motion.div
                    className="token-card"
                    animate={stage >= 1 ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 20 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="token-card-left">
                      <span className="token-kind">TRAVEL DATE</span>
                      <b className="token-val">Saturday (Tomorrow)</b>
                    </div>
                    <span className="token-status">RESOLVED</span>
                  </motion.div>

                  <motion.div
                    className="token-card"
                    animate={stage >= 2 ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 20 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="token-card-left">
                      <span className="token-kind">DEPARTURE TIME</span>
                      <b className="token-val">07:40 AM</b>
                    </div>
                    <span className="token-status">TIME SENSITIVE</span>
                  </motion.div>

                  <motion.div
                    className="token-card"
                    animate={stage >= 2 ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 20 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="token-card-left">
                      <span className="token-kind">DESTINATION</span>
                      <b className="token-val">Lucknow NR (LKO)</b>
                    </div>
                    <span className="token-status">GEO-ANCHOR</span>
                  </motion.div>

                  <motion.div
                    className="token-card"
                    animate={stage >= 2 ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="token-card-left">
                      <span className="token-kind">RELEVANT ACTION</span>
                      <b className="token-val">Calendar / Alarm Alert</b>
                    </div>
                    <span className="token-status action-highlight">HIGH UTILITY</span>
                  </motion.div>
                </div>
              ) : (
                /* Implicit Reference Binding Diagram */
                <div className="implicit-resolver-stream">
                  <span className="stream-caption">VOICE TOKENS → ACTIVE CONTEXT BINDING</span>

                  <div className="binding-map">
                    <div className="binding-row active">
                      <div className="binding-source">
                        <span>PRONOUN</span>
                        <b>“this”</b>
                      </div>
                      <div className="binding-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="binding-target">
                        <span>OPEN ARTIFACT</span>
                        <b>iQOO Hackathon Guide</b>
                      </div>
                    </div>

                    <div className="binding-row active">
                      <div className="binding-source">
                        <span>TEMPORAL</span>
                        <b>“Friday”</b>
                      </div>
                      <div className="binding-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="binding-target">
                        <span>CALENDAR TIME</span>
                        <b>This Friday · 09:00 AM</b>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Emergent THREAD Action Card */}
              <div className="doc-thread-action-slot">
                {!isImplicitMode ? (
                  <motion.div
                    className="thread-action-card"
                    animate={
                      stage >= 3
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0.3, y: 16, scale: 0.97 }
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  >
                    <div className="action-card-top">
                      <span className="action-badge">THREAD PROACTIVE REMINDER</span>
                      <span className="action-tag">UTILITY SCORE: 0.96</span>
                    </div>
                    <h4>Your train leaves Saturday · 07:40 AM</h4>
                    <p>Suggested departure from residence by 06:30 AM.</p>
                    <div className="action-btn-row">
                      <button className="btn-add-action">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Reminder
                      </button>
                      <button className="btn-dismiss-action">Dismiss</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="thread-action-card implicit-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  >
                    <div className="action-card-top">
                      <span className="action-badge">RESOLVED ACTION</span>
                      <span className="action-tag">NEEDLE 2 DIRECT CALL</span>
                    </div>
                    <h4>Submit iQOO Hackathon entry</h4>
                    <p>Set for Friday, Sep 5 · 09:00 AM · Linked with submission guidelines</p>
                    <div className="action-btn-row">
                      <button className="btn-add-action">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Confirm Reminder
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
