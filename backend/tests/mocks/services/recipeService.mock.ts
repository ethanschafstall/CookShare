import { vi } from "vitest";

const mockRecipeService = {
  create: vi.fn(),
  getRecipe: vi.fn(),
  addImages: vi.fn(),
  getImage: vi.fn(),
};

export default mockRecipeService;
