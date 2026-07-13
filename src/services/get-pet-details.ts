import type { PetsRepository } from '@/repositories/pets-repository.js'
import type { Pet } from '../../prisma/generated/prisma/client.js'
import { PetNotFoundError } from './errors/pet-not-found-error.js'

interface GetPetDetailsUseCaseRequest {
    petId: string
}

interface GetPetDetailsUseCaseResponse {
    pet: Pet
}


export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository ) {}

  async execute({petId}:GetPetDetailsUseCaseRequest ): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }

}