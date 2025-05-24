import { Request, Response } from "express";
import { searchImages } from "../services/unsplash.service";

export const getImages = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.query as string;
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        if (!query) {
            res.status(400).json({ message: "Missing query parameter." });
            return;
        }

        const images = await searchImages(query, page, perPage);
        res.status(200).json(images);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
