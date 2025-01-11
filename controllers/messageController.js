import { saveMessage, getMessagesByRoom } from "../services/messageService.js";

export const handleSaveMessage = async (req, res) => {
  try {
    const message = await saveMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const handleGetMessages = async (req, res) => {
  try {
    const messages = await getMessagesByRoom(req.params.room);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
