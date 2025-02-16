import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const authRoute = express.Router();

authRoute.post("/signup", signUp);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

authRoute.put("/update-profile", protectRoute, updateProfile);

authRoute.get("/check", protectRoute, checkAuth);

export default authRoute;
