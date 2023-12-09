import { NextFunction, Request, Response } from "express";

export type TCatchAsync = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
