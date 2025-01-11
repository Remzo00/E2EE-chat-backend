import Message from "../models/message.js";

export const saveMessage = async (messageData) => {
  try {
    const message = new Message(messageData);
    return await message.save();
  } catch (error) {
    throw new Error("Error saving message: " + error.message);
  }
};

export const getMessagesByRoom = async (room) => {
  try {
    return await Message.find({ room }).sort({ timestamp: 1 });
  } catch (error) {
    throw new Error("Error fetching messages: " + error.message);
  }
};
