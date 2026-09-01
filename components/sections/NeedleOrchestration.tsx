"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface PipelineStep {
  id: number;
  phase: string;
  source: string;
  target: string;
  title: string;
  payload: string;
  detail: string;
  type: "context" | "needle" | "tool" | "result" | "action";
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 0,
    phase: "01 · CONVERGENCE",
    source: "Context Engine",
    target: "Needle 2",
    title: "Multimodal Context Ingestion",
    payload: `{\n  "contact": "Rahul",\n  "topic": "Hackathon",\n  "intent_cue": "send me that hackathon PDF",\n  "time_window": "last_2h"\n}`,
    detail: "Signals from active chat, notifications, and temporal graph converge into a unified embedding vector.",
    type: "context",
  },
  {
    id: 1,
    phase: "02 · NEEDLE INFERENCE",
    source: "Needle 2 Orchestrator",
    target: "Tool Retrieval",
    title: "Intent Resolution & Tool Dispatch",
    payload: `NEEDLE_CALL: file_system.search_files({\n  query: "hackathon PDF",\n  mime_type: "application/pdf",\n  recency_bias: 0.95\n})`,
    detail: "Needle 2 determines that finding the file is prerequisite to sharing. Dispatches structured tool call.",
    type: "needle",
  },
  {
    id: 2,
    phase: "03 · TOOL EXECUTION",
    source: "Android File System",
    target: "Needle 2",
    title: "Tool Result Returned",
    payload: `RESULT: [\n  { "file": "iQOO_Hackathon_Guide.pdf", "score": 0.98, "path": "/Downloads" },\n  { "file": "iQOO_Rules_2025.pdf", "score": 0.42 },\n  { "file": "Hackathon_Notes.pdf", "score": 0.38 }\n]`,
    detail: "On-device file search returns 3 candidates. Data flows back into Needle 2's context window.",
    type: "result",
  },
  {
    id: 3,
    phase: "04 · ITERATIVE REASONING",
    source: "Needle 2 Orchestrator",
    target: "Share Subsystem",
    title: "Candidate Selection & Action Preparation",
    payload: `NEEDLE_CALL: intent_bridge.prepare_share({\n  target_contact_id: "rahul_sharma_09",\n  attachment_uri: "/Downloads/iQOO_Hackathon_Guide.pdf",\n  channel: "active_imessage_session"\n})`,
    detail: "Needle 2 evaluates scores (0.98 vs 0.42), selects the guide, and calls the share preparation tool.",
    type: "tool",
  },
  {
    id: 4,
    phase: "05 · FINAL ACTION",
    source: "Share Subsystem",
    target: "THREAD UI",
    title: "One-Tap Action Surfaced",
    payload: `THREAD_ACTION_READY: {\n  "status": "PREPARED",\n  "prompt": "Send PDF to Rahul",\n  "file": "iQOO_Hackathon_Guide.pdf",\n  "latency_ms": 18.4\n}`,
    detail: "The entire loop executes locally in 18ms. A clean, non-intrusive action card is presented to the user.",
    type: "action",
  },
];

