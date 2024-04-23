// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient({
  //criando uma instância do prisma
  log: ["query"]
  //definindo que queremos registrar as consultas no console
});

export {
  prisma
};
