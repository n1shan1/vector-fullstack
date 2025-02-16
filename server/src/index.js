import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables at the very beginning

import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, io, app } from "./lib/socket.js";
import path from "path";
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Route configurations
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 5000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`[server]: Server is running on port ${port}`);
  connectDB();
});
