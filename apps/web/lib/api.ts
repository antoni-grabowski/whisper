import { keyToString } from "./sodium";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function createRoom(publicKey: Uint8Array<ArrayBufferLike>) {
  const url = BASE + "/createRoom";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      hostPublicKey: keyToString(publicKey),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function joinRoom(
  publicKey: Uint8Array<ArrayBufferLike>,
  roomCode: string,
) {
  const url = BASE + "/joinRoom";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      guestPublicKey: keyToString(publicKey),
      roomCode: roomCode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function amIHost(
  roomCode: string,
  publicKey: Uint8Array<ArrayBufferLike>,
) {
  const url = BASE + "/amIHost";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      roomCode: roomCode,
      publicKey: keyToString(publicKey),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getGuestPublicKey(roomCode: string) {
  const url = BASE + "/getGuestPublicKey";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      roomCode: roomCode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getHostPublicKey(roomCode: string) {
  const url = BASE + "/getHostPublicKey";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      roomCode: roomCode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
