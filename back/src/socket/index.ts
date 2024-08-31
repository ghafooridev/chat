import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
})

const onlineUsers: Record<string, string> = {}



export const getReceiverSocketId = (receiverId: string) => {
  return onlineUsers[receiverId]
}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) onlineUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers))

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);

    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers))

  })
})

export { app, io, server }