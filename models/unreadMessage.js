import mongoose from "mongoose";

const unreadMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  unreadCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("UnreadMessages", unreadMessageSchema);
