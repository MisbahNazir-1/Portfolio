import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiSnow,
  WiRaindrop,
  WiSunrise,
  WiSunset,
  WiBarometer,
} from "react-icons/wi";
import "./weather.css";

const TempBasedIcon = ({ temp, size = 60 }) => {
  const currentTemp = Number(temp);
  if (currentTemp >= 35) return <WiDaySunny size={size} color="#FF4500" />;
  if (currentTemp >= 25 && currentTemp < 35)
    return <WiDaySunny size={size} color="#FFD700" />;
  if (currentTemp >= 15 && currentTemp < 25)
    return <WiCloudy size={size} color="#B0C4DE" />;
  if (currentTemp < 15) return <WiSnow size={size} color="#E0FFFF" />;
  return <WiDaySunny size={size} color="#FFD700" />;
};

const ForecastCard = ({ date, maxTemp }) => (
  <div className="forecast-card-node">
    <p className="mb-1">
      {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
    </p>
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
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
      );
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

  if (isLoading)
    return (
      <div className="loader-placeholder-node">
        <h3>Loading Weather Data...</h3>
      </div>
    );

  return (
    <main className="weather-root-frame">
      <div className="weather-main-layout">
        <section className="left-weather-sidebar">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getCoordinates(inputCity);
              setInputCity("");
            }}
          >
            <input
              className="input-field-element"
              placeholder="Search City..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
          </form>

          <div className="sidebar-center-content">
            <TempBasedIcon temp={weather?.current?.temperature_2m} size={130} />
            <h1 className="temp-text-large">
              {Math.round(weather?.current?.temperature_2m)}°C
            </h1>
            <div className="sidebar-meta-row">
              <h3 className="city-title-text">{searchCity}</h3>
              <h4 className="day-subtitle-text">
                {new Date().toLocaleDateString("en-US", { weekday: "long" })}
              </h4>
            </div>
          </div>

          <div className="sidebar-divider-line"></div>

          <div className="sidebar-bottom-meta">
            <div className="info-row-item">
              <p>Humidity</p>
              <span>{weather?.current?.relative_humidity_2m}%</span>
            </div>
            <div className="info-row-item">
              <p>Wind Speed</p>
              <span>{weather?.current?.wind_speed_10m} km/h</span>
            </div>
          </div>
        </section>

        <section className="right-weather-dashboard">
          <h4 className="section-heading-text">7 Days Forecast</h4>
          <div className="forecast-scroll-row">
            {weather?.daily?.time.map((date, i) => (
              <ForecastCard
                key={date}
                date={date}
                maxTemp={weather.daily.temperature_2m_max[i]}
              />
            ))}
          </div>

          <h4 className="section-heading-text">Today's Overview</h4>

          <div className="overview-cards-grid">
            <div className="overview-item-card">
              <p>UV Index</p>
              <div className="icon-wrapper-node">
                <WiDaySunny size={45} color="#FF8C00" />
              </div>
              <h4>{weather?.daily?.uv_index_max?.[0] ?? "N/A"}</h4>
            </div>

            <div className="overview-item-card">
              <p>Pressure</p>
              <div className="icon-wrapper-node">
                <WiBarometer size={45} color="#00BFFF" />
              </div>
              <h4>{weather?.current?.surface_pressure} hPa</h4>
            </div>

            <div className="overview-item-card">
              <p>Precipitation</p>
              <div className="icon-wrapper-node">
                <WiRaindrop size={45} color="#00BFFF" />
              </div>
              <h4>
                {weather?.daily?.precipitation_probability_max?.[0] !==
                undefined
                  ? `${weather.daily.precipitation_probability_max[0]}%`
                  : "N/A"}
              </h4>
            </div>

            <div className="overview-item-card">
              <p>Sunrise</p>
              <div className="icon-wrapper-node">
                <WiSunrise size={45} color="#FFD700" />
              </div>
              <h4>
                {weather?.daily?.sunrise?.[0]
                  ? new Date(weather.daily.sunrise[0]).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </h4>
            </div>

            <div className="overview-item-card">
              <p>Sunset</p>
              <div className="icon-wrapper-node">
                <WiSunset size={45} color="#FF8C00" />
              </div>
              <h4>
                {weather?.daily?.sunset?.[0]
                  ? new Date(weather.daily.sunset[0]).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
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
