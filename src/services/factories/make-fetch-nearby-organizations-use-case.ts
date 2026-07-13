import { FetchNearbyOrganizationsUseCase } from '../fetch-nearby-organizations.js'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository.js'

export function makeFetchNearbyOrganizationsUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new FetchNearbyOrganizationsUseCase(prismaOrganizationsRepository)


  return useCase
}