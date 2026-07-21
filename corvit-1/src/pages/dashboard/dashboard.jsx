import React, { useState, useEffect } from "react";
import * as Icons from "react-icons/fi";
import {
  FiLayout,
  FiBriefcase,
  FiCpu,
  FiMail,
  FiLogOut,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiArrowUpRight,
  FiLock,
  FiUser,
  FiHash,
  FiPhone,
  FiMapPin,
  FiAward,
  FiZap,
  FiMenu,
  FiLayers,
  FiX,
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
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate;
  const [frontendDesigns, setFrontendDesigns] = useState([]);

  const [appsData, setAppsData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [showcaseProjects, setShowcaseProjects] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [resumeLink, setResumeLink] = useState("#");
  const [loading, setLoading] = useState(true);
  const [internProjects, setInternProjects] = useState([]);
  const [showInternProjects, setShowInternProjects] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
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
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const [appsRes, expRes, projRes, skillRes, resumeRes] =
          await Promise.all([
            fetch(`${API_BASE_URL}/apps`),
            fetch(`${API_BASE_URL}/experience`),
            fetch(`${API_BASE_URL}/projects`),
            fetch(`${API_BASE_URL}/skills`),
            fetch(`${API_BASE_URL}/resume`),
          ]);

        setAppsData(await appsRes.json());
        setExperienceData(await expRes.json());
        setShowcaseProjects(await projRes.json());
        setTechStack(await skillRes.json());

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

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/designs`)
      .then((res) => setFrontendDesigns(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/intern-projects")
      .then((res) => res.json())
      .then((data) => {
        setInternProjects(data);
      })
      .catch((err) => console.error("Error fetching projects:", err));
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
        <div style={{ width: "24px" }} className="mobile-spacer"></div>

        <div className="mobile-brand-centered">
          <img
            src="https://i.postimg.cc/Jzdx00Ny/logo.png"
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
          style={{
            background: "transparent",
            border: "none",
            color: "#00ffcc",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
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
        </nav>
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
                    onClick={() => {
                      setActiveTab("contact");
                    }}
                    className="neon-cta-btn"
                  >
                    <span>Let's Build Your App</span>
                    <LuArrowRight />
                  </a>
                </div>

                <div class="hero-metrics-container">
                  <div class="metric-item">
                    <span class="metric-number">1+</span>
                    <span class="metric-label">Years Experience</span>
                  </div>

                  <div class="metric-divider"></div>

                  <div class="metric-item">
                    <span class="metric-number">10+</span>
                    <span class="metric-label">Projects Delivered</span>
                  </div>

                  <div class="metric-divider"></div>

                  <div class="metric-item">
                    <span class="metric-number">100%</span>
                    <span class="metric-label">Agile Workflow</span>
                  </div>
                </div>
              </div>
              <div className="hero-right-avatar-box">
                <div className="cyber-avatar-ring">
                  <div className="avatar-core-display">
                    <img
                      src={`${imgbasedURL}/uploads/logo.jpeg`}
                      alt=""
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
                  <div key={app._id} className="gateway-card-container">
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
                <div className="projects-display-stack">
                  {showcaseProjects.map((proj) => (
                    <div key={proj._id} className="project-glass-card">
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
            <div className="portfolio-grid-container">
              {frontendDesigns.map((design) => (
                <div key={design._id} className="portfolio-card">
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

                  <div className="card-action-buttons">
                    <a
                      href={design.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-open-module"
                    >
                      Open Module <FiExternalLink />
                    </a>
                    <a
                      href={design.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-repository"
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
              <img
                src={`${imgbasedURL}/uploads/logo.jpeg`}
                alt="Misbah Nazir"
                className="about-avatar-img"
              />
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
            <div className="experience-timeline-stack">
              {experienceData.map((exp) => (
                <div key={exp._id} className="experience-glass-card">
                  <div
                    className="exp-card-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>
                      {exp.role}{" "}
                      <span className="exp-company-highlight">
                        @ {exp.company}
                      </span>
                    </h4>

                    {/* DecodeLabs ke liye Side-by-Side button */}
                    {exp.company === "DecodeLabs" && (
                      <button
                        className="view-intern-projects-btn"
                        onClick={() =>
                          setShowInternProjects(!showInternProjects)
                        }
                        style={{
                          padding: "5px 15px",
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                      >
                        {showInternProjects ? "Hide Projects" : "View Projects"}
                      </button>
                    )}
                  </div>

                  <span className="duration-tag">{exp.duration}</span>
                  <p className="exp-desc">{exp.desc}</p>

                  {/* Internship Projects Grid */}
                  {exp.company === "DecodeLabs" && showInternProjects && (
                    <div
                      className="apps-gateway-grid"
                      style={{
                        marginTop: "20px",
                        borderTop: "1px solid #333",
                        paddingTop: "20px",
                      }}
                    >
                      {internProjects.map((project) => (
                        <div
                          key={project._id}
                          className="gateway-card-container"
                        >
                          <AppCard
                            title={project.title}
                            tag="Internship Project"
                            iconName="FiBriefcase"
                            glowColor="#ffcc00"
                            imageUrl={project.imageLink}
                          />
                          <div className="gateway-action-row">
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gateway-repo-btn"
                            >
                              Repository <FiGithub className="button-icon" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

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

            <div className="tech-stack-badges-grid matrix-interactive-grid">
              {techStack.map((skill) => (
                <div
                  key={skill._id || skill}
                  className="tech-badge tech-badge-large structural-matrix-pill"
                >
                  <div className="pill-backdrop-blur"></div>
                  <div className="pill-pulse-dot"></div>
                  <span className="skill-text-node">{skill.name || skill}</span>
                </div>
              ))}
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

            <div className="contact-info-grid interactive-cluster-grid">
              <a
                href="#copy-email"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(
                    "misbahnazirdeveloper@gmail.com",
                  );
                  alert("Email copied to clipboard! 📋");
                }}
                className="contact-anchor-card framework-elevation-link"
              >
                <div className="contact-card-frame email-card-glow enterprise-card-spec">
                  <div className="card-dynamic-backdrop"></div>
                  <div className="contact-icon-wrapper email-icon-bg structural-icon-node">
                    <FiMail size={24} className="vector-pulse-node" />
                  </div>
                  <div className="contact-card-text communication-meta-block">
                    <h4 className="meta-label-tag">Secure Mail Gateway</h4>
                    <span className="contact-link-value email-text-color interface-string-highlight">
                      misbahnazirdeveloper@gmail.com
                    </span>
                    <span className="action-trigger-hint">
                      Click to Copy Email ↗
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/MisbahNazir-1"
                target="_blank"
                rel="noreferrer"
                className="contact-anchor-card framework-elevation-link"
              >
                <div className="contact-card-frame github-card-glow enterprise-card-spec">
                  <div className="card-dynamic-backdrop"></div>
                  <div className="contact-icon-wrapper github-icon-bg structural-icon-node">
                    <FiGithub size={24} className="vector-pulse-node" />
                  </div>
                  <div className="contact-card-text communication-meta-block">
                    <h4 className="meta-label-tag">Version Control Node</h4>
                    <span className="contact-link-value github-text-color interface-string-highlight">
                      Misbah Nazir-1
                    </span>
                    <span className="action-trigger-hint">
                      Review Repositories ↗
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/misbah-nazir-developer"
                target="_blank"
                rel="noreferrer"
                className="contact-anchor-card framework-elevation-link"
              >
                <div className="contact-card-frame linkedin-card-glow enterprise-card-spec">
                  <div className="card-dynamic-backdrop"></div>
                  <div className="contact-icon-wrapper linkedin-icon-bg structural-icon-node">
                    <FiLinkedin size={24} className="vector-pulse-node" />
                  </div>
                  <div className="contact-card-text communication-meta-block">
                    <h4 className="meta-label-tag">Corporate Identity Dock</h4>
                    <span className="contact-link-value linkedin-text-color interface-string-highlight">
                      Misbah Nazir Developer
                    </span>
                    <span className="action-trigger-hint">
                      Connect Profile ↗
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </section>
        )}
        {activeTab === "auth-demo" && (
          <section className="dashboard-section-wrapper">
            <h2 className="section-heading">Authentication Security Modules</h2>
            <div className="apps-gateway-grid">
              <div className="gateway-card-container">
                <AppCard
                  title="Admin Security Authentication"
                  tag="User Login / JWT Session Gate"
                  iconName="FiLock"
                  glowColor="#00ffcc"
                  imageUrl="https://i.postimg.cc/63NxRRKv/login.png"
                />
                <div className="gateway-action-row">
                  <Link to="/login" className="gateway-live-btn">
                    Open Module <FiArrowUpRight className="button-icon" />
                  </Link>
                  <a
                    href="https://github.com/MisbahNazir-1/Portfolio/tree/f190bf9c639b469e363e280493682bf9ccfd4930/corvit-1/src/pages/auth/entry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gateway-repo-btn"
                  >
                    Repository <FiGithub className="button-icon" />
                  </a>
                </div>
              </div>

              <div className="gateway-card-container">
                <AppCard
                  title="New User Registration"
                  tag="Admin Enrollment / Schema Setup"
                  iconName="FiUser"
                  glowColor="#00ffcc"
                  imageUrl="https://i.postimg.cc/rpjNC22q/register.png"
                />
                <div className="gateway-action-row">
                  <Link to="/register" className="gateway-live-btn">
                    Open Module <FiArrowUpRight className="button-icon" />
                  </Link>
                  <a
                    href="https://github.com/MisbahNazir-1/Portfolio/tree/f190bf9c639b469e363e280493682bf9ccfd4930/corvit-1/src/pages/auth/registerpage"
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
