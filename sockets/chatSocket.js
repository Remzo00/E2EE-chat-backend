import { prepareEncryptedMessage } from "../services/encryptionService.js";
import { saveMessage } from "../services/messageService.js";
import crypto from "crypto";
export const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", async (data) => {
      try {
        if (!data.key || !data.message) {
          throw new Error("Missing key or message for encryption.");
        }

        const key = Buffer.from(data.key, "base64");
        if (key.length !== 32) {
          throw new Error(
            "Invalid key length. AES-256 requires a 32-byte key."
          );
        }

        const iv = crypto.randomBytes(16);
        const ivBase64 = iv.toString("base64");

        const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        let encryptedData = cipher.update(data.message, "utf8", "base64");
        encryptedData += cipher.final("base64");

        // Sačuvajte poruku u bazi
        const savedMessage = await saveMessage({
          encryptedData: encryptedData,
          iv: ivBase64,
          room: data.room,
          senderName: data.senderName,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error(`Error handling send_message: ${error.message}`);
      }
    });

    socket.on("share_key", (data) => {
      console.log(`Key shared in room ${data.room}:`, data.key);
      socket.broadcast.to(data.room).emit("receive_key", {
        room: data.room,
        key: data.key,
      });
    });

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
