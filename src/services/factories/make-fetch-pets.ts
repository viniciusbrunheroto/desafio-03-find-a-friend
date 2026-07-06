import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository.js'
import { FetchPetsUseCase } from '../fetch-pets.js'

export function makeFetchPetsUseCase() {

  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(prismaPetsRepository)

  return useCase
}