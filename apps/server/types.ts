export type Room = {
  roomCode: string;
  hostPublicKey: string;
  guestPublicKey: string;
};

export type CreateRoomRequest = {
  Body: {
    hostPublicKey: string;
  };
};

export type JoinRoomRequest = {
  Body: {
    roomCode: string;
    guestPublicKey: string;
  };
};
