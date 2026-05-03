import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";
import PersonaKeyHints from "./PersonaKeyHints";

const SECTIONS = [
  {
    id: "profile",
    label: "ABOUT ME",
    role: "LEADER",
    preview: "Profile + direction",
    avatar: char1,
    portrait: mainm,
    title: "Saifuzzaman",
    subtitle: "Frontend-focused Computer Science student",
    summary:
      "I build interfaces that feel dynamic and expressive. Most projects start from a visual mood board, then I shape code around motion, hierarchy, and playful interaction.",
    facts: [
      "Currently exploring React animations and immersive UI transitions.",
      "Comfortable with JavaScript, React, CSS, and rapid UI prototyping.",
      "Favorite workflow: build small, test fast, then polish details.",
    ],
  },
  {
    id: "fun",
    label: "FUN FACTS",
    role: "PARTY",
    preview: "Things I like",
    avatar: char2,
    portrait: mainm2,
    title: "Things I Like",
    subtitle: "Temporary placeholder details",
    summary:
      "I collect design references from games, dashboards, and posters. If a page feels flat, I add depth with angular shapes, contrast, and animation rhythm.",
    facts: [
      "I keep a private folder of menu design references.",
      "I rename tasks as side quests to stay motivated.",
      "I like balancing dramatic visuals with clean usability.",
    ],
  },
  {
    id: "quirks",
    label: "WEIRD FACTS",
    role: "PARTY",
    preview: "Design quirks",
    avatar: char3,
    portrait: mainf,
    title: "Design Quirks",
    subtitle: "Temporary placeholder details",
    summary:
      "I notice tiny spacing problems immediately. If transition timing feels even slightly wrong, I keep refining until the motion reads naturally.",
    facts: [
      "I test keyboard flow early so pages feel game-ready.",
      "I tweak easing curves more than almost anything else.",
      "I prefer high-contrast palettes and strong visual hierarchy.",
    ],
  },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((index) => Math.max(0, index - 1));
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((index) => Math.min(SECTIONS.length - 1, index + 1));
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActive(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setActive(SECTIONS.length - 1);
      }

      if (event.key === "ArrowLeft" || event.key === "Escape" || event.key === "Backspace") {
        event.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const activeSection = SECTIONS[active];

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline preload="metadata" />

      <style>{`
        .about-root {
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: auto;
        }

        .about-list {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 52vw;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: auto;
          z-index: 20;
        }

        .about-item-wrap {
          position: relative;
          transform: translateX(-105%);
          opacity: 0;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
        }

        .about-item-wrap.mounted {
          transform: translateX(0);
          opacity: 1;
        }

        .about-item-wrap:nth-child(1).mounted { transition-delay: 0ms; }
        .about-item-wrap:nth-child(2).mounted { transition-delay: 90ms; }
        .about-item-wrap:nth-child(3).mounted { transition-delay: 180ms; }

        .about-item-accent {
          position: absolute;
          inset: 0;
          height: 72px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .about-item-wrap.active .about-item-accent {
          opacity: 1;
        }
        .about-item-wrap.hovered:not(.active) .about-item-accent {
          opacity: 0.45;
        }

        .about-item {
          position: relative;
          width: 52vw;
          height: 72px;
          border: 0;
          padding: 0;
          background: #101010;
          color: #fff;
          cursor: pointer;
          text-align: left;
          overflow: hidden;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.65);
          transition: height 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-item:focus-visible {
          outline: 2px solid #8ef5ff;
          outline-offset: 2px;
        }

        .about-item-wrap.active .about-item {
          height: 102px;
        }
        .about-item-wrap.hovered:not(.active) .about-item {
          height: 88px;
        }

        .about-item-fill {
          position: absolute;
          inset: 0;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 36px) 100%, calc(100% - 36px) 100%);
          transition: clip-path 0.34s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-item-wrap.active .about-item-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 142px) 100%);
        }
        .about-item-wrap.hovered:not(.active) .about-item-fill {
          clip-path: polygon(68% 0, 100% 0, calc(100% - 20px) 100%, calc(68% + 40px) 100%);
        }

        .about-avatar {
          position: absolute;
          top: 0;
          left: 112px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          clip-path: polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
          pointer-events: none;
          z-index: 3;
        }

        .about-item-content {
          position: relative;
          z-index: 4;
          height: 100%;
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 10px;
          padding: 8px 20px 8px 20px;
        }

        .about-item-role {
          font-family: 'Anton', sans-serif;
          font-size: 48px;
          line-height: 1;
          letter-spacing: -2px;
          transform: rotate(-30deg);
          color: #ffffff;
          padding-right: 16px;
          user-select: none;
          transition: color 0.2s ease;
        }

        .about-item-text {
          margin-left: 132px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .about-item-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 31px;
          line-height: 1;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.92);
          user-select: none;
          transition: color 0.2s ease;
        }

        .about-item-preview {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 1.2;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.74);
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .about-item-wrap.active .about-item-role,
        .about-item-wrap.active .about-item-label,
        .about-item-wrap.active .about-item-preview {
          color: #111;
        }
        .about-item-wrap.hovered:not(.active) .about-item-label {
          color: #ffffff;
        }

        .about-portrait {
          position: absolute;
          top: 0;
          right: -3vw;
          width: 43vw;
          height: 100vh;
          z-index: 13;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.95;
        }

        .about-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        .about-panel {
          position: absolute;
          top: 9vh;
          right: 4.5vw;
          width: min(40vw, 620px);
          min-height: 74vh;
          z-index: 14;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133, 244, 255, 0.2), 16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }

        .about-panel-content {
          animation: about-panel-fade 0.2s ease;
        }

        @keyframes about-panel-fade {
          from { opacity: 0.45; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .about-panel-head {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 14px;
          align-items: center;
          min-height: 102px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }

        .about-panel-index {
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          line-height: 1;
          color: #08153f;
        }

        .about-panel-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
          color: #08153f;
        }

        .about-panel-subtitle {
          margin-top: 4px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.2px;
          color: rgba(8, 21, 63, 0.9);
        }

        .about-panel-body {
          padding: 18px 20px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .about-summary {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          line-height: 1.5;
          color: #eef8ff;
          background: rgba(4, 11, 52, 0.92);
          padding: 14px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
        }

        .about-fact-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .about-fact {
          display: grid;
          grid-template-columns: 26px 1fr;
          gap: 10px;
          align-items: start;
          background: rgba(7, 16, 65, 0.96);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.16);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          padding: 10px 12px;
        }

        .about-fact-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          color: #92f6ff;
        }

        .about-fact-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.45;
          color: #edfaff;
        }

        .about-footer {
          position: fixed;
          bottom: 20px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 16;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }

        .about-footer.mounted {
          opacity: 1;
        }

        .about-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.24);
        }

        .about-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 11px;
        }

        @media (max-width: 1024px) {
          .about-item,
          .about-item-accent {
            width: 58vw;
          }

          .about-item-text {
            margin-left: 116px;
          }

          .about-panel {
            width: min(64vw, 620px);
            right: 2vw;
          }

          .about-portrait {
            width: 58vw;
            right: -12vw;
          }

          .about-panel-title {
            font-size: 34px;
          }

          .about-summary {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="about-root" role="navigation" aria-label="About sections">
        <div className="about-list">
          {SECTIONS.map((section, index) => (
            <div
              key={section.id}
              className={`about-item-wrap${mounted ? " mounted" : ""}${active === index ? " active" : ""}${hovered === index ? " hovered" : ""}`}
            >
              <div className="about-item-accent" />
              <button
                type="button"
                className="about-item"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                onClick={() => setActive(index)}
              >
                <img className="about-avatar" src={section.avatar} alt="" />
                <div className="about-item-fill" />
                <div className="about-item-content">
                  <div className="about-item-role">{section.role}</div>
                  <div className="about-item-text">
                    <div className="about-item-label">{section.label}</div>
                    <div className="about-item-preview">{section.preview}</div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="about-portrait" key={`portrait-${activeSection.id}`}>
          <img src={activeSection.portrait} alt="" />
        </div>

        <section className="about-panel" aria-live="polite">
          <div className="about-panel-content" key={`panel-${activeSection.id}`}>
            <div className="about-panel-head">
              <div className="about-panel-index">{String(active + 1).padStart(2, "0")}</div>
              <div>
                <div className="about-panel-title">{activeSection.title}</div>
                <div className="about-panel-subtitle">{activeSection.subtitle}</div>
              </div>
            </div>

            <div className="about-panel-body">
              <div className="about-summary">{activeSection.summary}</div>

              <div className="about-fact-list">
                {activeSection.facts.map((fact, idx) => (
                  <div className="about-fact" key={fact}>
                    <div className="about-fact-num">{String(idx + 1).padStart(2, "0")}</div>
                    <div className="about-fact-text">{fact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <PersonaKeyHints
        mounted={mounted}
        rootClass="about-footer"
        rowClass="about-footer-row"
        keyClass="about-footer-key"
        rows={[
          { keyLabel: "UP/DN", label: "SELECT" },
          { keyLabel: "HOVER", label: "HIGHLIGHT" },
          { keyLabel: "CLICK", label: "SHOW DETAILS" },
          { keyLabel: "ESC", label: "BACK" },
        ]}
      />
    </div>
  );
}
