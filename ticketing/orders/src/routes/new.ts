import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
// User Auth
import {
  NotFoundError,
  requireAuth,
  OrderStatus,
  validateRequest,
  BadRequestError,
} from '@bonnethood/common';
import { body } from 'express-validator';
// Model Mongoose - Fetch From DB
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

// Express
const router = express.Router();

// Ticket expiration
const EXPIRATION_WINDOW_SECONDS = 15 * 60; // Could be in yaml file

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
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find ticket that the user wnat to buy in DB
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved');
    }
    // Calculate expiration date
    const expiration = new Date();

    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build & Save order
    const order = Order.build({
      userId: req.currentUser!.id, // Define requireAuth we add !
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });

    // Publish created order
    await order.save();

    // Response
    res.send(201).send(order);
  }
);

export { router as newOrderRouter };
