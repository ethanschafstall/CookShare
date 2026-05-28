import { prisma as model } from "@db/prisma.js";
import { Prisma as client } from "@generated/prisma/client.js";

export class RecipeRepository {
  create(data: client.RecipeCreateInput) {
    return model.$transaction(async (tx) => {
      return tx.recipe.create({ data });
    });
  }
  get(urlId: string) {
    return model.recipe.findUnique({
      where: { urlId: urlId },
      include: {
        images: true,
        steps: true,
        ingredients: true,
        nutritionFacts: true,
      },
    });
  }
  addImage(imageInput: client.RecipeImageCreateInput) {
    return model.recipeImage.create({ data: imageInput });
  }
  assertRecipeExists(recipeId: number) {
    return model.recipe.findUnique({ where: { id: recipeId } });
  }
  getByUser(userId: number) {
    return model.recipe.findMany({ where: { userId: userId } });
  }
  delete(urlId: string) {
    return model.recipe.delete({
      where: { urlId: urlId },
    });
  }
  getIngredients(recipeId: number) {
    return model.recipeIngredient.findMany({ where: { recipeId } });
  }
}
