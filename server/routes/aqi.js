import express from "express";
import { getAQI } from "../services/aqiService.js";

const router = express.Router();
// GET /api/aqi?query="kolkata"
router.get("/aqi", async (req, res) => {
  const city = req.query.city?.trim();

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const result = await getAQI(city);

    // // Allow browser caching
    // res.set("Cache-Control", "public, max-age=600");

    res.json(result);
  } catch (err) {
    console.error("AQI fetch error from backend aqi.js:", err);
    return { aqi: null };
  }
});

export default router;