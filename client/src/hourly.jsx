import { useState } from "react";
import "./hourly.css";

export default function Hourly({ weather, monthnames, degree }) {
  const [userSelectedDate, setUserSelectedDate] = useState(null);
  const [dateHover, setDateHover] = useState(null);

  const defaultDate = weather?.hourlyData
    ? Object.keys(weather.hourlyData)[0]
    : null;

  const selectedDate = userSelectedDate ?? defaultDate;

  const setSelectedDate = (date) => {
    setUserSelectedDate(date);
  };

  return (
    <div id="hourly">
      <h4>
        <i className="fa-solid fa-clock"></i> Hourly Weather
      </h4>
      <div id="hourly-1">
        <div id="dates">
          {weather &&
            Object.keys(weather.hourlyData).map((each) => {
              return (
                <button
                  key={each}
                  id={each}
                  className={`date-btn ${
                    selectedDate === each ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedDate(each);
                  }}
                >
                  <span
                    className="date"
                    onMouseEnter={() => setDateHover(each)}
                    onMouseLeave={() => setDateHover(null)}
                  >{`${each.split("/")[0]}`}</span>
                  <span
                    className={(dateHover === each) ? "mon-year show" : "mon-year"}
                  >{`${monthnames[Number(each.split("/")[1]) - 1].slice(0, 3)} ${each.split("/")[2]}`}</span>
                </button>
              );
            })}
        </div>
        <div id="hourly-weather">
          {weather?.hourlyData?.[selectedDate] &&
            Object.keys(weather.hourlyData[selectedDate]).map((hour) => {
              const eachday = weather.hourlyData[selectedDate][hour];
              return (
                <div key={hour} className="hour">
                  <p id="hour">{hour}</p>
                  {degree == "celc" ? (
                    <h2 id="temp">{eachday.temperature.far}</h2>
                  ) : (
                    <h2 id="temp">{eachday.temperature.celc}</h2>
                  )}
                  <p className="small">
                    <i className="fa-solid fa-droplet"></i> Humidity
                  </p>
                  <h4>{eachday.humidity}</h4>
                  <p className="small">
                    <i className="fa-solid fa-wind"></i> Windspeed
                  </p>
                  <h4>{eachday.windspeed}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
