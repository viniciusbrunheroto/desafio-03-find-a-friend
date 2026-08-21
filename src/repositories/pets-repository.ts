import type { Pet, PetPhoto, PetRequirement } from '../../prisma/generated/prisma/client.js'

export interface PetCreateInput {
    id?: string
    name: string
    description: string | null
    city: string
    age: 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso' | null
    size: 'Pequenino' | 'Pequeno' | 'Médio' | 'Grande' | null
    energyLevel: number | null,
    independencyLevel:  'Baixo' | 'Médio' | 'Alto' | null,
    environment: string | null,
    organizationId: string,
    photos: {
      url: string,
    }[],
    requirements: {
        requirement: string,
    }[],
}

export interface FetchPetsFilters{
    city: string
    age?: 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso'
    energyLevel?: number
    independencyLevel?: 'Baixo' | 'Médio' | 'Alto'
    size?: 'Pequenino' | 'Pequeno' | 'Médio' | 'Grande'
}

export type PetWithRelations = Pet & {
    petPhotos: PetPhoto[]
    petRequirements: PetRequirement[]
}

export interface PetsRepository {
   create(data: PetCreateInput): Promise<Pet>
   findMany(data: FetchPetsFilters ): Promise<PetWithRelations[]>
   findById(petId: string): Promise<PetWithRelations | null>
}