import { AuthenticateUseCase } from '../authenticate.js'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository.js'

export function makeAuthenticateUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrganizationsRepository)


  return authenticateUseCase
}