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
    socket.on("guestJoin", () => {
      socket.broadcast.emit("guestJoined");
    });
    socket.on("send-message", (msg, isHost, room) => {
      socket.to(room).emit("receive-message", msg, isHost);
    });
  });
}
