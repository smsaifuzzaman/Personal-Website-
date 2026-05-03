import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import resumeVideo from "./assets/main2.mp4";

const RESUME_SECTIONS = [
  {
    id: "education",
    badge: "I",
    title: "EDUCATION",
    subtitle: "BRAC University / CSE",
    rank: 4,
    panelTitle: "EDUCATION LOG",
    progress: "3/3",
    rows: [
      { index: "01", title: "B.Sc. CSE - BRAC University", status: "2023-Present" },
      { index: "02", title: "HSC - Police Lines School & College", status: "GPA 5.00" },
      { index: "03", title: "SSC - Police Lines School & College", status: "GPA 5.00" },
    ],
    bullets: [
      "Computer Science & Engineering undergraduate based in Dhaka.",
      "Relevant coursework includes Computer Graphics, Software Engineering, AI, Algorithms, and Data Structures.",
      "Strong academic foundation with science-track SSC and HSC results.",
    ],
  },
  {
    id: "skills",
    badge: "II",
    title: "SKILLS",
    subtitle: "Code / Tools / Systems",
    rank: 4,
    panelTitle: "SKILL LOADOUT",
    progress: "5/5",
    rows: [
      { index: "01", title: "C, Python, JavaScript, SQL", status: "Languages" },
      { index: "02", title: "HTML, CSS, React", status: "Web" },
      { index: "03", title: "Git/GitHub, VS Code, IntelliJ IDEA", status: "Tools" },
      { index: "04", title: "OOP, DSA, Boolean Logic", status: "Concepts" },
      { index: "05", title: "Word, Excel, PowerPoint", status: "Office" },
    ],
    bullets: [
      "Fast learner with a software-development and systems-thinking mindset.",
      "Comfortable collaborating through GitHub and version-control workflows.",
      "Strong communication, teamwork, adaptability, and time management.",
    ],
  },
  {
    id: "projects",
    badge: "III",
    title: "PROJECTS",
    subtitle: "Dorm Door / Web App",
    rank: 5,
    panelTitle: "PROJECT ARCHIVE",
    progress: "1/1",
    rows: [
      { index: "01", title: "Dorm Door - Dorm Booking Web App", status: "Course Project" },
      { index: "02", title: "Booking management and authentication", status: "Feature" },
      { index: "03", title: "Admin dashboard and system architecture", status: "Feature" },
      { index: "04", title: "github.com/smsaifuzzaman/Dorm-Door", status: "GitHub" },
    ],
    bullets: [
      "Designed a full dorm booking platform for student-facing and admin workflows.",
      "Prepared UML class diagrams, functional requirements, non-functional requirements, and architecture.",
      "Built with a team using collaborative GitHub workflows and version-control best practices.",
    ],
  },
  {
    id: "experience",
    badge: "IV",
    title: "EXPERIENCE",
    subtitle: "Clubs / Leadership / Certs",
    rank: 3,
    panelTitle: "ACTIVITY LOG",
    progress: "3/3",
    rows: [
      { index: "01", title: "BRAC University Leadership Development Forum", status: "Senior Exec" },
      { index: "02", title: "BRAC University Chess Club", status: "Member" },
      { index: "03", title: "E-Game Development", status: "Completed" },
    ],
    bullets: [
      "Works with HR responsibilities in BULDF, including recruiting new members.",
      "Participates in inter-university chess tournaments and develops strategic focus.",
      "Completed E-Game Development with hands-on game design and interactive media practice.",
    ],
  },
];

