export type Room = {
  roomCode: string;
  hostId: string;
  guestId: string;
  hostPublicKey: string;
  guestPublicKey: string;
};

export type CreateRoomRequest = {
  Body: {
    hostPublicKey: Uint8Array<ArrayBufferLike>;
  };
};

export type JoinRoomRequest = {
  Body: {
    roomCode: string;
    guestPublicKey: Uint8Array<ArrayBufferLike>;
  };
};
