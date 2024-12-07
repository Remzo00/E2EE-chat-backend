import express from "express";
import { config as connectDB } from "./config/db.js";

const app = express();

connectDB();

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
