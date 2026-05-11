import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@errors/app.error.js";
import { comparePassword } from "@helpers/password.helper.js";
import { AuthService } from "@services/auth.service.js";
import mockUserRepo from "@tests/mocks/repositories/userRepo.mock.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@helpers/password.helper.js", () => ({
  comparePassword: vi.fn(),
  genSalt: vi.fn().mockReturnValue("salt"),
  hashPassword: vi.fn().mockReturnValue("hashedPassword"),
}));

vi.mock("@helpers/jwt.helper.js", async () => {
  return {
    default: vi.fn().mockReturnValue("mock.jwt.token"),
  };
});

const mockUser = {
  id: 1,
  email: "test@test.com",
  passwordHash: "hash",
  passwordSalt: "salt",
  firstname: "John",
  lastname: "Doe",
  role: {
    name: "visitor",
    permissions: ["read:recipes"],
  },
};

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    authService = new AuthService(mockUserRepo);
  });

  describe("login", () => {
    it("returns a token on valid credentials", async () => {
      mockUserRepo.getByEmail.mockResolvedValue(mockUser);
      vi.mocked(comparePassword).mockReturnValue(true);

      const result = await authService.login({
        email: "test@test.com",
        password: "password123",
      });
      expect(result).toEqual({ token: "mock.jwt.token" });
    });

    it("throws UnauthorizedError when user not found", async () => {
      mockUserRepo.getByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: "ghost@test.com", password: "password123" }),
      ).rejects.toThrow(UnauthorizedError);
    });

    it("throws UnauthorizedError when password is invalid", async () => {
      mockUserRepo.getByEmail.mockResolvedValue(mockUser);
      vi.mocked(comparePassword).mockReturnValue(false);

      await expect(
        authService.login({
          email: "test@test.com",
          password: "wrongpassword",
        }),
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("register", () => {
    it("creates a user successfully", async () => {
      mockUserRepo.getByEmail.mockResolvedValue(null);
      mockUserRepo.create.mockResolvedValue({ id: 1 });

      await expect(
        authService.register({
          email: "new@test.com",
          password: "password123",
          firstname: "Jane",
          lastname: "Doe",
        }),
      ).resolves.toBeUndefined();
    });

    it("throws ConflictError when email already in use", async () => {
      mockUserRepo.getByEmail.mockResolvedValue(mockUser);

      await expect(
        authService.register({
          email: "test@test.com",
          password: "password123",
          firstname: "Jane",
          lastname: "Doe",
        }),
      ).rejects.toThrow(ConflictError);
    });
  });
  describe("getMe", () => {
    it("returns user data for valid user ID", async () => {
      mockUserRepo.getById.mockResolvedValue(mockUser);
      const result = await authService.getMe(1);
      expect(result).toEqual({
        id: 1,
        email: "test@test.com",
        firstname: "John",
        lastname: "Doe",
        role: "visitor",
        permissions: ["read:recipes"],
      });
    });

    it("throws NotFoundError when user not found", async () => {
      mockUserRepo.getById.mockResolvedValue(null);
      await expect(authService.getMe(999)).rejects.toThrow(NotFoundError);
    });
  });
});
