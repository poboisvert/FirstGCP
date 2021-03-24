import request from "supertest";
import { app } from "../../app";

it("Returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});

it("Returns a 400 on invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test.com", password: "password" })
    .expect(400);
});
