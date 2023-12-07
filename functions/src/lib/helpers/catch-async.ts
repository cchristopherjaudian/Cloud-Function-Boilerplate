import { NextFunction } from "express";
import { TCatchAsync } from "../../types/response-middleware";

const catchAsync =
  (fn: TCatchAsync) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
