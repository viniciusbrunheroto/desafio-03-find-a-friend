import {expect, describe, beforeEach, it} from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should be able to register', async () => {
    const {organization} = await sut.execute({
      name: 'Instituto Patas Felizes',
      email: 'contato@patasfelizes.org',
      password: 'Patas@2026',
      cep: '13010-210',
      address: 'Rua das Acácias, 245',
      whatsappNumber: '19991234567',
      latitude: -22.7422412,
      longitude: -47.6352641,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const {organization} = await sut.execute({
      name: 'Instituto Patas Felizes',
      email: 'contato@patasfelizes.org',
      password: 'Patas@2026',
      cep: '13010-210',
      address: 'Rua das Acácias, 245',
      whatsappNumber: '19991234567',
      latitude: -22.7422412,
      longitude: -47.6352641,
    })

    const isPasswordCorreclyHashed = await compare(
      'Patas@2026',
      organization.password_hash
    )

    expect(isPasswordCorreclyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'contato@patasfelizes.org'

    await sut.execute({
      name: 'Instituto Patas Felizes',
      email: email,
      password: 'Patas@2026',
      cep: '13010-210',
      address: 'Rua das Acácias, 245',
      whatsappNumber: '19991234567',
      latitude: -22.7422412,
      longitude: -47.6352641,
    })

    await expect(() => 
      sut.execute({
        name: 'Instituto Patas Felizes',
        email: email,
        password: 'Patas@2026',
        cep: '13010-210',
        address: 'Rua das Acácias, 245',
        whatsappNumber: '19991234567',
        latitude: -22.7422412,
        longitude: -47.6352641,
      })).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})