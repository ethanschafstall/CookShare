import { vi } from "vitest";

const mockRecipeRepo = {
  create: vi.fn(),
  get: vi.fn(),
  getByUser: vi.fn(),
  delete: vi.fn(),
  addImage: vi.fn(),
  assertRecipeExists: vi.fn(),
  getIngredients: vi.fn(),
};

export default mockRecipeRepo;
