import request from "supertest";
import { app } from "../src/server";
import mongoose from "mongoose";
import User from "../src/models/user.model";
import Favorite from "../src/models/favorite.model";

const testEmail = "favorite.test@example.com";
const testPassword = "123456";

let token: string;
let favoriteId: string;

describe("Favorite Endpoints", () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI as string);
        }

        await request(app).post("/auth/signin").send({
            email: testEmail,
            password: testPassword
        });

        const res = await request(app).post("/auth/login").send({
            email: testEmail,
            password: testPassword
        });

        token = res.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({ email: testEmail });
        await Favorite.deleteMany({});
        await mongoose.connection.close();
    });

    it("should add an image to favorites", async () => {
        const res = await request(app)
            .post("/favorites")
            .set("Authorization", `Bearer ${token}`)
            .send({
                imageId: "abc123",
                description: "Cute cat",
                urls: {
                    raw: "https://example.com/raw.jpg",
                    full: "https://example.com/full.jpg",
                    regular: "https://example.com/regular.jpg",
                    small: "https://example.com/small.jpg",
                    thumb: "https://example.com/thumb.jpg"
                }
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        favoriteId = res.body._id;
    });

    it("should return list of favorites", async () => {
        const res = await request(app)
            .get("/favorites")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty("imageId", "abc123");
    });

    it("should delete a favorite by ID", async () => {
        const res = await request(app)
            .delete(`/favorites/${favoriteId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Favorite removed.");
    });
});
