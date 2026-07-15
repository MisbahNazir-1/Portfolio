import { useEffect, useState } from 'react'
import './news.css'

function News() {
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const getNews = async () => {
        try {
            const response = await fetch("https://newsdata.io/api/1/latest? apikey=pub_25eff2fe7bad47b0bd84a65e55433020");
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

    if (isLoading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
                <div className='spinner-border text-primary' role='status'></div>
            </div>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between m-5">
                <div className="fs-4 fw-semibold ">Trending News</div>
                <button className="btn btn-outline-dark">View All</button>
            </div>
            <div className="container">
                <div className="row g-4">
                    {/* Agar news.results khali ho toh crash na ho */}
                    {news && news.results ? (
                        news.results.map((article, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card bg-dark text-white border-0 shadow" style={{ height: '400px', borderRadius: '15px', overflow: 'hidden' }}>

                                    <img
                                        src={article.image_url || 'https://placeholder.com'}
                                        className="card-img h-100"
                                        alt={article.title || "News Image"}
                                        style={{ objectFit: 'cover', opacity: '0.8' }}
                                    />

                                    <div className="card-img-overlay d-flex flex-column justify-content-end p-3"
                                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 100%)' }}>

                                        <div className="mb-2">
                                            <span className="badge bg-primary mb-2">News</span>
                                            <p className="card-text mb-1"><small className="text-light opacity-75">{article.pubDate}</small></p>
                                            <h5 className="card-title fw-bold" style={{ fontSize: '1rem', lineHeight: '1.4' }}>
                                                {article.title?.length > 60 ? article.title.substring(0, 60) + "..." : article.title}
                                            </h5>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2 mt-2">
                                            <div className="text-warning small">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-half"></i>
                                            </div>
                                            <span className="badge rounded-pill bg-light text-dark">4.8</span>
                                        </div>

                                        <a href={article.link} target="_blank" rel="noreferrer" className="stretched-link"></a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-100 mt-5">
                            <h5>No news data available at the moment.</h5>
                            <p className="text-muted">API limit might be over or URL is incorrect.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default News;
