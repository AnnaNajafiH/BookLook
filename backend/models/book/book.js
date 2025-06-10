import mongoose from "mongoose";
const { Schema } = mongoose         //or  const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverImageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dgmthsu2w/image/upload/v1722802058/bookCover_giftfu.png",
    },
    language: { type: String, default: "eng" },
    summary: { type: String, default: "" }, 
    bookshelf: {
      type: Schema.Types.ObjectId,
      ref: "Bookshelf",
      required: true,
    },
    borrowedTimes: [{
      type: Schema.Types.ObjectId,
      ref: "BorrowedBook",
      default: [], 
    }
    ],
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
    ratings: [{ type: Number, min: 0, max: 5 }], 
  },
  {
    timestamps: true, 
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;



