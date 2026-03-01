import express from "express";
import { getCoords } from "../services/coordService.js";

const router = express.Router();

router.get("/coord", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Error from backend: City is required" });
  }

  try {
    const result = await getCoords(city);

    if (!result) {
      return res.status(404).json(null);
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(null);
  }
});

export default router;
