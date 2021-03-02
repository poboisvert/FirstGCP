import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // Extend a class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
