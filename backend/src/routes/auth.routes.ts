import { AuthController } from "@controllers/auth.controller.js";
import authenticate from "@middleware/authenticate.middleware.js";
import validate from "@middleware/validate.middleware.js";
import authValidator from "@validators/auth.validator.js";
import { Router } from "express";

const authRouter = (authController: AuthController) => {
  const router = Router();
  router.post(
    "/login",
    validate(authValidator.LoginSchema),
    authController.login,
  );
  router.post(
    "/register",
    validate(authValidator.RegisterSchema),
    authController.register,
  );
  router.get("/me", authenticate, authController.me);
  return router;
};

export default authRouter;
