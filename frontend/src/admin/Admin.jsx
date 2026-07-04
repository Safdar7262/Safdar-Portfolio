import { useState, useEffect } from "react";
import { adminApi } from "./api";
import { API_V1_BASE_URL } from "../config";


const S = {
  wrap: { minHeight: "100vh", background: "#07070b", color: "#e8e8f0", fontFamily: "'Space Mono', monospace" },
  nav: { background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.08)", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { fontSize: 14, fontWeight: 700, color: "#6366F1" },
  main: { padding: "32px", maxWidth: 1100, margin: "0 auto" },
  tabs: { display: "flex", gap: 4, marginBottom: 32, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", padding: 4, borderRadius: 8, width: "fit-content" },
  tab: (active) => ({ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: ".08em", transition: "all .2s", background: active ? "#6366F1" : "transparent", color: active ? "#fff" : "rgba(255,255,255,.4)" }),
  card: { background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: 24, marginBottom: 16 },
  label: { fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", marginBottom: 6, display: "block" },
  input: { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "#e8e8f0", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "10px 14px", borderRadius: 6, outline: "none", marginBottom: 12 },
  textarea: { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "#e8e8f0", fontFamily: "'Space Mono', monospace", fontSize: 12, padding: "10px 14px", borderRadius: 6, outline: "none", marginBottom: 12, resize: "vertical", minHeight: 80 },
  btnPrimary: { background: "#6366F1", color: "#fff", border: "none", padding: "9px 20px", borderRadius: 6, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: ".08em", transition: "all .2s" },
  btnDanger: { background: "rgba(99,102,241,.45)", color: "#6366F1", border: "1px solid rgba(99,102,241,.45)", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11, transition: "all .2s" },
  btnSecondary: { background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.1)", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11, transition: "all .2s" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  tag: { display: "inline-block", fontSize: 10, color: "#6366F1", background: "rgba(225,29,72,.08)", border: "1px solid rgba(99,102,241,.45)", padding: "2px 8px", borderRadius: 4, marginRight: 4 },
  badge: (read) => ({ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: read ? "rgba(16,185,129,.08)" : "rgba(99,102,241,.45)", color: read ? "#10b981" : "#6366F1", border: `1px solid ${read ? "rgba(16,185,129,.2)" : "rgba(99,102,241,.45)"}` }),
};

// ── LOGIN ──
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) return;
    setLoading(true); setError("");
    const res = await adminApi.login(form.username, form.password);
    if (res.token) {
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_user", res.username);
      onLogin();
    } else {
      setError(res.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#07070b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace" }}>
      <div style={{ width: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 28, color: "#6366F1", fontWeight: 700, marginBottom: 8 }}>⚡ Admin</div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>Portfolio Dashboard</p>
        </div>
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 32 }}>
          <label style={S.label}>USERNAME</label>
          <input style={S.input} value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="aryan" />
          <label style={S.label}>PASSWORD</label>
          <input style={S.input} type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && submit()} />
          {error && <p style={{ color: "#6366F1", fontSize: 12, marginBottom: 12 }}>✗ {error}</p>}
          <button style={{ ...S.btnPrimary, width: "100%", padding: "12px" }} onClick={submit} disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS TAB ──
