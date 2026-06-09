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

export async function createRoom(
  code: string,
  host: string,
  hostPublicKey: Uint8Array<ArrayBufferLike>,
) {
  const room: Room = {
    roomCode: code,
    hostId: host,
    hostPublicKey: Buffer.from(hostPublicKey).toString(),
    guestId: "",
    guestPublicKey: "",
  };
  return await client.hSet(`room:${code}`, room);
}

export async function deleteRoom() {}

export async function attachGuest(
  roomCode: string,
  guestPublicKey: Uint8Array<ArrayBufferLike>,
  guestId: string,
) {
  if (await roomExists(roomCode)) {
    return await client.hSet(`room:${roomCode}`, {
      guestPublicKey: Buffer.from(guestPublicKey).toString(),
      guestId: guestId,
    });
  }
}

export async function getHostPublicKey(roomCode: string) {
  return await client.hGet(`room:${roomCode}`, "hostPublicKey");
}
export async function getGuestPublicKey(roomCode: string) {
  return await client.hGet(`room:${roomCode}`, "guestPublicKey");
}
