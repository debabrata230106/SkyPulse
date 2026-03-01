export async function checkCity(city) {
  try {
    const geoRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/coord?city=${encodeURIComponent(city)}`,
    );

    if (!geoRes.ok) {
      throw new Error();
    }

    const geoData = await geoRes.json();
    console.log("geoData from checkCity.js:", geoData);
    return geoData;
  }
  catch (err) {
    const msg = "Coordinates not found for this city!";
    console.error("Error fom checkCity.js:", err, msg);
    return null;
  }
}

export default checkCity;
