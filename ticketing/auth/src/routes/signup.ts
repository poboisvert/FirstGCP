// Import Request, Response for Typescript
import express, { Request, Response } from "express";
// body is used as a middleware and validate the information
import { body, validationResult } from "express-validator";
// Middleware error handler
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

// Setup router
const router = express.Router();

// Action from router
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  // Typescript :Request, :Response to let know
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    // Validation the information received
    if (!errors.isEmpty()) {
      /*       throw new Error("Invalid email or password"); */
      throw new RequestValidationError(errors.array());
    }
    // Process the data
    const { email, password } = req.body;

    console.log("Creating a user");
    /*     throw new Error("No database connection"); */
    throw new DatabaseConnectionError();

    // Send
    res.send({});
  }
);

// Export the route and rename. Can't use router for all
export { router as signupRouter };
