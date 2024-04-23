import {prisma} from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: "ca3b7639-ecad-44a1-81d9-0d3ca3f8b64b",
            title: "Nathan Summit",
            slug: "nathan-summit",
            details: "The best summit ever",
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log("Database seeded!")
    prisma.$disconnect()
})