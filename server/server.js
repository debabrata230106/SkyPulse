// packages
import express from "express"; // the main library for writing backend
import cors from "cors"; // allow frontend to call backend
import dotenv from "dotenv"; // for creating and fetching data from .env files
import mongoose from 'mongoose'; // the mongoDB package to connect with the database directly from vs code
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";

// api routes
import aqiRoutes from "./routes/aqi.js"; // for aqi data
import cityRoutes from "./routes/cities.js"; // for city suggestions 
import citynameRoutes from "./routes/cityname.js"; // to get the city name 
import coordRoutes from "./routes/coord.js"; // for coordinates
import weatherRoutes from "./routes/weather.js"; // for weather data
import User from "./models/User.js"; // for user data from frontend


const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(compression());
app.use(morgan("dev"));
app.use(helmet());
// api routes
app.use("/api", aqiRoutes);
app.use("/api", cityRoutes);
app.use("/api", citynameRoutes);
app.use("/api", coordRoutes);
app.use("/api", weatherRoutes);

// mongoDB set up
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variables");
}
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
app.get("/api/usersdata", async (req, res) => {
  try {
    const users = await User.find().sort({ updatedAt: -1 }); // latest first
    res.json(users);
  } catch (err) {
    res.status(500).json({ "error in getting data from server.js": err.message });
  }
});
// POST route
app.post("/api/savedb", async (req, res) => {
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
    res.status(500).json({ "error in updating database from server.js": err.message });
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