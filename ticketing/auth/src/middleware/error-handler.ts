import { Request, Response, NextFunction } from "express";
// Middleware error handler
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("Handling this error as REQ Validation ERR");
  }
  if (err instanceof DatabaseConnectionError) {
    console.log("Handling this error as DB connection ERR");
  }
  res.status(400).send({
    message: "Something went wrong",
  });
};
