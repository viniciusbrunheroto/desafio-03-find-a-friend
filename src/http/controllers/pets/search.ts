import { makeFetchPetsUseCase } from '@/services/factories/make-fetch-pets.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {

  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.enum(['Filhote', 'Jovem' , 'Adulto' , 'Idoso']).optional(),
    size: z.enum(['Pequenino', 'Pequeno', 'Médio', 'Grande']).optional(),
    independencyLevel: z.enum(['Baixo', 'Médio', 'Alto']).optional(),
    energyLevel: z.coerce.number().optional(),
  })

  const {city, age,energyLevel, independencyLevel, size} = searchPetsQuerySchema.parse(req.query)

  const FetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await FetchPetsUseCase.execute({
    city,
    ...(age && {age}),
    ...(energyLevel && {energyLevel}),
    ...(size && {size}),
    ...(independencyLevel && {independencyLevel}),
  })

  return res.status(200).send({
    pets
  })
}
