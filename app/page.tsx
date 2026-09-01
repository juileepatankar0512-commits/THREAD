import { RahulMessageStory } from "@/components/scroll-story/RahulMessageStory";
import { DocumentContextStory } from "@/components/scroll-story/DocumentContextStory";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { NeedleOrchestration } from "@/components/sections/NeedleOrchestration";
import { RelevanceSection } from "@/components/sections/RelevanceSection";

export default function Page() {
  return (
    <main>
      {/* Top Editorial Navigation */}
      <nav>
        <b>THREAD</b>
        <span>iQOO HACKATHON 2026 · PRODUCTIVITY</span>
        <span>CONTEXT → INTENT → ACTION</span>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <span className="eyebrow">YOUR PHONE, RECONSIDERED</span>
          <h1>
            Your phone knows.<br />
            <em>You still have to search.</em>
          </h1>
          <p>
            Digital context is scattered across messages, files, screens, notifications, and calendars.
            THREAD resolves implicit intent across authorized phone signals and turns understanding into direct action.
          </p>
        </div>
        <div className="hero-footer">
          <b>THREAD</b>
          <span>Your phone understands what you mean.</span>
          <small>SCROLL TO EXPERIENCE THE INTERACTION ↓</small>
        </div>
      </section>

      {/* 1. Flagship Sticky Scroll Scene — Rahul / PDF Request (Viewport is the Canvas) */}
      <RahulMessageStory />

      {/* 2. Large Document Viewer, Particle Extraction Stream, & Implicit Reference */}
      <DocumentContextStory />

      {/* 3. Cinematic Typographic Pause */}
      <ManifestoSection />

      {/* 4. Needle 2 Conductor & Live Execution Pipeline Workbench */}
      <NeedleOrchestration />

      {/* 5. Product Principle — Relevance ("THREAD knows when to stay silent") */}
      <RelevanceSection />

      {/* 6. System Architecture Summary */}
      <section className="architecture" id="architecture">
        <span className="eyebrow">SYSTEM TOPOLOGY</span>
        <h2>
          Context becomes <em>an action.</em>
        </h2>
        <div className="architecture-stack">
          {[
            ["AUTHORIZED PHONE CONTEXT", "People · Messages · Files · Screens · Calendar · Voice"],
            ["CONTEXT ENGINE", "Build structured events. Expire raw content on-device."],
            ["TEMPORAL GRAPH", "Recent activity linked by temporal proximity + topic vectors."],
            ["INTENT LAYER", "Resolves pronouns: “that one” · “this” · “send it to him”"],
            ["NEEDLE 2 CONDUCTOR", "Intent → tool retrieval → structured call → confidence loop"],
            ["SYSTEM ACTIONS", "Share · Reminder · Calendar · Navigation · Files · Office Kit"],
          ].map(([stageTitle, stageDesc]) => (
            <div className="architecture-row" key={stageTitle}>
              <span>{stageTitle}</span>
              <b>{stageDesc}</b>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span className="eyebrow">iQOO HACKATHON 2026</span>
        <h2>THREAD</h2>
        <p>Your phone understands what you mean.</p>
        <a href="#story-flagship">BACK TO START ↑</a>
      </footer>
    </main>
  );
}
