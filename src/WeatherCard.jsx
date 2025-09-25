import React from "react";

function WeatherCard({ city, temp, humidity, wind, icon }) {
    return (
        <div style={styles.card}>
            <h2>{city}</h2>
            {icon && <img src={icon} alt="weather icon" />}
            <p>Temperature: {temp}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind: {wind} km/h</p>
        </div>
    );
}

const styles = {
    card: {
        background: "#f0f8ff",
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "200px",
        textAlign: "center",
    },
};

export default WeatherCard;
