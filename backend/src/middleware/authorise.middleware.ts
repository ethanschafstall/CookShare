import { NotFoundError, UnauthorizedError } from "@errors/app.error.js";
import { UserRepository } from "@repositories/user.repository.js";
import type { NextFunction, Request, Response } from "express";

const userRepo = new UserRepository();

const authorise =
  (required: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userRepo.getById(req.user!.id);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      const permissions = user.role.permissions as string[];
      if (!permissions.includes(required)) {
        throw new UnauthorizedError("Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default authorise;
