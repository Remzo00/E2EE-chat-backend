import express from "express";
import { register, login } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/api/register", register);
authRouter.post("/api/login", login);

export default authRouter;
