import { AuthController } from "@controllers/auth.controller.js";
import { UserRepository } from "@repositories/user.repository.js";
import authRouter from "@routes/auth.routes.js";
import { AuthService } from "@services/auth.service.js";
import { Router } from "express";

const router = Router();

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

router.use("/auth", authRouter(authController));

export default router;
