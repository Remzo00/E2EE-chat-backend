import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  encryptedData: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);
