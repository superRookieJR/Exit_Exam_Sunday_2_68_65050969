const { PrismaClient } = require('@prisma/client')
try {
    const p = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL
    })
    console.log('Prisma initialized successfully with datasourceUrl')
} catch (e) {
    console.log('Error with datasourceUrl:', e.message)
}
