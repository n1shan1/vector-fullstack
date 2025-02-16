import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const connectedUsers = {}; //{userId: socketId}

export const getReceiverSocketId = (userId) => {
  return connectedUsers[userId];
};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    connectedUsers[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(connectedUsers));
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete connectedUsers[userId];
    io.emit("getOnlineUsers", Object.keys(connectedUsers));
  });
});

export { io, server, app };
