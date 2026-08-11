import React, { useState, useEffect } from "react";
import "./portfolio-cms_App.css";

const INITIAL_PROFILE = {
  name: "Alex Rivera",
  title: "Senior Full Stack Architect & Designer",
  bio: "Passionate developer building high-performance web experiences, cloud systems, and elegant UI interfaces. Over 7 years of software engineering experience.",
  email: "alex.rivera@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
};

const INITIAL_PROJECTS = [
  {
    id: "1",
    title: "SaaS Analytics Dashboard",
    description: "Real-time metrics platform processing millions of events with WebSockets and React visualizations.",
    link: "https://example.com/project1",
    githubUrl: "https://github.com/example/analytics",
    tags: ["React", "TypeScript", "Node.js", "Tailwind"]
  },
  {
    id: "2",
    title: "AI Code Review Assistant",
    description: "Automated pull request analysis tool integrating LLMs for security and performance audits.",
    link: "https://example.com/project2",
    githubUrl: "https://github.com/example/ai-reviewer",
    tags: ["Python", "FastAPI", "React", "OpenAI API"]
  },
  {
    id: "3",
    title: "Cloud Infrastructure Visualizer",
    description: "Interactive canvas tool for designing AWS cloud architectures with automatic Terraform export.",
    link: "https://example.com/project3",
    githubUrl: "https://github.com/example/cloud-vis",
    tags: ["React", "HTML5 Canvas", "AWS", "Go"]
  }
];

export default function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("portfolio_cms_profile");
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("portfolio_cms_projects");
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    link: "",
    githubUrl: "",
    tags: ""
  });

  useEffect(() => {
    localStorage.setItem("portfolio_cms_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("portfolio_cms_projects", JSON.stringify(projects));
  }, [projects]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenProjectForm = (project = null) => {
    if (project) {
      setEditingProject(project.id);
      setProjectForm({
        title: project.title,
        description: project.description,
        link: project.link,
        githubUrl: project.githubUrl || "",
        tags: project.tags ? project.tags.join(", ") : ""
      });
    } else {
      setEditingProject("new");
      setProjectForm({
        title: "",
        description: "",
        link: "",
        githubUrl: "",
        tags: ""
      });
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) return;

    const tagArray = projectForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingProject === "new") {
      const newProj = {
        id: Date.now().toString(),
        title: projectForm.title.trim(),
        description: projectForm.description.trim(),
        link: projectForm.link.trim(),
        githubUrl: projectForm.githubUrl.trim(),
        tags: tagArray
      };
      setProjects([newProj, ...projects]);
    } else {
      setProjects(
        projects.map((p) =>
          p.id === editingProject
            ? {
                ...p,
                title: projectForm.title.trim(),
                description: projectForm.description.trim(),
                link: projectForm.link.trim(),
                githubUrl: projectForm.githubUrl.trim(),
                tags: tagArray
              }
            : p
        )
      );
    }

    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="portfolio-app">
      {/* Top Admin Control Bar */}
      <div className="admin-bar">
        <div className="admin-mode-status">
          <span className={`status-badge ${isEditMode ? "edit" : "view"}`}>
            {isEditMode ? "✏️ Admin Edit Mode" : "👁️ Public Preview Mode"}
          </span>
        </div>
        <button
          className="toggle-mode-btn"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? "Switch to Live Preview" : "Edit Portfolio (CMS)"}
        </button>
      </div>

      <div className="container">
        {/* EDIT MODE ADMIN PANEL */}
        {isEditMode ? (
          <div className="admin-panel">
            <h2 className="panel-title">Portfolio CMS Admin Panel</h2>

            {/* Profile Form */}
            <section className="admin-section">
              <h3>1. Hero Profile & Bio</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Professional Title</label>
                  <input
                    type="text"
                    name="title"
                    value={profile.title}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Bio Summary</label>
                  <textarea
                    rows="3"
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Avatar / Photo Image URL</label>
                  <input
                    type="text"
                    name="avatarUrl"
                    value={profile.avatarUrl}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>GitHub Profile URL</label>
                  <input
                    type="text"
                    name="github"
                    value={profile.github}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn Profile URL</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
            </section>

            {/* Manage Projects Section */}
            <section className="admin-section">
              <div className="section-header-row">
                <h3>2. Projects Portfolio ({projects.length})</h3>
                <button
                  className="add-proj-btn"
                  onClick={() => handleOpenProjectForm()}
                >
                  + Add New Project
                </button>
              </div>

              {/* Add/Edit Project Inline Form */}
              {editingProject && (
                <form onSubmit={handleSaveProject} className="project-editor-card">
                  <h4>
                    {editingProject === "new" ? "New Project" : "Edit Project"}
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Demo URL / Website Link</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={projectForm.link}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, link: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Description *</label>
                      <textarea
                        rows="2"
                        required
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            description: e.target.value
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>GitHub Repo URL</label>
                      <input
                        type="text"
                        placeholder="https://github.com/..."
                        value={projectForm.githubUrl}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            githubUrl: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Tech Stack (Comma Separated)</label>
                      <input
                        type="text"
                        placeholder="React, Node.js, GraphQL"
                        value={projectForm.tags}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, tags: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="editor-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setEditingProject(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      Save Project
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List */}
              <div className="admin-project-list">
                {projects.map((proj) => (
                  <div key={proj.id} className="admin-project-row">
                    <div>
                      <strong>{proj.title}</strong>
                      <p className="proj-snippet">{proj.description}</p>
                    </div>
                    <div className="row-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleOpenProjectForm(proj)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteProject(proj.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* PUBLIC PORTFOLIO VIEW */
          <div className="public-portfolio">
            {/* Hero Section */}
            <header className="portfolio-hero">
              <div className="hero-content">
                {profile.avatarUrl && (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="avatar-img"
                  />
                )}
                <h1 className="hero-name">{profile.name}</h1>
                <p className="hero-title">{profile.title}</p>
                <p className="hero-bio">{profile.bio}</p>
                <div className="social-links">
                  {profile.email && (
                    <a href={`mailto:${profile.email}`} className="social-pill">
                      ✉️ {profile.email}
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill"
                    >
                      🐙 GitHub
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill"
                    >
                      💼 LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </header>

            {/* Featured Projects Grid */}
            <section className="projects-section">
              <h2 className="section-title">Featured Projects</h2>
              {projects.length === 0 ? (
                <p className="empty-msg">No projects added yet.</p>
              ) : (
                <div className="projects-grid">
                  {projects.map((proj) => (
                    <div key={proj.id} className="portfolio-card">
                      <h3 className="card-title">{proj.title}</h3>
                      <p className="card-desc">{proj.description}</p>

                      {proj.tags && proj.tags.length > 0 && (
                        <div className="tag-list">
                          {proj.tags.map((tag) => (
                            <span key={tag} className="tech-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="card-links">
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="link-btn primary"
                          >
                            Live Demo ↗
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="link-btn secondary"
                          >
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
