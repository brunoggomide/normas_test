import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const authMiddleware: RequestHandler = async (
    req,
    res,
    next
): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ message: "Invalid token: user not found" });
            return;
        }

        (req as AuthenticatedRequest).userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
