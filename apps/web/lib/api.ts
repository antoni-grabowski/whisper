const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function createRoom(publicKey: string) {
  const url = BASE + "/createRoom";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      hostPublicKey: publicKey,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function joinRoom(publicKey: string, roomCode: string) {
  const url = BASE + "/joinRoom";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      guestPublicKey: publicKey,
      roomCode: roomCode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function amIHost(
  roomCode: string,
  publicKey: string,
): Promise<{ isHost: boolean }> {
  const url = BASE + "/amIHost";
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      roomCode: roomCode,
      publicKey: publicKey,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
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
