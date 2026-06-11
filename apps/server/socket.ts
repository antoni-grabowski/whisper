import { FastifyInstance } from "fastify";
import { Server } from "socket.io";

export function createSocketServer(fastify: FastifyInstance) {
  const io = new Server(fastify.server, {
    cors: {
      origin: [process.env.CLIENT_URL ?? "http://localhost:3000"],
    },
  });
  return io;
}

export function onConnection(io: Server) {
  io.on("connection", (socket) => {
    socket.on("guest-join", (roomCode) => {
      socket.join(roomCode);
      socket.to(roomCode).emit("guest-joined");
    });
    socket.on("host-joined", (roomCode) => {
      socket.join(roomCode);
    });
    socket.on("guest-joined", (roomCode) => {
      socket.to(roomCode).emit("guest-joined");
    });
    socket.on("send-message", (msg, room, nonce) => {
      socket.to(room).emit("receive-message", msg, nonce);
    });
  });
}
