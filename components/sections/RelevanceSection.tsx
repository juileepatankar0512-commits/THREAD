"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function RelevanceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeScenario, setActiveScenario] = useState<"passive" | "actionable">("passive");

  return (
    <section ref={containerRef} className="relevance-section" id="relevance-principle">
      <div className="relevance-container">
        <Reveal>
          <div className="relevance-header">
            <span className="eyebrow">PRODUCT PRINCIPLE · RELEVANCE</span>
            <h2>
              THREAD knows when<br />
              <em>to stay silent.</em>
            </h2>
            <p className="relevance-subtitle">
              True intelligence is not interrupting the user on every screen.
              THREAD continuously monitors authorized context, but only surfaces an action
              when the utility is undeniable.
            </p>
          </div>
        </Reveal>

        {/* Interactive Scenario Toggle */}
        <div className="scenario-switcher-bar">
          <button
            className={`switcher-btn ${activeScenario === "passive" ? "active" : ""}`}
            onClick={() => setActiveScenario("passive")}
          >
            <span className="btn-tag">SCENE A</span>
            <b>Reading an Article · [ Silent ]</b>
          </button>
          <button
            className={`switcher-btn ${activeScenario === "actionable" ? "active" : ""}`}
            onClick={() => setActiveScenario("actionable")}
          >
            <span className="btn-tag">SCENE B</span>
            <b>Train Ticket · [ Surface Action ]</b>
          </button>
        </div>

        {/* Comparative Viewport Display */}
        <div className="relevance-display-grid">
          {/* Active Context Preview */}
          <div className="context-screen-card">
            <div className="screen-top-bar">
              <div className="screen-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="screen-app-name">
                {activeScenario === "passive" ? "Browser · Medium Article" : "IRCTC Rail Connect"}
              </span>
              <span className="screen-state-tag">
                {activeScenario === "passive" ? "PASSIVE CONSUMPTION" : "TIME-CRITICAL DATA"}
              </span>
            </div>

            {activeScenario === "passive" ? (
              /* Scene A Content: Reading an Article */
              <div className="article-preview-content">
                <span className="article-tag">ESSAY · PHOTOGRAPHY</span>
                <h3>The Evolution of Mobile Sensors & Optics</h3>
                <p>
                  Modern smartphone imaging is increasingly shaped by computational pipelines rather than purely glass diameter. Lens coatings and photon efficiency continue to advance...
                </p>
                <div className="article-body-lines">
                  <span className="line w-full" />
                  <span className="line w-85" />
                  <span className="line w-95" />
                  <span className="line w-70" />
                </div>
                <div className="passive-status-stamp">
                  <span className="stamp-icon">✓</span>
                  <span>NO ACTION REQUIRED · USER READING UNDISTURBED</span>
                </div>
              </div>
            ) : (
              /* Scene B Content: Train Ticket */
              <div className="ticket-preview-content">
                <div className="ticket-badge-row">
                  <span className="rail-tag">INDIAN RAILWAYS · 12420</span>
                  <span className="pnr-tag">PNR: 482-9102844</span>
                </div>
                <div className="ticket-quick-row">
                  <div className="route-pair">
                    <b>NDLS</b>
                    <span>07:40 AM</span>
                  </div>
                  <span className="arrow">→</span>
                  <div className="route-pair">
                    <b>LKO</b>
                    <span>15:30 PM</span>
                  </div>
                </div>
                <div className="ticket-date-pill">
                  <span>DEPARTURE TOMORROW · SATURDAY</span>
                </div>
              </div>
            )}
          </div>

          {/* THREAD Response Evaluation */}
          <div className="thread-decision-card">
            <div className="decision-header">
              <div className="os-badge small">
                <span className="os-pulse" />
                <b>THREAD</b>
                <span className="os-subtag">UTILITY GATE</span>
              </div>
              <span className={`decision-pill ${activeScenario === "passive" ? "silent" : "action"}`}>
                {activeScenario === "passive" ? "STATUS: SILENT" : "STATUS: ACTION SURFACED"}
              </span>
            </div>

            {/* Diagnostic Metrics */}
            <div className="diagnostic-metrics">
              <div className="diag-row">
                <span className="diag-label">DETECTED CONTEXT</span>
                <b className="diag-val">
                  {activeScenario === "passive" ? "Article text: Sensor mechanics" : "Ticket: Departure tomorrow 07:40 AM"}
                </b>
              </div>
              <div className="diag-row">
                <span className="diag-label">TEMPORAL URGENCY</span>
                <b className="diag-val">{activeScenario === "passive" ? "None (Static)" : "High (< 24 Hours)"}</b>
              </div>
              <div className="diag-row">
                <span className="diag-label">RELEVANCE / UTILITY SCORE</span>
                <div className="utility-bar-wrapper">
                  <motion.div
                    className={`utility-bar ${activeScenario === "passive" ? "low" : "high"}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: activeScenario === "passive" ? "14%" : "96%" } : {}}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="utility-num">
                    {activeScenario === "passive" ? "0.14 / 1.00" : "0.96 / 1.00"}
                  </span>
                </div>
              </div>
            </div>

            {/* THREAD Output Result */}
            <div className="thread-output-state">
              {activeScenario === "passive" ? (
                <div className="state-silent-box">
                  <div className="silent-indicator">
                    <span className="silent-dot" />
                    <b>THREAD remains silent.</b>
                  </div>
                  <p>
                    No prompt or floating overlay is shown. The user is allowed to read without
                    annoying suggestions or unsolicited AI interruptions.
                  </p>
                </div>
              ) : (
                <div className="state-action-box">
                  <div className="action-indicator">
                    <span className="action-pulse" />
                    <b>Contextual Action Surfaced:</b>
                  </div>
                  <div className="action-card-mini">
                    <b>Your train leaves tomorrow at 07:40 AM.</b>
                    <span>Would you like a departure reminder at 06:30 AM?</span>
                    <div className="mini-btn-group">
                      <button className="mini-btn-primary">Add Reminder</button>
                      <button className="mini-btn-dismiss">Dismiss</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relevance-trust-banner">
          <span className="trust-tag">THE RELEVANCE DOCTRINE</span>
          <p>
            An intelligent operating system must possess the wisdom of restraint.
            THREAD treats user attention as a finite, precious resource.
          </p>
        </div>
      </div>
    </section>
  );
}
