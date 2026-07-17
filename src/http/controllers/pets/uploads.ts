 
import type { FastifyReply, FastifyRequest } from 'fastify'
import crypto from 'node:crypto'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'
import fs from 'node:fs'

export async function uploads(req: FastifyRequest, res: FastifyReply) {
  
  const parts = req.files()

  const uploadedFiles: string[] = []

  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

  const UPLOADS_FOLDER = path.resolve(__dirname, '..', '..', '..', 'uploads')

  await fs.promises.mkdir(UPLOADS_FOLDER, { recursive: true})

  for await (const part of parts) {

    if (!ACCEPTED_IMAGE_TYPES.includes(part.mimetype)){
      throw new Error('formato não permitido!')
    }

    const name = `${crypto.randomUUID()}-${part.filename}`

    const filePath = path.resolve(UPLOADS_FOLDER, name)

    await pipeline(part.file, fs.createWriteStream(filePath))

    uploadedFiles.push(name)
  }

  return res.status(201).send({
    files: uploadedFiles
  })
}