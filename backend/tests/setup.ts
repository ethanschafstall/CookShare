import type { NextFunction, Request, Response } from "express";
import { vi } from "vitest";

process.env.PRIVATE_KEY = "test-secret-key";

vi.mock("@middleware/imageUploader.middleware.js", () => ({
  default: (_req: Request, _res: Response, next: NextFunction) => next(),
}));

vi.mock("@middleware/authorise.middleware.js", () => ({
  default: () => (_req: Request, _res: Response, next: NextFunction) => next(),
}));
