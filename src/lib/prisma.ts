import { env } from '@/env/index.js'
import { PrismaClient } from '../../prisma/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

export const schema = new URL(env.DATABASE_URL).searchParams.get('schema') || 'public'

export const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: env.DATABASE_URL
  }, { schema }),
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})