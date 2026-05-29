import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@errors/app.error.js";
import generateToken from "@helpers/jwt.helper.js";
import { createAuthTestApp } from "@tests/helpers/createAuthTestApp.js";
import mockAuthService from "@tests/mocks/services/authService.mock.js";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const validToken = generateToken({
  id: 1,
  email: "test@test.com",
  role: "visitor",
});

const app = createAuthTestApp(mockAuthService);

describe("Auth API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/v1/auth/login", () => {
    it("returns 200 and sets cookie on valid credentials", async () => {
      mockAuthService.login.mockResolvedValue({ token: "mock.jwt.token" });

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "test@test.com", password: "password123" });
      expect(res.status).toBe(200);
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(res.body).toEqual({ message: "Logged in successfully" });
    });

    it("returns 401 on invalid credentials", async () => {
      mockAuthService.login.mockRejectedValue(
        new UnauthorizedError("Invalid email or password"),
      );

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "test@test.com", password: "wrongpassword" });

      expect(res.status).toBe(401);
    });

    it("returns 400 when email is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ password: "password123" });

      expect(res.status).toBe(400);
    });

    it("returns 400 when email is invalid", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "notanemail", password: "password123" });

      expect(res.status).toBe(400);
    });

    it("returns 400 when password is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "test@test.com" });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/v1/auth/register", () => {
    it("returns 201 on successful registration", async () => {
      mockAuthService.register.mockResolvedValue(undefined);

      const res = await request(app).post("/api/v1/auth/register").send({
        email: "new@test.com",
        password: "password123",
        firstname: "Jane",
        lastname: "Doe",
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: "User registered successfully" });
    });

    it("returns 409 when email already in use", async () => {
      mockAuthService.register.mockRejectedValue(
        new ConflictError("Email already in use"),
      );

      const res = await request(app).post("/api/v1/auth/register").send({
        email: "test@test.com",
        password: "password123",
        firstname: "Jane",
        lastname: "Doe",
      });

      expect(res.status).toBe(409);
    });

    it("returns 400 when email is missing", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        password: "password123",
        firstname: "Jane",
        lastname: "Doe",
      });

      expect(res.status).toBe(400);
    });

    it("returns 400 when email is invalid", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        email: "notanemail",
        password: "password123",
        firstname: "Jane",
        lastname: "Doe",
      });

      expect(res.status).toBe(400);
    });

    it("returns 400 when firstname is missing", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        email: "new@test.com",
        password: "password123",
        lastname: "Doe",
      });

      expect(res.status).toBe(400);
    });

    it("returns 400 when lastname is missing", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        email: "new@test.com",
        password: "password123",
        firstname: "Jane",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/v1/auth/me", () => {
    it("returns 200 with user data", async () => {
      mockAuthService.getMe.mockResolvedValue({
        id: "user123",
        email: "test@test.com",
        firstname: "John",
        lastname: "Doe",
      });
      const res = await request(app)
        .get("/api/v1/auth/me")
        .set("Cookie", `session_token=${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: "user123",
        email: "test@test.com",
        firstname: "John",
        lastname: "Doe",
      });
    });

    it("returns 401 when no token provided", async () => {
      const res = await request(app).get("/api/v1/auth/me");

      expect(res.status).toBe(401);
    });

    it("returns 404 when user not found", async () => {
      mockAuthService.getMe.mockRejectedValue(
        new NotFoundError("User not found"),
      );

      const res = await request(app)
        .get("/api/v1/auth/me")
        .set("Cookie", `session_token=${validToken}`);

      expect(res.status).toBe(404);
    });
  });
});
