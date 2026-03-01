import express from "express";
import { getCityFromCoords } from "../services/citynameService.js";

const router = express.Router();

router.get("/cityname", async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude is required" });
  }

  try {
    const result = await getCityFromCoords({ latitude, longitude });
    console.log("data from Open-meteo reverse geocoding api", result);
    res.json(result);
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    res.status(500).json({ city: "Unknown" });
  }
});

export default router;