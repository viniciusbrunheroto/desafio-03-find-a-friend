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

    const petPhotos = this.petPhotos.filter(pet => pet.pet_id === petId)

    const petRequirements = this.petRequirements.filter(pet => pet.pet_id === petId)

    return {
      ...pet,
      petPhotos,
      petRequirements,
    }
  }


  async findMany({city, age, energyLevel, independencyLevel, size}: FetchPetsFilters) {

    const pets = this.pets.filter((pet) => pet.city === city &&
    (!age || age === age) && (!energyLevel || pet.energy_level === energyLevel) && 
    (!independencyLevel || pet.independency_level === independencyLevel) && 
    (!size || pet.size === size))


    return pets.map(pet => ({
      ...pet,
      petPhotos: this.petPhotos.filter(
        petPhoto => petPhoto.pet_id === pet.id
      ),
      petRequirements: this.petRequirements.filter(
        petRequirement => petRequirement.pet_id === pet.id
      )
    })) 
  }
}