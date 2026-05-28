import generateToken from "@helpers/jwt.helper.js";
import authenticate from "@middleware/authenticate.middleware.js";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("authenticate middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { cookies: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it("calls next when token is valid", () => {
    const token = generateToken({
      id: 1,
      email: "test@test.com",
      role: "visitor",
    });
    req.cookies = { session_token: token };

    authenticate(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user).toMatchObject({
      id: 1,
      email: "test@test.com",
      role: "visitor",
    });
  });

  it("returns 401 when no token provided", () => {
    expect(() => authenticate(req as Request, res as Response, next)).toThrow(
      "No token provided",
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when token is invalid", () => {
    req.cookies = { session_token: "not.a.valid.token" };

    expect(() => authenticate(req as Request, res as Response, next)).toThrow(
      "The request is invalid. Please check your login details.",
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 with session expired message when token is expired", () => {
    const expiredToken = jwt.sign(
      { id: 1, email: "test@test.com", role: "visitor" },
      process.env.PRIVATE_KEY!,
      { expiresIn: -1 },
    );
    req.cookies = { session_token: expiredToken };

    expect(() => authenticate(req as Request, res as Response, next)).toThrow(
      "Your session has expired. Please log in again.",
    );
    expect(next).not.toHaveBeenCalled();
  });
});
