import { NotFoundError } from "@errors/app.error.js";
import { RecipeService } from "@services/recipe.service.js";
import mockRecipeRepo from "@tests/mocks/repositories/recipeRepo.mock.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockRecipe = {
  id: 1,
  urlId: "abc123",
  slug: "tomato-soup-abc123",
  title: "Tomato Soup",
  description: "A classic tomato soup",
  difficulty: "easy",
  servings: 4,
  prepTimeMin: 10,
  cookTimeMin: 20,
  hits: 0,
  images: [],
  steps: [],
  ingredients: [],
};

describe("RecipeService", () => {
  let recipeService: RecipeService;

  beforeEach(() => {
    vi.clearAllMocks();
    recipeService = new RecipeService(mockRecipeRepo);
  });

  describe("getRecipe", () => {
    it("returns the recipe for a valid urlId", async () => {
      mockRecipeRepo.get.mockResolvedValue(mockRecipe);

      const result = await recipeService.getRecipe("abc123");
      expect(result).toEqual(mockRecipe);
    });

    it("throws NotFoundError when recipe not found", async () => {
      mockRecipeRepo.get.mockResolvedValue(null);

      await expect(recipeService.getRecipe("ghost")).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
