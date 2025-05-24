import request from "supertest";
import { app } from "../src/server";
import mongoose from "mongoose";

describe("Search Endpoints", () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI as string);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should return search results from Unsplash", async () => {
        const res = await request(app).get("/search?query=dogs&page=1&perPage=5");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        const image = res.body[0];
        expect(image).toHaveProperty("id");
        expect(image).toHaveProperty("urls");
        expect(image.urls).toHaveProperty("regular");
    });

    it("should return 400 if query is missing", async () => {
        const res = await request(app).get("/search");

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing query parameter.");
    });
});
