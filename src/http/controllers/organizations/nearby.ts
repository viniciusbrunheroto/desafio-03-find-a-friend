import { makeFetchNearbyOrganizationsUseCase } from '@/services/factories/make-fetch-nearby-organizations-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function nearby(req: FastifyRequest, res: FastifyReply) {


  const nearbyOrganizationsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude} = nearbyOrganizationsQuerySchema.parse(req.query)


  const FetchNearbyOrganizationsUseCase = makeFetchNearbyOrganizationsUseCase()

  const { organizations} = await FetchNearbyOrganizationsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })

  return res.status(200).send({
    organizations
  })
}