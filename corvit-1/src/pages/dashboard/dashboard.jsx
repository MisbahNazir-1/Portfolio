import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fi";

import {
  FiLayout,
  FiBriefcase,
  FiCpu,
  FiMail,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiArrowUpRight,
  FiLock,
  FiUser,
  FiAward,
  FiZap,
  FiMenu,
  FiLayers,
  FiX,
} from "react-icons/fi";

import { FaMoon, FaSun } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";

import "./dashboard.css";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FiLayout,
  },
  {
    id: "about",
    label: "About Me",
    icon: FiUser,
  },
  {
    id: "experience",
    label: "Experience",
    icon: FiBriefcase,
  },
  {
    id: "tech",
    label: "Tech Stack",
    icon: FiCpu,
  },
  {
    id: "contact",
    label: "Contact",
    icon: FiMail,
  },
  {
    id: "auth-demo",
    label: "Auth Live Demo",
    icon: FiLock,
  },
];

const DynamicIcon = ({ name, size = 22 }) => {
  const Icon = Icons[name];

  if (!Icon) {
    return <Icons.FiGlobe size={size} />;
  }

  return <Icon size={size} />;
};

const AppCard = ({ title, tag, iconName, glowColor, imageUrl }) => (
  <div
    className="project-glass-card gateway-card"
    style={{ "--glow-color": glowColor }}
  >
    <div className="card-glow-effect"></div>
    <div className="card-image-preview">
      <img src={imageUrl || "https://placehold.co"} alt={title} />
    </div>
    <div className="card-content">
      <div
        className="card-icon-wrapper"
        style={{ backgroundColor: `${glowColor}15`, color: glowColor }}
      >
        <DynamicIcon name={iconName} size={24} />
      </div>
      <div className="card-text">
        <h3>{title}</h3>
        <span className="app-tag">{tag}</span>
      </div>
    </div>
  </div>
);

