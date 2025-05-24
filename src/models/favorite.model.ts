import { Schema, model, Document } from "mongoose";

interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface Favorite extends Document {
    userId: string;
    imageId: string;
    description?: string;
    urls: Urls;
    createdAt: Date;
}

const favoriteSchema = new Schema<Favorite>(
    {
        userId: { type: String, required: true },
        imageId: { type: String, required: true },
        description: { type: String },
        urls: {
            raw: { type: String, required: true },
            full: { type: String, required: true },
            regular: { type: String, required: true },
            small: { type: String, required: true },
            thumb: { type: String, required: true },
        },
        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

export default model<Favorite>("Favorite", favoriteSchema);
