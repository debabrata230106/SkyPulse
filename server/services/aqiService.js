// import cache from "../utils/cache.js";

// export async function getAQI(city) {
//   if (!city) return { aqi: -1 };

//   const cacheKey = `aqi-${city.toLowerCase()}`;

//   // 1️⃣ Check cache first
//   const cached = cache.get(cacheKey);
//   if (cached) {
//     console.log("Returning AQI from cache");
//     return cached;
//   }

//   try {
//     const token = process.env.WAQI_TOKEN;

//     const res = await fetch(
//       `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`
//     );

//     if (!res.ok) throw new Error("WAQI request failed");

//     const data = await res.json();

//     if (data.status !== "ok") {
//       return { aqi: -1 };
//     }

//     const result = { aqi: parseInt(data.data.aqi) };

//     // 2️⃣ Save in cache (15 minutes is ideal for AQI)
//     cache.set(cacheKey, result, 900);

//     return result;
//   } catch (err) {
//     console.error("AQI fetch error:", err);
//     return { aqi: -1 };
//   }
// }


// import cache from "../utils/cache.js";

export async function getAQI(city) {
  if (!city) return { aqi: null };

  // const cacheKey = `aqi-${city.toLowerCase()}`;

  // // 1️⃣ Check cache first
  // const cached = cache.get(cacheKey);
  // if (cached) {
  //   console.log("Returning AQI from cache");
  //   return cached;
  // }

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
    }
    const result = { aqi: parseInt(aqi) };

    // 2️⃣ Save in cache (15 minutes is ideal for AQI)
    cache.set(cacheKey, result, 900);

    return result;
  } catch (err) {
    console.error("AQI fetch error:", err);
    return { aqi: null };
  }
}