import express from "express";
import { config as connectDB } from "./config/db.js";
import { Server, Socket } from "socket.io";
import http from "http";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { socketHandlers } from "./sockets/chatSocket.js";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socketHandlers(io);
connectDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(authRouter);

const PORT = 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
