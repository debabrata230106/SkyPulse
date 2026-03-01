function getWeatherDescription(wcode) {
  const weatherMap = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Cloudy", /////////
    45: "Fog",
    48: "Foggy",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle", ///////
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain", /////
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow", ///
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm", ///////
  };
  return weatherMap[wcode] || "Unknown";
}

function generateDateTime(dt) {
  const date = dt.split("T")[0]; // "2025-12-16"
  const time = dt.split("T")[1]; // "16:45"
  const year = date.split("-")[0]; // "2025"
  const month = date.split("-")[1]; // "12"
  const day = date.split("-")[2]; // "16"
  const readableDate = `${day}/${month}/${year}`; // "16/12/2025"
  return {
    time: time,
    day: day,
    month: month,
    year: year,
    date: readableDate,
  };
}

function convertToFar(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

function makeDataset(data) {
  const currentData = {
    ...generateDateTime(data.current_weather.time),
    dayOrNight: Number(data.current_weather.is_day) === 1 ? "day" : "night",
    description: getWeatherDescription(data.current_weather.weathercode),
    temperature: {
      celc: `${data.current_weather.temperature} °C`,
      far: `${convertToFar(data.current_weather.temperature)} °F`
    },
    windspeed: `${data.current_weather.windspeed} ${data.current_weather_units.windspeed}`,
    winddirection: `${data.current_weather.winddirection} ${data.current_weather_units.winddirection}`,
  };

  const dailyData = {};
  const hourlyData = {};

  for (let j = 0; j < 7; j++) {
    const date = generateDateTime(data.hourly.time[j * 24]).date;
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let totalHumidity = 0;
    let totalWindspeed = 0;

    hourlyData[date] = {};

    for (let i = j * 24; i < (j + 1) * 24; i++) {
      const currentTemp = data.hourly.temperature_2m[i];
      const currentHumid = data.hourly.relativehumidity_2m[i];
      const currentWind = data.hourly.windspeed_10m[i];

      maxTemp = Math.max(maxTemp, currentTemp);
      minTemp = Math.min(minTemp, currentTemp);
      totalHumidity += currentHumid;
      totalWindspeed += currentWind;

      const time = generateDateTime(data.hourly.time[i]).time;
      hourlyData[date][time] = {
        humidity: `${currentHumid} ${data.hourly_units.relativehumidity_2m}`,
        temperature: {
          celc: `${currentTemp} °C`,
          far: `${convertToFar(currentTemp)} °F`,
        },
        windspeed: `${currentWind} ${data.hourly_units.windspeed_10m}`,
      };
    }

    // Move averages outside the inner loop for efficiency
    dailyData[date] = {
      humidity: `${(totalHumidity / 24).toFixed(1)} ${data.hourly_units.relativehumidity_2m}`,
      maxtemperature: {
        celc: `${maxTemp} °C`,
        far: `${convertToFar(maxTemp)} °F`,
      },
      mintemperature: {
        celc: `${minTemp} °C`,
        far: `${convertToFar(minTemp)} °F`,
      },
      windspeed: `${(totalWindspeed / 24).toFixed(1)} ${data.hourly_units.windspeed_10m}`,
    };
  }

  return { currentData, dailyData, hourlyData };
}

export async function fetchWeather({ latitude, longitude }) {
  try {
    // Step 2: Get weather
    const weatherRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/weather?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`,
    );
    const weatherData = await weatherRes.json();
    console.log("weather data from open-meteo", weatherData); //data successfully fetched from open-meteo api

    return makeDataset(weatherData);
  } catch (err) {
    console.error("weather data can't fetched from open-meteo api", err); // data not fetched

    return null;
  }
}

export default fetchWeather;
// const hourlyObject = {
//   "13/11/2025": {
//     "00:00": {
//       humidity: "50%",
//       windspeed: "10 km/h",
//       temperature: {
//         celc: "20 °C",
//         far: "X °F",            
//       }
//     },
//     "01:00": {},
//     "02:00": {},
//     "03:00": {},
//   },
//   "14/11/2025": {},
//   "15/11/2025": {},
//   "16/11/2025": {},
// };
// const dailyObject = {
//   "13/11/2025": {
//     maxtemp: {
//         celc: "20 °C",
//         far: "X °F",            
//       },
//     mintemp: {
//         celc: "10 °C",
//         far: "X °F",            
//       },
//     humidity: "50%",
//     windspeed: "10 km/h",
//   },
//   "14/11/2025": {},
//   "15/11/2025": {},
//   "16/11/2025": {},
// };
