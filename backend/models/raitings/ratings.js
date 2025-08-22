import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetType: { type: String, required: true, enum: ["book", "bookshelf"] },
    targetId: { type: Schema.Types.ObjectId, required: true },
    value: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

// Ensure one rating per user per target
ratingSchema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
