import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY!;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message =
        error.name === "TokenExpiredError"
          ? "Your session has expired. Please log in again."
          : "The request is invalid. Please check your login details.";
      return res.status(401).json({ error: message });
    }
    req.user = decodedToken;
    next();
  });
};

export default authMiddleware;
