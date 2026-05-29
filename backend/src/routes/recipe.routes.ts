import { RecipeController } from "@controllers/recipe.controller.js";
import authenticate from "@middleware/authenticate.middleware.js";
import authorise from "@middleware/authorise.middleware.js";
import imageUploader from "@middleware/imageUploader.middleware.js";
import validate from "@middleware/validate.middleware.js";
import recipeValidator from "@validators/recipe.validator.js";
import { Router } from "express";

const recipeRouter = (recipeController: RecipeController) => {
  const router = Router();
  router.post(
    "/",
    authenticate,
    authorise("create:recipes"),
    validate(recipeValidator.RecipeSchema),
    recipeController.create,
  );
  router.post(
    "/:id/images",
    authenticate,
    authorise("upload:images"),
    imageUploader,
    validate(recipeValidator.RecipeImageSchema),
    recipeController.addImages,
  );
  router.get(
    "/:slug",
    authenticate,
    authorise("read:recipes"),
    recipeController.read,
  );
  router.get(
    "/user/:id",
    authenticate,
    authorise("read:recipes"),
    recipeController.readByUser,
  );
  router.delete(
    "/:slug",
    authenticate,
    authorise("delete:recipes"),
    recipeController.delete,
  );
  return router;
};

export default recipeRouter;
