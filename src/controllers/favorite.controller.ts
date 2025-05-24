import { Request, Response } from "express";
import Favorite from "../models/favorite.model";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const addFavorite = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { imageId, description, urls } = req.body;
        const userId = req.userId;

        if (!imageId || !urls || !urls.regular) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }

        const exists = await Favorite.findOne({ userId, imageId });
        if (exists) {
            res.status(409).json({ message: "Image already favorited." });
            return;
        }

        const favorite = await Favorite.create({ userId, imageId, description, urls });
        res.status(201).json(favorite);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const getFavorites = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(favorites);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFavorite = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const deleted = await Favorite.findOneAndDelete({ _id: id, userId });

        if (!deleted) {
            res.status(404).json({ message: "Favorite not found." });
            return;
        }

        res.status(200).json({ message: "Favorite removed." });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
