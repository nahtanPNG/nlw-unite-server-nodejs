import {
  registerForEvent
} from "./chunk-HI2A5SH4.mjs";
import {
  errorHandler
} from "./chunk-TW2A6U7K.mjs";
import {
  checkIn
} from "./chunk-OPFTWBIS.mjs";
import {
  createEvent
} from "./chunk-QWNGTLUC.mjs";
import "./chunk-53HOK7PO.mjs";
import {
  getAttendeeBadge
} from "./chunk-77SBRADV.mjs";
import {
  getEventAttendees
} from "./chunk-FAAJWSGV.mjs";
import {
  getEvent
} from "./chunk-O5A6JHNF.mjs";
import "./chunk-QDMTYS7I.mjs";
import "./chunk-U7KKK27X.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
  //Qualquer front-end pode acessar minha API
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    //Todos os dados da api devem ser enviados em json
    produces: ["application/json"],
    //Todos os dados da api devem ser retornados em json
    info: {
      title: "Pass.in API",
      description: "Documenta\xE7\xE3o da API para o back-end da aplica\xE7\xE3o pass.in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
  //Faz com que o swagger entenda o zod
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running on http://localhost:3333");
});
