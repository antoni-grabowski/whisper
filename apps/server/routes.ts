import { FastifyInstance } from "fastify";
import {
  attachGuest,
  createRoom,
  getGuestPublicKey,
  getHostPublicKey,
  roomExists,
} from "./redis.js";
import { generateRoomCode } from "./utils.js";
import { CreateRoomRequest, JoinRoomRequest } from "./types.js";

export default function registerRoutes(fastify: FastifyInstance) {
  fastify.get("/", function (request, reply) {
    reply.send({ it: "works" });
  });

  fastify.post<CreateRoomRequest>(
    "/createRoom",
    async function (request, reply) {
      let roomCode = generateRoomCode();
      while (await roomExists(roomCode)) roomCode = generateRoomCode();
      await createRoom(roomCode, request.body.hostPublicKey);
      reply.send({
        roomCode: roomCode,
      });
    },
  );

  fastify.post<JoinRoomRequest>("/joinRoom", async function (request, reply) {
    await attachGuest(request.body.roomCode, request.body.guestPublicKey);
    reply.send({});
  });

  fastify.post<{
    Body: {
      roomCode: string;
      publicKey: Uint8Array<ArrayBufferLike>;
    };
  }>("/amIHost", async (request, reply) => {
    const hostPublicKey: Uint8Array<ArrayBufferLike> = new Uint8Array(
      Buffer.from(
        (await getHostPublicKey(request.body.roomCode)) ?? "",
        "base64",
      ),
    );
    let isHost = false;
    hostPublicKey === request.body.publicKey
      ? (isHost = true)
      : (isHost = false);
    reply.send({ isHost: isHost });
  });

  fastify.post<{ Body: { roomCode: string } }>(
    "/getGuestPublicKey",
    async (request, reply) => {
      const guestPublicKey = await getGuestPublicKey(request.body.roomCode);
      reply.send({ guestPublicKey });
    },
  );
  fastify.post<{ Body: { roomCode: string } }>(
    "/getHostPublicKey",
    async (request, reply) => {
      const hostPublicKey = await getHostPublicKey(request.body.roomCode);
      reply.send({ hostPublicKey });
    },
  );
}
