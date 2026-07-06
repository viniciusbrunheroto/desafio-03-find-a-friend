import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
    
    
  it('should be able to refresh a token', async () => {

    await request(app.server)
      .post('/organizations')
      .send({
        name: 'Lar dos Bichinhos',
        email: 'adocao@lardosbichinhos.org',
        cep: '13015-220',
        address: 'Avenida dos Animais, 1020 - Centro, Campinas - SP',
        password: 'senhaSegura123',
        whatsappNumber: '19991234567',
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'adocao@lardosbichinhos.org',
        password: 'senhaSegura123'
      })

    const cookies = authResponse.get('Set-Cookie')

    if (cookies && cookies.length > 0) {
      const cookieString = cookies.join('; ')

      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookieString)
        .send()

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual({
        token: expect.any(String)
      })
      expect(response.get('Set-Cookie')).toEqual([
        expect.stringContaining('refreshToken=')
      ]) 
    } else {
      throw new Error('No cookies received, unable to test token refresh')
    }
  })
})