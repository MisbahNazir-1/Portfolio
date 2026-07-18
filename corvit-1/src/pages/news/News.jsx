import { useEffect, useState, useCallback } from 'react';
import { FaSun, FaMoon, FaRegClock, FaArrowRight, FaBolt, FaSearch, FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import './news.css';

const backupNews = [
    { title: "Next-Gen AI Models Revolutionize Software Engineering Paradigms Worldwide", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 18:00:00", category: ["technology"] },
    { title: "Global Sports Championship Finals Draw Record-Breaking Stadium Audiences", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 17:15:00", category: ["sports"] },
    { title: "International Markets Experience Surge in Green Technology Ventures", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 16:30:00", category: ["business"] },
    { title: "Deep Space Telescope Uncovers Ancient Star Systems on Milky Way Edge", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 15:45:00", category: ["science"] },
    { title: "Renewable Energy Networks Achieve Major Technical Milestones in Europe", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 14:20:00", category: ["technology"] },
    { title: "Championship Underdogs Secure Historic Victory in Final Minutes", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 13:10:00", category: ["sports"] },
    { title: "Startup Innovation Ecosystems Witness Historic Funding Influx This Quarter", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 12:05:00", category: ["business"] },
    { title: "Quantum Computing Hardware Shows Promising Scalability Results", link: "https://google.com", image_url: "https://unsplash.com", pubDate: "2026-07-18 11:00:00", category: ["science"] }
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
            if (categoryName && categoryName !== "top") {
                url += `&category=${categoryName}`;
            }
            if (pageToken) {
                url += `&page=${pageToken}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.status === "success" && data.results && data.results.length > 0) {
                if (pageToken) {
                    setNews(prev => [...prev, ...data.results]);
                } else {
                    setNews(data.results);
                }
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
            const cleanDate = dateString.replace(" ", "T");
            const date = new Date(cleanDate);
            if (isNaN(date.getTime())) return "Recent";
            const now = new Date();
            const differenceInSeconds = Math.floor((now - date) / 1000);
            
            if (differenceInSeconds < 60) return "Just now";
            const minutes = Math.floor(differenceInSeconds / 60);
            if (minutes < 60) return `${minutes}m ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours}h ago`;
            const days = Math.floor(hours / 24);
            return `${days}d ago`;
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

    return (
        <div className={`news-app-wrapper ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            <nav className={`custom-navbar sticky-top shadow-sm ${darkMode ? 'dark-navbar' : 'light-navbar'}`}>
                <div className="navbar-container">
                    <span className="navbar-logo">
                        <FaBolt className="logo-icon" /> DAILY NEWS
                    </span>
                    <div className="nav-actions">
                        <div className={`search-box ${darkMode ? 'dark-search' : 'light-search'}`}>
                            <FaSearch className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search news..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
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
                            <span key={idx} className="ticker-item-span">
                                • {item.title} &nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="category-scroll-container mb-4">
                    {categoriesList.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-pill-btn ${selectedCategory === cat.id ? 'active-pill' : ''} ${darkMode ? 'dark-pill' : 'light-pill'}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="section-header border-bottom mb-4">
                    <div className="section-title">
                        {categoriesList.find(c => c.id === selectedCategory)?.label} News
                        <div className="title-underline"></div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="row g-5">
                        {[1, 2, 3, 4].map(n => (
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={n}>
                                <div className={`skeleton-card ${darkMode ? 'dark-sk' : 'light-sk'}`}>
                                    <div className="skeleton-media-box"></div>
                                    <div className="skeleton-text-line line-1"></div>
                                    <div className="skeleton-text-line line-2"></div>
                                    <div className="skeleton-footer-box"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="row g-5">
                            {filteredNews.length > 0 ? (
                                filteredNews.map((article, index) => (
                                    <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                                        <div 
                                            className={`news-card h-100 ${darkMode ? 'dark-card' : 'light-card'}`}
                                            onClick={() => { if(article.link) window.open(article.link, '_blank', 'noopener,noreferrer'); }}
                                        >
                                            <div className="card-image-wrapper">
                                                <img
                                                    src={article.image_url || DEFAULT_IMAGE}
                                                    className="news-card-img"
                                                    alt={article.title || "News Cover"}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE; }}
                                                />
                                                <span className="live-badge">LIVE</span>
                                            </div>

                                            <div className="card-body-content">
                                                <div className="card-text-main">
                                                    <p className="news-date">
                                                        <FaRegClock className="date-icon" /> {formatTimeAgo(article.pubDate)}
                                                    </p>
                                                    <h5 className="news-title">
                                                        {article.title}
                                                    </h5>
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
                                <div className="text-center w-100 mt-5 py-5">
                                    <h5 className="fw-bold">No results found matching your search.</h5>
                                </div>
                            )}
                        </div>

                        {nextPageToken && (
                            <div className="text-center mt-5">
                                <button 
                                    className={`btn rounded-pill px-4 py-2 fw-semibold ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                                    onClick={() => getNews(selectedCategory, nextPageToken)}
                                    disabled={isMoreLoading}
                                >
                                    {isMoreLoading ? "Loading..." : "Load More Articles"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <footer className={`custom-footer-area mt-5 pt-5 pb-4 ${darkMode ? 'dark-footer' : 'light-footer'}`}>
                <div className="container">
                    <div className="row g-4 justify-content-between">
                        <div className="col-12 col-md-4">
                            <h5 className="footer-title-logo"><FaBolt /> DAILY NEWS</h5>
                            <p className="footer-desc-text">Your ultimate destination for lightning fast breakings, top global trends, and trusted insights worldwide.</p>
                        </div>
                        <div className="col-6 col-md-2">
                            <h6 className="footer-sub-heading">Company</h6>
                            <ul className="footer-links-list">
                                <li><span>About Us</span></li>
                                <li><span>Careers</span></li>
                                <li><span>Privacy Policy</span></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-2">
                            <h6 className="footer-sub-heading">Contact</h6>
                            <ul className="footer-links-list">
                                <li><span>Support Help</span></li>
                                <li><span>Media Relations</span></li>
                                <li><span>Advertise</span></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-3">
                            <h6 className="footer-sub-heading">Follow Us</h6>
                            <div className="footer-social-icons-row">
                                <span className="social-icon-wrapper"><FaTwitter /></span>
                                <span className="social-icon-wrapper"><FaLinkedin /></span>
                                <span className="social-icon-wrapper"><FaGithub /></span>
                                <span className="social-icon-wrapper"><FaGlobe /></span>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-copyright text-center mt-5 pt-4 border-top">
                        <p>© 2026 DAILY NEWS. All rights reserved globally.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default News;
