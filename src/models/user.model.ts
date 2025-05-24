import { Schema, model, Document } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema = new Schema<User>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false,
    }
);

export default model<User>("User", userSchema);
