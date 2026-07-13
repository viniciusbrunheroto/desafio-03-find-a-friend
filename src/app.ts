import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env/index.js'
import { organizationsRoutes } from './http/controllers/organizations/route.js'
import { petsRoutes } from './http/controllers/pets/route.js'
import { ZodError } from 'zod'


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

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({message: 'Validation error.', issues: error.format()})
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return res.status(500).send({message: 'Internal server error.'})
})