import "./env.js";
import Fastify from "fastify";
import cors from "@fastify/cors";
import registerRoutes from "./routes.js";
import { createSocketServer, onConnection } from "./socket.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, { origin: process.env.CLIENT_URL });

registerRoutes(fastify);

const io = createSocketServer(fastify);
onConnection(io);

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
