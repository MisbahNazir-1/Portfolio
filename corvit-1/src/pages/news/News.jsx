import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaRegClock, FaArrowRight, FaBolt } from 'react-icons/fa';
import './news.css';

function News() {
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(true); 

    const getNews = async () => {
        try {
            const response = await fetch("https://newsdata.io");
            const data = await response.json();
            setNews(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    if (isLoading) {
        return (
            <div className={`loading-wrapper ${darkMode ? 'dark-theme' : 'light-theme'}`}>
                <div className='spinner-border text-primary' role='status'></div>
            </div>
        );
    }

    return (
        <div className={`news-app-wrapper ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            <nav className={`custom-navbar sticky-top shadow-sm ${darkMode ? 'dark-navbar' : 'light-navbar'}`}>
                <div className="navbar-container">
                    <span className="navbar-logo">
                        <FaBolt className="logo-icon" /> DAILY NEWS
                    </span>
                    <button className={`theme-toggle-btn ${darkMode ? 'btn-light' : 'btn-dark'}`} onClick={toggleTheme}>
                        {darkMode ? <><FaSun /> Light</> : <><FaMoon /> Dark</>}
                    </button>
                </div>
            </nav>

            <div className="container mt-4 pt-2">
                <div className="section-header border-bottom mb-4">
                    <div className="section-title">
                        Trending News
                        <div className="title-underline"></div>
                    </div>
                    <button className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>View All</button>
                </div>

                <div className="row g-5">
                    {news && news.results ? (
                        news.results.map((article, index) => (
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                                <div 
                                    className={`news-card h-100 ${darkMode ? 'dark-card' : 'light-card'}`}
                                    onClick={() => { if(article.link) window.open(article.link, '_blank', 'noopener,noreferrer'); }}
                                >
                                    <div className="card-image-wrapper">
                                        <img
                                            src={article.image_url || 'https://placeholder.com'}
                                            className="news-card-img"
                                            alt={article.title || "News Cover"}
                                        />
                                        <span className="live-badge">LIVE</span>
                                    </div>

                                    <div className="card-body-content">
                                        <div className="card-text-main">
                                            <p className="news-date">
                                                <FaRegClock className="date-icon" /> {article.pubDate?.split(' ') || article.pubDate}
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
                            <h5 className="fw-bold">No news data available at the moment.</h5>
                            <p className="text-muted">API limit might be over or URL is incorrect.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default News;
