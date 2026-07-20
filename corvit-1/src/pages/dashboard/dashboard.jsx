import React, { useState, useEffect } from 'react';
import * as Icons from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FiLayout, FiBriefcase, FiCpu, FiMail, FiDownload, 
  FiGithub, FiLinkedin, FiExternalLink, FiArrowUpRight, FiLock,
  FiUser, FiAward, FiZap, FiMenu, FiLayers, FiX
} from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
import { LuArrowRight } from "react-icons/lu";
import './dashboard.css';

const DynamicIcon = ({ name, size }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.FiGlobe size={size} />;
  return <IconComponent size={size} />;
};

const AppCard = ({ title, tag, iconName, glowColor, imageUrl, onClick }) => (
  <div className="gateway-card" style={{ '--glow-color': glowColor }} onClick={onClick}>
    <div className="card-glow-effect"></div>
    <div className="card-image-preview">
      <img src={imageUrl || "https://placehold.co"} alt={title} />
    </div>
    <div className="card-content">
      <div className="card-icon-wrapper" style={{ backgroundColor: `${glowColor}15`, color: glowColor }}>
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [frontendDesigns, setFrontendDesigns] = useState([]);
  const [appsData, setAppsData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [showcaseProjects, setShowcaseProjects] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [resumeLink, setResumeLink] = useState('#');
  const [loading, setLoading] = useState(true);
  const [internProjects, setInternProjects] = useState([]); 
  const [showInternProjects, setShowInternProjects] = useState(false);

  const API_BASE_URL = 'https://portfolio-eight-indol-95.vercel.app/api';
  const imgbasedURL = (import.meta.env.VITE_PORTFOLIO_API_URL || 'http://localhost:5000/api').replace('/api', '');

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const [appsRes, expRes, projRes, skillRes, resumeRes] = await Promise.all([
          fetch(`${API_BASE_URL}/apps`),
          fetch(`${API_BASE_URL}/experience`),
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/skills`),
          fetch(`${API_BASE_URL}/resume`)
        ]);
        setAppsData(await appsRes.json());
        setExperienceData(await expRes.json());
        setShowcaseProjects(await projRes.json());
        setTechStack(await skillRes.json());
        const resumeData = await resumeRes.json();
        setResumeLink(resumeData.resumeUrl || '#');
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchPortfolioData();
    axios.get(`${API_BASE_URL}/designs`).then(res => setFrontendDesigns(res.data));
    fetch('http://localhost:5000/api/intern-projects').then(res => res.json()).then(data => setInternProjects(data));
  }, []);

  if (loading) return <div className="auth-gate-placeholder"><h1>Crafting Digital Experience ...</h1></div>;

  return (
    <div className={`dashboard-root-frame ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="mobile-header-bar">
        <div className="mobile-brand-centered">
          <img src="https://i.postimg.cc/Jzdx00Ny/logo.png" alt="logo" />
          <span>Misbah Developer</span>
        </div>
        <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <aside className={`sidebar-container ${isSidebarOpen ? 'mobile-show' : ''}`}>
        <div className="sidebar-top-brand">
          <img src="https://i.postimg.cc/Jzdx00Ny/logo.png" alt="logo" />
          <span>Misbah Developer</span>
        </div>
        <nav className="sidebar-nav-links">
          {['dashboard', 'about', 'experience', 'tech', 'contact', 'auth-demo'].map(tab => (
            <button key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}>
              {tab === 'dashboard' && <FiLayout />} {tab === 'about' && <FiUser />} {tab === 'experience' && <FiBriefcase />} 
              {tab === 'tech' && <FiCpu />} {tab === 'contact' && <FiMail />} {tab === 'auth-demo' && <FiLock />}
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </button>
          ))}
          <a href={resumeLink} download className="nav-item download-resume-btn"><FiDownload /> <span>CV</span></a>
          <button className="portfolio-theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <><FaSun /> Light Mode</> : <><FaMoon /> Dark Mode</>}
          </button>
        </nav>
      </aside>

      <main className="main-viewport-content">
        {activeTab === 'dashboard' && (
          <>
            <section className="dashboard-section-wrapper">
              <h2 className="section-heading">Application Central Gateway</h2>
              <div className="apps-gateway-grid">
                {appsData.map((app) => (
                  <div key={app._id} className="gateway-card-container">
                    <AppCard title={app.title} tag={app.tag} iconName={app.iconName} glowColor={app.glowColor} imageUrl={app.imageUrl} />
                    <div className="gateway-action-row">
                      <Link to={app.route} className="gateway-live-btn">Open Module <FiArrowUpRight /></Link>
                      <Link to={app.repolink} className='gateway-repo-btn'>Repository <FiGithub /></Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-section-wrapper">
              <h2 className="section-heading">Deployed Architectures</h2>
              <div className="apps-gateway-grid">
                {showcaseProjects.map((proj) => (
                  <div key={proj._id} className="gateway-card-container">
                    <AppCard title={proj.title} tag="Live Project" iconName="FiCpu" glowColor="#00ffcc" imageUrl={proj.imgURL} />
                    <div className="gateway-action-row">
                      <a href={proj.liveLink} target="_blank" rel="noreferrer" className="gateway-live-btn">Live <FiExternalLink /></a>
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="gateway-repo-btn">Repo <FiGithub /></a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
        
        {activeTab === 'experience' && (
          <section className="dashboard-section-wrapper">
            <h2 className="section-heading">Professional Experience History</h2>
            <div className="experience-timeline-stack">
              {experienceData.map((exp) => (
                <div key={exp._id} className="gateway-card-container">
                  <div className="exp-card-header">
                    <h4>{exp.role} @ {exp.company}</h4>
                    {exp.company === "DecodeLabs" && (
                      <button className="gateway-repo-btn" onClick={() => setShowInternProjects(!showInternProjects)}>
                        {showInternProjects ? "Hide Projects" : "View Projects"}
                      </button>
                    )}
                  </div>
                  <p className="exp-desc">{exp.desc}</p>
                  {exp.company === "DecodeLabs" && showInternProjects && (
                    <div className="apps-gateway-grid" style={{ marginTop: '20px' }}>
                      {internProjects.map((proj) => (
                        <div key={proj._id} className="gateway-card-container">
                          <AppCard title={proj.title} tag="Internship Project" iconName="FiBriefcase" glowColor="#ffcc00" imageUrl={proj.imageLink} />
                          <div className="gateway-action-row"><a href={proj.githubLink} className="gateway-repo-btn">Repo <FiGithub /></a></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;