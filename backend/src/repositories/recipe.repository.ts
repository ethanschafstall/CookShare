import { prisma as model } from "@db/prisma.js";
import { Prisma as client } from "@generated/prisma/client.js";

export class RecipeRepository {
  create(data: client.RecipeCreateInput) {
    return model.$transaction(async (tx) => {
      return tx.recipe.create({ data });
    });
  }

  addImage(imageInput: client.RecipeImageCreateInput) {
    return model.recipeImage.create({ data: imageInput });
  }
}
