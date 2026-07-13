import { prisma, schema } from '@/lib/prisma.js'
import type { OrganizationCreateInput } from '../../../prisma/generated/prisma/models.js'
import type { FindManyNearbyParams, OrganizationsRepository } from '../organizations-repository.js'
import { Prisma, type Organization } from '../../../prisma/generated/prisma/client.js'

export class PrismaOrganizationsRepository implements OrganizationsRepository {

  async create(data: OrganizationCreateInput) {

    const org = await prisma.organization.create({
      data,
    })

    return org
  }

  async findManyNearby({latitude, longitude}: FindManyNearbyParams){
    const orgs = await prisma.$queryRaw<Organization[]>`
        SELECT * FROM ${Prisma.raw(`"${schema}"."organizations"`)}
        WHERE  ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return orgs
  }

  async findByEmail(email: string) {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      }
    })

    return org 
  }

  async findById(id: string) {
    const org = await prisma.organization.findFirst({
      where: {
        id,
      }
    })

    return org 
  }
    
}