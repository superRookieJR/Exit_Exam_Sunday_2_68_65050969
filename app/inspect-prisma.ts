import { PrismaClient } from '@prisma/client'
try {
    const p = new PrismaClient()
    console.log('Options:', Object.getOwnPropertyNames(p))
} catch (e) {
    console.log('Error:', e)
}
