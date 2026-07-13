import { makeCreatePetUseCase } from '@/services/factories/make-create-pet.js'
import type {FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    city: z.string(),
    age: z.enum(['Filhote', 'Jovem' , 'Adulto', 'Idoso']).nullable(),
    size: z.enum(['Pequenino', 'Pequeno', 'Médio', 'Grande']).nullable(),
    energyLevel: z.number().nullable(),
    independencyLevel: z.enum([ 'Baixo', 'Médio' ,'Alto' ]).nullable(),
    environment: z.string().nullable(),
    photos: z.array(z.string()),
    requirements: z.array(z.string()),
  })

  const body = registerBodySchema.parse(req.body)

  const CreatePetUseCase = makeCreatePetUseCase()
  const org_id = req.user.sub


  const pet = await CreatePetUseCase.execute({
    ...body,
    organizationId: org_id,
  })

  return res.status(200).send({
    pet
  })
}

