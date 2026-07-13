import type { FastifyInstance } from 'fastify'
import { register } from './register.js'
import { authenticate } from './authenticate.js'
import { refresh } from './refresh.js'
import { nearby } from './nearby.js'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)

  app.get('/organizations/nearby', nearby)

  app.patch('/token/refresh', refresh)
}