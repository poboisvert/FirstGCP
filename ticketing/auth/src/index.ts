import express from "express";

import { json } from "body-parser";

const PORT = 3000;

const app = express();
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("This is a working test - PAL");
});

app.listen(PORT, () => {
  console.log(`Action on PORT: ${PORT}`);
});
