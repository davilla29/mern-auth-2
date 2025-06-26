import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import userRoutes from "../api/routes/user.route.js";
import authRoutes from "../api/routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use(cookieParser()); //Used to parse cookies

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  // serve optimized react application as a static asset
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// Middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
