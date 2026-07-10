import './news1.css';

function News1() {
  const places = [
    {
      id: 1,
      tag: "Masjid",
      date: "March 16, 2026",
      img: "https://plus.unsplash.com/premium_photo-1697730196206-7d8f455766bf?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Explore the beautiful architecture and peaceful environment of the grand Faisal Mosque."
    },
    {
      id: 2,
      tag: "Historical",
      date: "April 02, 2026",
      img: "https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Discover the rich cultural heritage and ancient stories hidden inside the royal fort walls."
    },
    {
      id: 3,
      tag: "Nature",
      date: "May 12, 2026",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Experience the breathtaking green valleys, cold rivers, and snowy mountain peaks."
    },
    {
      id: 4,
      tag: "City Life",
      date: "June 25, 2026",
      img: "https://plus.unsplash.com/premium_photo-1672116452571-896980a801c8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Enjoy the vibrant night lights, modern skyscrapers, and busy streets of the urban center."
    },
    {
      id: 5,
      tag: "Culture",
      date: "July 10, 2026",
      img: "https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Immerse yourself in traditional festivals, local food street experiences, and colorful clothing markets."
    },
    {
      id: 6,
      tag: "Adventure",
      date: "August 18, 2026",
      img: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Plan your next perfect camping trip, bonfire nights under star-lit skies, and desert safari safaris."
    },
    {
      id: 7,
      tag: "Coastal",
      date: "September 05, 2026",
      img: "https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Relax by the beautiful deep blue sea waves, golden sand beaches, and peaceful sunny resorts."
    },
    {
      id: 8,
      tag: "Heritage",
      date: "October 14, 2026",
      img: "https://images.unsplash.com/photo-1616428090830-59bd09d9f272?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Visit timeless architectural marvels, old ruins, and UNESCO protected world heritage sites."
    },
    {
      id: 9,
      tag: "Wildlife",
      date: "November 22, 2026",
      img: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Take a safe guided safari tour through deep national parks to observe wild animals in nature."
    }
  ];

  return (
    <div className="custom-app-container">
      {/* Header wrapper section */}
      <div className="custom-header-wrapper">
        <h2 className="custom-heading">Trending Places</h2>
        <button className="custom-btn-view-all">View All Places</button>
      </div>

      {/* Grid container wrapper */}
      <div className="custom-flex-grid">
        {places.map((place) => (
          <div className="custom-card-wrapper" key={place.id}>
            <div className="custom-inner-card">
              
              <div className="custom-img-box">
                <img
                  src={place.img}
                  className="custom-actual-img"
                  alt={place.tag}
                />
              </div>
              
              <div className="custom-card-content">
                <div className="custom-meta-row">
                  <span className="custom-card-badge">{place.tag}</span>
                  <small className="custom-card-date">{place.date}</small>
                </div>
                
                <p className="custom-card-text">
                  {place.text}
                </p>

                <div className="custom-card-footer">
                  <div className="custom-rating-stars">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-half" />
                  </div>
                  <a href="#" className="custom-read-more">Read More →</a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News1;
