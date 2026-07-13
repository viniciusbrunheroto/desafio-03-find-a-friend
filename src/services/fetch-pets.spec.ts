import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { FetchPetsUseCase } from './fetch-pets.js'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
  })


  it('should be able to fetch pets by city', async () => {
    await petsRepository.create({
      name: 'Rex',
      city: 'Piracicaba',
      age: 'Adulto',
      description: null,
      energyLevel: 3,
      environment: null,
      organizationId: '1',
      independencyLevel: 'Baixo',
      size: 'Grande',
      photos: [{
        url: 'fotoDoRex.jpg'
      }],
      requirements: [{
        requirement: 'Requisito do Rex'
      }]
    })

    await petsRepository.create({
      name: 'Amora',
      city: 'Piracicaba',
      age: 'Filhote',
      description: null,
      energyLevel: 4,
      environment: null,
      organizationId: '1',
      independencyLevel: 'Alto',
      size: 'Pequeno',
      photos: [{
        url: 'fotoDaAmora.jpg'
      }],
      requirements: [{
        requirement: 'Requisito da Amora'
      }]
    })

    await petsRepository.create({
      name: 'Lupe',
      city: 'Rio Claro',
      age: 'Adulto',
      description: null,
      energyLevel: 1,
      environment: null,
      organizationId: '1',
      independencyLevel: 'Baixo',
      size: 'Médio',
      photos: [{
        url: 'fotoDoLupe.jpg'
      }],
      requirements: [{
        requirement: 'Requisito do Lupe'
      }]
    })

    const { pets } = await sut.execute({
      city: 'Piracicaba'
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({name: 'Rex'}),
      expect.objectContaining({name: 'Amora'})
    ])
    
  })


  it('should be able to fetch pets by optional filters', async () => {
    await petsRepository.create({
      name: 'Rex',
      city: 'Piracicaba',
      age: 'Adulto',
      description: null,
      energyLevel: 3,
      environment: null,
      organizationId: '1',
      independencyLevel: 'Baixo',
      size: 'Grande',
      photos: [{
        url: 'fotoDoRex.jpg'
      }],
      requirements: [{
        requirement: 'Requisito do Rex'
      }]
    })

    await petsRepository.create({
      name: 'Amora',
      city: 'Piracicaba',
      age: 'Filhote',
      description: null,
      energyLevel: 4,
      environment: null,
      organizationId: '1',
      independencyLevel: 'Alto',
      size: 'Pequeno',
      photos: [{
        url: 'fotoDaAmora.jpg'
      }],
      requirements: [{
        requirement: 'Requisito da Amora'
      }]
    })

    await petsRepository.create({
      name: 'Lupe',
      city: 'Rio Claro',
      age: 'Adulto',
      description: null,
      energyLevel: 1,
      environment: null,
      organizationId: '1',
      independencyLevel: 'Baixo',
      size: 'Médio',
      photos: [{
        url: 'fotoDoLupe.jpg'
      }],
      requirements: [{
        requirement: 'Requisito do Lupe'
      }]
    })

    const { pets } = await sut.execute({
      city: 'Piracicaba',
      age: 'Filhote',
      energyLevel: 4,
      independencyLevel: 'Alto'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({name: 'Amora'}),
    ])
    
  })
})