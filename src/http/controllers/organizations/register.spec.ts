import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
    
    
  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/organizations')
      .send({
        name: 'Lar dos Bichinhos',
        email: 'adocao@lardosbichinhos.org',
        cep: '13015-220',
        address: 'Avenida dos Animais, 1020 - Centro, Campinas - SP',
        password: 'senhaSegura123',
        whatsappNumber: '19991234567',
        latitude: -22.5418212,
        longitude: -47.9231322,
      })

    expect(response.statusCode).toEqual(201)
  })
})