import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env/index.js'
import { organizationsRoutes } from './http/controllers/organizations/route.js'
import { petsRoutes } from './http/controllers/pets/route.js'


export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)
app.register(organizationsRoutes)
app.register(petsRoutes)