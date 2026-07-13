import { expect, describe, it, beforeEach} from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { CreatePetUseCase } from './create-pet.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { hash } from 'bcryptjs'



let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to create pet', async () => { 

    const response = await organizationsRepository.create({
      name: 'Instituto Patas Felizes',
      email: 'contato@patasfelizes.org',
      password_hash: await hash('Patas@2026', 6),
      cep: '13010-210',
      address: 'Rua das Acácias, 245',
      whatsapp_number: '19991234567',
      latitude: -22.7422412,
      longitude: -47.6352641,
    })
  
    const { pet } = await sut.execute({
      name: 'Rex',
      city: 'Piracicaba',
      age: 'Adulto',
      description: null,
      energyLevel: 3,
      environment: null,
      organizationId: response.id,
      independencyLevel: 'Baixo',
      size: 'Grande',
      photos: [
        'teste.jpg'
      ],
      requirements: [
        'Ter quintal',
      ]
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  
})