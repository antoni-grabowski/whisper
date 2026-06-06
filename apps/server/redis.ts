import { createClient } from "redis";
import { Room } from "./types.js";

const client = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

client.connect();

export async function roomExists(code: string): Promise<boolean> {
  const roomExists = await client.exists(`room:${code}`);
  return roomExists ? true : false;
}

export async function createRoom(code: string, host: string, hostPublicKey) {
  const room: Room = {
    roomCode: code,
    hostId: host,
    hostPublicKey: hostPublicKey,
    guestId: "",
  };
  return await client.hSet(`room:${code}`, room);
}
