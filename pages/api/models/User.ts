import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.User || model("User", userSchema);
