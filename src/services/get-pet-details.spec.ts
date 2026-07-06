import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Fetch Pet Details Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })


  it('should be able to get pet details', async () => {

    const createdPet =  await petsRepository.create({
      name: 'Rex',
      city: 'Piracicaba',
      age: 'Adulto',
      description: null,
      energyLevel: 3,
      environment: null,
      organization_id: '1',
      independencyLevel: 'Baixo',
      size: 'Grande',
      photos: [{
        url: 'fotoDoRex.jpg'
      }],
      requirements: [{
        requirement: 'Requisito do Rex'
      }]
    })

    const { pet } = await sut.execute({
      petId: createdPet.id
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Rex')
    
  })

  it('should not be able to get pet details with wrong id', async () => {

    await expect(() =>
      sut.execute({
        petId: 'non-existing-id'
      })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})