export async function searchCity(cityName, dispatch, navigate, fetchWeather, checkCity) {
  if (!cityName) return; // nothing happens if input is empty

  dispatch({ type: "LOADING" });

  const coords = await checkCity(cityName);

  if (!coords?.latitude) {
    navigate("/error");
    alert("Coordinates not found!");
    dispatch({ type: "DONE" });
    return; // nothing happens if coordinates is not found
  }

  const data = await fetchWeather(coords);

  if (!data) {
    navigate("/error");
    alert("Weather data not found this time!");
    dispatch({ type: "DONE" });
    return; // nothing happens if weather data is not found
  }

  dispatch({ type: "SET_USER_CITY", payload: cityName });
  dispatch({ type: "SET_WEATHER", payload: data }); 
  dispatch({ type: "DONE" });
  return;
}

export default searchCity;