import { NotFoundError } from "@errors/app.error.js";
import { RecipeService } from "@services/recipe.service.js";
import mockRecipeRepo from "@tests/mocks/repositories/recipeRepo.mock.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("nanoid", () => ({
  nanoid: vi.fn().mockReturnValue("abc123"),
}));

vi.mock("slugify", () => ({
  default: vi.fn((s: string) => s.toLowerCase().replace(/\s+/g, "-")),
}));

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
const mockRecipeInput = {
  title: "Tomato Soup",
  description: "A classic tomato soup",
  difficulty: "easy" as const,
  servings: 4,
  prepTimeMin: 10,
  cookTimeMin: 20,
  steps: [{ stepNumber: 1, instruction: "Boil tomatoes" }],
  ingredients: [
    {
      name: "tomato",
      displayOrder: 1,
      quantityG: 500,
      quantityNumeric: 4,
      displayUnit: "pcs",
      note: null,
    },
  ],
};

const mockImageInputs = [
  {
    recipeId: 1,
    storagePath: "recipes/abc123/img1.jpg",
    filename: "img1.jpg",
    mimeType: "image/jpeg",
    size: 1024,
    altText: "Tomato soup in a bowl",
    isCover: true,
    displayOrder: 1,
  },
];
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

  describe("create", () => {
    it("returns the created recipe", async () => {
      mockRecipeRepo.create.mockResolvedValue(mockRecipe);

      const result = await recipeService.create(mockRecipeInput, 1);
      expect(result).toEqual(mockRecipe);
    });

    it("connects the recipe to the user id", async () => {
      mockRecipeRepo.create.mockResolvedValue(mockRecipe);

      await recipeService.create(mockRecipeInput, 42);

      expect(mockRecipeRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          user: { connect: { id: 42 } },
        }),
      );
    });

    it("generates a urlId and slug from the title", async () => {
      mockRecipeRepo.create.mockResolvedValue(mockRecipe);

      await recipeService.create(mockRecipeInput, 1);

      expect(mockRecipeRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          urlId: "abc123",
          slug: "tomato-soup-abc123",
        }),
      );
    });

    it("maps steps and ingredients to nested create inputs", async () => {
      mockRecipeRepo.create.mockResolvedValue(mockRecipe);

      await recipeService.create(mockRecipeInput, 1);

      expect(mockRecipeRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          steps: {
            create: [{ stepNumber: 1, instruction: "Boil tomatoes" }],
          },
          ingredients: {
            create: [
              {
                name: "tomato",
                displayOrder: 1,
                quantityG: 500,
                quantityNumeric: 4,
                displayUnit: "pcs",
                note: null,
              },
            ],
          },
        }),
      );
    });

    it("throws when the repository returns no recipe", async () => {
      mockRecipeRepo.create.mockResolvedValue(null);

      await expect(recipeService.create(mockRecipeInput, 1)).rejects.toThrow(
        "Failed to create recipe",
      );
    });
  });

  describe("addImages", () => {
    it("returns the created images for an existing recipe", async () => {
      mockRecipeRepo.assertRecipeExists.mockResolvedValue(mockRecipe);
      mockRecipeRepo.addImage.mockResolvedValue({ id: 1 });

      const result = await recipeService.addImages(mockImageInputs);
      expect(result).toEqual([{ id: 1 }]);
    });

    it("throws NotFoundError when recipe does not exist", async () => {
      mockRecipeRepo.assertRecipeExists.mockResolvedValue(null);

      await expect(recipeService.addImages(mockImageInputs)).rejects.toThrow(
        NotFoundError,
      );
    });

    it("calls addImage once per input", async () => {
      mockRecipeRepo.assertRecipeExists.mockResolvedValue(mockRecipe);
      mockRecipeRepo.addImage.mockResolvedValue({ id: 1 });

      const inputs = [
        { ...mockImageInputs[0], filename: "img1.jpg" },
        { ...mockImageInputs[0], filename: "img2.jpg" },
      ];

      await recipeService.addImages(inputs);
      expect(mockRecipeRepo.addImage).toHaveBeenCalledTimes(2);
    });
  });
});
