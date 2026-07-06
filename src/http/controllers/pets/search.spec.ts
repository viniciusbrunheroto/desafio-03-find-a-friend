import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization.js'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
    
    
  it('should be able to search pets by city', async () => {

    const { token, org} = await createAndAuthenticateOrganization(app)

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Amora',
        city: 'Piracicaba',
        age: 'Filhote',
        description: null,
        energyLevel: 4,
        environment: null,
        organizationId: org.id,
        independencyLevel: 'Alto',
        size: 'Pequeno',
        photos: [
          'fotoDaAmora.jpg'
        ],
        requirements: [
          'Requisito da Amora'
        ]
      })


    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Lupe',
        city: 'Rio Claro',
        age: 'Adulto',
        description: null,
        energyLevel: 1,
        environment: null,
        organizationId: org.id,
        independencyLevel: 'Baixo',
        size: 'Médio',
        photos: ['fotoDoLupe.jpg'
        ],
        requirements: [
          'Requisito do Lupe'
        ]
      })



    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'Rio Claro'
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Lupe'
      })
    ])
  })

  it('should be able to search pets by optional filters', async () => {

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'Piracicaba',
        age: 'Filhote',
        independencyLevel: 'Alto',
        energyLevel: 4,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Amora'
      })
    ])
  })
})