import type { Organization, Prisma } from '../../prisma/generated/prisma/client.js'


export interface FindManyNearbyParams {
   latitude: number
   longitude: number
}


export interface OrganizationsRepository {
   create(data: Prisma.OrganizationCreateInput): Promise<Organization>
   findByEmail(email: string): Promise<Organization | null>
   findManyNearby(params: FindManyNearbyParams): Promise<Organization[]>
   findById(id: string): Promise<Organization | null> 
}