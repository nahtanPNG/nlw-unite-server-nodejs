import {
  badRequest
} from "./chunk-QDMTYS7I.mjs";
import {
  prisma
} from "./chunk-U7KKK27X.mjs";

// src/routes/get-attendee-badge.ts
import { z } from "zod";
async function getAttendeeBadge(app) {
  app.withTypeProvider().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        summary: "Get an attendee badge",
        tags: ["attendees"],
        params: z.object({
          attendeeId: z.coerce.number().int()
          //Ele pode vir de outro tipo, mas quero que vire numéro
        }),
        responde: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInUrl: z.string().url()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { attendeeId } = request.params;
      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            // Selecionando o evento que está relacionado com o participante
            select: {
              title: true
            }
          }
        },
        where: {
          id: attendeeId
        }
      });
      if (attendee === null) {
        throw new badRequest("Attendee not found");
      }
      const baseURL = `${request.protocol}://${request.hostname}`;
      const chekInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseURL);
      return reply.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInUrl: chekInUrl.toString()
        }
      });
    }
  );
}

export {
  getAttendeeBadge
};
