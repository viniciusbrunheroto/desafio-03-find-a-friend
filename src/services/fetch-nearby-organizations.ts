import type { OrganizationsRepository } from '@/repositories/organizations-repository.js'
import type { Organization } from '../../prisma/generated/prisma/client.js'

interface FetchNearbyOrganizationsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyOrganizationsUseCaseResponse {
  organizations: Organization[]
}


export class FetchNearbyOrganizationsUseCase{
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({userLatitude, userLongitude}: FetchNearbyOrganizationsUseCaseRequest): Promise<FetchNearbyOrganizationsUseCaseResponse> {
    const organizations = await this.organizationsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { organizations }
  }
}