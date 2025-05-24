import { Router } from "express";
import { getImages } from "../controllers/search.controller";

const router = Router();

router.get("/", getImages);

export default router;
