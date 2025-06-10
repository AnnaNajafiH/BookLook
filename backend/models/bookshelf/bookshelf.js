import mongoose from "mongoose";

const { Schema } = mongoose;

const bookshelfSchema = new Schema(
  {
    barcode: { type: String, unique: true },
    image: [{ type: String, required: true }],
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    street: { type: String, required: true },
    longitude: { type: Number },
    latitude: { type: Number },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },

    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],

    donatedBooks: [{ type: Schema.Types.ObjectId, ref: "DonatedBook" }],

    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: "BorrowedBook" }],

    ratings: { type: Number, min: 0, max: 5 },  
    reviews: [
      {
        user: { type: Object },
        rating: { type: Number },
        comment: { type: String },
        shelfId: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Bookshelf = mongoose.model("Bookshelf", bookshelfSchema);
export default Bookshelf;


