import mongoose from "mongoose";
const { Schema} = mongoose;
// const { Schema, model } = mongoose;


const donatedBookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, trim: true, unique: true, sparse: true },
    donor: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
    dateDonated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const DonatedBook = mongoose.model("DonatedBook", donatedBookSchema);
// const DonatedBook = model("DonatedBook", donatedBookSchema);

export default DonatedBook;



