import express from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUsersController,
  getUserController,
} from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/api/register", register);
authRouter.post("/api/login", login);
authRouter.get("/api/users", authMiddleware, getAllUsersController);
authRouter.get("/api/user/:id", authMiddleware, getUserController);

export default authRouter;
