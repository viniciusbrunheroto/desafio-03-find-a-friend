import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository.js'

import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository.js'
import { CreatePetUseCase } from '../create-pet.js'

export function makeCreatePetUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(prismaPetsRepository, prismaOrganizationsRepository)


  return useCase
}