import mongoose from "mongoose";

// Typescript
// Required field to create a user in MongoDB - What it takes to create a user
interface UserAttrs {
  email: string;
  password: string;
}

// Extend Existing Model to UserModel - add UserModel to Model - What the collection looks
// What a single user has properties
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// DB Schema for MongoDB
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
