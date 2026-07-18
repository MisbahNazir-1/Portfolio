import { useEffect, useState, useCallback } from 'react';
import { FaSun, FaMoon, FaRegClock, FaArrowRight, FaBolt, FaSearch, FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import './news.css';

const backupNews = [
    { title: "Next-Gen AI Models Revolutionize Software Engineering Paradigms Worldwide", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 18:00:00", category: ["technology"] },
    { title: "Global Sports Championship Finals Draw Record-Breaking Stadium Audiences", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 17:15:00", category: ["sports"] },
    { title: "International Markets Experience Surge in Green Technology Ventures", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 16:30:00", category: ["business"] },
    { title: "Deep Space Telescope Uncovers Ancient Star Systems on Milky Way Edge", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 15:45:00", category: ["science"] }
];

const DEFAULT_IMAGE = "https://unsplash.com";

function News() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(true); 
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("top");
    const [nextPageToken, setNextPageToken] = useState(null);

    const getNews = useCallback(async (categoryName, pageToken = null) => {
        if (!pageToken) setIsLoading(true);
        else setIsMoreLoading(true);

        try {
            let url = `https://newsdata.io`;
            if (categoryName && categoryName !== "top") url += `&category=${categoryName}`;
            if (pageToken) url += `&page=${pageToken}`;

            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.status === "success" && data.results && data.results.length > 0) {
                if (pageToken) setNews(prev => [...prev, ...data.results]);
                else setNews(data.results);
                setNextPageToken(data.nextPage || null);
            } else {
                handleBackupFallbacks(categoryName, pageToken);
            }
        } catch (error) {
            handleBackupFallbacks(categoryName, pageToken);
        } finally {
            setIsLoading(false);
            setIsMoreLoading(false);
        }
    }, []);

    const handleBackupFallbacks = (categoryName, pageToken) => {
        let filteredBackup = backupNews;
        if (categoryName && categoryName !== "top") {
            filteredBackup = backupNews.filter(item => item.category && item.category.includes(categoryName));
        }
        if (pageToken) {
            setNews(prev => [...prev, ...filteredBackup]);
            setNextPageToken(null);
        } else {
            setNews(filteredBackup);
            setNextPageToken(null);
        }
    };

    useEffect(() => {
        getNews(selectedCategory);
    }, [selectedCategory, getNews]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const formatTimeAgo = (dateString) => {
        try {
            if (!dateString) return "Just now";
            const date = new Date(dateString.replace(" ", "T"));
            if (isNaN(date.getTime())) return "Recent";
            const differenceInSeconds = Math.floor((new Date() - date) / 1000);
            if (differenceInSeconds < 60) return "Just now";
            const minutes = Math.floor(differenceInSeconds / 60);
            if (minutes < 60) return `${minutes}m ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours}h ago`;
            return `${Math.floor(hours / 24)}d ago`;
        } catch (e) {
            return "Recent";
        }
    };

    const categoriesList = [
        { id: "top", label: "Trending" },
        { id: "technology", label: "Technology" },
        { id: "sports", label: "Sports" },
        { id: "business", label: "Business" },
        { id: "science", label: "Science" }
    ];

    const filteredNews = news ? news.filter(article => 
        article.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const tickerHeadlines = filteredNews.length > 0 ? filteredNews : backupNews;

    if (isLoading) {
        return (
            <div className={`loading-wrapper ${darkMode ? 'dark-theme' : 'light-theme'}`}>
                <div className="custom-spinner"></div>
            </div>
        );
    }

    return (
        <div className={`news-app-wrapper ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            <nav className={`custom-navbar sticky-top ${darkMode ? 'dark-navbar' : 'light-navbar'}`}>
                <div className="navbar-container">
                    <span className="navbar-logo"><FaBolt className="logo-icon" /> DAILY NEWS</span>
                    <div className="nav-actions">
                        <div className={`search-box ${darkMode ? 'dark-search' : 'light-search'}`}>
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder="Search news..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <button className={`theme-toggle-btn ${darkMode ? 'btn-light' : 'btn-dark'}`} onClick={toggleTheme}>
                            {darkMode ? <><FaSun /> Light</> : <><FaMoon /> Dark</>}
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`ticker-wrapper ${darkMode ? 'dark-ticker' : 'light-ticker'}`}>
                <div className="ticker-badge">BREAKING</div>
                <div className="ticker-content-loop">
                    <div className="ticker-text-marquee">
                        {tickerHeadlines.map((item, idx) => (
                            <span key={idx} className="ticker-item-span">• {item.title} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="main-content-container">
                <div className="category-scroll-container">
                    {categoriesList.map(cat => (
                        <button key={cat.id} className={`category-pill-btn ${selectedCategory === cat.id ? 'active-pill' : ''} ${darkMode ? 'dark-pill' : 'light-pill'}`} onClick={() => setSelectedCategory(cat.id)}>
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="section-header">
                    <div className="section-title">
                        {categoriesList.find(c => c.id === selectedCategory)?.label} News
                        <div className="title-underline"></div>
                    </div>
                </div>

                <div className="custom-news-grid">
                    {filteredNews.length > 0 ? (
                        filteredNews.map((article, index) => (
                            <div className="grid-item-col" key={index}>
                                <div className={`news-card ${darkMode ? 'dark-card' : 'light-card'}`} onClick={() => { if(article.link) window.open(article.link, '_blank', 'noopener,noreferrer'); }}>
                                    <div className="card-image-wrapper">
                                        <img src={article.image_url || DEFAULT_IMAGE} className="news-card-img" alt="News Cover" onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE; }} />
                                        <span className="live-badge">LIVE</span>
                                    </div>
                                    <div className="card-body-content">
                                        <div className="card-text-main">
                                            <p className="news-date"><FaRegClock className="date-icon" /> {formatTimeAgo(article.pubDate)}</p>
                                            <h5 className="news-title">{article.title}</h5>
                                        </div>
                                        <div className="card-footer-action">
                                            <span className="read-more-text">Read Article <FaArrowRight className="arrow-icon" /></span>
                                            <span className="category-badge">News</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results-msg">
                            <h5>No results found matching your search.</h5>
                        </div>
                    )}
                </div>

                {nextPageToken && (
                    <div className="load-more-center">
                        <button className={`load-more-btn ${darkMode ? 'lm-dark' : 'lm-light'}`} onClick={() => getNews(selectedCategory, nextPageToken)} disabled={isMoreLoading}>
                            {isMoreLoading ? "Loading..." : "Load More Articles"}
                        </button>
                    </div>
                )}
            </div>
            <footer className={`custom-footer-area ${darkMode ? 'dark-footer' : 'light-footer'}`}>
                <div className="footer-flex-container">
                    <div className="footer-col-main">
                        <h5 className="footer-title-logo"><FaBolt /> DAILY NEWS</h5>
                        <p className="footer-desc-text">Your ultimate destination for lightning fast breakings, top global trends, and trusted insights worldwide.</p>
                    </div>
                    <div className="footer-col-links">
                        <h6 className="footer-sub-heading">Company</h6>
                        <ul className="footer-links-list">
                            <li><span>About Us</span></li>
                            <li><span>Careers</span></li>
                            <li><span>Privacy Policy</span></li>
                        </ul>
                    </div>
                    <div className="footer-col-links">
                        <h6 className="footer-sub-heading">Contact</h6>
                        <ul className="footer-links-list">
                            <li><span>Support Help</span></li>
                            <li><span>Media Relations</span></li>
                            <li><span>Advertise</span></li>
                        </ul>
                    </div>
                    <div className="footer-col-links">
                        <h6 className="footer-sub-heading">Follow Us</h6>
                        <div className="footer-social-icons-row">
                            <span className="social-icon-wrapper"><FaTwitter /></span>
                            <span className="social-icon-wrapper"><FaLinkedin /></span>
                            <span className="social-icon-wrapper"><FaGithub /></span>
                            <span className="social-icon-wrapper"><FaGlobe /></span>
                        </div>
                    </div>
                    <div className="footer-bottom-copyright">
                        <p>© 2026 DAILY NEWS. All rights reserved globally.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default News;
