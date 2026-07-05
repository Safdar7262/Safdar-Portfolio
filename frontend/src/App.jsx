import { useState, useEffect, useRef } from "react";
import { API_BASE_URL, API_V1_BASE_URL } from "./config";
import profilePhoto from "./assets/profile-photo.png";

// ============================================================
// WHATSAPP HELPER
// Builds a wa.me deep link from a phone number + prefilled text.
// Phone must include the country code (e.g. "+91 90000 00000").
// ============================================================
function waLink(phone, text = "Hi! I saw your portfolio and would like to connect.") {
  if (!phone) return null;
  const digitsOnly = phone.replace(/[^\d]/g, ""); // strips +, spaces, dashes
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(text)}`;
}

// ============================================================
// CONFIG — Spring Boot API
// ============================================================
const BASE_URL = API_V1_BASE_URL;


// ============================================================
// API LAYER
// ============================================================
const api = {
  get: async (path) => {
    try {
      const res = await fetch(`${BASE_URL}${path}`);
      if (!res.ok) throw new Error(res.status);
      return await res.json();
    } catch {
      return null;
    }
  },
  post: async (path, body) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  },
};

// ============================================================
// MOCK DATA (used when Spring Boot backend is offline)
// ============================================================
const MOCK = {
  profile: {
    fullName: "Safdar Azam",
    role: "Java Full-Stack Developer",
    bio: "Aspiring Software Developer and Computer Science graduate with hands-on experience in Java, web technologies, and problem-solving. Eager to contribute to real-world projects and grow in a dynamic development environment.",
    email: "safdarazam373@gmail.com",
    phone: "+91 6207274850",
    location: "Bengaluru, India",
    githubUrl: "https://github.com/Safdar7262",
    linkedinUrl: "https://www.linkedin.com/in/safdar-azam-9272a2302/",
    twitterUrl: "#",
    resumeUrl: "#",
    yearsExperience: 0,
    projectsCount: 5,
    clientsCount: 0,
    githubStars: "100+",
    availableForWork: true,
  },
skills: [
  {
    id: 1, name: "Frontend", icon: "◈", color: "#6366F1",
    skills: [
      { name: "React / Basic React Projects",  proficiency: 78 },
      { name: "HTML / CSS / JavaScript",          proficiency: 85 },
      { name: "Responsive Design",       proficiency: 82 },
      { name: "TypeScript",  proficiency: 70 },
    ],
  },
  {
    id: 2, name: "Backend", icon: "◇", color: "#0ea5e9",
    skills: [
      { name: "Java (Core + OOP + DSA Logic)", proficiency: 87 },
      { name: "Spring Boot",           proficiency: 78 },
      { name: "Node.js",          proficiency: 75 },
      { name: "REST APIs",        proficiency: 85 },
    ],
  },
  {
    id: 3, name: "Database", icon: "○", color: "#a855f7",
    skills: [
      { name: "PostgreSQL",            proficiency: 88 },
      { name: "MySQL",          proficiency: 70 },
      { name: "MongoDB",            proficiency: 55 },
      { name: "SQL Queries",      proficiency: 80 },
    ],
  },
  {
    id: 4, name: "Tools & DevOps", icon: "◉", color: "#10b981",
    skills: [
      { name: "Git / GitHub",     proficiency: 85 },
      { name: "Docker",           proficiency: 70 },
      { name: "AWS",              proficiency: 68 },
      { name: "IntelliJ / VS Code", proficiency: 90 },
    ],
  },
],
  projects: [
      {
  id: 1,
  title: "Connexa",
  subtitle: "Smart Contact Management Platform",

  description:
  "Connexa is a production-ready full-stack Smart Contact Management platform that allows users to securely create, organize, search, update, and manage contacts with JWT-based authentication. Developed using React, Spring Boot, and PostgreSQL, it features role-based access, profile image management, responsive UI, REST APIs, and scalable architecture following modern software development practices.",

  icon: "◈",
  accentColor: "#6366F1",

  githubUrl: "YOUR_GITHUB_REPOSITORY_LINK",
  liveUrl: "YOUR_LIVE_DEMO_LINK",

  tags: [
     "React",
  "Java",
  "Spring Boot",
  "Spring Security",
  "JWT",
  "PostgreSQL",
  "REST API",
  "Cloudinary",
  "Tailwind CSS",
  ],

  metrics: [
     "Secure JWT Login",
  "CRUD Operations",
  "Image Upload",
  "Advanced Search",
  "Role-Based Access"
  ],
},
    {
      id: 2, title: "Portfolio Platform", subtitle: "Full-Stack Project",
      description: "Dynamic portfolio built with React frontend and Spring Boot REST API. Features JWT auth, admin dashboard, email notifications, PostgreSQ database and view counter.",
      icon: "⬡", accentColor: "#bf0c56", liveUrl: "#", githubUrl: "#",
      tags: ["React", "Spring Boot", "PostgreSQL", "JWT", "Spring Security"],
      metrics: ["9 DB tables", "JWT secured", "Email alerts"],
    },
   
    {
      // id: 3, title: "Java Search Engine", subtitle: "Backend Project",
      // description: "Java-based search engine that crawls, scrapes, indexes and retrieves web page data. Uses Jsoup for web crawling and MySQL for storing indexed data.",
      // icon: "◇", accentColor: "#a855f7", githubUrl: "#",
      // tags: ["Java", "MySQL", "Jsoup", "Maven", "Spring Boot"],
      // metrics: ["Web crawler", "MySQL indexed", "Fast queries"],


      id: 3,
title: "MediCare AI",
subtitle: "Full-Stack Healthcare Project",
description: "AI-powered healthcare chatbot that triages patient symptoms, detects medical emergencies, and recommends specialist consultations. Supports multi-turn conversations via OpenAI & Gemini, with appointment booking, medical records, and role-based access for patients, doctors, and admins.",
icon: "◇",
accentColor: "#a855f7",
githubUrl: "#",
tags: ["Spring Boot", "PostgreSQL", "JWT", "OpenAI", "Gemini", "Tailwind CSS"],
metrics: ["AI symptom triage", "Emergency detection", "Multi-role system"],


    },
    {
      id: 4,
title: "EduSphere-Student-Management-System",
subtitle: "Full-Stack Project",
description: "Full-stack student management system with paginated student records, full-text search, status filtering, dashboard stats, and CSV export. Features dark mode with theme persistence and a React + Vite frontend backed by a Spring Boot REST API.",
icon: "◇",
accentColor: "#da2020",
githubUrl: "#",
tags: ["Spring Boot", "React", "MySQL", "Tailwind CSS", "Vite", "JPA"],
metrics: ["REST CRUD API", "Dark mode", "CSV export"],

    },
  ],
  experience: [
      {
        id: 1, role: "B.Tech (Computer Science Engineering)",
        company: "Rungta College of Engineering and Technology",
        employmentType: "Full-time",
        periodStart: "2021-08-01",
        periodEnd: "2025-05-31",
        isCurrent: false,
        description: "Bachelor of Technology...",
        tags: ["Core Java(Java 8)", "Spring Boot", "Hibernate","JDBC", "PostgreSQL", "React"],
      },
      {
        id: 2, role: "Java Full-Stack Developer Trainee",
        company: "JSpider Training Institute,Banglore",
        employmentType: "Training",
        periodStart: "2025-010-01",
        periodEnd: "2026-05-31",
        isCurrent: false,
        description: "Hands-on training in Java Full Stack Development, REST APIs and Database design through guided project work",
        tags: ["Core Java(8+)","SQL","Hibernate ORM","Spring Framework","Problem Solving", "Software Engineering"],
      },
      // {
      //   id: 3, role: "Walmart Global Tech Simulation",
      //   company: "Walmart Global Tech",
      //   employmentType: "Internship",
      //   periodStart: "2024-03-01",
      //   periodEnd: "2024-05-31",
      //   isCurrent: false,
      //   description: "Advanced Software Engineering...",
      //   tags: ["Java", "System Design", "Data Structures"],
      // },
    ],
  };
// ← this closes MOCK object

// ============================================================
// HOOKS
// ============================================================
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 2000);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 1) { setDel(false); setWi(i => (i + 1) % words.length); }
      }
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [text, del, wi, words]);
  return text;
}

function usePortfolioData() {
  const [data, setData] = useState({
    profile: null, skills: [], projects: [], experience: [], views: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // First increment the view
      await fetch(`${BASE_URL}/views/increment`, {
        method: "POST"
      }).catch(() => {});

      // Then fetch all data including updated view count
      const [profile, skills, projects, experience, viewData] = await Promise.all([
        api.get("/profile"),
        api.get("/skills"),
        api.get("/projects"),
        api.get("/experience"),
        api.get("/views"),
      ]);
  console.log("viewData from API:", viewData);
  console.log("views count:", viewData?.count);

      setData({
        profile:    profile    || MOCK.profile,
        skills:     skills?.length     ? skills     : MOCK.skills,
        projects:   projects?.length   ? projects   : MOCK.projects,
        experience: experience?.length ? experience : MOCK.experience,
        views:      viewData?.count    ?? 0,
      });
      setLoading(false);
    })();
  }, []);

  return { ...data, loading };
}
function useTheme() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });
  useEffect(() => {
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark];
}

// ============================================================
// GLOBAL STYLES
// ============================================================
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700&display=swap');

  /* ---- LIGHT MODE ---- */
  /* ---- LIGHT MODE ---- */
  body[data-theme="light"] {
    background: #f0ede8 !important;
    color: #1a1a2e !important;
  }
  body[data-theme="light"] section {
    background: #f0ede8 !important;
  }
  body[data-theme="light"] nav {
    background: rgba(240,237,232,0.94) !important;
    border-bottom-color: rgba(0,0,0,0.08) !important;
  }
  body[data-theme="light"] h1,
  body[data-theme="light"] h2,
  body[data-theme="light"] h3 {
    color: #1a1a2e !important;
  }
  body[data-theme="light"] p,
  body[data-theme="light"] span:not(.nav-logo span) {
    color: #3a3a4e !important;
  }
  body[data-theme="light"] a {
    color: #3a3a4e !important;
  }
  body[data-theme="light"] nav a {
    color: rgba(26,26,46,.55) !important;
  }
body[data-theme="light"] .nav-logo {
  color: #1a1a2e !important;
}
  body[data-theme="light"] nav a:hover {
    color: #1a1a2e !important;
  }
  body[data-theme="light"] .sec {
    background: #f0ede8 !important;
  }
  body[data-theme="light"] [style*="rgba(255,255,255,.02)"],
  body[data-theme="light"] [style*="rgba(255,255,255,.015)"],
  body[data-theme="light"] [style*="rgba(255,255,255,.03)"] {
    background: #ffffff !important;
    border-color: rgba(0,0,0,0.08) !important;
  }
  body[data-theme="light"] [style*="rgba(255,255,255,.06)"],
  body[data-theme="light"] [style*="rgba(255,255,255,.07)"],
  body[data-theme="light"] [style*="rgba(255,255,255,.08)"] {
    border-color: rgba(0,0,0,0.1) !important;
  }
  body[data-theme="light"] [style*="rgba(255,255,255,.1)"] {
    background: rgba(0,0,0,0.04) !important;
  }
  body[data-theme="light"] [style*="rgba(255,255,255,.025)"] {
    background: #ffffff !important;
    border-color: rgba(0,0,0,0.08) !important;
  }
  body[data-theme="light"] [style*="rgba(255,255,255,.04)"] {
    background: rgba(0,0,0,0.04) !important;
  }
  body[data-theme="light"] ::-webkit-scrollbar-track {
    background: #f0ede8;
  }
  body[data-theme="light"] footer {
    border-top-color: rgba(0,0,0,0.08) !important;
    background: #f0ede8 !important;
  }
  body[data-theme="light"] input,
  body[data-theme="light"] textarea {
    background: #ffffff !important;
    border-color: rgba(0,0,0,0.12) !important;
    color: #1a1a2e !important;
  }
  body[data-theme="light"] input::placeholder,
  body[data-theme="light"] textarea::placeholder {
    color: rgba(26,26,46,.4) !important;
  }

  /* ---- DARK MODE (default) ---- */
  body, body[data-theme="dark"] {
    --bg: #07070b;
    --surface: rgba(255,255,255,.01);
    --card: rgba(255,255,255,.015);
    --text: #e8e8f0;
    --muted: rgba(255,255,255,.42);
    --border: rgba(255,255,255,.06);
    --accent: #6366F1;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Space Mono', monospace;
    overflow-x: hidden;
    transition: background .3s, color .3s;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #07070b; }
  ::-webkit-scrollbar-thumb { background: #6366F1; }
  a { text-decoration: none; }

  @keyframes pulse  { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(225,29,72,0)} }
  @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes spin        { to{transform:rotate(360deg)} }
  @keyframes sectionIn   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:none} }
  @keyframes sectionOut  { from{opacity:1;transform:none} to{opacity:0;transform:translateY(-20px)} }

  .section-enter {
    animation: sectionIn .6s cubic-bezier(.16,1,.3,1) forwards;
  }

  /* ---- RESPONSIVE HELPERS ---- */
  .grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; }
  .grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:2px; }
  .project-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:2px; }

  @media(max-width:1100px){ .grid-4{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:700px) { .grid-4{ grid-template-columns:1fr; } .grid-2{ grid-template-columns:1fr; } .project-grid{ grid-template-columns:1fr; } }

  /* ---- SPACING ---- */
  .sec { padding: 100px 64px; }
  .hero-sec { padding: 140px 64px 80px; min-height:100vh; display:flex; align-items:center; }

  @media(max-width:1024px){ .sec{ padding:80px 32px; } .hero-sec{ padding:120px 32px 64px; } }
  @media(max-width:640px) { .sec{ padding:64px 20px; } .hero-sec{ padding:100px 20px 48px; } }

  /* ---- NAV RESPONSIVE ---- */
  .nav-links { display:flex; gap:36px; }
  .hamburger  { display:none !important; }
  @media(max-width:768px){ .nav-links{ display:none !important; } .hamburger{ display:flex !important; } }

  /* ---- HERO STATS ---- */
  .hero-stats { display:flex; }
  @media(max-width:960px){ .hero-stats{ display:none; } }

  /* ---- CONTACT GRID ---- */
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; }
  @media(max-width:800px){ .contact-grid{ grid-template-columns:1fr; } }

  /* ---- TIMELINE ---- */
  .timeline { padding-left:36px; }
  @media(max-width:480px){ .timeline{ padding-left:20px; } }
`;

