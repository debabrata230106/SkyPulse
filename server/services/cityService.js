export async function searchCities(prefix) {
  const res = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${prefix}&limit=5`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );

  const data = await res.json();
  console.log(data);
  // Only return what frontend needs
  return data.data.map((city) => city.city);
}