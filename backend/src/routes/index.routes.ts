import { AuthController } from "@controllers/auth.controller.js";
import { RecipeController } from "@controllers/recipe.controller.js";
import { RecipeRepository } from "@repositories/recipe.repository.js";
import { UserRepository } from "@repositories/user.repository.js";
import authRouter from "@routes/auth.routes.js";
import { AuthService } from "@services/auth.service.js";
import { RecipeService } from "@services/recipe.service.js";
import { Router } from "express";
import recipeRouter from "./recipe.routes.js";

const router = Router();

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

const recipeRepo = new RecipeRepository();
const recipeService = new RecipeService(recipeRepo);
const recipeController = new RecipeController(recipeService);

router.use("/auth", authRouter(authController));
router.use("/recipes", recipeRouter(recipeController));

export default router;