// ============================================================
// SHARED UI COMPONENTS
// ============================================================
function Tag({ children, color = "#6366F1" }) {
  return (
    <span style={{
      fontSize: 10, color, background: `${color}14`,
      border: `1px solid ${color}33`, padding: "3px 10px", letterSpacing: ".06em",
    }}>{children}</span>
  );
}

function GhostTag({ children }) {
  return (
    <span style={{
      fontSize: 10, color: "rgba(255,255,255,.35)",
      background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
      padding: "4px 10px", letterSpacing: ".05em",
    }}>{children}</span>
  );
}

function SectionHeader({ num, title }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "baseline", gap: 16, marginBottom: 56, flexWrap: "wrap",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "all .7s",
    }}>
      <span style={{ fontSize: 12, color: "#6366F1", letterSpacing: ".12em" }}>{num}</span>
      <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(34px,5vw,58px)", letterSpacing: ".02em", color: "#fff" }}>{title}</h2>
      <div style={{ flex: 1, minWidth: 40, height: 1, background: "linear-gradient(to right,rgba(255,255,255,.1),transparent)", marginLeft: 8 }} />
    </div>
  );
}

function Btn({ href, children, primary, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  const s = {
    display: "inline-block", padding: "13px 28px",
    fontSize: 11, letterSpacing: ".1em", fontFamily: "'Space Mono',monospace",
    background: primary ? (hov ? "#6366F1" : "#6366F1") : "transparent",
    color: primary ? "#fff" : (hov ? "#fff" : "rgba(255,255,255,.55)"),
    border: primary ? "none" : "1px solid rgba(255,255,255,.15)",
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .6 : 1,
    transform: hov && !disabled ? "translateY(-2px)" : "none",
    boxShadow: hov && primary ? "0 10px 28px rgba(99,102,241,.35)" : "none",
    transition: "all .2s",
  };
  return href
    ? <a href={href} style={s} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>
    : <button style={s} onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</button>;
}

// ============================================================
// NAV
// ============================================================
function Nav({ name, dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
      const fn = () => {
        setScrolled(window.scrollY > 60);

        // Progress bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.round((scrollTop / docHeight) * 100);
        const bar = document.getElementById("scroll-progress");
        if (bar) bar.style.width = progress + "%";
      };
      window.addEventListener("scroll", fn);
      return () => window.removeEventListener("scroll", fn);
    }, []);
  const links = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
      <>
        {/* Scroll Progress Bar */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 999, height: 3, background: "transparent",
        }}>
          <div id="scroll-progress" style={{
            height: "100%", width: "0%",
            background: "linear-gradient(to right, #6366F1, #f97316)",
            transition: "width .1s linear",
          }} />
        </div>

        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        padding: "0 clamp(20px,4vw,64px)", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(7,7,11,.94)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all .4s",
      }}>
        <div className="nav-logo" style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "#fff" }}>
          <span style={{ color: "#6366F1" }}>&lt;</span>
          {name?.split(" ")[0] || "Dev"}
          <span style={{ color: "#6366F1" }}>/&gt;</span>
        </div>

        {/* Desktop */}
        <div className="nav-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: ".12em", textTransform: "uppercase", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.4)"}
            >{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setDark(d => !d)}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,.2)",
              color: dark ? "#fff" : "#333",
              padding: "7px 12px", cursor: "pointer",
              fontSize: 15, borderRadius: 4, transition: "all .2s",
            }}
          >{dark ? "☀️" : "🌙"}</button>
          <Btn href="#contact" primary>Hire Me</Btn>
          {/* Hamburger */}
          <button className="hamburger"
            onClick={() => setOpen(o => !o)}
            style={{ background: "none", border: "1px solid rgba(255,255,255,.15)", padding: "8px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 20, height: 1.5, background: "#fff", transition: "all .3s",
                transform: open ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none") : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 299,
          background: "rgba(7,7,11,.97)", borderBottom: "1px solid rgba(255,255,255,.08)",
          padding: "24px clamp(20px,4vw,64px)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ fontSize: 13, color: "rgba(255,255,255,.6)", letterSpacing: ".12em", textTransform: "uppercase" }}
            >{l}</a>
          ))}
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ profile, views }) {
const role = useTypewriter([
  "Java Backend Developer",
  "Spring Boot Developer",
  "REST API Developer",
  "Backend Engineer (Java)",
  "Database & API Specialist"
]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);
  const anim = (d) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: `all .8s ${d}s` });

  return (
    <section id="about" className="hero-sec" style={{ position: "relative", overflow: "hidden" }}>
      {/* BG grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "15%", right: "10%", width: "min(500px,55vw)", height: "min(500px,55vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.07),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "min(380px,45vw)", height: "min(380px,45vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(14,165,233,.05),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap-reverse", width: "100%" }}>
      <div style={{ flex: 1, minWidth: 320, maxWidth: 820 }}>
        {/* Available badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(225,29,72,.08)", border: "1px solid rgba(99,102,241,.25)", padding: "6px 16px", marginBottom: 36, fontSize: 10, color: "#6366F1", letterSpacing: ".16em", ...anim(.1) }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366F1", animation: "pulse 2s infinite" }} />
          {profile?.availableForWork ? "AVAILABLE FOR OPPORTUNITIES" : "CURRENTLY UNAVAILABLE"}
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: "'JetBrains Mono',cursive", fontSize: "clamp(52px,9vw,110px)", fontWeight: 400, lineHeight: .92, letterSpacing: "-.01em", ...anim(.3) }}>
          <span style={{ display: "block", color: "#fff" }}>{profile?.fullName?.split(" ")[0] || "YOUR"}</span>
{/*           <span style={{ display: "block", WebkitTextStroke: "2px rgba(255,255,255,.12)", color: "transparent" }}>{profile?.fullName?.split(" ").slice(1, -1).join(" ") || "FULL"}</span> */}
          <span style={{ display: "block", background: "linear-gradient(90deg,#6366F1,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{profile?.fullName?.split(" ").slice(-1)[0] || "NAME"}</span>
        </h1>

        {/* Typewriter role */}
        <div style={{ marginTop: 28, fontSize: 14, color: "rgba(255,255,255,.45)", ...anim(.5) }}>
          <span style={{ color: "#6366F1" }}>$ </span>
          <span style={{ color: "#fff" }}>{role}</span>
          <span style={{ display: "inline-block", width: 2, height: "1em", background: "#6366F1", marginLeft: 3, verticalAlign: "middle", animation: "blink 1s infinite" }} />
        </div>

        {/* Bio */}
        <p style={{ marginTop: 24, maxWidth: 520, fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,.4)", ...anim(.7) }}>{profile?.bio}</p>
        <p style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,.22)", ...anim(.8) }}>📍 {profile?.location}</p>

        {/* CTAs */}
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap", ...anim(.9) }}>
          <Btn href="#projects" primary>View Projects</Btn>
          <Btn href="#contact">Get in Touch →</Btn>
          <Btn href="/SafdarAzamResume.pdf">Resume ↓</Btn>


        </div>
        

        {/* Stack pills */}
        <div style={{ marginTop: 52, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", ...anim(1.1) }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.2)", letterSpacing: ".18em" }}>STACK</span>
          {["Java", "Spring Boot", "REST APIs", "PostgrSQL", "Hibernate/JPA", "Spring Security","Microservices"].map(t => (
            <span key={t} style={{ fontSize: 10, color: "rgba(255,255,255,.28)", border: "1px solid rgba(255,255,255,.07)", padding: "3px 10px" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Profile photo */}
      {/* <div style={{ ...anim(.4), flexShrink: 0 }}>
        <img
          src={profile?.avatarUrl || "D:\portfolio-updated\portfolio\frontend\src\assets\profile-photo.png"}
          alt={profile?.fullName ? `Portrait of ${profile.fullName}` : "Profile photo"}
          style={{
            width: "clamp(160px,22vw,260px)",
            height: "clamp(160px,22vw,260px)",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(99,102,241,.35)",
            boxShadow: "0 0 0 10px rgba(99,102,241,.05)",
          }}
        />
      </div> */}
      </div>

      {/* Stat cards — desktop only */}
      <div className="hero-stats" style={{ position: "absolute", right: "clamp(24px,5vw,64px)", top: "50%", transform: "translateY(-50%)", flexDirection: "column", gap: 8, ...anim(1.2) }}>
        {[
          [`${profile?.yearsExperience || 0}+`, "Years Exp."],
          [`${profile?.projectsCount || 5}+`, "Projects"],
          [`${profile?.clientsCount || 0}+`, "Clients"],
          [profile?.githubStars || "100+", "GitHub ⭐"],
          [views?.toLocaleString() || "0", "👁 Views"],
        ].map(([n, l]) => (
          <div key={l} style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", padding: "12px 18px", textAlign: "right" }}>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 28, color: "#6366F1", lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.28)", letterSpacing: ".12em", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// SKILLS
// ============================================================
function SkillBar({ name, proficiency, color, delay }) {
  const [ref, vis] = useInView(0.05);
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>{name}</span>
        <span style={{ fontSize: 10, color }}>{proficiency}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,.06)" }}>
        <div style={{
          height: "100%", background: `linear-gradient(to right,${color},${color}88)`,
          width: vis ? `${proficiency}%` : "0%",
          transition: `width 1.3s cubic-bezier(.16,1,.3,1) ${delay}ms`,
          boxShadow: `0 0 8px ${color}44`,
        }} />
      </div>
    </div>
  );
}

function SkillCategoryCard({ cat, ci }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)",
      padding: "clamp(20px,3vw,36px)", position: "relative", overflow: "hidden",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
      transition: `all .7s ${ci * 110}ms`,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: cat.color }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <span style={{ fontSize: 20, color: cat.color }}>{cat.icon}</span>
        <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 20, letterSpacing: ".05em", color: "#fff" }}>{cat.name}</h3>
      </div>
      {cat.skills.map((s, i) => <SkillBar key={s.name} {...s} color={cat.color} delay={i * 80} />)}
    </div>
  );
}

function FrameworkCard({ fw }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,.02)", border: `1px solid ${fw.color}20`,
      padding: "clamp(20px,3vw,40px)", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "all .7s",
    }}>
      <span style={{ fontSize: 40 }}>{fw.logo}</span>
      <div>
        <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, color: fw.color, letterSpacing: ".05em" }}>{fw.name}</h3>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.3)", lineHeight: 1.7, marginTop: 6, maxWidth: 320 }}>{fw.desc}</p>
      </div>
    </div>
  );
}

