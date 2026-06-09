import { FastifyInstance } from "fastify";
import { attachGuest, createRoom, roomExists } from "./redis.js";
import { generateRoomCode } from "./utils.js";
import { CreateRoomRequest, JoinRoomRequest } from "./types.js";

export default function registerRoutes(fastify: FastifyInstance) {
  fastify.get("/", function (request, reply) {
    reply.send({ it: "works" });
  });

  fastify.post<CreateRoomRequest>(
    "/createRoom",
    async function (request, reply) {
      const hostId = crypto.randomUUID();
      let roomCode = generateRoomCode();
      while (await roomExists(roomCode)) roomCode = generateRoomCode();
      await createRoom(roomCode, hostId, request.body.hostPublicKey);
      reply.send({
        roomCode: roomCode,
        hostId: hostId,
      });
    },
  );

  fastify.post<JoinRoomRequest>("/joinRoom", async function (request, reply) {
    const guestId = crypto.randomUUID();
    attachGuest(request.body.roomCode, request.body.guestPublicKey, guestId);
  });
}
