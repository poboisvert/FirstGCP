// Dependencies
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
// npmjs library module

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const PORT = 3000;
const app = express();

app.use(json());
// Routers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Async will return a promise without it return values
// Await, Async with package express-async-errors un /auth
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

// Middleware to return error messages - uniform
app.use(errorHandler);

// From BROWSER to API
/* app.get("/api/users/currentuser", (req, res) => {
  res.send("This is a working test - PAL");  
}); */

app.listen(PORT, () => {
  console.log(`Action on PORT: ${PORT}`);
});
