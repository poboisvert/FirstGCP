import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

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

it('return an error if the ticket is already reserved', async () => {});

it('SUCCESS - Reserve a ticket', async () => {});
