import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = fastify();

const prisma = new PrismaClient({
  log: ["query"],
});

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

// Corpo da requisição (Request Body) → Utilizado em requisições POST e PUT
// Parametros da busca (Search Params / Query Params) → Enviados pela URL, geralmente usados para filtragem de dados com método GET. http://localhost:333/users?name=nathan
// Parametros de rota (Route Params)   → Identificação de recursos e são obrigatórios para que a rota aconteça DELETE http://localhost:333/users/5
// Cabeçalhos (Headers) → Contexto da requisição

// Driver nativo(Construído a mão) / Query Builders / ORMs

//Object Relational Mapping (Hibernate / Docktrine / ActiveRecord) -> Ferramenta que automatiza varios processos do banco de dados ao mesmo tempo
// json -> JavaScript Object Notation -> Liguagem de transferência de dados

app.post("/events", async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const data = createEventSchema.parse(request.body) //Validando se o request.body segue a estrutura acima

  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      slug: new Date().toISOString(),
    },
  })

  return reply.status(201).send({ eventId: event.id })
})

app.listen({ port: 3333 }).then(() => {
  //.then() -> Acontece quando der certo a promisse
  console.log("HTTP server running on http://localhost:3333");
})
