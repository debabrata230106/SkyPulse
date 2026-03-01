export async function getCoords(city) {
  // Step 1: Get lat/lon
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
  );
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    return null;
  }

  const { latitude, longitude } = geoData.results[0];

  return { latitude, longitude };
}
