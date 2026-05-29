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

const validRecipeBody = {
  title: "Tomato Soup",
  description: "A classic tomato soup",
  difficulty: "easy",
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

  describe("POST /api/v1/recipes", () => {
    it("returns 201 with the created recipe", async () => {
      mockRecipeService.create.mockResolvedValue(mockRecipe);

      const res = await request(app)
        .post("/api/v1/recipes")
        .set("Cookie", `session_token=${validToken}`)
        .send(validRecipeBody);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockRecipe);
      expect(mockRecipeService.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Tomato Soup" }),
        1,
      );
    });

    it("returns 401 when no token provided", async () => {
      const res = await request(app)
        .post("/api/v1/recipes")
        .send(validRecipeBody);

      expect(res.status).toBe(401);
    });

    it("returns 400 when title is missing", async () => {
      const { title: _title, ...body } = validRecipeBody;

      const res = await request(app)
        .post("/api/v1/recipes")
        .set("Cookie", `session_token=${validToken}`)
        .send(body);

      expect(res.status).toBe(400);
    });

    it("returns 400 when difficulty is invalid", async () => {
      const res = await request(app)
        .post("/api/v1/recipes")
        .set("Cookie", `session_token=${validToken}`)
        .send({ ...validRecipeBody, difficulty: "impossible" });

      expect(res.status).toBe(400);
    });

    it("returns 400 when steps is empty", async () => {
      const res = await request(app)
        .post("/api/v1/recipes")
        .set("Cookie", `session_token=${validToken}`)
        .send({ ...validRecipeBody, steps: [] });

      expect(res.status).toBe(400);
    });

    it("returns 400 when ingredients is empty", async () => {
      const res = await request(app)
        .post("/api/v1/recipes")
        .set("Cookie", `session_token=${validToken}`)
        .send({ ...validRecipeBody, ingredients: [] });

      expect(res.status).toBe(400);
    });
  });
});
