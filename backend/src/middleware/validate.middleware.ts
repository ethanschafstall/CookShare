import type { NextFunction, Request, Response } from "express";
import * as z from "zod";

const validateMiddleware =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    req.body = result.data;
    next();
  };

export default validateMiddleware;
