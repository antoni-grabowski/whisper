export type Room = {
  roomCode: string;
  hostId: string;
  guestId: string;
  hostPublicKey: string;
  guestPublicKey: string;
};

export type CreateSessionRequest = {
  Body: {
    hostPublicKey: Uint8Array<ArrayBufferLike>;
  };
};
