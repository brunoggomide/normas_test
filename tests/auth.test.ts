import request from "supertest";
import { app } from "../src/server";
import mongoose from "mongoose";
import User from "../src/models/user.model";

const testEmail = "auth.test@example.com";
const testPassword = "123456";

describe("Auth Endpoints", () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI as string);
        }
    });

    afterAll(async () => {
        await User.deleteMany({ email: testEmail });
        await mongoose.connection.close();
    });

    it("should signin a new user", async () => {
        const res = await request(app)
            .post("/auth/signin")
            .send({ email: testEmail, password: testPassword });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("User created successfully.");
    });

    it("should log in with correct credentials", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: testEmail, password: testPassword });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it("should reject login with invalid credentials", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: testEmail, password: "wrongpassword" });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid credentials.");
    });
});
