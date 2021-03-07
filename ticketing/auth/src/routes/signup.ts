// Import Request, Response for Typescript
import express, { Request, Response } from "express";
// body is used as a middleware and validate the information
import { body, validationResult } from "express-validator";
// Import user model
import { User } from "../models/user";
// Middleware error handler
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    // Validation the information received
    if (!errors.isEmpty()) {
      /*       throw new Error("Invalid email or password"); */
      throw new RequestValidationError(errors.array());
    }

    // Data & Validation Step
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // Build user & save to MongoDB
    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

// Export the route and rename. Can't use router for all
export { router as signupRouter };
