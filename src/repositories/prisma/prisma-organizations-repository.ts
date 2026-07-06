import { prisma } from '@/lib/prisma.js'
import type { OrganizationCreateInput } from '../../../prisma/generated/prisma/models.js'
import type { OrganizationsRepository } from '../organizations-repository.js'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: OrganizationCreateInput) {

    const org = await prisma.organization.create({
      data,
    })

    return org
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