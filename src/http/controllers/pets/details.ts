import { makeGetPetDetailsUseCase } from '@/services/factories/make-get-pet-details.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function details(req: FastifyRequest, res: FastifyReply) {

  const detailsPetParamsSchema = z.object({
    petId: z.uuid(),
  })

  const { petId} = detailsPetParamsSchema.parse(req.params)


  const getPetDetails = makeGetPetDetailsUseCase()

  const pet = await getPetDetails.execute({
    petId
  })

  return res.status(200).send({
    pet
  })
}