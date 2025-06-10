import mongoose from "mongoose";
const { Schema } = mongoose;

const borrowedBookSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    dateBorrowed: { type: Date, default: Date.now },
    borrowedFrom: {type: Schema.Types.ObjectId, ref: "Bookshelf",required: true,},
    ratings: { type: Number , min: 0, max: 5},

    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 0, max: 5 },
        comment: { type: String },
        shelfId: { type: Schema.Types.ObjectId, ref: "Bookshelf" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    
    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed",
    },
  },
  { timestamps: true }
);

const BorrowedBook = mongoose.model("BorrowedBook", borrowedBookSchema);

export default BorrowedBook;
