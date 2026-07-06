import type { PetsRepository } from '@/repositories/pets-repository.js'
import type { Pet } from '../../prisma/generated/prisma/client.js'

interface FetchPetsUseCaseRequest {
    city: string
    age ?: 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso'
    energyLevel ?: number 
    size?: 'Pequenino' | 'Pequeno' | 'Médio' | 'Grande' 
    independencyLevel?: 'Baixo' | 'Médio' | 'Alto' 
}

interface FetchPetsUseCaseResponse {
    pets: Pet[]
}


export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository ) {}

  async execute(data :FetchPetsUseCaseRequest ): Promise<FetchPetsUseCaseResponse> {
    
    
    const pets = await this.petsRepository.findMany(data)

    return { pets }
  }

}