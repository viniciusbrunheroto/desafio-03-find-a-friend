import { randomUUID } from 'node:crypto'
import type { Pet, PetPhoto, PetRequirement } from '../../../prisma/generated/prisma/client.js'
import type { FetchPetsFilters, PetCreateInput, PetsRepository } from '../pets-repository.js'

export class InMemoryPetsRepository implements PetsRepository{

  public pets: Pet[] = []
  public petPhotos: PetPhoto[] = []
  public petRequirements: PetRequirement[] = []

  async create(data: PetCreateInput) {

    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      city: data.city,
      age: data.age ?? null,
      size: data.size ?? null,
      energy_level: data.energyLevel ?? null,
      independency_level: data.independencyLevel ?? null,
      environment: data.environment ?? null,
      organization_id: data.organizationId,      
    }

    this.pets.push(pet)

    for (const photo of data.photos) {
      this.petPhotos.push({
        id: randomUUID(),
        pet_id: pet.id,
        url: photo.url
      })
    }

    for (const requirement of data.requirements) {
      this.petRequirements.push({
        id: randomUUID(),
        pet_id: pet.id,
        requirement: requirement.requirement
      })
    }

    return pet
  }

  async findById(petId: string){
    const pet = this.pets.find(pet => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }


  async findMany({city, age, energyLevel, independencyLevel, size}: FetchPetsFilters) {
    return this.pets.filter((pet) => pet.city === city &&
  (!age || age === age) && (!energyLevel || pet.energy_level === energyLevel) && 
  (!independencyLevel || pet.independency_level === independencyLevel) && 
  (!size || pet.size === size))
  }
}