import "./primary.css";
import Compass from "./compass.jsx";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 1. Fetch AQI
async function fetchAQI(cityName) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/aqi?city=${encodeURIComponent(cityName)}`,
    );
    const data = await res.json();
    console.log("aqi data fetched from primary.jsx", data);

    const aqi = data.aqi;
    if (aqi === null) {
      return null;
    }
    return data.aqi;
  } catch {
    return null;
  }
}

// 2. Determine color of the aqi circle
const AQIClr = styled.div`
    background-color: ${(props) => props.$aqiClr} !important;
  `;

export default function Primary({ weather, activeCity, monthnames, degree, setDegree }) {
  const [aqi, setAqi] = useState(-1);

  useEffect(() => {
    let active = true;
    if (!activeCity) {
      return;
    }
    fetchAQI(activeCity).then((val) => {
      if (active) setAqi(val);
    });
    return () => {
      active = false;
    };
  }, [activeCity]);

  // Safety check to prevent errors before data loads
  if (!weather || !weather.currentData) {
    return <></>;
  }

  const currentWeather = weather.currentData;
  const monthname = monthnames[Number(currentWeather.month) - 1];
  const windspeed = currentWeather.windspeed.split(" ")[0];
  // 2. Determine which icon to show
  const tempValueCelc = parseFloat(
    currentWeather.temperature.celc.split(" ")[0],
  );
  const tempValueFar = parseFloat(currentWeather.temperature.far.split(" ")[0]);
  let tempIcon;
  if (tempValueCelc >= 30) {
    tempIcon = (
      <i className="fa-solid fa-fire" style={{ color: "#ff4500" }}></i>
    ); // Hot
  } else if (tempValueCelc >= 10) {
    tempIcon = (
      <i
        className="fa-solid fa-temperature-low"
        style={{ color: "#4fc1ff" }}
      ></i>
    ); // Mild/Cool
  } else {
    tempIcon = (
      <i className="fa-regular fa-snowflake" style={{ color: "#a5f3fc" }}></i>
    ); // Cold
  }

  const dayNight = currentWeather.dayOrNight;
  let dayNightIcon;
  dayNight
    ? (dayNightIcon = <i className="fa-solid fa-sun"></i>)
    : (dayNightIcon = <i className="fa-solid fa-moon"></i>);

  const cond = currentWeather.description;
  let condIcon;
  if (cond == "Cloudy") {
    condIcon = <i className="fa-solid fa-cloud"></i>;
  } else if (cond == "Light rain" || cond == "Rain") {
    condIcon = <i className="fa-solid fa-cloud-rain"></i>;
  } else if (cond == "Heavy rain") {
    condIcon = <i className="fa-solid fa-cloud-showers-heavy"></i>;
  } else if (cond == "Snow" || cond == "Heavy snow") {
    condIcon = <i className="fa-solid fa-snowflake"></i>;
  } else if (cond == "Thunderstorm" || cond == "Severe Thunderstorm") {
    condIcon = <i className="fa-solid fa-bolt"></i>;
  } else if (cond == "Foggy") {
    condIcon = <i className="fa-solid fa-smog"></i>;
  } else if (cond == "Thunderstorm with hail") {
    condIcon = <i className="fa-solid fa-cloud-meatball"></i>;
  } else {
    condIcon = <></>;
  }

  let aqiColor;
  let aqiDescription;
  if (aqi >= 0 && aqi <= 50) {
    aqiColor = "#8be700";
    aqiDescription = "Good";
  } else if (aqi >= 51 && aqi <= 100) {
    aqiColor = "#f8f800";
    aqiDescription = "Moderate";
  } else if (aqi >= 101 && aqi <= 150) {
    aqiColor = "#ffae18";
    aqiDescription = "Unhealthy";
  } else if (aqi >= 151 && aqi <= 200) {
    aqiColor = "#ff0f0f";
    aqiDescription = "Hazardous";
  } else if (aqi >= 201 && aqi <= 300) {
    aqiColor = "#b210a4";
    aqiDescription = "Dangerous";
  } else {
    aqiColor = "#1e1e1e";
    aqiDescription = "Very Dangerous";
  }

  return (
    <div id="left1">
      <div id="left11">
        <div id="left111">
          <div id="degree-toggle">
            <div
              id="celc"
              className={degree == "celc" ? "active" : ""}
              onClick={() => setDegree("far")}
            >
              &deg;C
            </div>
            <div
              id="far"
              className={degree == "far" ? "active" : ""}
              onClick={() => setDegree("celc")}
            >
              &deg;F
            </div>
          </div>
          <div id="left-main">
            <div id="left1111">
              {degree == "celc" ? (
                <h1>
                  {tempIcon} {tempValueFar} <span>°F</span>
                </h1>
              ) : (
                <h1>
                  {tempIcon} {tempValueCelc} <span>°C</span>
                </h1>
              )}
              {aqi > 0 && aqi !== null && (
                <h5>
                  <i className="fa-solid fa-lungs"></i>AQI<span>{aqi}</span>
                  <AQIClr $aqiClr={aqiColor} id="aqi-clr" />
                  <p id="aqi-description">{aqiDescription}</p>
                </h5>
              )}
            </div>
            <div id="left1112">
              <div>
                {condIcon}
                {dayNightIcon}
              </div>
              <p>{currentWeather.description}</p>
            </div>
          </div>
        </div>
        <div id="left112">
          <p id="city-name">{`${activeCity}`}</p>
          <p>{`${currentWeather.time}`}</p>
          <p>{`${currentWeather.day} ${monthname} ${currentWeather.year}`}</p>
        </div>
      </div>
      <div id="left12">
        <div>
          <p>
            <i className="fa-solid fa-wind"></i> Windspeed
          </p>
          <h1>{windspeed}</h1>
          <h5>Km/h</h5>
        </div>
        <Compass degrees={currentWeather.winddirection} />
      </div>
    </div>
  );
}
