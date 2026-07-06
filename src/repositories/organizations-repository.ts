import type { Organization, Prisma } from '../../prisma/generated/prisma/client.js'

export interface OrganizationsRepository {
   create(data: Prisma.OrganizationCreateInput): Promise<Organization>
   findByEmail(email: string): Promise<Organization | null>
   findById(id: string): Promise<Organization | null> 
}