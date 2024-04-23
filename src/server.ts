import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod"; //Zod -> Biblioteca de validação de esquema em TS
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";

const app = fastify(); //Criando uma instancia do app em fastify

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'], //Todos os dados da api devem ser enviados em json
    produces: ['application/json'], //Todos os dados da api devem ser retornados em json
    info: {
      title: 'Pass.in API',
      description: 'Documentação da API para o back-end da aplicação pass.in',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform, //Faz com que o swagger entenda o zod
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.listen({ port: 3333 }).then(() => { //.then() -> Acontece quando der certo a promisse
  console.log("HTTP server running on http://localhost:3333");
});
