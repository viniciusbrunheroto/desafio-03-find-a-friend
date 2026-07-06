import {expect, describe, beforeEach, it} from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'


let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {

    await organizationsRepository.create({
      name: 'Instituto Patas Felizes',
      email: 'contato@patasfelizes.org',
      password_hash: await hash('Patas@2026', 6),
      cep: '13010-210',
      address: 'Rua das Acácias, 245',
      whatsapp_number: '19991234567'
    })
    const {organization} = await sut.execute({
      email: 'contato@patasfelizes.org',
      password: 'Patas@2026'
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'contato@patasfelizes.org',
      password: 'Patas@2026'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async() => {
    await organizationsRepository.create({
      name: 'Instituto Patas Felizes',
      email: 'contato@patasfelizes.org',
      password_hash: await hash('Patas@2026', 6),
      cep: '13010-210',
      address: 'Rua das Acácias, 245',
      whatsapp_number: '19991234567'
    })

    await expect(() => sut.execute({
      email: 'contato@patasfelizes.org',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})