const FRAMEWORKS = [
//   { name: "React / Next.js", desc: "Hooks, Context, RSC, Performance, Custom Libraries", color: "#61dafb", logo: "⚛" },
//   { name: "Angular",         desc: "Signals, RxJS, NgRx, Standalone Components, Micro-frontends", color: "#6365f1", logo: "🅰" },
  { name: "Spring Boot",     desc: "REST APIs, JPA/Hibernate, PostgrSQL, Security, Actuator", color: "#6db33f", logo: "🍃" },
  { name: "PostgrSQL",           desc: "Schema Design, Indexing, Joins, Stored Procedures, Replication", color: "#00758f", logo: "🗄" },
];

function Skills({ skills }) {
  const [secRef, secVis] = useInView(0.05);
  const [view, setView] = useState("bars");
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (view !== "radar" || !canvasRef.current) return;
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }

    const labels = skills.flatMap(cat => cat.skills.map(s => s.name));
    const data   = skills.flatMap(cat => cat.skills.map(s => s.proficiency));
    const colors = skills.flatMap(cat => cat.skills.map(() => cat.color));

    import("chart.js").then(ChartModule => {
      const { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } = ChartModule;
      Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);
      if (!canvasRef.current) return;
      chartRef.current = new Chart(canvasRef.current, {
        type: "radar",
        data: {
          labels,
          datasets: [{
            label: "Proficiency",
            data,
            borderColor: "#6366F1",
            backgroundColor: "rgba(99,102,241,0.1)",
            pointBackgroundColor: colors,
            pointBorderColor: colors,
            pointRadius: 5,
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              min: 0, max: 100,
              ticks: { display: false },
              grid: { color: "rgba(255,255,255,.08)" },
              pointLabels: {
                font: { size: 11, family: "'Space Mono', monospace" },
                color: "rgba(255,255,255,.55)",
              },
              angleLines: { color: "rgba(255,255,255,.08)" },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => ` ${ctx.raw}%` } },
          },
        },
      });
    });

    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [view, skills]);

  return (
    <section id="skills" className="sec" ref={secRef} style={{
      opacity: secVis ? 1 : 0,
      transform: secVis ? "none" : "translateY(40px)",
      transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
    }}>
      {/* Header + Toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 56 }}>
        <SectionHeader num="SKILLS" title="Skills & Stack" />
        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", padding: 4, borderRadius: 8 }}>
          {["bars", "radar"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 16px",
              background: view === v ? "#6366F1" : "transparent",
              color: view === v ? "#fff" : "rgba(255,255,255,.4)",
              border: "none", borderRadius: 6,
              fontFamily: "'Space Mono',monospace",
              fontSize: 11, letterSpacing: ".08em",
              cursor: "pointer", transition: "all .2s",
              textTransform: "uppercase",
            }}>{v === "bars" ? "⚡ Bars" : "◎ Radar"}</button>
          ))}
        </div>
      </div>

      {/* BARS VIEW */}
      {view === "bars" && (
        <>
          <div className="grid-4">
            {skills.map((cat, ci) => <SkillCategoryCard key={cat.id} cat={cat} ci={ci} />)}
          </div>
          <div className="grid-2" style={{ marginTop: 2 }}>
            {FRAMEWORKS.map(fw => <FrameworkCard key={fw.name} fw={fw} />)}
          </div>
        </>
      )}

      {/* RADAR VIEW */}
      {view === "radar" && (
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 300, maxWidth: 600, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", padding: 24, borderRadius: 8 }}>
            <canvas ref={canvasRef} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 20 }}>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,.3)", letterSpacing: ".1em", marginBottom: 8 }}>CATEGORIES</p>
            {skills.map(cat => (
              <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,.5)" }}>{cat.name}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: cat.color, marginLeft: 16 }}>
                  {Math.round(cat.skills.reduce((a, s) => a + s.proficiency, 0) / cat.skills.length)}% avg
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================
// PROJECTS
// ============================================================
function ProjectCard({ project, index }) {
  const [ref, vis] = useInView();
  const [hov, setHov] = useState(false);
  const c = project.accentColor;
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.015)",
        border: `1px solid ${hov ? c + "44" : "rgba(255,255,255,.06)"}`,
        padding: "clamp(24px,3vw,40px)", position: "relative", overflow: "hidden",
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(50px)",
        transition: `opacity .7s ${index * 100}ms, transform .7s ${index * 100}ms, background .3s, border .3s`,
      }}>
        
      <div style={{ position: "absolute", top: 0, left: 0, width: hov ? "100%" : "0%", height: 2, background: c, transition: "width .5s" }} />
      <span style={{ position: "absolute", top: 16, right: 20, fontSize: 10, color: "rgba(255,255,255,.1)", letterSpacing: ".1em" }}>P.0{project.id}</span>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 32, color: c, lineHeight: 1 }}>{project.icon}</span>
        <div>
          <div style={{ fontSize: 9, color: c, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 3 }}>{project.subtitle}</div>
          <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(22px,3vw,30px)", color: "#fff", letterSpacing: ".03em", lineHeight: 1 }}>{project.title}</h3>
        </div>
      </div>

      <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,.42)", marginBottom: 20 }}>{project.description}</p>

      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        {project.metrics?.map(m => <span key={m} style={{ fontSize: 10, color: c, letterSpacing: ".06em" }}>↗ {m}</span>)}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
        {project.tags?.map(t => <GhostTag key={t}>{t}</GhostTag>)}
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {project.liveUrl && <a href={project.liveUrl} style={{ fontSize: 11, color: hov ? c : "rgba(255,255,255,.38)", letterSpacing: ".05em", transition: "color .2s" }}>Live Demo →</a>}
        {project.githubUrl && <a href={project.githubUrl} style={{ fontSize: 11, color: hov ? c : "rgba(255,255,255,.38)", letterSpacing: ".05em", transition: "color .2s" }}>GitHub →</a>}
      </div>
    </div>
  );
}

