import { randomUUID } from 'node:crypto'
import type { Organization } from '../../../prisma/generated/prisma/client.js'
import type { OrganizationCreateInput } from '../../../prisma/generated/prisma/models.js'
import type { OrganizationsRepository } from '../organizations-repository.js'

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


  async create(data: OrganizationCreateInput) {
    
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      address: data.address,
      whatsapp_number: data.whatsapp_number,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }
}