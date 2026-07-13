import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Organizations (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
    
    
  it('should be able to list nearby organizations', async () => {

    await request(app.server)
      .post('/organizations')
      .send({
        name: 'Patas Felizes',
        email: 'nearorganization@patasfelizes.org',
        password: 'Patas@2026',
        cep: '13010-210',
        address: 'Rua das Acácias, 245',
        whatsappNumber: '19991234567',
        latitude: -22.7422412,
        longitude: -47.6352641,
      })

    await request(app.server)
      .post('/organizations')
      .send({
        name: 'Amigos 4 Patas',
        email: 'contato@amigos4patas.org',
        cep: '13400-250',
        address: 'Rua das Acácias, 245 - Centro, Piracicaba - SP',
        password: '4PatasAmigos@2026',
        whatsappNumber: '19998765432',
        latitude: -22.5418212,
        longitude: -47.9231322,
      })


    const response = await request(app.server)
      .get('/organizations/nearby')
      .query({
        latitude: -22.7422412,
        longitude: -47.6352641,
      })
      .send()
      

    expect(response.statusCode).toEqual(200)
    expect(response.body.organizations).toHaveLength(1)
    expect(response.body.organizations).toEqual([
      expect.objectContaining({
        name: 'Patas Felizes',
      })
    ])
  })
})