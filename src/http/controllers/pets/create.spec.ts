import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization.js'


describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
    
    
  it('should be able to create pet', async () => {

    const { token, org } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(200)
  })
})