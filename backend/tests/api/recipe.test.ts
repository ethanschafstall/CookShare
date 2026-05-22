import { NotFoundError } from "@errors/app.error.js";
import generateToken from "@helpers/jwt.helper.js";
import { createRecipeTestApp } from "@tests/helpers/createRecipeTestApp.js";
import mockRecipeService from "@tests/mocks/services/recipeService.mock.js";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const validToken = generateToken({
  id: 1,
  email: "test@test.com",
  role: "visitor",
});

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

const app = createRecipeTestApp(mockRecipeService);

describe("Recipe API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/v1/recipes/:slug", () => {
    it("returns 200 with the recipe data", async () => {
      mockRecipeService.getRecipe.mockResolvedValue(mockRecipe);

      const res = await request(app)
        .get("/api/v1/recipes/tomato-soup-abc123")
        .set("Cookie", `session_token=${validToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockRecipe);
      expect(mockRecipeService.getRecipe).toHaveBeenCalledWith("abc123");
    });

    it("returns 401 when no token provided", async () => {
      const res = await request(app).get("/api/v1/recipes/tomato-soup-abc123");

      expect(res.status).toBe(401);
    });

    it("returns 404 when recipe not found", async () => {
      mockRecipeService.getRecipe.mockRejectedValue(
        new NotFoundError("Failed to find recipe"),
      );

      const res = await request(app)
        .get("/api/v1/recipes/ghost-recipe-zzz999")
        .set("Cookie", `session_token=${validToken}`);
      expect(res.status).toBe(404);
    });
  });
});
