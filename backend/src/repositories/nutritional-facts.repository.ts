import { prisma as model } from "@db/prisma.js";
import { Prisma as client } from "@generated/prisma/client.js";

export class NutritionalFactsRepository {
  create(data: client.RecipeNutritionFactsCreateInput) {
    return model.recipeNutritionFacts.create({ data });
  }

  update(recipeId: number, data: client.RecipeNutritionFactsUpdateInput) {
    return model.recipeNutritionFacts.update({ where: { recipeId }, data });
  }
}
