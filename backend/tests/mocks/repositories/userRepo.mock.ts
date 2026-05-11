import { vi } from "vitest";

const mockUserRepo = {
  getByEmail: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export default mockUserRepo;
