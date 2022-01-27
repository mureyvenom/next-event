import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Comment || model("Comment", commentSchema);
