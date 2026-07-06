import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository.js'
import { GetPetDetailsUseCase } from '../get-pet-details.js'

export function makeGetPetDetailsUseCase() {

  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new GetPetDetailsUseCase(prismaPetsRepository)

  return useCase
}