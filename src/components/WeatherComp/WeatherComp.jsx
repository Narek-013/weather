import sunImg from "../../images/sun.png";
import moonImg from "../../images/moon.png";
import citiesData from "../cities500.json";
import { useEffect, useState } from "react";
import { levenshteinEditDistance } from "levenshtein-edit-distance";

const WeatherComp = () => {
  const ApiKey = "80bbbd9e5774b4c633dc0b31adf48956";
  const hour = new Date().getHours();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const handlerSubmit = async (ev) => {
    ev.preventDefault();

    const inputCity = ev.target[0].value.trim();
    let city = citiesData.find((el) => el.name.toLowerCase() === inputCity.toLowerCase());

    // If no exact match, check for fuzzy match with one character difference
    if (!city) {
      city = citiesData.find((el) => levenshteinEditDistance(el.name.toLowerCase(), inputCity.toLowerCase()) <= 1);
    }

    if (city) {
      setCity(city.name);
      setError("");
    } else {
      setError("City not found. Please check your spelling.");
    }

    ev.target.reset();
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        setCity(data.region)
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const get = async () => {
      if (city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 400) {
          setWeather(null);
        } else {
          setWeather(data);
        }
      }
    };
    get();
  }, [city]);

  return (
    <div className="section">
      <p className="title">Search for city weather</p>
      <form className="section-top" onSubmit={handlerSubmit}>
        <input type="text" placeholder="Enter a city" required minLength={4} />
        <button>Weather</button>
      </form>
      {error && <p className="error-message">{error} ! ! !</p>}
      <div className="weather-desc">
        {weather && weather.main && (
          <div className="city-weather-desc">
            <div className="city-weather-desc-img">
              <img src={hour > 5 && hour < 20 ? sunImg : moonImg} alt="sun" />
            </div>
            <ul className="desc">
              <li>
                <h2 className="day">Today</h2>
              </li>
              <li>
                <h1>{weather.name}</h1>
              </li>
              <li>
                <p>Temperature:</p>
                <p>{Math.round(weather.main.temp)}°C</p>
              </li>
              <li>
                <p>Max-Temperature:</p>
                <p>{Math.round(weather.main.temp_max)}°C</p>
              </li>
              <li>
                <p>Min-Temperature:</p>
                <p>{Math.round(weather.main.temp_min)}°C</p>
              </li>
              <li>
                <p>Weather Description:</p>
                <p>{weather.weather[0].description}</p>
              </li>
              <li>
                <p>Wind speed:</p>
                <p>{weather.wind.speed} m/s</p>
              </li>
              <li>
                <p>Wind degree:</p>
                <p>{weather.wind.deg}°</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComp;
