import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/Images.js";
import { ensureImagesTable } from "./Models/Images.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// CORS
app.use(
  cors({
    origin: [
      "https://images-upload-sigma.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// 🔥 Ensure DB table on startup
ensureImagesTable();

// Routes
app.use('/api/images', router);

app.get("/", (req, res) => res.send("API running OK"));

app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);
