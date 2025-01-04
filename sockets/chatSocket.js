export const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", (data) => {
      const base64EncryptedData = Buffer.from(data.encryptedData).toString(
        "base64"
      );
      const base64IV = Buffer.from(data.iv).toString("base64");
      console.log("Encrypted message received:", {
        encryptedData: base64EncryptedData,
        iv: base64IV,
        room: data.room,
        senderName: data.senderName,
      });

      const messageData = {
        encryptedData: data.encryptedData,
        iv: data.iv,
        room: data.room,
        senderId: socket.id,
        senderName: data.senderName,
      };

      socket.broadcast.to(data.room).emit("receive_message", messageData);
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
