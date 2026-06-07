const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function createSession(publicKey: Uint8Array<ArrayBufferLike>) {
  const url = BASE + "/createSession";
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      publicKey: publicKey,
    }),
  });
}
