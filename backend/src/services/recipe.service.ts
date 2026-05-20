import { RecipeRepository } from "@repositories/recipe.repository.js";
import { RecipeInput } from "@validators/recipe.validator.js";
import { nanoid } from "nanoid";
import slugify from "slugify";

export class RecipeService {
  constructor(private recipeRepo: RecipeRepository) {}

  async create(input: RecipeInput, userId: number) {
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

    return recipe;
  }
}
