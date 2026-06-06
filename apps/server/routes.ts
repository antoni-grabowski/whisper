import { FastifyInstance } from "fastify";
import { createRoom, roomExists } from "./redis.js";
import { generateRoomCode } from "./utils.js";

export default function registerRoutes(fastify: FastifyInstance) {
  fastify.get("/", function (request, reply) {
    reply.send({ it: "works" });
  });

  fastify.post("/createSession", async function (request, reply) {
    const hostId = crypto.randomUUID();
    let roomCode = generateRoomCode();
    while (await roomExists(roomCode)) roomCode = generateRoomCode();
    await createRoom(roomCode, hostId);
    reply.send({
      roomCode: roomCode,
      hostId: hostId,
    });
  });
}
