import { saveMessage } from "../services/messageService.js";
export const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", async (data) => {
      try {
        const savedMessage = await saveMessage({
          encryptedData: data.encryptedData,
          iv: data.iv,
          room: data.room,
          senderName: data.senderName,
          timestamp: new Date(),
        });

        if (savedMessage) {
          socket.to(data.room).emit("receive_message", {
            encryptedData: savedMessage.encryptedData,
            iv: savedMessage.iv,
            room: savedMessage.room,
            senderName: savedMessage.senderName,
            timestamp: savedMessage.timestamp,
          });
        }
      } catch (error) {
        console.error(`Error handling send_message:`, error);
      }
    });

    socket.on("share_key", (data) => {
      socket.broadcast.to(data.room).emit("receive_key", {
        room: data.room,
        key: data.key,
      });
    });

    socket.on("join_room", async (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