function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", subtitle: "", description: "", accentColor: "#6366F1", liveUrl: "", githubUrl: "", featured: true });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { adminApi.getProjects().then(setProjects); }, []);

  const save = async () => {
    if (editing) {
      await adminApi.updateProject(editing.id, form);
    } else {
      await adminApi.createProject(form);
    }
    const updated = await adminApi.getProjects();
    setProjects(updated);
    setShowForm(false); setEditing(null);
    setForm({ title: "", subtitle: "", description: "", accentColor: "#6366F1", liveUrl: "", githubUrl: "", featured: true });
  };

  const del = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await adminApi.deleteProject(id);
    setProjects(p => p.filter(x => x.id !== id));
  };

  const edit = (p) => {
    setEditing(p);
    setForm({ title: p.title, subtitle: p.subtitle, description: p.description, accentColor: p.accentColor, liveUrl: p.liveUrl || "", githubUrl: p.githubUrl || "", featured: p.featured });
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Projects ({projects.length})</h2>
        <button style={S.btnPrimary} onClick={() => { setEditing(null); setShowForm(true); }}>+ Add Project</button>
      </div>

      {showForm && (
        <div style={{ ...S.card, border: "1px solid rgba(99,102,241,.45)", marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, marginBottom: 20, color: "#6366F1" }}>{editing ? "Edit Project" : "New Project"}</h3>
          <div style={S.grid2}>
            <div><label style={S.label}>TITLE</label><input style={S.input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label style={S.label}>SUBTITLE</label><input style={S.input} value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} /></div>
          </div>
          <label style={S.label}>DESCRIPTION</label>
          <textarea style={S.textarea} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <div style={S.grid2}>
            <div><label style={S.label}>LIVE URL</label><input style={S.input} value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} /></div>
            <div><label style={S.label}>GITHUB URL</label><input style={S.input} value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} /></div>
          </div>
          <div style={S.grid2}>
            <div><label style={S.label}>ACCENT COLOR</label><input style={S.input} value={form.accentColor} onChange={e => setForm(f => ({ ...f, accentColor: e.target.value }))} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 24 }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Featured</label>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button style={S.btnPrimary} onClick={save}>Save Project</button>
            <button style={S.btnSecondary} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
          </div>
        </div>
      )}

      {projects.map(p => (
        <div key={p.id} style={{ ...S.card, borderLeft: `3px solid ${p.accentColor || "#6366F1"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{p.subtitle}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 10, maxWidth: 600 }}>{p.description}</div>
              <div>{p.tags?.map(t => <span key={t.id} style={S.tag}>{t.tag}</span>)}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button style={S.btnSecondary} onClick={() => edit(p)}>Edit</button>
              <button style={S.btnDanger} onClick={() => del(p.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── EXPERIENCE TAB ──
function ExperienceTab() {
  const [experiences, setExperiences] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ role: "", company: "", employmentType: "Full-time", description: "", periodStart: "", periodEnd: "", isCurrent: false });

  useEffect(() => {
    fetch(`${API_V1_BASE_URL}/experience`).then(r => r.json()).then(setExperiences);
  }, []);

  const save = async () => {
    if (editing) {
      await adminApi.updateExperience(editing.id, form);
    } else {
      await adminApi.createExperience(form);
    }
    const updated = await fetch(`${API_V1_BASE_URL}/experience`).then(r => r.json());

    setExperiences(updated);
    setShowForm(false); setEditing(null);
    setForm({ role: "", company: "", employmentType: "Full-time", description: "", periodStart: "", periodEnd: "", isCurrent: false });
  };

  const del = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    await adminApi.deleteExperience(id);
    setExperiences(e => e.filter(x => x.id !== id));
  };

  const edit = (e) => {
    setEditing(e);
    setForm({ role: e.role, company: e.company, employmentType: e.employmentType, description: e.description, periodStart: e.periodStart || "", periodEnd: e.periodEnd || "", isCurrent: e.isCurrent });
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Experience ({experiences.length})</h2>
        <button style={S.btnPrimary} onClick={() => { setEditing(null); setShowForm(true); }}>+ Add Experience</button>
      </div>

      {showForm && (
        <div style={{ ...S.card, border: "1px solid rgba(99,102,241,.45)", marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, marginBottom: 20, color: "#6366F1" }}>{editing ? "Edit Experience" : "New Experience"}</h3>
          <div style={S.grid2}>
            <div><label style={S.label}>ROLE</label><input style={S.input} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></div>
            <div><label style={S.label}>COMPANY</label><input style={S.input} value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
          </div>
          <div style={S.grid2}>
            <div><label style={S.label}>TYPE</label>
              <select style={S.input} value={form.employmentType} onChange={e => setForm(f => ({ ...f, employmentType: e.target.value }))}>
                <option>Full-time</option><option>Part-time</option><option>Freelance</option><option>Internship</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 24 }}>
              <input type="checkbox" checked={form.isCurrent} onChange={e => setForm(f => ({ ...f, isCurrent: e.target.checked }))} />
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Current Job</label>
            </div>
          </div>
          <div style={S.grid2}>
            <div><label style={S.label}>START DATE</label><input style={S.input} type="date" value={form.periodStart} onChange={e => setForm(f => ({ ...f, periodStart: e.target.value }))} /></div>
            <div><label style={S.label}>END DATE</label><input style={S.input} type="date" value={form.periodEnd} onChange={e => setForm(f => ({ ...f, periodEnd: e.target.value }))} disabled={form.isCurrent} /></div>
          </div>
          <label style={S.label}>DESCRIPTION</label>
          <textarea style={S.textarea} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.btnPrimary} onClick={save}>Save Experience</button>
            <button style={S.btnSecondary} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
          </div>
        </div>
      )}

      {experiences.map(e => (
        <div key={e.id} style={{ ...S.card, borderLeft: "3px solid #6366F1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{e.role}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{e.company} · {e.employmentType}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", maxWidth: 600 }}>{e.description}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button style={S.btnSecondary} onClick={() => edit(e)}>Edit</button>
              <button style={S.btnDanger} onClick={() => del(e.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── MESSAGES TAB ──
function MessagesTab() {
  const [messages, setMessages] = useState([]);

  useEffect(() => { adminApi.getMessages().then(setMessages); }, []);

  const markRead = async (id) => {
    await adminApi.markRead(id);
    setMessages(m => m.map(x => x.id === id ? { ...x, isRead: true } : x));
  };

  const del = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await adminApi.deleteMessage(id);
    setMessages(m => m.filter(x => x.id !== id));
  };

  const unread = messages.filter(m => !m.isRead).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Messages ({messages.length})</h2>
        {unread > 0 && <span style={{ fontSize: 11, color: "#6366F1", background: "rgba(99,102,241,.45)", border: "1px solid rgba(99,102,241,.45)", padding: "4px 12px", borderRadius: 20 }}>{unread} unread</span>}
      </div>

      {messages.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,.25)", fontSize: 13 }}>No messages yet</div>
      )}

      {messages.map(m => (
        <div key={m.id} style={{ ...S.card, borderLeft: `3px solid ${m.isRead ? "rgba(255,255,255,.1)" : "#6366F1"}`, opacity: m.isRead ? 0.7 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                <span style={S.badge(m.isRead)}>{m.isRead ? "READ" : "UNREAD"}</span>
              </div>
              <div style={{ fontSize: 11, color: "#6366F1", marginBottom: 8 }}>{m.email}</div>
              {m.subject && <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>Subject: {m.subject}</div>}
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.7 }}>{m.message}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.25)", marginTop: 8 }}>{new Date(m.createdAt).toLocaleString()}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 16 }}>
              <a href={`mailto:${m.email}`} style={{ ...S.btnSecondary, textDecoration: "none", display: "inline-block" }}>Reply</a>
              {!m.isRead && <button style={S.btnSecondary} onClick={() => markRead(m.id)}>Mark Read</button>}
              <button style={S.btnDanger} onClick={() => del(m.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── DASHBOARD ──
function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("projects");
  const user = localStorage.getItem("admin_user");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const uploadResume = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_V1_BASE_URL}/admin/resume`, {

        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: formData,
      });
      const data = await res.json();
      setUploadMsg(data.status === "success" ? "Resume uploaded!" : data.message);
    } catch {
      setUploadMsg("Upload failed");
    }
    setUploading(false);
  };

  return (
    <div style={S.wrap}>
      <nav style={S.nav}>
        <div style={S.logo}>Portfolio Admin</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{
              fontSize: 11,
              color: "#10b981",
              border: "1px solid rgba(16,185,129,.3)",
              padding: "6px 14px",
              borderRadius: 6,
              cursor: "pointer",
              background: "rgba(16,185,129,.08)",
            }}>
              {uploading ? "Uploading..." : "Upload Resume"}
              <input
                type="file"
                accept=".pdf"
                onChange={uploadResume}
                style={{ display: "none" }}
                disabled={uploading}
              />
            </label>
            {uploadMsg && (
              <span style={{
                fontSize: 11,
                color: uploadMsg.includes("uploaded") ? "#10b981" : "#6366F1"
              }}>
                {uploadMsg}
              </span>
            )}
          </div>

          <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>
            {user}
          </span>
          <a href="/"
            style={{ fontSize: 11, color: "rgba(255,255,255,.4)", textDecoration: "none" }}>
            View Site
          </a>
          <button style={S.btnDanger} onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div style={S.main}>
        <div style={S.tabs}>
          {["projects", "experience", "messages"].map(t => (
            <button key={t} style={S.tab(tab === t)} onClick={() => setTab(t)}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        {tab === "projects"   && <ProjectsTab />}
        {tab === "experience" && <ExperienceTab />}
        {tab === "messages"   && <MessagesTab />}
      </div>
    </div>
  );
}
// ── MAIN ADMIN APP ──
export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("admin_token"));

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setLoggedIn(false);
  };

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={logout} />;
}