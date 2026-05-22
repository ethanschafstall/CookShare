import { AuthController } from "@controllers/auth.controller.js";
import errorHandler from "@middleware/errorHandler.middleware.js";
import authRouter from "@routes/auth.routes.js";
import { AuthService } from "@services/auth.service.js";
import cookieParser from "cookie-parser";
import express from "express";

export const createAuthTestApp = (mockAuthService: Partial<AuthService>) => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  const authController = new AuthController(mockAuthService as AuthService);

  app.use("/api/v1/auth", authRouter(authController));
  app.use(errorHandler);

  return app;
};
