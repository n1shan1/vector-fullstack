import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUserForSidebar,
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";
const messageRouter = express();

messageRouter.get("/users", protectRoute, getUserForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessages);

export default messageRouter;
