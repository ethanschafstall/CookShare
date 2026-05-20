import { RecipeService } from "@services/recipe.service.js";
import { NextFunction, Request, Response } from "express";

export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const recipe = await this.recipeService.create(req.body, userId);
      res.status(201).json(recipe);
    } catch (error) {
      next(error);
    }
  };
}
