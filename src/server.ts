import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"; //Zod -> Biblioteca de validação de esquema em TS
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";

const app = fastify(); //Criando uma instancia do app em fastify

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)

app.listen({ port: 3333 }).then(() => { //.then() -> Acontece quando der certo a promisse
  console.log("HTTP server running on http://localhost:3333");
});
