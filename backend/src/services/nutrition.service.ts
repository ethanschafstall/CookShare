import { fetchNutritionData } from "@mock/nutrition.mock.js";
import { IngredientRepository } from "@repositories/ingredient.repository.js";
import { NutritionalFactsRepository } from "@repositories/nutritional-facts.repository.js";
import { RecipeRepository } from "@repositories/recipe.repository.js";

export class NutritionService {
  constructor(
    private recipeRepo: RecipeRepository,
    private ingredientRepo: IngredientRepository,
    private nutritionFactsRepo: NutritionalFactsRepository,
  ) {}

  // Resolve one ingredient's per-100g data: DB cache first, then mock API.
  // Creates the Ingredient row on a miss. Returns null if no data exists.
  private async resolveIngredient(name: string) {
    const existing = await this.ingredientRepo.findByName(name);
    if (existing) return existing;

    const data = await fetchNutritionData(name);
    if (!data) return null;

    return this.ingredientRepo.create({ name, ...data });
  }

  // Builds the nutrition facts row for a recipe by summing each
  // ingredient's per-100g values scaled by its quantityG.
  // Meant to be called fire-and-forget after the recipe is created.
  async buildForRecipe(recipeId: number) {
    const recipeIngredients = await this.recipeRepo.getIngredients(recipeId);

    const totals = {
      totalCalories: 0,
      totalProteinG: 0,
      totalFatG: 0,
      totalFatSaturatedG: 0,
      totalCarbsG: 0,
      totalCarbsSugarsG: 0,
      totalFiberG: 0,
      totalSodiumMg: 0,
    };

    for (const ri of recipeIngredients) {
      const ingredient = await this.resolveIngredient(ri.name);
      if (!ingredient || ri.quantityG == null) continue;

      const factor = Number(ri.quantityG) / 100;
      totals.totalCalories += Number(ingredient.caloriesPer100) * factor;
      totals.totalProteinG += Number(ingredient.proteinPer100) * factor;
      totals.totalFatG += Number(ingredient.fatPer100) * factor;
      totals.totalFatSaturatedG +=
        Number(ingredient.fatSaturatedPer100) * factor;
      totals.totalCarbsG += Number(ingredient.carbsPer100) * factor;
      totals.totalCarbsSugarsG += Number(ingredient.carbsSugarsPer100) * factor;
      totals.totalFiberG += Number(ingredient.fiberPer100) * factor;
      totals.totalSodiumMg += Number(ingredient.sodiumPer100) * factor;
    }

    const round = (n: number) => Math.round(n * 100) / 100;

    return this.nutritionFactsRepo.create({
      totalCalories: round(totals.totalCalories),
      totalProteinG: round(totals.totalProteinG),
      totalFatG: round(totals.totalFatG),
      totalFatSaturatedG: round(totals.totalFatSaturatedG),
      totalCarbsG: round(totals.totalCarbsG),
      totalCarbsSugarsG: round(totals.totalCarbsSugarsG),
      totalFiberG: round(totals.totalFiberG),
      totalSodiumMg: round(totals.totalSodiumMg),
      recipe: { connect: { id: recipeId } },
    });
  }
}
