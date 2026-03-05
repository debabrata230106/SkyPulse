export async function getAQI(city) {
  try {
    const token = process.env.WAQI_TOKEN;

    const res = await fetch(
      `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`
    );

    if (!res.ok) throw new Error("AQI api: WAQI request failed");

    const data = await res.json();
    const aqi = data.data.aqi;
    
    if (aqi === null) {
      return { aqi: null };
    } else {
      return { aqi: parseInt(aqi) };
    }
  } catch (err) {
    console.error("AQI fetch error from backend aqiService.js:", err);
    return { aqi: null };
  }
}