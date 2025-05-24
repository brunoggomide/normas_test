import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(409).json({ message: "Email is already registered." });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully." });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
