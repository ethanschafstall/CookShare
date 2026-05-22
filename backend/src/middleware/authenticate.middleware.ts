import { UnauthorizedError } from "@errors/app.error.js";
import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY!;

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.session_token;

  if (!token) throw new UnauthorizedError("No token provided");

  try {
    const decodedToken = jwt.verify(token, privateKey) as JwtPayload;
    req.user = decodedToken;
    next();
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TokenExpiredError"
        ? "Your session has expired. Please log in again."
        : "The request is invalid. Please check your login details.";
    throw new UnauthorizedError(message);
  }
};

export default authenticate;
