import type { OrganizationsRepository } from '@/repositories/organizations-repository.js'
import type { Organization } from '../../prisma/generated/prisma/client.js'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error.js'

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    cep: string
    address: string
    whatsappNumber: string
    latitude: number
    longitude: number
}

interface RegisterUseCaseResponse {
    organization: Organization
}

export class RegisterUseCase {
  constructor (private organizationsRepository: OrganizationsRepository) {}

  async execute({name, email,password,cep, address, whatsappNumber, latitude, longitude}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.organizationsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      address,
      cep,
      whatsapp_number: whatsappNumber,
      latitude,
      longitude
    })

    return { organization }
  }
}