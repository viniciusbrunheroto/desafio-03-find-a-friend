import { expect, describe, it, beforeEach} from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { hash } from 'bcryptjs'
import { FetchNearbyOrganizationsUseCase } from './fetch-nearby-organizations.js'


let organizationsRepository: InMemoryOrganizationsRepository
let sut: FetchNearbyOrganizationsUseCase

describe('Fetch Nearby Organization Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchNearbyOrganizationsUseCase(organizationsRepository)
  })
  
  it('should be able to fetch nearby gyms', async () => {  

    await organizationsRepository.create({
      name: 'Near Organization',
      email: 'nearorganization@patasfelizes.org',
      password_hash: await hash('Patas@2026', 6),
      cep: '13010-210',
      address: 'Rua das Acácias, 245',
      whatsapp_number: '19991234567',
      latitude: -22.7422412,
      longitude: -47.6352641,
    })

    await organizationsRepository.create({
      name: 'Far Organization',
      email: 'contato@amigos4patas.org',
      cep: '13400-250',
      address: 'Rua das Acácias, 245 - Centro, Piracicaba - SP',
      password_hash: await hash('4PatasAmigos@2026', 6),
      whatsapp_number: '19998765432',
      latitude: -22.5418212,
      longitude: -47.9231322,
    })

    const { organizations } = await sut.execute({
      userLatitude: -22.7422412,
      userLongitude: -47.6352641,
    })

    expect(organizations).toHaveLength(1)
    expect(organizations).toEqual([
      expect.objectContaining({name: 'Near Organization'}),    
    ])
  })
})

