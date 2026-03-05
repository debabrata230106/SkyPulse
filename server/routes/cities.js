import express from "express";
import { searchCities } from "../services/cityService.js";

const router = express.Router();

// GET /api/cities?query="kol"
router.get("/cities", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const cities = await searchCities(query);
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

export default router;