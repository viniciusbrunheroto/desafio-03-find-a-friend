import { prisma } from '@/lib/prisma.js'
import type { FetchPetsFilters, PetCreateInput, PetsRepository } from '../pets-repository.js'
import { randomUUID } from 'node:crypto'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetCreateInput) {

    const pet = await prisma.pet.create({
      data: {
        id: data.id ?? randomUUID(),
        name: data.name,
        description: data.description,
        city: data.city,
        age: data.age,
        size: data.size,
        energy_level: data.energyLevel,
        independency_level:  data.independencyLevel,
        environment: data.environment,
        organization_id: data.organizationId,
        
        petPhotos: {
          create: data.photos,
        },

        petRequirements: {
          create: data.requirements
        },
      },
    })

    return pet
  }


  async findMany(data: FetchPetsFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        city: data.city,
        ...(data.age && {age: data.age} ),
        ...(data.energyLevel && {energy_level: data.energyLevel}),
        ...(data.independencyLevel && {independency_level: data.independencyLevel}),
        ...(data.size && { size: data.size}),
      }
    })

    return pets
  }


  async findById(petId: string){
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      }
    })

    return pet
  }
    
}