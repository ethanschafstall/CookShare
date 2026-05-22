import { NotFoundError, UnauthorizedError } from "@errors/app.error.js";
import authorise from "@middleware/authorise.middleware.js";
import type { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.unmock("@middleware/authorise.middleware.js");

const { mockUserRepo } = vi.hoisted(() => ({
  mockUserRepo: {
    getByEmail: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("@repositories/user.repository.js", () => ({
  UserRepository: class {
    getByEmail = mockUserRepo.getByEmail;
    getById = mockUserRepo.getById;
    create = mockUserRepo.create;
    update = mockUserRepo.update;
    delete = mockUserRepo.delete;
  },
}));

const mockUser = {
  id: 1,
  role: {
    name: "visitor",
    permissions: ["read:recipes"],
  },
};

describe("authorise middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { user: { id: 1, email: "test@test.com", role: "visitor" } };
    res = {};
    next = vi.fn();
  });

  it("calls next when user has required permission", async () => {
    mockUserRepo.getById.mockResolvedValue(mockUser);

    await authorise("read:recipes")(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("calls next with UnauthorizedError when user lacks required permission", async () => {
    mockUserRepo.getById.mockResolvedValue(mockUser);

    await authorise("delete:recipes")(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });

  it("calls next with NotFoundError when user not found", async () => {
    mockUserRepo.getById.mockResolvedValue(null);

    await authorise("read:recipes")(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
  });
});
