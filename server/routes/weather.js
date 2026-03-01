import express from "express";
import { fetchWeather } from "../services/weatherService.js";

const router = express.Router();

router.get("/weather", async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude is required" });
  }

  try {
    const result = await fetchWeather({ latitude, longitude });
    if (!result) {
      return res.status(404).json(null);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(null);
  }
});

export default router;