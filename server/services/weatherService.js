export async function fetchWeather({ latitude, longitude }) {
  try {
    // Step 2: Get weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`,
    );
    const weatherData = await weatherRes.json();

    return weatherData;
  } catch (err) {
    console.error(err); // data not fetched
    return null;
  }
}