// Dependencies
import express from "express";
import { json } from "body-parser";
// npmjs library module

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";

const PORT = 3000;
const app = express();

app.use(json());
// Routers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Middleware to return error messages - uniform
app.use(errorHandler);

// From BROWSER to API
/* app.get("/api/users/currentuser", (req, res) => {
  res.send("This is a working test - PAL");

  
}); */

app.listen(PORT, () => {
  console.log(`Action on PORT: ${PORT}`);
});