function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [secRef, secVis] = useInView(0.05);
  const allTags = ["All", ...new Set(projects.flatMap(p => p.tags || []))];
  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.tags?.includes(activeFilter));
  return (
    
    <section id="projects" className="sec" ref={secRef} style={{
      background: "rgba(255,255,255,.01)",
      opacity: secVis ? 1 : 0,
      transform: secVis ? "none" : "translateY(40px)",
      transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
    }}>
<SectionHeader num="PROJECTS" title="Selected Work" />
      {/* Filter Bar */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32,
      }}>
        {allTags.map(tag => {
          const isActive = activeFilter === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                border: isActive
                  ? "1px solid #6366F1"
                  : "1px solid rgba(255,255,255,.15)",
                background: isActive ? "#6366F1" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,.55)",
                fontFamily: "'Space Mono',monospace",
                fontSize: 11, letterSpacing: ".06em",
                cursor: "pointer", transition: "all .2s",
              }}
              onMouseEnter={e => {
                if (!isActive) e.target.style.background = "rgba(255,255,255,.06)";
              }}
              onMouseLeave={e => {
                if (!isActive) e.target.style.background = "transparent";
              }}
            >{tag}</button>
          );
        })}
      </div>

      {/* Count */}
      <p style={{
        fontFamily: "'Space Mono',monospace", fontSize: 11,
        color: "rgba(255,255,255,.25)", letterSpacing: ".1em",
        marginBottom: 20,
      }}>
        SHOWING {filtered.length} OF {projects.length} PROJECTS
      </p>

      {/* Project Grid */}
      <div className="project-grid">
        {filtered.length > 0
          ? filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)
          : (
            <div style={{
              gridColumn: "1/-1", textAlign: "center",
              padding: "60px 0", color: "rgba(255,255,255,.25)",
              fontFamily: "'Space Mono',monospace", fontSize: 13,
            }}>
              No projects found for "{activeFilter}"
            </div>
          )
        }
      </div>

    </section>
  );
}

