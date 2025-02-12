import Message from "../models/message.js";

export const saveMessage = async (messageData) => {
  try {
    const message = new Message({
      encryptedData: messageData.encryptedData,
      iv: messageData.iv,
      room: messageData.room,
      senderName: messageData.senderName,
      timestamp: messageData.timestamp,
    });

    const savedMessage = await message.save();
    return savedMessage;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

export const getMessagesByRoom = async (room) => {
  try {
    const messages = await Message.find({ room })
      .sort({ timestamp: 1 })
      .select("encryptedData iv room senderName timestamp");

    return messages;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
};
