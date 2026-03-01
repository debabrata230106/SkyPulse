import express from "express";
import { getAQI } from "../services/aqiService.js";

const router = express.Router();

router.get("/aqi", async (req, res) => {
  const city = req.query.city?.trim();

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const result = await getAQI(city);

    // Allow browser caching
    res.set("Cache-Control", "public, max-age=600");

    return res.json(result || { aqi: null });
  } catch (err) {
    console.error("AQI Route Error:", err);
    return res.status(500).json({ aqi: null });
  }
});

export default router;