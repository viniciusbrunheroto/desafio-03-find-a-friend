import { randomUUID } from 'node:crypto'
import { Prisma, type Organization } from '../../../prisma/generated/prisma/client.js'
import type { OrganizationCreateInput } from '../../../prisma/generated/prisma/models.js'
import type { FindManyNearbyParams, OrganizationsRepository } from '../organizations-repository.js'
import { getDistanceBetweenCoordinates } from '@/utils/test/get-distance-between-coordinates.js'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {


  public orgs: Organization[] = []

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }


  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findManyNearby(params: FindManyNearbyParams){
    return this.orgs.filter(org => {
      const distance = getDistanceBetweenCoordinates(
        {latitude: params.latitude, longitude: params.longitude},
        {latitude: org.latitude.toNumber(), longitude: org.longitude.toNumber()}
      )

      return distance < 10
    })
  }


  async create(data: OrganizationCreateInput) {
    
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      address: data.address,
      whatsapp_number: data.whatsapp_number,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }
}