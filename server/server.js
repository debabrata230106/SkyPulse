import express from "express";

// allow frontend to call backend
import cors from "cors";

// api routes
import aqiRoutes from "./routes/aqi.js";
import cityRoutes from "./routes/cities.js";
import citynameRoutes from "./routes/cityname.js";
import coordRoutes from "./routes/coord.js";
import weatherRoutes from "./routes/weather.js";
import User from "./models/User.js";

import dotenv from "dotenv";
dotenv.config();
import rateLimit from "express-rate-limit";
import mongoose from 'mongoose';
import compression from "compression";
import morgan from "morgan";


const app = express();
const PORT = process.env.PORT || 3000;

// app.use(limiter);

// allow frontend to call backend
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", aqiRoutes);
app.use("/api", cityRoutes);
app.use("/api", citynameRoutes);
app.use("/api", coordRoutes);
app.use("/api", weatherRoutes);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variables");
}

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // max 100 requests per IP
//   message: "Too many requests. Please try again later."
// });

// mongoDB set up 
const MONGO_URI = process.env.MONGO_URI;
main().then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.log(err);
}); 
async function main() {
    await mongoose.connect(MONGO_URI);
}


// // insert test data
// async function insertTest() {
//   const newUser = new User({
//     username: "Debabrata",
//     rating: 5,
//     review: "Nice app"
//   });

//   await newUser.save();
//   console.log("Test data inserted");
// }
// insertTest();

// db route
// GET route
app.get("/usersdata", async (req, res) => {
  try {
    const users = await User.find().sort({ updatedAt: -1 }); // latest first
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST route
app.post("/savedb", async (req, res) => {
  try {
    const { username, rating, review } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { username: username },   // find same username
      { rating: rating, review: review }, // update these fields
      {
        new: true,
        upsert: true,   // ⭐ create if not exists
        runValidators: true
      }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("/", (req, res) => {
    res.send("SkyPulse Server is Running 🚀");
})
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})