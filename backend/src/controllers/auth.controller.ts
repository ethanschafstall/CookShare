import { AuthService } from "@services/auth.service.js";
import { NextFunction, Request, Response } from "express";

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  maxAge: 3 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
};

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = await this.authService.login(req.body);
      res.cookie("session_token", token, cookieOptions);
      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.register(req.body);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.getMe(req.user!.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
