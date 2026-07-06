import { prisma } from '@/lib/prisma.js'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'


export async function createAndAuthenticateOrganization(app: FastifyInstance) {

  const org = await prisma.organization.create({
    data: {
      name:  'Lar dos Bichinhos',
      email: 'adocao@lardosbichinhos.org',
      password_hash: await hash('senhaSegura123', 6),
      address: 'Avenida dos Animais, 1020 - Centro, Campinas - SP',
      whatsapp_number: '19991234567',
      cep: '13015-220',
    }
  })


  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'adocao@lardosbichinhos.org',
      password: 'senhaSegura123'
    })

  const { token } = authResponse.body

  return {
    token,
    org,
  }
}