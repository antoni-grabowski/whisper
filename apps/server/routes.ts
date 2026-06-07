import { FastifyInstance } from "fastify";
import { createRoom, roomExists } from "./redis.js";
import { generateRoomCode } from "./utils.js";
import { CreateSessionRequest } from "./types.js";

export default function registerRoutes(fastify: FastifyInstance) {
  fastify.get("/", function (request, reply) {
    reply.send({ it: "works" });
  });

  fastify.post<CreateSessionRequest>(
    "/createSession",
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
}
