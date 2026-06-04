import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createClient } from "redis";

dotenv.config({ path: "./.env.local" });

const client = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

try {
  await client.connect();
} catch (err) {
  console.log(err);
}

// const io = new Server({});

// io.on("connection", (socket) => {
//   console.log(socket.id);
// });

// io.listen(3001);

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, { origin: process.env.CLIENT_URL });

type Session = {
  id: string;
  code: string;
};

let counter: number = 0;

fastify.get("/", function (request, reply) {
  reply.send({ it: "works" });
});

fastify.post("/createSession", function (request, reply) {
  counter++;
  reply.send({ it: "Hello" });
});

fastify.get("/test", (request, reply) => {
  reply.send({});
});

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
