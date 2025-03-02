import express from "express";
import { verifyEmailToken } from "../controllers/authController.js";

const emailRouter = express.Router();

emailRouter.get("/api/verify/:token", verifyEmailToken);

export default emailRouter;
