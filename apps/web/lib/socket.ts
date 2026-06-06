import { io, Socket } from "socket.io-client";

export function createSocketConnection() {
  const socket = io(process.env.NEXT_PUBLIC_API_URL);
  return socket;
}

export function sendMessage(socket: Socket) {
  socket.emit("send-message");
}
