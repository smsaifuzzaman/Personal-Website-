import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import facebookProfile from "./assets/facebook-profile.jpg";
import linkedinProfile from "./assets/linkedin-profile.jpg";
import instagramProfile from "./assets/instagram-profile.webp";

const SOCIAL_SECTIONS = [
  {
    id: "linkedin",
    label: "LINKEDIN",
    role: "LEADER",
    preview: "Professional profile",
    avatar: char1,
    title: "LinkedIn",
    subtitle: "saif-zaman-339a26340",
    profileUrl: "https://www.linkedin.com/in/saif-zaman-339a26340/",
    snapshot: linkedinProfile,
    fallbackSnapshot: linkedinProfile,
    snapshotPosition: "center 34%",
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    role: "PARTY",
    preview: "Visual updates",
    avatar: char2,
    title: "Instagram",
    subtitle: "flaw_of_the_universe",
    profileUrl: "https://www.instagram.com/flaw_of_the_universe/",
    snapshot: instagramProfile,
    fallbackSnapshot: instagramProfile,
    snapshotPosition: "center 22%",
  },
  {
    id: "facebook",
    label: "FACEBOOK",
    role: "PARTY",
    preview: "Community feed",
    avatar: char3,
    title: "Facebook",
    subtitle: "flawoftheuniverse",
    profileUrl: "https://www.facebook.com/flawoftheuniverse",
    snapshot: facebookProfile,
    fallbackSnapshot: facebookProfile,
    snapshotPosition: "center 18%",
  },
];

