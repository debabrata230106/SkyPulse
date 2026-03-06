export async function searchCity(
  cityName,
  dispatch,
  navigate,
  fetchWeather,
  checkCity,
) {
  if (!cityName) return; // nothing happens if input is empty

  dispatch({ type: "LOADING" });
  try {
    // Step 1: Check if city exists
    const coords = await checkCity(cityName, navigate);

    if (!coords?.latitude) {
      dispatch({ type: "DONE" });
      return;
    }

    // Step 2: Fetch weather
    const data = await fetchWeather(coords);

    if (!data) {
      navigate("/error"); // API failure
      dispatch({ type: "DONE" });
      return;
    }

    dispatch({ type: "SET_USER_CITY", payload: cityName });
    dispatch({ type: "SET_WEATHER", payload: data });
  } catch (err) {
    console.error(err);
  }
  dispatch({ type: "DONE" });
}

export default searchCity;
