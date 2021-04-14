import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
// User Auth
import { requireAuth, validateRequest } from '@bonnethood/common';
import { body } from 'express-validator';

// Express
const router = express.Router();

// Router
router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Please provide a ticker ID'),
  ],
  validateRequest,
  async (re: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
