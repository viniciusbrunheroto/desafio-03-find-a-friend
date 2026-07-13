import { OrganizationAlreadyExistsError } from '@/services/errors/organization-already-exists-error.js'
import { makeRegisterUseCase } from '@/services/factories/make-register-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    cep: z.string().min(9),
    address: z.string(),
    password: z.string().min(6),
    whatsappNumber: z.string(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })


  const {name,email,password,cep,address,whatsappNumber, latitude, longitude} = registerBodySchema.parse(req.body)


  try{

    const registerUseCase = makeRegisterUseCase()


    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      cep,
      whatsappNumber,
      latitude,
      longitude
    })
  } catch (err) {

    if (err instanceof OrganizationAlreadyExistsError) {
      return res.status(409).send({message : err.message})
    }

    throw err
  }

  return res.status(201).send()
}

