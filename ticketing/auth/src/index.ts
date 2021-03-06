// Dependencies
// npmjs library module
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose, { Collection } from "mongoose";

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

/* 
### Understand MongoDB - Start
MongoDB
User Collection
 - User #1
 - User #2 
 ### Understand MongoDB Start - End
 */

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true, // Generic settings
      useUnifiedTopology: true, // Generic settings
      useCreateIndex: true, // Generic settings
    }); // Cluster IP and database at the end / and Mongoose will create it if not existing
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.listen(PORT, () => {
  console.log(`Active on PORT: ${PORT}`);
});

// Run DB
start();