// ============================================================
// EXPERIENCE
// ============================================================
function Experience({ experience }) {
  const yr = d => new Date(d).getFullYear();
  const [secRef, secVis] = useInView(0.05);
  return (
    <section id="experience" className="sec" ref={secRef} style={{
      opacity: secVis ? 1 : 0,
      transform: secVis ? "none" : "translateY(40px)",
      transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
    }}>
      <SectionHeader num="EXPERIENCE" title="Where I've Been" />
      <div className="timeline" style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,#6366F1,rgba(99,102,241,.06))" }} />
        {experience.map((exp, i) => {
          const [ref, vis] = useInView();
          return (
            <div key={exp.id} ref={ref} style={{
              position: "relative", marginBottom: 52,
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-28px)",
              transition: `all .7s ${i * 130}ms`,
            }}>
              <div style={{ position: "absolute", left: "clamp(-28px,-5vw,-28px)", top: 7, width: 8, height: 8, borderRadius: "50%", background: "#6366F1", boxShadow: "0 0 14px #6366F1" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, color: "#6366F1", letterSpacing: ".12em" }}>
                  {yr(exp.periodStart)} — {exp.isCurrent ? "Present" : yr(exp.periodEnd)}
                </span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.2)", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", padding: "2px 8px" }}>{exp.employmentType}</span>
                {exp.isCurrent && <span style={{ fontSize: 9, color: "#10b981", background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", padding: "2px 8px" }}>CURRENT</span>}
              </div>

              <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(20px,3vw,28px)", color: "#fff", letterSpacing: ".03em", marginBottom: 3 }}>{exp.role}</h3>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 12 }}>{exp.company}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,.42)", maxWidth: 640, marginBottom: 14 }}>{exp.description}</p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {exp.tags?.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================
// CONTACT (POST → Spring Boot /api/v1/contact → MySQL)
// ============================================================
function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [ref, vis] = useInView();
  const [secRef, secVis] = useInView(0.05);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await api.post("/contact", form);
      setStatus(res?.status === "success" ? "success" : "error");
      if (res?.status === "success") setForm({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus("error"); }
  };

  const inp = {
    width: "100%", background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(255,255,255,.09)", color: "#e8e8f0",
    fontFamily: "'Space Mono',monospace", fontSize: 12,
    padding: "12px 16px", outline: "none", transition: "border .2s",
  };

  return (
    <section id="contact" className="sec" ref={secRef} style={{
      background: "rgba(255,255,255,.01)",
      position: "relative", overflow: "hidden",
      opacity: secVis ? 1 : 0,
      transform: secVis ? "none" : "translateY(40px)",
      transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%,rgba((99,102,241,.04),transparent 70%)", pointerEvents: "none" }} />
      <SectionHeader num="CONTACT" title="Get In Touch" />

      <div className="contact-grid" ref={ref} style={{ opacity: vis ? 1 : 0, transition: "all .8s" }}>
        {/* LEFT — Info */}
        <div>
          <h2 style={{ fontFamily: "'JetBrains Mono',cursive", fontSize: "clamp(40px,7vw,80px)", lineHeight: .92, letterSpacing: "-.01em", color: "#fff", marginBottom: 24 }}>
            LET'S BUILD<br />
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,.12)", color: "transparent" }}> SCALABLE </span><br />
            <span style={{ background: "linear-gradient(90deg,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SOLUTIONS</span>
          </h2>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,.38)", lineHeight: 1.8, maxWidth: 400, marginBottom: 32 }}>
            Dedicated to creating reliable, scalable, and impactful applications through clean code and continuous learning. Currently exploring opportunities as a Java Full Stack Developer and welcome professional connections, project discussions, and potential collaborations. Messages submitted here are securely handled via Spring Boot and PostgreSQL.**

          </p>

          {/* API badge */}
          {/* <div style={{ background: "rgba(109,179,63,.06)", border: "1px solid rgba(109,179,63,.2)", padding: "12px 16px", marginBottom: 16, fontSize: 10, color: "rgba(109,179,63,.8)", lineHeight: 1.7 }}>
            🍃 <strong>Backend by Spring Boot + PostgrSQL</strong><br />
                ••• Message are stored securely and I'm notified by email.
          </div> */}

          {/* WhatsApp card */}
          {profile?.phone && (
            <a
              href={waLink(profile.phone, `Hi ${profile?.fullName?.split(" ")[0] || ""}, I saw your portfolio and would like to connect.`)}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "rgba(37,211,102,.06)", border: "1px solid rgba(37,211,102,.25)",
                padding: "14px 16px", marginBottom: 28, textDecoration: "none",
                transition: "background .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(37,211,102,.06)"}
            >
              <span style={{ fontSize: 20 }}>💬</span>
              <div>
                <div style={{ fontSize: 12, color: "#25D366", fontWeight: 600 }}>Message me on WhatsApp</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 2 }}>Usually reply within a few hours</div>
              </div>
            </a>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Email",    value: profile?.email,      href: `mailto:${profile?.email}` },
              { label: "Location", value: profile?.location },
              { label: "GitHub",   value: profile?.githubUrl,   href: profile?.githubUrl },
              { label: "LinkedIn", value: profile?.linkedinUrl, href: profile?.linkedinUrl },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 12 }}>
                <span style={{ fontSize: 9, color: "#6366F1", letterSpacing: ".12em", minWidth: 64 }}>{item.label}</span>
                {item.href
                  ? <a href={item.href} style={{ fontSize: 12, color: "rgba(255,255,255,.45)", transition: "color .2s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.45)"}
                    >{item.value}</a>
                  : <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>{item.value}</span>
                }
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
           {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["name", "Name *"], ["email", "Email *"]].map(([n, p]) => (
              <input key={n} name={n} placeholder={p} value={form[n]} onChange={handle}
                style={inp}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.09)"}
              />
            ))}
          </div>
          <input name="subject" placeholder="Subject" value={form.subject} onChange={handle}
            style={inp}
            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.09)"}
          />
          <textarea name="message" placeholder="Your message *" rows={7} value={form.message} onChange={handle}
            style={{ ...inp, resize: "vertical" }}
            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.09)"}
          />

          {status === "success" && (
            <div style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.25)", padding: "12px 16px", fontSize: 12, color: "#10b981" }}>
              Thank you! Your message has been sent successfully.We'll get back to you soon!
            </div>
          )}
          {status === "error" && (
                      <div style={{ background: "rgba(99,102,241,.08)", border: "1px solid rgba(99,102,241,.25)", padding: "12px 16px", fontSize: 12, color: "#6366F1" }}>
                        ✗ Could not reach the backend. Check your API URL and backend deployment.
                      </div>
                    )}

                    <Btn primary onClick={submit} disabled={status === "loading"}>
                      {status === "loading" ? "Sending..." : "Send Message →"}
                    </Btn>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,.18)", lineHeight: 1.7 }}>
                      Endpoint: <span style={{ color: "rgba(255,255,255,.35)" }}>POST {BASE_URL}/contact</span>

                    </p> */}
                    <div className="">
                      {/* <img src="profile-photo.png"/> */}
                      <img
          src="profile-photo.png"
          alt={profile?.fullName ? `Portrait of ${profile.fullName}` : "Profile photo"}
          style={{
            width: "clamp(250px,28vw,360px)",
            height: "clamp(250px,28vw,360px)",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(99,102,241,.35)",
            boxShadow: "0 0 0 10px rgba(99,102,241,.05)",
            marginLeft: "100px",
          }}
        />
                    </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ profile }) {
  return (
    <footer style={{
      padding: "24px clamp(20px,4vw,64px)",
      borderTop: "1px solid rgba(255,255,255,.06)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,.18)" }}>© 2026 {profile?.fullName}. All rights reserved.</span>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,.18)" }}>
        <span style={{ color: "#f89820" }}>Java</span> · <span style={{ color: "#6db33f" }}>Spring Boot</span> · <span style={{ color: "#336791" }}>PostgreSQL</span>
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite", boxShadow: "0 0 8px #10b981", display: "block" }} />
        <span style={{ fontSize: 10, color: "#10b981", letterSpacing: ".1em" }}>AVAILABLE FOR WORK</span>
      </div>
    </footer>
  );
}

