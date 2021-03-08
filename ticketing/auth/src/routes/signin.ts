// Import Request, Response for Typescript
import express, { Request, Response } from "express";
// body is used as a middleware and validate the information
import { body, validationResult } from "express-validator";
// Middleware error handler
import { validateRequest } from "../middlewares/validate-request";
// ERRORS template
import { BadRequestError } from "../errors/bad-request-error";
// Import user model
import { User } from "../models/user";
import { Password } from "../services/password";
// JWT session
import jwt from "jsonwebtoken";

// Setup router
const router = express.Router();

// Action from router
router.post(
  "/api/users/signin",
  [
    // Middleware validation fields
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    // Compare the user from the req.password and the MongoDB
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    //
    // Generate JWT Session/Tokent
    //
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store on session user
    req.session = {
      jwt: userJwt,
    };

    // Mongo DB return _id instead of id
    res.status(200).send(existingUser);
  }
);

// Export the route and rename. Can't use router for all
export { router as signinRouter };
