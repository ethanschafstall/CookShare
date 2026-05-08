import { AuthController } from "@controllers/auth.controller.js";
import authMiddleware from "@middleware/authenticate.middleware.js";
import validateMiddleware from "@middleware/validate.middleware.js";
import { UserRepository } from "@repositories/user.repository.js";
import { AuthService } from "@services/auth.service.js";
import authValidator from "@validators/auth.validator.js";
import { Router } from "express";

const authRouter = Router();
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

authRouter.post(
  "/login",
  validateMiddleware(authValidator.login),
  authController.login,
);
authRouter.post(
  "/register",
  validateMiddleware(authValidator.register),
  authController.register,
);
authRouter.get("/me", authMiddleware, authController.me);

export default authRouter;
