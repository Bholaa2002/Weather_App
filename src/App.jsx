import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "e107ea605acb4cbb84a95324252309";


  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
      );
      const data = res.data;
      setWeatherData({
        city: data.location.name,
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        icon: `https:${data.current.condition.icon}`,
      });
    } catch (err) {
      console.error(err);
      setError("City not found or API error");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError("");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await axios.get(
              `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
            );
            const data = res.data;
            setWeatherData({
              city: data.location.name,
              temp: data.current.temp_c,
              humidity: data.current.humidity,
              wind: data.current.wind_kph,
              icon: `https:${data.current.condition.icon}`,
            });
          } catch (err) {
            console.error(err);
            setError("Unable to fetch weather from location");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error(err);
          setError("Permission denied or location unavailable");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported in this browser.");
    }
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌤️ My Weather App</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={() => fetchWeatherByCity(city)} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p style={styles.message}>Loading...</p>}
      {error && <p style={{ ...styles.message, color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={styles.cardWrapper}>
          <WeatherCard {...weatherData} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #89f7fe, #66a6ff)",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
  },
  searchBox: {
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    width: "250px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "12px 20px",
    marginLeft: "10px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#ff7eb3",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#ff4e8d",
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  message: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};

export default App;
