import { vi } from "vitest";

process.env.PRIVATE_KEY = "test-secret-key";

vi.mock("@middleware/imageUploader.middleware.js", () => ({
  default: (_req: any, _res: any, next: any) => next(),
}));

vi.mock("@middleware/authorise.middleware.js", () => ({
  default: () => (_req: any, _res: any, next: any) => next(),
}));
