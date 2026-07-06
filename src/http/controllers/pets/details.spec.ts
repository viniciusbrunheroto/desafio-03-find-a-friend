import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization.js'


describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
    
    
  it('should be able to get pet details', async () => {

    const { token, org} = await createAndAuthenticateOrganization(app)

    const { body: { pet: petCreated}} = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        city: 'Piracicaba',
        age: 'Adulto',
        description: null,
        energyLevel: 3,
        environment: null,
        organizationId: org.id,
        independencyLevel: 'Baixo',
        size: 'Grande',
        photos: [
          'teste.jpg'
        ],
        requirements: [
          'Ter quintal',
        ]
      })

    const petId = petCreated.pet.id

    const response = await request(app.server)
      .get(`/pets/${petId}/details`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.pet).toEqual(expect.objectContaining({
      name: 'Rex'
    }))
  })
})