import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    textMessage: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;