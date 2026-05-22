import {
    AppError,
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from "@errors/app.error.js";
import errorHandler from "@middleware/errorHandler.middleware.js";
import type { NextFunction, Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it("returns the AppError status code and message", () => {
    const error = new AppError("Something went wrong", 418);

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong" });
  });

  it("returns 401 for UnauthorizedError", () => {
    const error = new UnauthorizedError("Invalid credentials");

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  it("returns 404 for NotFoundError", () => {
    const error = new NotFoundError("User not found");

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("returns 409 for ConflictError", () => {
    const error = new ConflictError("Email already in use");

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already in use" });
  });

  describe("unknown errors", () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it("returns 500 with the error message outside production", () => {
      process.env.NODE_ENV = "development";
      const error = new Error("Unexpected boom");

      errorHandler(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Unexpected boom" });
    });

    it("returns 500 with a generic message in production", () => {
      process.env.NODE_ENV = "production";
      const error = new Error("Unexpected boom");

      errorHandler(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
