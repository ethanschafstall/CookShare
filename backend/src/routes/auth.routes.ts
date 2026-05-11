import { AuthController } from "@controllers/auth.controller.js";
import authMiddleware from "@middleware/authenticate.middleware.js";
import validateMiddleware from "@middleware/validate.middleware.js";
import authValidator from "@validators/auth.validator.js";
import { Router } from "express";

const authRouter = (authController: AuthController) => {
  const router = Router();
  router.post(
    "/login",
    validateMiddleware(authValidator.login),
    authController.login,
  );
  router.post(
    "/register",
    validateMiddleware(authValidator.register),
    authController.register,
  );
  router.get("/me", authMiddleware, authController.me);
  return router;
};

export default authRouter;
