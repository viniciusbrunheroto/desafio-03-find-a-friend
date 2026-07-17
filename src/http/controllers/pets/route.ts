import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { search } from './search.js'
import { details } from './details.js'
import { create } from './create.js'
import { uploads } from './uploads.js'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', search)
  app.get('/pets/:petId/details', details)

  app.post('/pets', {onRequest: [verifyJWT]}, create)
  app.post('/uploads', {onRequest: [verifyJWT]}, uploads)
}