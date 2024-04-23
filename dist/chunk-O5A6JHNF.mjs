import {
  badRequest
} from "./chunk-QDMTYS7I.mjs";
import {
  prisma
} from "./chunk-U7KKK27X.mjs";

// src/routes/get-event.ts
import { z } from "zod";
async function getEvent(app) {
  app.withTypeProvider().get(
    "/events/:eventId",
    {
      schema: {
        summary: "Get an event",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().nullable(),
              attendeesAmount: z.number().int()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          slug: true,
          details: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true
            }
          }
        },
        where: {
          id: eventId
        }
      });
      if (event === null) {
        throw new badRequest("Event not found");
      }
      return reply.send({
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          maximumAttendees: event.maximumAttendees,
          attendeesAmount: event._count.attendees
        }
      });
    }
  );
}

export {
  getEvent
};
