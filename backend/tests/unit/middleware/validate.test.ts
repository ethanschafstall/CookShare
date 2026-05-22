import validate from "@middleware/validate.middleware.js";
import type { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
  age: z.number().int(),
});

describe("validate middleware", () => {
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

  it("calls next when body is valid", () => {
    req.body = { email: "test@test.com", age: 30 };

    validate(schema)(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("assigns parsed data to req.body", () => {
    const transformingSchema = z.object({
      name: z.string().transform((s) => s.toUpperCase()),
    });
    req.body = { name: "john" };

    validate(transformingSchema)(req as Request, res as Response, next);

    expect(req.body).toEqual({ name: "JOHN" });
    expect(next).toHaveBeenCalledWith();
  });

  it("returns 400 when body is invalid", () => {
    req.body = { email: "notanemail", age: 30 };

    validate(schema)(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 400 when required field is missing", () => {
    req.body = { email: "test@test.com" };

    validate(schema)(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
