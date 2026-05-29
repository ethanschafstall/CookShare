import { NotFoundError } from "@errors/app.error.js";
import { RecipeRepository } from "@repositories/recipe.repository.js";
import { RecipeImageInput, RecipeInput } from "@validators/recipe.validator.js";
import { customAlphabet } from "nanoid";
import slugify from "slugify";
import { NutritionService } from "./nutrition.service.js";

export class RecipeService {
  constructor(
    private recipeRepo: RecipeRepository,
    private nutritionService?: NutritionService,
  ) {}
  async create(input: RecipeInput, userId: number) {
    const nanoid = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      6,
    );
    const urlId = nanoid(6);
    const slug = slugify(input.title) + "-" + urlId;

    const recipe = await this.recipeRepo.create({
      title: input.title,
      description: input.description,
      urlId,
      slug,
      difficulty: input.difficulty,
      servings: input.servings,
      prepTimeMin: input.prepTimeMin,
      cookTimeMin: input.cookTimeMin,
      hits: 0,
      user: {
        connect: { id: userId },
      },
      steps: {
        create: input.steps.map((s) => ({
          stepNumber: s.stepNumber,
          instruction: s.instruction,
        })),
      },
      ingredients: {
        create: input.ingredients.map((i) => ({
          name: i.name,
          displayOrder: i.displayOrder,
          quantityG: i.quantityG,
          quantityNumeric: i.quantityNumeric,
          displayUnit: i.displayUnit,
          note: i.note,
        })),
      },
    });
    if (!recipe) {
      throw new Error("Failed to create recipe");
    }
    this.nutritionService?.buildForRecipe(recipe.id).catch((err) => {
      console.error("nutrition build failed", err);
    });
    return recipe;
  }
  async getRecipe(urlId: string) {
    const recipe = await this.recipeRepo.get(urlId);
    if (!recipe) {
      throw new NotFoundError("Failed to find recipe");
    }
    return recipe;
  }
  async addImages(imageInputs: RecipeImageInput[]) {
    const first = imageInputs[0];
    if (!first) throw new Error("imageInputs must contain at least one image");

    const recipe = await this.recipeRepo.assertRecipeExists(first.recipeId);
    if (!recipe) throw new NotFoundError("Recipe not found");

    return Promise.all(
      imageInputs.map((input) =>
        this.recipeRepo.addImage({
          filename: input.filename,
          storagePath: input.storagePath,
          altText: input.altText,
          isCover: input.isCover,
          displayOrder: input.displayOrder,
          recipe: { connect: { id: input.recipeId } },
        }),
      ),
    );
  }
  async getRecipesByUser(userId: number) {
    const recipe = await this.recipeRepo.getByUser(userId);
    if (!recipe) {
      throw new NotFoundError("Failed to find recipes");
    }
    return recipe;
  }
  async deleteRecipe(urlId: string) {
    const recipe = await this.recipeRepo.get(urlId);

    if (!recipe) {
      throw new NotFoundError("Failed to find recipe");
    }
    return await this.recipeRepo.delete(urlId);
  }
}
