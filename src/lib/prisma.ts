import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ //criando uma instância do prisma
    log: ["query"], //definindo que queremos registrar as consultas no console
  });