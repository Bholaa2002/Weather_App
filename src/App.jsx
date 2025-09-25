import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]); // now an array to store multiple cards
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "e107ea605acb4cbb84a95324252309"; // replace with your WeatherAPI key

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      const data = res.data;

      // Add the new city to the array
      setWeatherData((prev) => [
        ...prev,
        {
          city: data.location.name,
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          icon: `https:${data.current.condition.icon}`,
        },
      ]);
      setCity(""); // clear input
    } catch (err) {
      console.error(err);
      setError("City not found or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Weather App 🌤️</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={styles.cardsContainer}>
        {weatherData.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  searchBox: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    marginLeft: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "20px",
  },
};

export default App;
