import mongoose from "mongoose";

const { Schema } = mongoose;

const genreSchema = new Schema(
  {
    category: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;