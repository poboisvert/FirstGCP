import mongoose, { Collection } from "mongoose";
import { app } from "./app";

const PORT = 3000;

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
