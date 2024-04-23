import {
  badRequest
} from "./chunk-QDMTYS7I.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: `Error during validation`,
      error: error.flatten().fieldErrors
    });
  }
  if (error instanceof badRequest) {
    return reply.status(400).send({ message: error.message });
  }
  reply.status(500).send({ message: "Internal server error" });
};

export {
  errorHandler
};
