import {
  badRequest
} from "./chunk-QDMTYS7I.mjs";
import {
  prisma
} from "./chunk-U7KKK27X.mjs";

// src/routes/check-in.ts
import z from "zod";
async function checkIn(app) {
  app.withTypeProvider().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        summary: "Check-in and attendee",
        tags: ["check-ins"],
        params: z.object({
          attendeeId: z.coerce.number().int()
        }),
        response: {
          201: z.null()
        }
      }
    },
    async (request, reply) => {
      const { attendeeId } = request.params;
      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId
        }
      });
      if (attendeeCheckIn !== null) {
        throw new badRequest("Attendee already checked in");
      }
      await prisma.checkIn.create({
        data: {
          attendeeId
        }
      });
      return reply.status(201).send();
    }
  );
}

export {
  checkIn
};
