import { RegisterUseCase } from '../register.js'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository.js'

export function makeRegisterUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const registerUseCase = new RegisterUseCase(prismaOrganizationsRepository)


  return registerUseCase
}