import { OrganizationAlreadyExistsError } from '@/services/errors/organization-already-exists-error.js'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),

  })


  const {email,password} = authenticateBodySchema.parse(req.body)


  try{

    const authenticateUseCase = makeAuthenticateUseCase()


    const {organization}  = await authenticateUseCase.execute({
      email,
      password,
    })
    

    const token = await res.jwtSign({}, {
      sign: {
        sub: organization.id,
      }
    }
    )

    const refreshToken = await res.jwtSign({},
      {
        sign: {
          sub: organization.id,
          expiresIn: '7d',
        }
      }
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200).send({
        token,
      })

  } catch (err) {

    if (err instanceof OrganizationAlreadyExistsError) {
      return res.status(409).send({message : err.message})
    }

    throw err
  }
}

