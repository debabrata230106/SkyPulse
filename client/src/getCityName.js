export async function getCityName({ latitude, longitude }) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/cityname?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`
    );

    const data = await res.json();
    console.log("city name from Open-meteo reverse geocoding api", data.city);
    return data.city;
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return null;
  }
}

export default getCityName;