function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);

  const [activeTab, setActiveTab] = useState("dashboard");

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [resumeLink, setResumeLink] = useState("#");

  const [appsData, setAppsData] = useState([]);

  const [frontendDesigns, setFrontendDesigns] = useState([]);

  const [showcaseProjects, setShowcaseProjects] = useState([]);

  const [experienceData, setExperienceData] = useState([]);

  const [techStack, setTechStack] = useState([]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const BRAND = {
    name: "Misbah Developer",
    logo: "https://i.postimg.cc/Jzdx00Ny/logo.png",
  };

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);

      const [
        appsRes,
        experienceRes,
        projectsRes,
        skillsRes,
        resumeRes,
        designsRes,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/apps`),
        fetch(`${API_BASE_URL}/experience`),
        fetch(`${API_BASE_URL}/projects`),
        fetch(`${API_BASE_URL}/skills`),
        fetch(`${API_BASE_URL}/resume`),
        fetch(`${API_BASE_URL}/designs`),
      ]);

      const [apps, experience, projects, skills, resume, designs] =
        await Promise.all([
          appsRes.json(),
          experienceRes.json(),
          projectsRes.json(),
          skillsRes.json(),
          resumeRes.json(),
          designsRes.json(),
        ]);

      setAppsData(apps);
      setExperienceData(experience);
      setShowcaseProjects(projects);
      setTechStack(skills);
      setFrontendDesigns(designs);
      setResumeLink(resume.resumeUrl ?? "#");
    } catch (error) {
      console.error("Failed to synchronize portfolio resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const imageBaseURL = import.meta.env.VITE_PORTFOLIO_API_URL.replace(
    "/api",
    "",
  );

  const imgbasedURL = (
    import.meta.env.VITE_PORTFOLIO_API_URL || "http://localhost:5000/api"
  ).replace("/api", "");

  const API_BASE_URL = "https://portfolio-eight-indol-95.vercel.app/api";

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="auth-gate-placeholder">
        <h1>Crafting Digital Experience...</h1>
      </div>
    );
  }

  return (
    <div
      className={`dashboard-root-frame ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="mobile-header-bar">
        <div className="mobile-spacer" />

        <div className="mobile-brand-centered">
          <img src={BRAND.logo} alt={BRAND.name} className="about-avatar-img" />

          <span className="brand-text mobile-brand-name">{BRAND.name}</span>
        </div>

        <button
          type="button"
          aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
          className="mobile-menu-toggle"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <aside
        className={`sidebar-container ${isSidebarOpen ? "mobile-show" : ""}`}
      >
        <div className="sidebar-top-brand">
          <img src={BRAND.logo} alt={BRAND.name} className="brand-neon-logo" />

          <span className="brand-text">{BRAND.name}</span>
        </div>

        <nav className="sidebar-nav-links">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`nav-item ${activeTab === id ? "active" : ""}`}
              onClick={() => handleNavClick(id)}
            >
              <Icon className="nav-icon" />

              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-theme-footer">
          <button
            type="button"
            className="portfolio-theme-toggle-btn"
            onClick={handleThemeToggle}
          >
            {darkMode ? (
              <>
                <FaSun />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <FaMoon />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>
      <main className="main-viewport-content">
        {activeTab === "dashboard" && (
          <>
            <header className="hero-branding-section">
              <div className="hero-left-profile">
                <span className="greeting-pill">
                  Welcome to my Digital Space
                </span>

                <h1 className="hero-title">
                  Hello, I am{" "}
                  <span className="hero-name-highlight">Misbah Nazir</span>
                </h1>

                <p className="hero-subtitle hero-description">
                  "Full-Stack Developer transforming complex business ideas into
                  seamless, secure, and user-friendly web applications."
                </p>

                <div className="hero-social-dock">
                  <a
                    href="https://github.com/MisbahNazir-1"
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon-btn"
                  >
                    <FiGithub />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/misbah-nazir-developer"
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon-btn"
                  >
                    <FiLinkedin />
                  </a>

                  <a
                    onClick={() => {
                      setActiveTab("contact");
                    }}
                    className="neon-cta-btn"
                  >
                    <span>Let's Build Your App</span>
                    <LuArrowRight />
                  </a>
                </div>

                <div className="hero-metrics-container">
                  <div className="metric-item">
                    <span className="metric-number">1+</span>
                    <span className="metric-label">Years Experience</span>
                  </div>

                  <div className="metric-divider"></div>

                  <div className="metric-item">
                    <span className="metric-number">10+</span>
                    <span className="metric-label">Projects Delivered</span>
                  </div>

                  <div className="metric-divider"></div>

                  <div className="metric-item">
                    <span className="metric-number">100%</span>
                    <span className="metric-label">Agile Workflow</span>
                  </div>
                </div>
              </div>

              <div className="hero-right-avatar-box">
                <div className="cyber-avatar-ring">
                  <div className="avatar-core-display">
                    <div className="avatar-image-frame">
                      <img
                        src={`${imgbasedURL}/uploads/logo.jpeg`}
                        alt="Misbah Nazir"
                        className="about-avatar-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <section className="dashboard-section-wrapper">
              <h2 className="section-heading">Application Central Gateway</h2>
              <div className="project-grid gateway-grid">
                {appsData.map((app) => (
                  <div
                    key={app._id}
                    className="project-card-wrapper gateway-card-wrapper"
                  >
                    <AppCard
                      title={app.title}
                      tag={app.tag}
                      iconName={app.iconName}
                      glowColor={app.glowColor}
                      imageUrl={app.imageUrl}
                    />
                    <div className="project-card-actions gateway-actions">
                      <Link to={app.route} className="project-btn primary-btn">
                        Open Module <FiArrowUpRight className="button-icon" />
                      </Link>
                      <Link
                        to={app.repolink}
                        className="project-btn secondary-btn"
                      >
                        Repository
                        <FiGithub className="button-icon" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="split-showcase-layout">
              <section className="showcase-column-full">
                <h2 className="section-heading">Deployed Architectures</h2>
                <div className="project-grid deployed-projects-grid">
                  {showcaseProjects.map((proj) => (
                    <div
                      key={proj._id}
                      className="project-glass-card deployed-card"
                    >
                      {proj.imgURL && (
                        <img
                          src={proj.imgURL}
                          alt={proj.title}
                          className="project-card-thumbnail"
                        />
                      )}

                      <h4>{proj.title}</h4>
                      <div className="project-tags-row">
                        {proj.tags &&
                          proj.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="tech-badge">
                              {tag}
                            </span>
                          ))}
                      </div>
                      <div className="project-actions-row">
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="action-link live-btn"
                        >
                          <FiExternalLink /> Live Link
                        </a>
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="action-link repo-btn"
                        >
                          <FiGithub /> Repository
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {activeTab === "dashboard" && (
          <>
            <h2 className="section-heading">Client-side Architectures</h2>
            <div className="project-grid frontend-projects-grid">
              {frontendDesigns.map((design) => (
                <div
                  key={design._id}
                  className="project-glass-card frontend-card"
                >
                  <div className="card-top-content">
                    <div className="card-image-wrapper">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="card-thumbnail-img"
                      />
                      <div className="card-image-overlay">
                        <span className="card-category-badge">
                          {design.category || "Frontend"}
                        </span>
                      </div>
                    </div>

                    <div className="card-text-content">
                      <div className="card-header-row">
                        <div className="card-icon-indicator">
                          <FiLayers />
                        </div>
                        <div>
                          <h3 className="card-main-title">{design.title}</h3>
                          <p className="card-sub-description">
                            {design.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="project-card-actions">
                    <a
                      href={design.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn primary-btn"
                    >
                      Open Module <FiExternalLink />
                    </a>
                    <a
                      href={design.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn secondary-btn"
                    >
                      Repository <FiGithub />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "about" && (
          <section className="about-me-section">
            <div className="about-header-row">
              <div className="about-title-block">
                <span className="about-title-indicator"></span>
                <h2 className="about-main-heading">About Me</h2>
              </div>
              <div className="about-avatar-frame">
                <img
                  src={`${imgbasedURL}/uploads/logo.jpeg`}
                  alt="Misbah Nazir"
                  className="about-avatar-img"
                />
              </div>
            </div>

            <div className="about-content-grid">
              <div className="about-text-column">
                <p className="about-text-lead about-justify">
                  Hi, I am <span className="text-highlight">Misbah Nazir</span>,
                  a passionate Full-Stack MERN Developer based in Lahore,
                  Pakistan. I don’t just write code; I focus on understanding
                  your business goals and translating complex challenges into
                  seamless, high-performing digital solutions.
                </p>
                <p className="about-text-body about-justify">
                  What makes my approach unique is my diverse background.
                  Currently pursuing a Bachelor’s degree in International
                  Relations from LCWU, I have developed strong critical
                  thinking, global perspective, and cross-cultural communication
                  skills.
                </p>
                <p className="about-text-body about-justify">
                  Combined with my professional MERN Stack certifications and
                  industry internship experience at Decode Labs and Wolves Tech
                  Solution, I bring a unique blend of technical expertise and
                  strategic thinking to the table.
                </p>
              </div>

              <div className="about-cards-column">
                <div className="project-glass-card about-stat-card">
                  <div className="stat-card-header">
                    <FiAward className="stat-card-icon" />
                    <h4 className="stat-card-title">Education Blend</h4>
                  </div>
                  <p className="stat-card-desc">
                    BS International Relations (LCWU) + MERN Certified
                  </p>
                </div>

                <div className="about-stat-card">
                  <div className="stat-card-header">
                    <FiZap className="stat-card-icon" />
                    <h4 className="stat-card-title">Core Superpower</h4>
                  </div>
                  <p className="stat-card-desc">
                    Natural multitasker who thrives under high-pressure Agile
                    workflows
                  </p>
                </div>

                <div className="about-stat-card">
                  <div className="stat-card-header">
                    <FiBriefcase className="stat-card-icon" />
                    <h4 className="stat-card-title">Industry Ready</h4>
                  </div>
                  <p className="stat-card-desc">
                    Hands-on experience building scalable E-commerce & secure
                    systems
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="dashboard-section-wrapper">
          <h2 className="section-heading">Professional Experience History</h2>

          <div className="experience-timeline">
            {experienceData.map((exp) => (
              <article
                key={exp._id}
                className="project-glass-card experience-card"
              >
                <div className="experience-timeline-marker" />

                <div className="experience-card-content">
                  <div className="experience-card-header">
                    <div className="experience-title-group">
                      <h4 className="experience-role">
                        {exp.role}

                        <span className="exp-company-highlight">
                          {" "}
                          @ {exp.company}
                        </span>
                      </h4>
                    </div>

                    <span className="present-tag">Present</span>
                  </div>

                  <p className="experience-description">{exp.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {activeTab === "tech" && (
          <section className="dashboard-section-wrapper skill-matrix-viewport">
            <div className="section-header-cluster">
              <span className="context-pill-indicator">Capability Matrix</span>

              <h2 className="section-heading modern-heading-style">
                Skills & Technology Stack
              </h2>

              <p className="contact-section-subtitle premium-subtitle">
                A rigorous compilation of full-stack engineering tools, modular
                state frameworks, cloud databases, and core language ecosystems.
              </p>
            </div>

            <div className="project-glass-card tech-stack-container">
              <div className="tech-stack-grid matrix-interactive-grid">
                {techStack.map((skill) => (
                  <div key={skill._id || skill} className="tech-pill-wrapper">
                    <div className="tech-badge structural-matrix-pill interactive-tech-pill">
                      <div className="pill-backdrop-blur"></div>

                      <div className="pill-pulse-dot"></div>

                      <span className="skill-text-node">
                        {skill.name || skill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {activeTab === "contact" && (
          <section className="dashboard-section-wrapper communications-viewport">
            <div className="section-header-cluster">
              <span className="context-pill-indicator">Enterprise Hub</span>

              <h2 className="section-heading modern-heading-style">
                Get In Touch
              </h2>

              <p className="contact-section-subtitle premium-subtitle">
                Initiate a dynamic communication instance for enterprise
                architecture collaborations, technical inquiries, or production
                pipeline discussions.
              </p>
            </div>

            <div className="contact-grid">
              {/* Email */}
              <a
                href="mailto:misbahnazirdeveloper@gmail.com"
                className="project-glass-card contact-card"
              >
                <div className="contact-icon">
                  <FiMail size={24} />
                </div>

                <div className="contact-content">
                  <h4 className="contact-title">Secure Mail Gateway</h4>

                  <span className="contact-value">
                    misbahnazirdeveloper@gmail.com
                  </span>

                  <span className="contact-action">Send Email ↗</span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/MisbahNazir-1"
                target="_blank"
                rel="noreferrer"
                className="project-glass-card contact-card"
              >
                <div className="contact-icon">
                  <FiGithub size={24} />
                </div>

                <div className="contact-content">
                  <h4 className="contact-title">Version Control Node</h4>

                  <span className="contact-value">MisbahNazir-1</span>

                  <span className="contact-action">Review Repositories ↗</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/misbah-nazir-developer"
                target="_blank"
                rel="noreferrer"
                className="project-glass-card contact-card"
              >
                <div className="contact-icon">
                  <FiLinkedin size={24} />
                </div>

                <div className="contact-content">
                  <h4 className="contact-title">Corporate Identity Dock</h4>

                  <span className="contact-value">Misbah Nazir Developer</span>

                  <span className="contact-action">Connect Profile ↗</span>
                </div>
              </a>
            </div>
          </section>
        )}
        {activeTab === "auth-demo" && (
          <section className="dashboard-section-wrapper">
            <h2 className="section-heading">Authentication Security Modules</h2>

            <div className="project-grid auth-projects-grid">
              {/* Login */}
              <div className="project-card-wrapper auth-card-wrapper">
                <AppCard
                  title="Admin Security Authentication"
                  tag="User Login / JWT Session Gate"
                  iconName="FiLock"
                  glowColor="#00ffcc"
                  imageUrl="https://i.postimg.cc/63NxRRKv/login.png"
                />

                <div className="project-card-actions">
                  <Link to="/login" className="project-btn primary-btn">
                    Open Module
                    <FiArrowUpRight className="button-icon" />
                  </Link>

                  <a
                    href="https://github.com/MisbahNazir-1/Portfolio/tree/f190bf9c639b469e363e280493682bf9ccfd4930/corvit-1/src/pages/auth/entry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn secondary-btn"
                  >
                    Repository
                    <FiGithub className="button-icon" />
                  </a>
                </div>
              </div>

              {/* Register */}
              <div className="project-card-wrapper auth-card-wrapper">
                <AppCard
                  title="New User Registration"
                  tag="Admin Enrollment / Schema Setup"
                  iconName="FiUser"
                  glowColor="#00ffcc"
                  imageUrl="https://i.postimg.cc/rpjNC22q/register.png"
                />

                <div className="project-card-actions">
                  <Link to="/register" className="project-btn primary-btn">
                    Open Module
                    <FiArrowUpRight className="button-icon" />
                  </Link>

                  <a
                    href="https://github.com/MisbahNazir-1/Portfolio/tree/f190bf9c639b469e363e280493682bf9ccfd4930/corvit-1/src/pages/auth/registerpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn secondary-btn"
                  >
                    Repository
                    <FiGithub className="button-icon" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
