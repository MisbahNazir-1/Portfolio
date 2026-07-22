import React, { useState, useEffect } from "react";
import * as Icons from "react-icons/fi";
import { Link } from "react-router-dom";
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
  FiX,
  FiVideo,
  FiInstagram,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";
import "./dashboard.css";

const DynamicIcon = ({ name, size }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.FiGlobe size={size} />;
  return <IconComponent size={size} />;
};

const AppCard = ({ title, tag, iconName, glowColor, imageUrl, onClick }) => (
  <div
    className="gateway-card"
    style={{ "--glow-color": glowColor }}
    onClick={onClick}
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [frontendDesigns, setFrontendDesigns] = useState([]);
  const [appsData, setAppsData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [showcaseProjects, setShowcaseProjects] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [resumeLink, setResumeLink] = useState("#");
  const [loading, setLoading] = useState(true);

  const imgbasedURL = (
    import.meta.env.VITE_PORTFOLIO_API_URL || "http://localhost:5000/api"
  ).replace("/api", "");

  const API_BASE_URL = "https://portfolio-eight-indol-95.vercel.app/api";

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const [appsRes, expRes, projRes, skillRes, resumeRes, designsRes] =
          await Promise.all([
            fetch(`${API_BASE_URL}/apps`),
            fetch(`${API_BASE_URL}/experience`),
            fetch(`${API_BASE_URL}/projects`),
            fetch(`${API_BASE_URL}/skills`),
            fetch(`${API_BASE_URL}/resume`),
            fetch(`${API_BASE_URL}/designs`),
          ]);

        setAppsData(await appsRes.json());
        setExperienceData(await expRes.json());
        setShowcaseProjects(await projRes.json());
        setTechStack(await skillRes.json());
        setFrontendDesigns(await designsRes.json());

        const resumeData = await resumeRes.json();
        setResumeLink(resumeData.resumeUrl || "#");
      } catch (err) {
        console.error("Context lifecycle data synchronization exception:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="auth-gate-placeholder">
        <h1>Crafting Digital Experience ...</h1>
      </div>
    );
  }
  return (
    <div
      className={`dashboard-root-frame ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="mobile-header-bar">
        <div className="mobile-spacer" style={{ width: "24px" }}></div>
        <div className="mobile-brand-centered">
          <img
            src="https://postimg.cc"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
            alt="logo"
          />
          <span
            className="brand-text"
            style={{ fontSize: "16px", fontWeight: "700" }}
          >
            Misbah Developer
          </span>
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <aside
        className={`sidebar-container ${isSidebarOpen ? "mobile-show" : ""}`}
      >
        <div className="sidebar-top-brand">
          <img
            src="https://i.postimg.cc/Jzdx00Ny/logo.png"
            className="brand-neon-logo"
            alt="logo"
          />
          <span className="brand-text">Misbah Developer</span>
        </div>

        <nav className="sidebar-nav-links">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("dashboard");
              setIsSidebarOpen(false);
            }}
          >
            <FiLayout className="nav-icon" /> <span>Dashboard</span>
          </button>
          <button
            className={`nav-item ${activeTab === "about" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("about");
              setIsSidebarOpen(false);
            }}
          >
            <FiUser className="nav-icon" /> <span>About Me</span>
          </button>
          <button
            className={`nav-item ${activeTab === "experience" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("experience");
              setIsSidebarOpen(false);
            }}
          >
            <FiBriefcase className="nav-icon" /> <span>Experience</span>
          </button>
          <button
            className={`nav-item ${activeTab === "tech" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("tech");
              setIsSidebarOpen(false);
            }}
          >
            <FiCpu className="nav-icon" /> <span>Tech Stack</span>
          </button>
          <button
            className={`nav-item ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("contact");
              setIsSidebarOpen(false);
            }}
          >
            <FiMail className="nav-icon" /> <span>Contact</span>
          </button>
          <button
            className={`nav-item ${activeTab === "auth-demo" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("auth-demo");
              setIsSidebarOpen(false);
            }}
          >
            <FiLock className="nav-icon" /> <span>Auth Live Demo</span>
          </button>
          <a
            href={resumeLink}
            download
            className="nav-item download-resume-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiDownload /> <span>Download Executive CV</span>
          </a>
        </nav>

        <div className="sidebar-theme-footer">
          <button
            className="portfolio-theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <>
                <FaSun style={{ marginRight: "8px" }} /> Light Mode
              </>
            ) : (
              <>
                <FaMoon style={{ marginRight: "8px" }} /> Dark Mode
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
                  Hello, I am <span>Misbah Nazir </span>
                </h1>
                <p className="hero-subtitle">
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
                    onClick={() => setActiveTab("contact")}
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
                    <img
                      src={`${imgbasedURL}/uploads/logo.jpeg`}
                      alt="Profile Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 12%",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </header>

            <section className="dashboard-section-wrapper">
              <h2 className="section-heading">Application Central Gateway</h2>
              <div className="apps-gateway-grid">
                {appsData.map((app) => (
                  <div key={app._id} className="projects-display-stack">
                    <AppCard
                      title={app.title}
                      tag={app.tag}
                      iconName={app.iconName}
                      glowColor={app.glowColor}
                      imageUrl={app.imageUrl}
                    />
                    <div className="gateway-action-row">
                      <Link to={app.route} className="gateway-live-btn">
                        Open Module <FiArrowUpRight className="button-icon" />
                      </Link>
                      <Link to={app.repolink} className="gateway-repo-btn">
                        Repository <FiGithub className="button-icon" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="dashboard-section-wrapper">
              <h2 className="section-heading">Deployed Architectures</h2>
              <div className="apps-gateway-grid">
                {showcaseProjects.map((proj) => (
                  <div key={proj._id} className="projects-display-stack">
                    <div className="card-image-preview">
                      {proj.imgURL && (
                        <img src={proj.imgURL} alt={proj.title} />
                      )}
                    </div>
                    <div className="card-content-static">
                      <h3>{proj.title}</h3>
                      <div className="project-tags-row">
                        {proj.tags &&
                          proj.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="tech-badge">
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="gateway-action-row">
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="gateway-live-btn"
                      >
                        Live Link <FiExternalLink className="button-icon" />
                      </a>
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="gateway-repo-btn"
                      >
                        Repository <FiGithub className="button-icon" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-section-wrapper">
              <h2 className="section-heading">Client-side Architectures</h2>
              <div className="apps-gateway-grid">
                {frontendDesigns.map((design) => (
                  <div key={design._id} className="projects-display-stack">
                    <div className="card-image-preview">
                      <img src={design.image} alt={design.title} />
                    </div>
                    <div className="card-content-static">
                      <h3>{design.title}</h3>
                      <p className="app-description-text">
                        {design.description}
                      </p>
                      <span className="card-category-badge">
                        {design.category || "Frontend"}
                      </span>
                    </div>
                    <div className="gateway-action-row">
                      <a
                        href={design.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="gateway-live-btn"
                      >
                        Open Module <FiExternalLink className="button-icon" />
                      </a>
                      <a
                        href={design.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="gateway-repo-btn"
                      >
                        Repository <FiGithub className="button-icon" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Extended Architectural Project Documentation System */}
            <section
              className="dashboard-section-wrapper"
              style={{ marginTop: "32px" }}
            >
              <span className="greeting-pill">ENGINEERING LOGS</span>
              <h2 className="section-heading">Project Documentations</h2>
              <p className="section-subheading-text">
                Deep technical breakdowns, schema layouts, system architecture
                documentations, and production setup guides extracted from
                project README matrices.
              </p>

              <div className="blogs-gateway-grid">
                <div className="blog-production-card">
                  <div>
                    <span className="blog-meta-timeline">
                      Enterprise MERN System
                    </span>
                    <h3 className="blog-title-text">
                      Student Management & Session Validation System
                    </h3>
                    <p className="blog-snippet-paragraph">
                      An analytical breakdown of modular database relations, JWT
                      state payload encryptions, schema structures, and
                      role-based validation route flows engineered for academic
                      networks.
                    </p>
                  </div>
                  <a
                    href="https://github.com/MisbahNazir-1/Student-Management-System//blob/main/README.md"
                    target="_blank"
                    rel="noreferrer"
                    className="blog-action-anchor-trigger"
                  >
                    Read System Documentation <FiExternalLink />
                  </a>
                </div>

                <div className="blog-production-card">
                  <div>
                    <span className="blog-meta-timeline">
                      Geolocation Portal
                    </span>
                    <h3 className="blog-title-text">
                      Locately — Map Coordinate Logic & Fluid UI Refactoring
                    </h3>
                    <p className="blog-snippet-paragraph">
                      Investigating geographical API rendering performance
                      rules, asynchronous device state mapping nodes, caching
                      techniques, and clean layout optimization benchmarks.
                    </p>
                  </div>
                  <a
                    href="https://github.com/MisbahNazir-1/Locately//blob/main/README.md"
                    target="_blank"
                    rel="noreferrer"
                    className="blog-action-anchor-trigger"
                  >
                    Read System Documentation <FiExternalLink />
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
        {activeTab === "about" && (
          <section className="about-me-section">
            <div className="about-header-row">
              <div className="about-title-block">
                <span className="about-title-indicator"></span>
                <h2 className="about-main-heading">About Me</h2>
              </div>
              <div className="hero-right-avatar-box profile-image-sync">
                <div className="cyber-avatar-ring">
                  <div className="avatar-core-display">
                    <img
                      src={`${imgbasedURL}/uploads/logo.jpeg`}
                      alt="Misbah Nazir Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 12%",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="about-content-grid">
              <div className="about-text-column">
                <p className="about-text-lead">
                  Hi, I am <span className="text-highlight">Misbah Nazir</span>,
                  a passionate Full-Stack MERN Developer based in Lahore,
                  Pakistan. I don’t just write code; I focus on understanding
                  your business goals and translating complex challenges into
                  seamless, high-performing digital solutions.
                </p>
                <p className="about-text-body">
                  What makes my approach unique is my diverse background.
                  Currently pursuing a Bachelor’s degree in International
                  Relations from LCWU, I have developed strong critical
                  thinking, global perspective, and cross-cultural communication
                  skills.
                </p>
                <p className="about-text-body">
                  Combined with my professional MERN Stack certifications and
                  industry internship experience at Decode Labs and Wolves Tech
                  Solution, I bring a unique blend of technical expertise and
                  strategic thinking to the table.
                </p>
              </div>

              <div className="about-cards-column">
                <div className="about-stat-card">
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
        {activeTab === "experience" && (
          <section className="dashboard-section-wrapper">
            <h2 className="section-heading">Professional Experience History</h2>
            <div className="experience-timeline-container">
              {experienceData.map((exp) => (
                <div key={exp._id} className="experience-timeline-card">
                  <div className="experience-icon-marker">
                    <FiBriefcase />
                  </div>
                  <div className="experience-card-content">
                    <h3 className="experience-title">
                      {exp.role}{" "}
                      <span className="exp-company-highlight">
                        @ {exp.company}
                      </span>
                    </h3>
                    <span className="experience-duration">{exp.duration}</span>
                    <p className="experience-desc">
                      {exp.description || exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "tech" && (
          <section className="dashboard-section-wrapper">
            <span className="greeting-pill">Capability Matrix</span>
            <h2 className="section-heading">Skills & Technology Stack</h2>
            <p className="section-subheading-text">
              A rigorous compilation of full-stack engineering tools, modular
              state frameworks, cloud databases, and core language ecosystems.
            </p>
            <div className="tech-stack-badges-grid">
              {techStack.map((skill) => (
                <div key={skill._id || skill} className="tech-stack-badge-item">
                  <span
                    className="tech-dot-indicator"
                    style={{ backgroundColor: skill.color || "#00ffcc" }}
                  ></span>
                  <span className="tech-badge-name">
                    {skill.name || skill.title || skill}
                  </span>
                </div>
              ))}
            </div>
            {/* Live Synchronized GitHub Matrix Node Element */}
            <div className="github-contribution-wrapper">
              <span className="greeting-pill">ACTIVITY STREAM</span>
              <h2 className="section-heading" style={{ marginTop: "10px" }}>
                Open-Source Contributions
              </h2>
              <p className="section-subheading-text">
                Real-time synchronized visualization track of version control
                production, code iterations, and platform lifecycle events.
              </p>

              <div className="github-graph-display">
                {/* Dynamically pulls the precise grid block metrics directly from GitHub server without tokens */}
                <img
                  src="https://rshah.org"
                  alt="Misbah Nazir's GitHub Contributions Calendar Graph Chart"
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section className="dashboard-section-wrapper">
            <span className="greeting-pill">Enterprise Hub</span>
            <h2 className="section-heading">Get In Touch</h2>
            <p className="section-subheading-text">
              Initiate a dynamic communication instance for enterprise
              architecture collaborations, technical inquiries, or production
              pipeline discussions.
            </p>
            <div className="contact-methods-grid">
              {/* --- Core Professional Communications Channels --- */}
              <a
                href="mailto:misbahnazirdeveloper@gmail.com"
                className="contact-action-card-link"
              >
                <div className="contact-icon-wrapper-block">
                  <FiMail />
                </div>
                <div className="contact-card-text-details">
                  <span className="contact-meta-label">
                    Secure Mail Gateway
                  </span>
                  <h4 className="contact-main-value">
                    misbahnazirdeveloper@gmail.com
                  </h4>
                  <span className="contact-action-hint">
                    Click to Compose Email <FiExternalLink />
                  </span>
                </div>
              </a>

              <a
                href="https://github.com/MisbahNazir-1"
                target="_blank"
                rel="noreferrer"
                className="contact-action-card-link"
              >
                <div className="contact-icon-wrapper-block">
                  <FiGithub />
                </div>
                <div className="contact-card-text-details">
                  <span className="contact-meta-label">
                    Version Control Node
                  </span>
                  <h4 className="contact-main-value">Misbah Nazir-1</h4>
                  <span className="contact-action-hint">
                    Review Repositories <FiExternalLink />
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/misbah-nazir-developer"
                target="_blank"
                rel="noreferrer"
                className="contact-action-card-link"
              >
                <div className="contact-icon-wrapper-block">
                  <FiLinkedin />
                </div>
                <div className="contact-card-text-details">
                  <span className="contact-meta-label">
                    Corporate Identity Dock
                  </span>
                  <h4 className="contact-main-value">Misbah Nazir Developer</h4>
                  <span className="contact-action-hint">
                    Connect Profile <FiExternalLink />
                  </span>
                </div>
              </a>

              <a
                href="https://x.com/misbahhnazir"
                target="_blank"
                rel="noreferrer"
                className="contact-action-card-link"
              >
                <div className="contact-icon-wrapper-block">
                  <Icons.FiTwitter />
                </div>
                <div className="contact-card-text-details">
                  <span className="contact-meta-label">
                    Tech Network Stream
                  </span>
                  <h4 className="contact-main-value">@MisbahNazir</h4>
                  <span className="contact-action-hint">
                    Follow Updates <FiExternalLink />
                  </span>
                </div>
              </a>

              {/* --- Secondary Cross-Platform Connections Footprints --- */}
              <a
                href="https://www.facebook.com/share/18tMxRUZyK/"
                target="_blank"
                rel="noreferrer"
                className="contact-action-card-link"
              >
                <div className="contact-icon-wrapper-block">
                  <Icons.FiFacebook />
                </div>
                <div className="contact-card-text-details">
                  <span className="contact-meta-label">
                    Social Connection Node
                  </span>
                  <h4 className="contact-main-value">Misbah Nazir</h4>
                  <span className="contact-action-hint">
                    View Profile <FiExternalLink />
                  </span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/misbahnazir2474?igsh=MW5zeGw0Znh6dWZ3cA=="
                target="_blank"
                rel="noreferrer"
                className="contact-action-card-link"
              >
                <div className="contact-icon-wrapper-block">
                  <Icons.FiInstagram />
                </div>
                <div className="contact-card-text-details">
                  <span className="contact-meta-label">
                    Creative Lifestyle Log
                  </span>
                  <h4 className="contact-main-value">@misbah_developer</h4>
                  <span className="contact-action-hint">
                    Follow Feed <FiExternalLink />
                  </span>
                </div>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="contact-action-card-link"
              >
                <div className="contact-icon-wrapper-block">
                  <Icons.FiVideo />
                </div>
                <div className="contact-card-text-details">
                  <span className="contact-meta-label">
                    Short Content Ecosystem
                  </span>
                  <h4 className="contact-main-value">@misbah.dev</h4>
                  <span className="contact-action-hint">
                    Watch Content <FiExternalLink />
                  </span>
                </div>
              </a>
            </div>
          </section>
        )}

        {activeTab === "auth-demo" && (
          <section className="dashboard-section-wrapper">
            <h2 className="section-heading">Authentication Security Modules</h2>
            <div className="apps-gateway-grid">
              <div className="projects-display-stack">
                <AppCard
                  title="Admin Security Authentication"
                  tag="User Login / JWT Session Gate"
                  iconName="FiLock"
                  glowColor="#00ffcc"
                  imageUrl="https://i.postimg.cc/hvq8vgqy/login.png"
                />
                <div className="gateway-action-row">
                  <Link to="/login" className="gateway-live-btn">
                    Open Module <FiArrowUpRight className="button-icon" />
                  </Link>
                  <a
                    href="https://github.com/MisbahNazir-1/Portfolio/tree/8ede7ecf57ab1d48b6e1b9b8e22a4aadfb5ee0d1/corvit-1/src/pages/auth/entry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gateway-repo-btn"
                  >
                    Repository <FiGithub className="button-icon" />
                  </a>
                </div>
              </div>

              <div className="projects-display-stack">
                <AppCard
                  title="New User Registration"
                  tag="Admin Enrollment / Schema Setup"
                  iconName="FiUser"
                  glowColor="#00ffcc"
                  imageUrl="https://i.postimg.cc/sDxxWqDN/register.png"
                />
                <div className="gateway-action-row">
                  <Link to="/register" className="gateway-live-btn">
                    Open Module <FiArrowUpRight className="button-icon" />
                  </Link>
                  <a
                    href="https://github.com/MisbahNazir-1/Portfolio/tree/8ede7ecf57ab1d48b6e1b9b8e22a4aadfb5ee0d1/corvit-1/src/pages/auth/registerpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gateway-repo-btn"
                  >
                    Repository <FiGithub className="button-icon" />
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
