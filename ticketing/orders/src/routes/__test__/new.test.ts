import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('return an error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId(); // Generate ID

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({
      ticketId,
    })
    .expect(404);
});

it('return an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    title: 'textBillet',
    price: 66,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: 'userTest',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('SUCCESS - Reserve a ticket', async () => {
  // Create ticket in DB
  const ticket = Ticket.build({
    title: 'textBillet',
    price: 66,
  });
  // Save
  await ticket.save();

  // Book ticket
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});
