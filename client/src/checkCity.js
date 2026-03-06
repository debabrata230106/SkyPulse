export async function checkCity(city, navigate) {
  try {
    const geoRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/coord?city=${encodeURIComponent(city)}`,
    );

    if (geoRes.status === 404) {
      alert("City not found!");
      return null;
    }

    const geoData = await geoRes.json();
    console.log("geoData from checkCity.js:", geoData);
    if (!geoData) throw new Error("City not found!");

    return geoData;
  }
  catch (err) {
    console.error("Error fom checkCity.js:", err);
    alert("City not found!");
    navigate("/error");
    return null;
  }
}

export default checkCity;