// ============================================================
// LOADER
// ============================================================
function Loader() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#07070b", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, zIndex: 999 }}>
      <div style={{ width: 36, height: 36, border: "2px solid rgba(255,255,255,.08)", borderTop: "2px solid #6366F1", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)", letterSpacing: ".2em" }}>LOADING PORTFOLIO</span>
      <span style={{ fontSize: 10, color: "rgba(109,179,63,.5)", letterSpacing: ".1em" }}>connecting to Spring Boot API...</span>
    </div>
  );
}

// ============================================================
// FLOATING WHATSAPP BUTTON — visible on every section
// ============================================================
function WhatsAppFloat({ phone, name }) {
  const [hover, setHover] = useState(false);
  if (!phone) return null;
  const href = waLink(phone, `Hi ${name?.split(" ")[0] || ""}, I saw your portfolio and would like to connect.`);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message on WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 500,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hover ? "0 6px 20px rgba(37,211,102,.45)" : "0 4px 14px rgba(0,0,0,.35)",
        transform: hover ? "scale(1.08)" : "scale(1)",
        transition: "all .2s ease",
        textDecoration: "none",
      }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.607 1.902 6.468L4 29l7.72-1.874A11.9 11.9 0 0 0 16 27c6.628 0 12-5.373 12-12S22.63 3 16.001 3zm.006 21.7c-1.87 0-3.62-.51-5.122-1.397l-.368-.218-4.583 1.112 1.14-4.464-.24-.383A9.66 9.66 0 0 1 5.3 15c0-5.352 4.35-9.7 9.7-9.7 5.35 0 9.7 4.348 9.7 9.7 0 5.352-4.35 9.7-9.693 9.7zm5.316-7.267c-.29-.145-1.716-.847-1.982-.944-.266-.097-.46-.145-.653.146-.194.29-.75.943-.92 1.137-.17.194-.34.218-.63.073-.29-.146-1.226-.452-2.336-1.442-.863-.77-1.446-1.72-1.616-2.01-.17-.29-.018-.447.128-.592.13-.13.29-.34.435-.51.145-.17.194-.29.29-.484.097-.194.048-.363-.024-.508-.073-.146-.653-1.575-.896-2.156-.236-.567-.476-.49-.653-.5l-.556-.01c-.194 0-.508.073-.774.363-.266.29-1.017.995-1.017 2.425 0 1.43 1.04 2.812 1.185 3.006.146.194 2.05 3.13 4.966 4.39.694.3 1.235.48 1.657.615.696.221 1.33.19 1.83.115.558-.083 1.716-.702 1.958-1.38.242-.678.242-1.26.17-1.38-.073-.122-.267-.194-.556-.34z"/>
      </svg>
    </a>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const { profile, skills, projects, experience, loading, views } = usePortfolioData();
  const [dark, setDark] = useTheme();

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {loading ? <Loader /> : (
        <>
          <Nav name={profile?.fullName} dark={dark} setDark={setDark} />
          <Hero profile={profile} views={views} />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Contact profile={profile} />
          <Footer profile={profile} />
          <WhatsAppFloat phone={profile?.phone} name={profile?.fullName} />
        </>
      )}
    </>
  );
}