export default function Socials() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setActive(0);
    setHovered(null);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((index) => Math.max(0, index - 1));
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((index) => Math.min(SOCIAL_SECTIONS.length - 1, index + 1));
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActive(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setActive(SOCIAL_SECTIONS.length - 1);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        window.open(SOCIAL_SECTIONS[active].profileUrl, "_blank", "noopener,noreferrer");
      }

      if (event.key === "ArrowLeft" || event.key === "Escape" || event.key === "Backspace") {
        event.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  const activeSection = SOCIAL_SECTIONS[active];

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400;600&display=swap');

        .social-root {
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: auto;
        }

        .social-list {
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

        .social-item-wrap {
          position: relative;
          transform: translateX(-105%);
          opacity: 0;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
        }

        .social-item-wrap.mounted {
          transform: translateX(0);
          opacity: 1;
        }

        .social-item-wrap:nth-child(1).mounted { transition-delay: 0ms; }
        .social-item-wrap:nth-child(2).mounted { transition-delay: 90ms; }
        .social-item-wrap:nth-child(3).mounted { transition-delay: 180ms; }

        .social-item-accent {
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

        .social-item-wrap.active .social-item-accent { opacity: 1; }
        .social-item-wrap.hovered:not(.active) .social-item-accent { opacity: 0.45; }

        .social-item {
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

        .social-item:focus-visible {
          outline: 2px solid #8ef5ff;
          outline-offset: 2px;
        }

        .social-item-wrap.active .social-item { height: 102px; }
        .social-item-wrap.hovered:not(.active) .social-item { height: 88px; }

        .social-item-fill {
          position: absolute;
          inset: 0;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 36px) 100%, calc(100% - 36px) 100%);
          transition: clip-path 0.34s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .social-item-wrap.active .social-item-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 142px) 100%);
        }
        .social-item-wrap.hovered:not(.active) .social-item-fill {
          clip-path: polygon(68% 0, 100% 0, calc(100% - 20px) 100%, calc(68% + 40px) 100%);
        }

        .social-avatar {
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

        .social-item-content {
          position: relative;
          z-index: 4;
          height: 100%;
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
        }

        .social-item-role {
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

        .social-item-text {
          margin-left: 132px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .social-item-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 31px;
          line-height: 1;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.92);
          user-select: none;
          transition: color 0.2s ease;
        }

        .social-item-preview {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 1.2;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.74);
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .social-item-wrap.active .social-item-role,
        .social-item-wrap.active .social-item-label,
        .social-item-wrap.active .social-item-preview {
          color: #111;
        }

        .social-portrait {
          position: absolute;
          top: 0;
          right: -3vw;
          width: 43vw;
          height: 100vh;
          z-index: 13;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.76;
        }

        .social-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
          filter: saturate(1.06) contrast(1.02);
        }

        .social-portrait::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, rgba(0, 14, 52, 0.12) 0%, rgba(0, 14, 52, 0.45) 100%),
            linear-gradient(180deg, rgba(0, 18, 61, 0.06) 0%, rgba(0, 18, 61, 0.58) 100%);
        }

        .social-panel {
          position: absolute;
          top: 9vh;
          right: 4.5vw;
          width: min(40vw, 620px);
          min-height: 74vh;
          z-index: 14;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.92) 0%, rgba(8, 16, 68, 0.94) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133, 244, 255, 0.2), 16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }

        .social-panel-content { animation: social-panel-fade 0.2s ease; }

        @keyframes social-panel-fade {
          from { opacity: 0.45; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .social-panel-head {
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

        .social-panel-index {
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          line-height: 1;
          color: #08153f;
        }

        .social-panel-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
          color: #08153f;
        }

        .social-panel-subtitle {
          margin-top: 4px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.2px;
          color: rgba(8, 21, 63, 0.9);
        }

        .social-panel-body {
          padding: 18px 20px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .social-snapshot-frame {
          position: relative;
          width: 100%;
          height: 46vh;
          background: rgba(4, 11, 52, 0.66);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.22);
          overflow: hidden;
        }

        .social-snapshot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .social-snapshot-meta {
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: rgba(3, 8, 31, 0.68);
          padding: 8px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }

        .social-snapshot-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1.2px;
          color: #dff8ff;
        }

        .social-snapshot-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 1.2;
          color: rgba(219, 246, 255, 0.92);
          text-transform: uppercase;
        }

        .social-open-profile {
          border: 0;
          cursor: pointer;
          align-self: flex-start;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1.4px;
          padding: 8px 16px;
          color: #0a1a52;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        }


        .social-footer {
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

        .social-footer.mounted { opacity: 1; }

        .social-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.24);
        }

        .social-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 11px;
        }

        @media (max-width: 1024px) {
          .social-item,
          .social-item-accent {
            width: 58vw;
          }

          .social-item-text {
            margin-left: 116px;
          }

          .social-panel {
            width: min(64vw, 620px);
            right: 2vw;
          }

          .social-portrait {
            width: 58vw;
            right: -12vw;
          }

          .social-panel-title {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="social-root" role="navigation" aria-label="Social sections">
        <div className="social-list">
          {SOCIAL_SECTIONS.map((section, index) => (
            <div
              key={section.id}
              className={`social-item-wrap${mounted ? " mounted" : ""}${active === index ? " active" : ""}${hovered === index ? " hovered" : ""}`}
            >
              <div className="social-item-accent" />
              <button
                type="button"
                className="social-item"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                onClick={() => setActive(index)}
              >
                <img className="social-avatar" src={section.avatar} alt="" />
                <div className="social-item-fill" />
                <div className="social-item-content">
                  <div className="social-item-role">{section.role}</div>
                  <div className="social-item-text">
                    <div className="social-item-label">{section.label}</div>
                    <div className="social-item-preview">{section.preview}</div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="social-portrait" key={`portrait-${activeSection.id}`} aria-hidden="true">
          <img
            src={activeSection.snapshot}
            alt=""
            style={{ objectPosition: activeSection.snapshotPosition ?? "center" }}
          />
        </div>

        <section className="social-panel" aria-live="polite">
          <div className="social-panel-content" key={`panel-${activeSection.id}`}>
            <div className="social-panel-head">
              <div className="social-panel-index">{String(active + 1).padStart(2, "0")}</div>
              <div>
                <div className="social-panel-title">{activeSection.title}</div>
                <div className="social-panel-subtitle">{activeSection.subtitle}</div>
              </div>
            </div>

            <div className="social-panel-body">
              <div className="social-snapshot-frame">
                <img
                  className="social-snapshot"
                  src={activeSection.snapshot}
                  alt={`${activeSection.title} profile snapshot`}
                  style={{ objectPosition: activeSection.snapshotPosition ?? "center" }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = activeSection.fallbackSnapshot;
                  }}
                />
                <div className="social-snapshot-meta">
                  <span className="social-snapshot-label">{activeSection.title}</span>
                  <span className="social-snapshot-sub">{activeSection.subtitle}</span>
                </div>
              </div>

              <button
                type="button"
                className="social-open-profile"
                onClick={() => window.open(activeSection.profileUrl, "_blank", "noopener,noreferrer")}
              >
                OPEN PROFILE
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className={`social-footer${mounted ? " mounted" : ""}`}>
        <div className="social-footer-row"><span className="social-footer-key">UP/DN</span><span>SELECT</span></div>
        <div className="social-footer-row"><span className="social-footer-key">CLICK</span><span>SHOW DETAILS</span></div>
        <div className="social-footer-row"><span className="social-footer-key">ENTER</span><span>OPEN PLATFORM</span></div>
        <div className="social-footer-row"><span className="social-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
