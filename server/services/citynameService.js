export async function getCityFromCoords({ latitude, longitude }) {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
    );

    const data = await res.json();

    if (!data.results || data.results.length === 0) return { city: "Unknown" };

    // console.log("data from Open-meteo reverse geocoding api", data.results);
    return { city: data.results[0].name };
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return { city: "Unknown" };
  }
}
