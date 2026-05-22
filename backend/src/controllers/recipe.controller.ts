import { BadRequestError, UnauthorizedError } from "@errors/app.error.js";
import { RecipeService } from "@services/recipe.service.js";
import { RecipeImageInput } from "@validators/recipe.validator.js";
import { NextFunction, Request, Response } from "express";

export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new UnauthorizedError("Unauthorized");
    const userId = req.user.id;
    if (!userId) throw new BadRequestError("Invalid user id");
    try {
      const userId = req.user.id;
      const recipe = await this.recipeService.create(req.body, userId);
      res.status(201).json(recipe);
    } catch (error) {
      next(error);
    }
  };
  read = async (req: Request, res: Response, next: NextFunction) => {
    const slug = String(req.params.slug);
    const urlId = slug.split("-").pop();
    if (!urlId) throw new BadRequestError("Invalid slug");
    try {
      const recipe = await this.recipeService.getRecipe(urlId);
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  };
  addImages = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files;
    const { altText, isCover, displayOrder } = req.body;
    const id = Number(req.params.id);
    if (!files || !Array.isArray(files) || files.length === 0)
      throw new BadRequestError("No images uploaded");

    try {
      const imageData: RecipeImageInput[] = files.map((file, i) => ({
        recipeId: id,
        filename: file.filename,
        storagePath: file.path,
        altText: altText[i] ?? "",
        isCover: isCover[i] ?? false,
        displayOrder: displayOrder[i],
      }));
      const images = await this.recipeService.addImages(imageData);
      res.status(201).json({ images });
    } catch (error) {
      next(error);
    }
  };
}
