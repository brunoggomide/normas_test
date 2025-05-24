import { Router } from "express";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// @ts-expect-error false positive from VSCode
router.use(authMiddleware);

router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:id", deleteFavorite);

export default router;
