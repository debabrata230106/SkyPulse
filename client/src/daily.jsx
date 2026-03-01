import "./daily.css";

export default function Daily({ weather, monthnames, degree }) {
  return (
    <div id="right">
      <h4>
        <i className="fa-solid fa-calendar-days"></i> Daily Weather
      </h4>
      <div id="daily-divs">
        {weather &&
          Object.keys(weather.dailyData).map((day) => {
            const dayWeather = weather.dailyData[day]; // get the value object
            const parts = day.split("/"); // split the date into [year, month, day] array
            const monthname = monthnames[parts[1] - 1]; // get the month name from the array using index of month parts[1];
            return (
              <div className="daily" key={day}>
                <h5>{`${parts[0]} ${monthname} ${parts[2]}`}</h5>
                {/* prints the date */}
                <div className="daily-weather">
                  <div className="daily-temp">
                    <div>
                      <p>
                        <i className="fa-solid fa-temperature-arrow-up"></i> Max
                        Temp
                      </p>
                      {degree == "celc" ? (
                        <h2>{dayWeather.maxtemperature.far}</h2>
                      ) : (
                        <h2>{dayWeather.maxtemperature.celc}</h2>
                      )}
                    </div>
                    <div>
                      <p>
                        <i className="fa-solid fa-temperature-arrow-down"></i>{" "}
                        Min Temp
                      </p>
                      {degree == "celc" ? (
                        <h2>{dayWeather.maxtemperature.far}</h2>
                      ) : (
                        <h2>{dayWeather.maxtemperature.celc}</h2>
                      )}
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>
                        <i className="fa-solid fa-droplet"></i> Humidity
                      </p>
                      <h4>{dayWeather.humidity}</h4>
                    </div>
                    <div>
                      <p>
                        <i className="fa-solid fa-wind"></i> Windspeed
                      </p>
                      <h4>{dayWeather.windspeed}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