export default function ResumePage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);
  const activeSection = RESUME_SECTIONS[active];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(RESUME_SECTIONS.length - 1, i + 1));
      }

      if (e.key === "Home") {
        e.preventDefault();
        setActive(0);
      }

      if (e.key === "End") {
        e.preventDefault();
        setActive(RESUME_SECTIONS.length - 1);
      }

      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={resumeVideo} autoPlay loop muted playsInline preload="metadata" />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={resumeVideo} autoPlay loop muted playsInline preload="metadata" />
      </div>
      <style>{`
        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
          z-index: 13;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          display: block;
          width: 100%;
          border: 0;
          padding: 0;
          background: transparent;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
          text-align: left;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }
        .resume-card-wrap:focus-visible {
          outline: 2px solid #8ef5ff;
          outline-offset: 5px;
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 7vh;
          right: 4.5vw;
          bottom: 5vh;
          width: min(39vw, 620px);
          z-index: 12;
          padding: 18px 20px 20px 20px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow-x: hidden;
          overflow-y: auto;
          scrollbar-color: #8df6ff rgba(5, 13, 57, 0.72);
          scrollbar-width: thin;
        }
        .resume-detail-panel::-webkit-scrollbar {
          width: 8px;
        }
        .resume-detail-panel::-webkit-scrollbar-track {
          background: rgba(5, 13, 57, 0.72);
        }
        .resume-detail-panel::-webkit-scrollbar-thumb {
          background: #8df6ff;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
          min-height: 82px;
          padding: 0 16px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          line-height: 0.92;
          letter-spacing: 1px;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 14px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px minmax(0, 1fr) minmax(82px, auto);
          align-items: center;
          gap: 12px;
          min-height: 48px;
          padding: 0 12px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
          overflow: hidden;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          line-height: 1;
          color: #f2fcff;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 6px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          white-space: nowrap;
          justify-self: end;
          max-width: 132px;
          overflow: hidden;
          text-align: center;
          text-overflow: ellipsis;
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 16px;
          padding: 14px 16px 16px 16px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 10px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 17px;
          line-height: 1.18;
          color: #edfaff;
        }

        @media (max-width: 1100px) {
          .resume-stack {
            width: min(52vw, 680px);
            transform: scale(0.82);
          }

          .resume-detail-panel {
            width: min(46vw, 620px);
            right: 2vw;
          }

          .resume-detail-row-title {
            font-size: 20px;
          }
        }

        @media (max-width: 900px) {
          .resume-stack {
            top: 7vh;
            left: 3vw;
            width: 90vw;
            transform: scale(0.64);
          }

          .resume-detail-panel {
            left: 4vw;
            right: 4vw;
            top: 50vh;
            bottom: 4vh;
            width: auto;
            padding: 12px 14px 14px 14px;
          }

          .resume-detail-top {
            grid-template-columns: 48px minmax(0, 1fr) auto;
            min-height: 58px;
            gap: 8px;
            padding: 0 12px;
          }

          .resume-detail-top-index,
          .resume-detail-top-progress {
            font-size: 30px;
          }

          .resume-detail-top-title {
            font-size: 28px;
          }

          .resume-detail-list {
            gap: 6px;
            margin-top: 10px;
          }

          .resume-detail-row {
            grid-template-columns: 38px minmax(0, 1fr) minmax(72px, auto);
            min-height: 40px;
            gap: 8px;
            padding: 0 10px;
          }

          .resume-detail-row-index {
            font-size: 20px;
          }

          .resume-detail-row-title {
            font-size: 17px;
          }

          .resume-detail-status {
            max-width: 100px;
            font-size: 15px;
            padding: 5px 8px;
          }

          .resume-detail-bottom {
            margin-top: 10px;
            padding: 10px 12px;
          }

          .resume-detail-bottom-title {
            font-size: 23px;
            margin-bottom: 6px;
          }

          .resume-detail-bullet {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack" role="listbox" aria-label="Resume sections">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {RESUME_SECTIONS.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
              role="option"
              aria-selected={active === index}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <section className="resume-detail-panel" aria-live="polite" aria-label={`${activeSection.title} details`}>
          <div className="resume-detail-top">
            <div className="resume-detail-top-index">{String(active + 1).padStart(2, "0")}</div>
            <div className="resume-detail-top-title">{activeSection.panelTitle}</div>
            <div className="resume-detail-top-progress">{activeSection.progress}</div>
          </div>

          <div className="resume-detail-list">
            {activeSection.rows.map((row) => (
              <div className="resume-detail-row" key={`${activeSection.id}-${row.index}`}>
                <div className="resume-detail-row-index">{row.index}</div>
                <div className="resume-detail-row-title">{row.title}</div>
                <div className="resume-detail-status">{row.status}</div>
              </div>
            ))}
          </div>

          <div className="resume-detail-bottom">
            <div className="resume-detail-bottom-title">DETAILS</div>
            <div className="resume-detail-bullets">
              {activeSection.bullets.map((bullet) => (
                <div className="resume-detail-bullet" key={bullet}>- {bullet}</div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
