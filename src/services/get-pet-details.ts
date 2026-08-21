import type { PetsRepository, PetWithRelations } from '@/repositories/pets-repository.js'
import { PetNotFoundError } from './errors/pet-not-found-error.js'

interface GetPetDetailsUseCaseRequest {
    petId: string
}

interface GetPetDetailsUseCaseResponse {
    pet: PetWithRelations
}


export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({petId}:GetPetDetailsUseCaseRequest ): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }

}