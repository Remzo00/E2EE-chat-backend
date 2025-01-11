import express from "express";
import {
  handleSaveMessage,
  handleGetMessages,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/api/message", handleSaveMessage);
messageRouter.get("/api/messages/:room", handleGetMessages);

export default messageRouter;
