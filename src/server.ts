import express from "express";
import { connectToDatabase } from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import searchRoutes from "./routes/search.routes";
import favoriteRoutes from "./routes/favorite.routes";

dotenv.config();

connectToDatabase();

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API do Unsplash está rodando 🚀");
});

app.use("/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/favorites", favoriteRoutes);
