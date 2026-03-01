// searchHandler.js
import { checkCity } from "./checkCity.js";
import { fetchWeather } from "./fetchWeather.js";

export async function searchCity(cityName, dispatch) {
  if (!cityName) return; // nothing happens if input is empty

  dispatch({ type: "LOADING" });

  const coords = await checkCity(cityName);

  if (!coords?.latitude) {
    alert("Coordinates not found for this city!");
    dispatch({ type: "DONE" });
    return; // nothing happens if coordinates is not found
  }

  const data = await fetchWeather(coords);

  if (!data) {
    alert("Weather data not found for this city!");
    dispatch({ type: "DONE" });
    return; // nothing happens if weather data is not found
  }

  dispatch({ type: "SET_USER_CITY", payload: cityName });
  dispatch({ type: "SET_WEATHER", payload: data }); 
  dispatch({ type: "DONE" });
  return;
}

export default searchCity;