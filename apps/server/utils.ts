export function generateRoomCode(): string {
  let roomCode: string = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i: number = 0; i < 6; i++) {
    roomCode += chars[Math.floor(Math.random() * chars.length)];
  }
  return roomCode;
}
