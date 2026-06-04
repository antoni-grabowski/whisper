const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function createSession() {
  const url = BASE + "/createSession";
  return await fetch(url, {
    method: "POST",
  });
}
