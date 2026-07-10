import { useState, useEffect } from "react";
import { WiDaySunny, WiCloudy, WiSnow, WiRaindrop, WiSunrise, WiSunset, WiBarometer } from 'react-icons/wi';
import './weather.css';

const TempBasedIcon = ({ temp, size = 60 }) => {
  const currentTemp = Number(temp);
  if (currentTemp >= 35) return <WiDaySunny size={size} color="#FF4500" />;
  if (currentTemp >= 25 && currentTemp < 35) return <WiDaySunny size={size} color="#FFD700" />;
  if (currentTemp >= 15 && currentTemp < 25) return <WiCloudy size={size} color="#B0C4DE" />;
  if (currentTemp < 15) return <WiSnow size={size} color="#E0FFFF" />;
  return <WiDaySunny size={size} color="#FFD700" />;
};

const ForecastCard = ({ date, maxTemp }) => (
  <div className="bg-color p-3 m-1 text-white text-center" style={{ minWidth: '85px', borderRadius: '8px' }}>
    <p className="mb-1">{new Date(date).toLocaleDateString("en-US", { weekday: "short" })}</p>
    <div className="my-2">
      <TempBasedIcon temp={maxTemp} size={35} />
    </div>
    <b>{Math.round(maxTemp)}°</b>
  </div>
);

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [searchCity, setSearchCity] = useState("Lahore");
  const [inputCity, setInputCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: 31.5204, lon: 74.3587 });

  const getCoordinates = async (city) => {
    if (!city.trim()) return;
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name } = data.results[0];
        setCoords({ lat: latitude, lon: longitude });
        setSearchCity(name);
      } else {
        alert("City not found!");
      }
    } catch (err) {
      console.error("Error fetching coordinates:", err);
    }
  };

  const getWeather = async (lat, lon) => {
    setIsLoading(true);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,weather_code,precipitation_probability_max&timezone=auto`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather(coords.lat, coords.lon);
  }, [coords]);

  if (isLoading) return <div className="text-white text-center mt-5"><h3>Loading Weather Data...</h3></div>;

  return (
    <main className="header-bg p-4" style={{ minHeight: "100vh" }}>
      <div className="weather-container" style={{ display: "flex", gap: "20px" }}>
        
        {/* Left Side (Current Weather Structural Sidebar) */}
        <section className="box p-4 left-weather-sidebar">
          <form onSubmit={(e) => { e.preventDefault(); getCoordinates(inputCity); setInputCity(""); }}>
            <input 
              className="input-field w-100" 
              placeholder="Search City..." 
              value={inputCity} 
              onChange={(e) => setInputCity(e.target.value)} 
            />
          </form>

          <div className="text-center sidebar-center-content">
            <TempBasedIcon temp={weather?.current?.temperature_2m} size={130} />
            <h1 className="text-white temp-text-large my-2">{Math.round(weather?.current?.temperature_2m)}°C</h1>
            <div className="d-flex justify-content-between align-items-center mt-3 px-2">
              <h3 className="text-white m-0" style={{ fontSize: "22px", fontWeight: "600" }}>{searchCity}</h3>
              <h4 className="text-muted m-0" style={{ fontSize: "15px", fontWeight: "400" }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </h4>
            </div>
          </div>

          <div className="sidebar-divider-line"></div>

          <div className="sidebar-bottom-meta">
            <div className="info-row-item">
              <p className="m-0">Humidity</p>
              <span>{weather?.current?.relative_humidity_2m}%</span>
            </div>
            <div className="info-row-item">
              <p className="m-0">Wind Speed</p>
              <span>{weather?.current?.wind_speed_10m} km/h</span>
            </div>
          </div>
        </section>

        {/* Right Side (7 Days Forecast) */}
        <section className="box-1 p-4" style={{ width: "70%" }}>
          <h4 className="text-white mb-3">7 Days Forecast</h4>
          <div className="d-flex mb-4" style={{ overflowX: "auto" }}>
            {weather?.daily?.time.map((date, i) => (
              <ForecastCard 
                key={date} 
                date={date} 
                maxTemp={weather.daily.temperature_2m_max[i]} 
              />
            ))}
          </div>

          <h4 className="text-white mb-3">Today's Overview</h4>
          
          <div className="container-1">
            {/* UV Index Card */}
            <div className="items-1">
              <p>UV Index</p>
              <div className="my-2">
                <WiDaySunny size={45} color="#FF8C00" />
              </div>
              <h4>{weather?.daily?.uv_index_max?.[0] ?? "N/A"}</h4>
            </div>

            {/* Pressure Card */}
            <div className="items-1">
              <p>Pressure</p>
              <div className="my-2">
                <WiBarometer size={45} color="#00BFFF" />
              </div>
              <h4>{weather?.current?.surface_pressure} hPa</h4>
            </div>
          </div>

          <div className="overview-row-one">
            {/* Precipitation Card */}
            <div className="card-item">
              <p>Precipitation</p>
              <div className="my-2">
                <WiRaindrop size={45} color="#00BFFF" />
              </div>
              <h4>
                {weather?.daily?.precipitation_probability_max?.[0] !== undefined 
                  ? `${weather.daily.precipitation_probability_max[0]}%` 
                  : "N/A"}
              </h4>
            </div>

            {/* Sunrise Card */}
            <div className="card-item">
              <p>Sunrise</p>
              <div className="my-2">
                <WiSunrise size={45} color="#FFD700" />
              </div>
              <h4>
                {weather?.daily?.sunrise?.[0] 
                  ? new Date(weather.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                  : "N/A"}
              </h4>
            </div>

            {/* Sunset Card */}
            <div className="card-item">
              <p>Sunset</p>
              <div className="my-2">
                <WiSunset size={45} color="#FF8C00" />
              </div>
              <h4>
                {weather?.daily?.sunset?.[0] 
                  ? new Date(weather.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                  : "N/A"}
              </h4>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default WeatherApp;
