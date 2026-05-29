import { prisma as model } from "@db/prisma.js";
import { Prisma as client } from "@generated/prisma/client.js";

export class IngredientRepository {
  create(data: client.IngredientCreateInput) {
    return model.ingredient.create({ data });
  }
  findByName(name: string) {
    return model.ingredient.findFirst({ where: { name } });
  }
}