export function NeedleOrchestration() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play the execution loop
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStep = pipelineSteps[activeStep];

  return (
    <section ref={containerRef} className="needle-conductor-section" id="needle-system">
      <div className="needle-container">
        {/* Section Title & Thesis */}
        <Reveal>
          <div className="needle-section-header">
            <span className="eyebrow">THE ACTION ENGINE</span>
            <h2>
              Needle 2.<br />
              <em>The Conductor.</em>
            </h2>
            <p className="needle-subtitle">
              Not a chatbot. Not an oversized conversational LLM.
              Needle 2 is a lightweight, on-device orchestration model designed specifically
              for fast, multi-step tool calling and iterative system execution.
            </p>
          </div>
        </Reveal>

        {/* Live Interactive Execution Pipeline Workbench */}
        <div className="needle-pipeline-workbench">
          {/* Top Stage: Context Convergence Nodes */}
          <div className="convergence-stage">
            <div className="convergence-label">
              <span>INPUT SIGNALS</span>
              <b>Contextual Ingestion</b>
            </div>
            <div className="convergence-nodes-row">
              {[
                { name: "Rahul Sharma", kind: "CONTACT CONTEXT" },
                { name: "“Can you send me that...”", kind: "INCOMING CHAT" },
                { name: "iQOO Hackathon 2026", kind: "RECENT TOPIC" },
                { name: "Guide.pdf (18:45)", kind: "DOWNLOAD EVENT" },
              ].map((node, i) => (
                <motion.div
                  key={node.name}
                  className={`convergence-node ${activeStep >= 0 ? "active" : ""}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <span className="node-kind">{node.kind}</span>
                  <b className="node-name">{node.name}</b>
                  <div className="node-emitter-pulse" />
                </motion.div>
              ))}
            </div>

            {/* Convergence Flow Arrow to Needle 2 */}
            <div className="convergence-flow-hub">
              <div className="flow-lines-bundle">
                <svg width="100%" height="40" viewBox="0 0 800 40" preserveAspectRatio="none">
                  <path d="M 100 0 C 100 25, 400 15, 400 40" stroke="var(--line)" strokeWidth="1.5" fill="none" />
                  <path d="M 300 0 C 300 25, 400 15, 400 40" stroke="var(--line)" strokeWidth="1.5" fill="none" />
                  <path d="M 500 0 C 500 25, 400 15, 400 40" stroke="var(--line)" strokeWidth="1.5" fill="none" />
                  <path d="M 700 0 C 700 25, 400 15, 400 40" stroke="var(--line)" strokeWidth="1.5" fill="none" />
                </svg>
                <div className="flow-pulse-dot" />
              </div>
            </div>
          </div>

          {/* Middle Stage: The Iterative Execution Graph & Live Terminal */}
          <div className="execution-loop-grid">
            {/* Left: Interactive Step Navigator */}
            <div className="pipeline-steps-nav">
              <div className="nav-header">
                <span>ITERATIVE TOOL LOOP</span>
                <button
                  className="btn-playback-toggle"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause auto-advance" : "Play auto-advance"}
                >
                  {isPlaying ? "PAUSE LOOP ❚❚" : "PLAY LOOP ▶"}
                </button>
              </div>

              <div className="step-timeline-list">
                {pipelineSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    className={`step-timeline-item ${activeStep === idx ? "current" : ""} ${activeStep > idx ? "completed" : ""}`}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                  >
                    <div className="step-timeline-marker">
                      <span className="step-num">{idx + 1}</span>
                    </div>
                    <div className="step-timeline-info">
                      <div className="step-tag-row">
                        <span className="step-phase-tag">{step.phase}</span>
                        <span className={`step-type-pill ${step.type}`}>{step.type.toUpperCase()}</span>
                      </div>
                      <b className="step-timeline-title">{step.title}</b>
                      <span className="step-flow-route">
                        {step.source} → {step.target}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Live Signal Terminal / State Inspector */}
            <div className="pipeline-inspector-panel">
              <div className="inspector-top-bar">
                <div className="inspector-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="inspector-title">
                  <span>NEEDLE 2 RUNTIME · ON-DEVICE ARM64</span>
                </div>
                <span className="inspector-latency">18.4 MS TOTAL</span>
              </div>

              <div className="inspector-content">
                <div className="inspector-state-banner">
                  <div className="banner-left">
                    <span className="state-label">CURRENT OPERATION</span>
                    <h4 className="state-title">{currentStep.title}</h4>
                  </div>
                  <div className="banner-nodes">
                    <span className="node-source">{currentStep.source}</span>
                    <span className="node-arrow">⤳</span>
                    <span className="node-target">{currentStep.target}</span>
                  </div>
                </div>

                {/* Code / Payload Viewer */}
                <div className="code-payload-block">
                  <div className="code-block-header">
                    <span>STRUCTURED PAYLOAD / TELEMETRY</span>
                    <span className="code-format">JSON-LD / NATIVE CALL</span>
                  </div>
                  <pre className="code-terminal">
                    <code>{currentStep.payload}</code>
                  </pre>
                </div>

                {/* Step Explanatory Note */}
                <div className="step-annotation">
                  <span className="annotation-icon">ℹ</span>
                  <p>{currentStep.detail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stage: Secondary Technical Specifications & Footprint Comparison */}
        <div className="needle-specs-footer-section">
          <div className="specs-subheading">
            <span className="eyebrow">RUNTIME PROFILE</span>
            <h3>Engineered for low latency and zero background battery drain.</h3>
          </div>

          {/* Key Specs Grid */}
          <div className="spec-metric-grid">
            {[
              { val: "~45M", label: "PARAMETERS", desc: "Specialized tool caller" },
              { val: "~14 MB", label: "BINARY FOOTPRINT", desc: "Fits in flash partition" },
              { val: "~28 MB", label: "SESSION RAM", desc: "Zero OS memory pressure" },
              { val: "ARM64", label: "TARGET PLATFORM", desc: "Android native NPU/CPU" },
              { val: "< 20ms", label: "TOOL LATENCY", desc: "Sub-perceptual execution" },
              { val: "AWARE", label: "CONFIDENCE GATES", desc: "Safe structured output" },
            ].map((s) => (
              <div key={s.label} className="metric-box">
                <b className="metric-val">{s.val}</b>
                <span className="metric-label">{s.label}</span>
                <p className="metric-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Footprint Comparison Chart */}
          <div className="footprint-chart-box">
            <div className="footprint-header">
              <b>On-Device Memory Footprint Comparison</b>
              <span>SESSION RAM COMPARISON (LOWER IS BETTER)</span>
            </div>

            <div className="footprint-bars">
              <div className="footprint-row active-needle">
                <div className="bar-info">
                  <b>NEEDLE 2 (THREAD)</b>
                  <span className="bar-val">28 MB</span>
                </div>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill needle-fill"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ width: "8%" }}
                  />
                </div>
                <span className="bar-annotation">Instant wake, 0 frame drops</span>
              </div>

              <div className="footprint-row">
                <div className="bar-info">
                  <b>SMALL LOCAL LLM (1B)</b>
                  <span className="bar-val">650 MB</span>
                </div>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill generic-fill"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ width: "45%" }}
                  />
                </div>
                <span className="bar-annotation">Significant cold-start lag</span>
              </div>

              <div className="footprint-row">
                <div className="bar-info">
                  <b>LARGER LOCAL LLM (3B+)</b>
                  <span className="bar-val">1,800 MB</span>
                </div>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill heavy-fill"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ width: "95%" }}
                  />
                </div>
                <span className="bar-annotation">Heats device, aggressive throttling</span>
              </div>
            </div>

            <p className="footprint-disclaimer">
              ILLUSTRATIVE PARAMETER & RAM COMPARISON · DEMONSTRATING LIGHTWEIGHT TOOL-CALLING ARCHITECTURE VS GENERAL CONVERSATIONAL MODELS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
