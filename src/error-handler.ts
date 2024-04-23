import { FastifyInstance } from "fastify";
import { badRequest } from "./routes/_errors/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({
        message: `Error during validation`,
        error: error.flatten().fieldErrors,
      });
  }

  if (error instanceof badRequest) {
    return reply.status(400).send({ message: error.message });
  }

  reply.status(500).send({ message: "Internal server error" });
};
