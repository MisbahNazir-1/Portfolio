import React, { useState, useEffect } from 'react';
import * as Icons from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FiLayout, FiBriefcase, FiCpu, FiMail, FiLogOut, FiDownload, 
  FiGithub, FiLinkedin, FiExternalLink, FiArrowUpRight, FiLock,
     FiUser, FiHash, FiPhone, FiMapPin ,FiAward, FiZap, 
} from 'react-icons/fi';
import { LuArrowRight } from "react-icons/lu";
import './dashboard.css';


// Dynamically resolves icon component from database string identifiers
const DynamicIcon = ({ name, size }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.FiGlobe size={size} />;
  return <IconComponent size={size} />;
};



// Application gateway card module with configuration mapping handles
const AppCard = ({ title, tag, iconName, glowColor, imageUrl, onClick }) => (
  <div 
    className="gateway-card" 
    style={{ '--glow-color': glowColor }}
    onClick={onClick}
  >
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
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate;
   const [frontendDesigns, setFrontendDesigns] = useState([]);

  // Dynamic portfolio cluster state contexts
  const [appsData, setAppsData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [showcaseProjects, setShowcaseProjects] = useState([]);
  const [techStack, setTechStack] = useState([]);
   const [resumeLink, setResumeLink] = useState('#')
  const [loading, setLoading] = useState(true);

  const imageBaseURL =import.meta.env.VITE_PORTFOLIO_API_URL .replace('/api', '');

  const imgbasedURL = (import.meta.env.VITE_PORTFOLIO_API_URL || 'http://localhost:5000/api').replace('/api', '');



  // API services gateway root routing string
const API_BASE_URL = 'https://portfolio-eight-indol-95.vercel.app/api'


  // Synchronizes aggregate portfolio assets from server instance
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        // Added resume fetch call in parallel cluster
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
      } catch (err) {
        console.error("Context lifecycle data synchronization exception:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, []);

   useEffect(() => {
    axios.get(`${API_BASE_URL}/designs`)
      .then(res => setFrontendDesigns(res.data))
      .catch(err => console.log(err));
  }, []);


  if (loading) {
    return <div className="auth-gate-placeholder"><h1>Loading Digital Portfolio ...</h1></div>;
  }

  return (
    <div className="dashboard-root-frame">
      {/* SIDEBAR NAVIGATION UTILITY */}
      <aside className="sidebar-container">
          <div className="sidebar-top-brand">
      <div className="sidebar-top-brand">
  <img src="https://i.postimg.cc/MK8VHhqk/logo.jpg" className="brand-neon-logo" alt="logo" />
  <span className="brand-text">Misbah Developer</span>
</div>
</div>
        <nav className="sidebar-nav-links">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <FiLayout className="nav-icon" /> <span>Dashboard</span>
          </button>
          <button className={`nav-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
  <FiUser className="nav-icon" /> <span>About Me</span>
</button>
          <button className={`nav-item ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
            <FiBriefcase className="nav-icon" /> <span>Experience</span>
          </button>
          <button className={`nav-item ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>
            <FiCpu className="nav-icon" /> <span>Tech Stack</span>
          </button>
          <button className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
            <FiMail className="nav-icon" /> <span>Contact</span>
          </button>
          <button 
  className={`nav-item ${activeTab === 'auth-demo' ? 'active' : ''}`} 
  onClick={() => setActiveTab('auth-demo')}
>
  <FiLock className="nav-icon" /> <span>Auth Live Demo</span>
</button>
          <a href={resumeLink} download className="nav-item download-resume-btn">
  <FiDownload /> <span>Download Executive CV</span>
</a>

        </nav>
       
      </aside>

      {/* RECEPTIVE CENTRAL VIEWPORT WRAPPER */}
      <main className="main-viewport-content">
        {/* RUNTIME VIEWPORT: CENTRAL CORE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <>
            {/* COMPONENT: PROFESSIONAL PROFILE CONTEXT HIGHLIGHT */}
            <header className="hero-branding-section">
              <div className="hero-left-profile">
                <span className="greeting-pill">Welcome to my Digital Space</span>
                <h1 className="hero-title">Hello, I am <span>Misbah Nazir  </span></h1>
                <p className="hero-subtitle">"Full-Stack Developer transforming complex business ideas into seamless, secure, and user-friendly web applications."</p>
                <div className="hero-social-dock">
                  <a href="https://github.com/MisbahNazir-1" target="_blank"
                   rel="noreferrer" className="social-icon-btn"><FiGithub /></a>
                  <a href="https://www.linkedin.com/in/misbah-nazir-developer" 
                  target="_blank" rel="noreferrer" className="social-icon-btn"><FiLinkedin /></a>
     <a  onClick={() => {
    setActiveTab('contact'); 
  }}  className="neon-cta-btn">
    <span>Let's Build Your App</span>
    <LuArrowRight/>
  </a>
           </div>

           <div class="hero-metrics-container">
  {/* <!-- 1. Experience --> */}
  <div class="metric-item">
    <span class="metric-number">1+</span>
    <span class="metric-label">Years Experience</span>
  </div>
  
  <div class="metric-divider"></div>

  {/* <!-- 2. Projects --> */}
  <div class="metric-item">
    <span class="metric-number">10+</span>
    <span class="metric-label">Projects Delivered</span>
  </div>

  <div class="metric-divider"></div>

  {/* <!-- 3. Agile Workflow --> */}
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
          width: '100%',
          height: '100%',
            objectFit: 'cover',
          objectPosition: 'center 12%', 
          borderRadius:'50%'
        }}
      />
    </div>
  </div>
</div>


            </header>

            {/* COMPONENT: DYNAMIC MICRO SERVICES DEPLOYMENT INTEGRATION */}
         
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

          <Link to={app.repolink} className='gateway-repo-btn'>
          Respository<FiGithub className='button-icon'/>
          </Link>
          
        </div>

      </div>
    ))}
  </div>
</section>

            {/* COMPONENT: MULTI COMPILER LIVE ARCHITECTURE SYSTEMS CONTROLS */}
          <div className="split-showcase-layout">
              <section className="showcase-column-full">
                <h2 className="section-heading">Deployed Architectures</h2>
                <div className="projects-display-stack">
                  {showcaseProjects.map((proj) => (
                    <div key={proj._id} className="project-glass-card">
                      {/* 🚀 IMAGE TAG INJECTED ACCORDING TO YOUR SCHEMA KEY */}
                      {proj.imgURL && <img src={proj.imgURL} alt={proj.title} className="project-card-thumbnail" />}
                      
                      <h4>{proj.title}</h4>
                      <div className="project-tags-row">
                        {proj.tags && proj.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="tech-badge">{tag}</span>
                        ))}
                      </div>
                      <div className="project-actions-row">
                        <a href={proj.liveLink} target="_blank" rel="noreferrer" className="action-link live-btn"><FiExternalLink /> Live Link</a>
                        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="action-link repo-btn"><FiGithub /> Repository</a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}


{activeTab === 'dashboard' && (
  <>
    <h2 className="section-heading">Client-side Architectures</h2>
    <div className="portfolio-grid-container">
      {frontendDesigns.map((design) => (
        <div key={design._id} className="portfolio-card">
          
          {/* Thumbnail and Title Section */}
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

            {/* Text Content */}
            <div className="card-text-content">
              <div className="card-header-row">
                <div className="card-icon-indicator">📁</div>
                <div>
                  <h3 className="card-main-title">{design.title}</h3>
                  <p className="card-sub-description">{design.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Container */}
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
              Repository <FiGithub/>
            </a>
          </div>
        </div>
      ))}
    </div>
  </>
)}
{/* About Me section */}
{activeTab === 'about' && (
  <section style={{ padding: '40px 30px', color: '#e2e8f0', width: '100%', maxWidth: '1200px', boxSizing: 'border-box' }}>
    
   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', width: '100%' }}>
   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '4px', height: '26px', backgroundColor: '#00f2fe', borderRadius: '2px' }}></span>
        <h2 style={{ fontSize: '26px', fontWeight: '600', margin: 0, color: '#ffffff' }}>About Me</h2>
      </div>
      <img 
        src={`${imgbasedURL}/uploads/logo.jpeg`} 
        alt="Misbah Nazir" 
        style={{ 
             width: '110px', 
    height: '110px', 
    borderRadius: '50%', 
    border: '3px solid #00f2fe', 
    objectFit: 'cover',
    objectPosition: 'top', /* Isse aapka face circle ke center mein aa jayega */
    boxShadow: '0 0 20px rgba(0, 242, 254, 0.35)',
    display: 'block'
        }} 
      />
    </div>
  <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'start' }}>
    <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#f8fafc', margin: 0 }}>
          Hi, I am <span style={{ color: '#00f2fe', fontWeight: '600' }}>Misbah Nazir</span>, a passionate Full-Stack MERN Developer based in Lahore, Pakistan. I don’t just write code; I focus on understanding your business goals and translating complex challenges into seamless, high-performing digital solutions.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#94a3b8', margin: 0 }}>
          What makes my approach unique is my diverse background. Currently pursuing a Bachelor’s degree in International Relations from LCWU, I have developed strong critical thinking, global perspective, and cross-cultural communication skills.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#94a3b8', margin: 0 }}>
          Combined with my professional MERN Stack certifications and industry internship experience at Decode Labs and Wolves Tech Solution, I bring a unique blend of technical expertise and strategic thinking to the table.
        </p>
      </div>

      {/* Right Column: All Cards Stacked Seamlessly */}
      <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Card 1 */}
        <div style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <FiAward style={{ color: '#00f2fe', fontSize: '20px' }} />
            <h4 style={{ color: '#00f2fe', margin: 0, fontSize: '16px', fontWeight: '600' }}>Education Blend</h4>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>BS International Relations (LCWU) + MERN Certified</p>
        </div>

        {/* Card 2 */}
        <div style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <FiZap style={{ color: '#00f2fe', fontSize: '20px' }} />
            <h4 style={{ color: '#00f2fe', margin: 0, fontSize: '16px', fontWeight: '600' }}>Core Superpower</h4>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>Natural multitasker who thrives under high-pressure Agile workflows</p>
        </div>

        {/* Card 3 */}
        <div style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <FiBriefcase style={{ color: '#00f2fe', fontSize: '20px' }} />
            <h4 style={{ color: '#00f2fe', margin: 0, fontSize: '16px', fontWeight: '600' }}>Industry Ready</h4>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>Hands-on experience building scalable E-commerce & secure systems</p>
        </div>

      </div>

    </div>
  </section>
)}




        {/* RUNTIME VIEWPORT: CORPORATE TIMELINE RECORD VIEWS */}
        {activeTab === 'experience' && (
          <section className="dashboard-section-wrapper">
            <h2 className="section-heading">Professional Experience History</h2>
            <div className="experience-timeline-stack">
              {experienceData.map((exp) => (
                <div key={exp._id} className="experience-glass-card">
                  <div className="exp-card-header">
                    <h4>{exp.role} <span className="exp-company-highlight">@ {exp.company}</span></h4>
                    <span className="duration-tag">{exp.duration}</span>
                  </div>
                  <p className="exp-desc">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

               {/* RUNTIME VIEWPORT: COMPREHENSIVE TECHNOLOGY CAPABILITY SEGMENTS */}
        {activeTab === 'tech' && (
          <section className="dashboard-section-wrapper skill-matrix-viewport">
            <div className="section-header-cluster">
              <span className="context-pill-indicator">Capability Matrix</span>
              <h2 className="section-heading modern-heading-style">Skills & Technology Stack</h2>
              <p className="contact-section-subtitle premium-subtitle">
                A rigorous compilation of full-stack engineering tools, modular state frameworks, cloud databases, and core language ecosystems.
              </p>
            </div>

            <div className="tech-stack-badges-grid matrix-interactive-grid">
              {techStack.map((skill) => (
                <div key={skill._id || skill} className="tech-badge tech-badge-large structural-matrix-pill">
                  <div className="pill-backdrop-blur"></div>
                  <div className="pill-pulse-dot"></div>
                  <span className="skill-text-node">{skill.name || skill}</span>
                </div>
              ))}
            </div>
          </section>
        )} 

        
       {/* RUNTIME VIEWPORT: TARGET OUTBOUND CONNECTIVITY CHANNELS FORM */}
        {activeTab === 'contact' && (
          <section  className="dashboard-section-wrapper communications-viewport" >
            <div className="section-header-cluster">
              <span className="context-pill-indicator">Enterprise Hub</span>
              <h2 className="section-heading modern-heading-style">Get In Touch</h2>
              <p className="contact-section-subtitle premium-subtitle">
                Initiate a dynamic communication instance for enterprise architecture collaborations, technical inquiries, or production pipeline discussions.
              </p>
            </div>
            
            <div className="contact-info-grid interactive-cluster-grid">
              
              {/* CHANNEL: OFFICIAL EMAIL SECURE GATEWAY */}
<a 
  href="#copy-email"
  onClick={(e) => {
    e.preventDefault();
    navigator.clipboard.writeText("misbahnazirdeveloper@gmail.com");
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
      <span className="contact-link-value email-text-color interface-string-highlight">misbahnazirdeveloper@gmail.com</span>
      <span className="action-trigger-hint">Click to Copy Email ↗</span>
    </div>
  </div>
</a>


              {/* CHANNEL: GITHUB REPOSITORY DOCK */}
              <a href="https://github.com/MisbahNazir-1" target="_blank" rel="noreferrer" className="contact-anchor-card framework-elevation-link">
                <div className="contact-card-frame github-card-glow enterprise-card-spec">
                  <div className="card-dynamic-backdrop"></div>
                  <div className="contact-icon-wrapper github-icon-bg structural-icon-node">
                    <FiGithub size={24} className="vector-pulse-node" />
                  </div>
                  <div className="contact-card-text communication-meta-block">
                    <h4 className="meta-label-tag">Version Control Node</h4>
                    <span className="contact-link-value github-text-color interface-string-highlight">Misbah Nazir-1</span>
                    <span className="action-trigger-hint">Review Repositories ↗</span>
                  </div>
                </div>
              </a>

              {/* CHANNEL: LINKEDIN PROFESSIONAL MATRIX */}
              <a href="https://www.linkedin.com/in/misbah-nazir-developer" target="_blank" rel="noreferrer" className="contact-anchor-card framework-elevation-link">
                <div className="contact-card-frame linkedin-card-glow enterprise-card-spec">
                  <div className="card-dynamic-backdrop"></div>
                  <div className="contact-icon-wrapper linkedin-icon-bg structural-icon-node">
                    <FiLinkedin size={24} className="vector-pulse-node" />
                  </div>
                  <div className="contact-card-text communication-meta-block">
                    <h4 className="meta-label-tag">Corporate Identity Dock</h4>
                    <span className="contact-link-value linkedin-text-color interface-string-highlight">Misbah Nazir Developer</span>
                    <span className="action-trigger-hint">Connect Profile ↗</span>
                  </div>
                </div>
              </a>

            </div>
          </section>
        )}

{/* Auth Live Demo  */}
{activeTab === 'auth-demo' && (
  <section className="dashboard-section-wrapper">
    <h2 className="section-heading">Authentication Security Modules</h2>
    <div className="apps-gateway-grid">
      
      {/* CARD 1: LOGIN MODULE */}
      <div className="gateway-card-container">
        <AppCard 
          title="Admin Security Authentication"
          tag="User Login / JWT Session Gate"
          iconName="FiLock"
          glowColor="#00ffcc"
          imageUrl="" 
        />
        <div className="gateway-action-row">
          <Link to="/login" className="gateway-live-btn">
            Open Module <FiArrowUpRight className="button-icon" />
          </Link>
          <div className="gateway-repo-btn disabled-btn">
            Code Coming Soon <FiGithub className="button-icon" />
          </div>
        </div>
      </div>

      {/* CARD 2: REGISTER MODULE */}
      <div className="gateway-card-container">
        <AppCard 
          title="New User Registration"
          tag="Admin Enrollment / Schema Setup"
          iconName="FiUser"
          glowColor="#00ffcc"
          imageUrl="" 
        />
        <div className="gateway-action-row">
          <Link to="/register" className="gateway-live-btn">
            Open Module <FiArrowUpRight className="button-icon" />
          </Link>
          <div className="gateway-repo-btn disabled-btn">
            Code Coming Soon <FiGithub className="button-icon" />
          </div>
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
  