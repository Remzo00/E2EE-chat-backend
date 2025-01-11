import { prepareEncryptedMessage } from "../services/encryptionService.js";
import { saveMessage } from "../services/messageService.js";
export const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // const uint8ArrayToBase64 = (array) => {
    //   return Buffer.from(array).toString("base64");
    // };

    socket.on("send_message", async (data) => {
      try {
        // const encryptedBase64 = Buffer.from(data.encryptedData).toString(
        //   "base64"
        // );
        // const ivBase64 = Buffer.from(data.iv).toString("base64");

        // const savedMessage = await saveMessage({
        //   encryptedData: encryptedBase64,
        //   iv: ivBase64,
        //   room: data.room,
        //   senderName: data.senderName,
        //   timestamp: new Date(),
        // });

        // For socket broadcast, keep the original array format
        const messageData = {
          encryptedData: data.encryptedData,
          iv: data.iv,
          room: data.room,
          senderName: data.senderName,
        };

        socket.broadcast.to(data.room).emit("receive_message", messageData);
      } catch (error) {
        console.error("Error handling send_message:", error);
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
