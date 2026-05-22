import { RecipeController } from "@controllers/recipe.controller.js";
import errorHandler from "@middleware/errorHandler.middleware.js";
import recipeRouter from "@routes/recipe.routes.js";
import { RecipeService } from "@services/recipe.service.js";
import cookieParser from "cookie-parser";
import express from "express";

export const createRecipeTestApp = (
  mockRecipeService: Partial<RecipeService>,
) => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  const recipeController = new RecipeController(
    mockRecipeService as RecipeService,
  );
  app.use("/api/v1/recipes", recipeRouter(recipeController));
  app.use(errorHandler);

  return app;
};
