const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function createRoom(publicKey: Uint8Array<ArrayBufferLike>) {
  const url = BASE + "/createRoom";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      publicKey: publicKey,
    }),
  });
}

export async function joinRoom(publicKey: Uint8Array<ArrayBufferLike>) {
  const url = BASE + "/joinRoom";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      publicKey: publicKey,
    }),
  });
}
