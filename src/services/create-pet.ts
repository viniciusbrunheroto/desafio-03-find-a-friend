import type { OrganizationsRepository } from '@/repositories/organizations-repository.js'
import type { Pet } from '../../prisma/generated/prisma/client.js'
import type { PetsRepository } from '@/repositories/pets-repository.js'
import { OrganizationNotFoundError } from './errors/organization-not-found-error.js'

export interface CreatePetUseCaseRequest {
    name: string
    description: string | null
    city: string
    age: 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso' | null
    size: 'Pequenino' | 'Pequeno' | 'Médio' | 'Grande' | null
    energyLevel: number | null,
    independencyLevel:  'Baixo' | 'Médio' | 'Alto' | null,
    environment: string | null,
    organizationId: string,
    photos: string[],
    requirements: string[],
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetUseCase {
  constructor (
    private petsRepository: PetsRepository,
    private organizationRepository: OrganizationsRepository
  ) {}

  async execute({name, description, age, city, energyLevel, environment, independencyLevel, organizationId, photos, requirements, size}: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

    const organization = await this.organizationRepository.findById(organizationId)

    
    if (!organization) {
      throw new OrganizationNotFoundError()
    }
    

    const pet = await this.petsRepository.create({
      name,
      city,
      description,
      age,
      organizationId,
      energyLevel,
      environment,
      independencyLevel,
      size,
      photos: photos.map(photo => ({
        url: photo,
      })),
      requirements: requirements.map(requirement => ({
        requirement: requirement,
      }))
    })

    return { pet }
  }
}